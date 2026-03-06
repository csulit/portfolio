import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createFileRoute } from "@tanstack/react-router";
import type { AIProvider } from "@/lib/ai-providers";

const SYSTEM_PROMPT = `You are Gelo's AI assistant on his portfolio website. Answer questions about his services, expertise, and availability.

About Gelo:
- Senior Software Engineer & AI Solutions Builder, solo founder based in the Philippines
- 7+ years experience, 20+ projects shipped, 5+ SaaS products built
- Available for freelance work
- Works directly with founders and teams as a technical partner

Services:
1. Full-Stack Web Apps — Custom web applications built to scale (internal tools, customer platforms, SaaS)
2. Mobile Apps — Cross-platform iOS & Android with React Native
3. AI / LLM Integration — Intelligent assistants, content generation, automated workflows
4. SaaS MVP Development — From idea to paying customers fast (auth, billing, dashboards)

Tech Stack (primary tools, not an exhaustive list):
- Frontend: TypeScript, React, TanStack Start, React Native
- Backend: PostgreSQL, MySQL, Prisma, Drizzle ORM, BullMQ, Redis
- AI/Infra: OpenAI, Claude, Node.js, Bun, AWS, Cloudflare, Railway
- Gelo is NOT limited to these technologies. He adapts to what each project needs and can adopt other tech stacks based on client requirements. The right tool for the right problem — what matters is shipping something great.

Guidelines:
- Be helpful, concise, and professional
- For specific project inquiries or quotes, direct users to the contact form
- Don't make up information not provided above, but do communicate that Gelo is flexible with technology choices
- Keep responses brief and relevant to Gelo's services`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { env } = await import("cloudflare:workers");
        const {
          createOpenAIProvider,
          createGLMProvider,
          isRegionRestrictionError,
          DEFAULT_PROVIDER,
        } = await import("@/lib/ai-providers");
        const {
          messages,
          provider = DEFAULT_PROVIDER,
        }: { messages: UIMessage[]; provider?: AIProvider } =
          await request.json();

        const model =
          provider === "glm"
            ? createGLMProvider(env.GLM_API_KEY)
            : createOpenAIProvider(env.OPENAI_API_KEY);

        const modelMessages = await convertToModelMessages(messages);
        const streamOpts = {
          system: SYSTEM_PROMPT,
          messages: modelMessages,
          abortSignal: request.signal,
        } as const;
        const responseOpts = { originalMessages: messages };

        const primaryResponse = streamText({
          model,
          ...streamOpts,
        }).toUIMessageStreamResponse(responseOpts);

        // No fallback needed when already using GLM
        if (provider === "glm") {
          return primaryResponse;
        }

        // Wrap the OpenAI stream to fall back to GLM on region errors
        const primaryBody = primaryResponse.body!;

        async function pipeStream(
          reader: ReadableStreamDefaultReader<Uint8Array>,
          controller: ReadableStreamDefaultController<Uint8Array>,
        ) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
          }
        }

        const wrappedStream = new ReadableStream({
          async start(controller) {
            const reader = primaryBody.getReader();
            try {
              await pipeStream(reader, controller);
            } catch (error) {
              await reader.cancel();
              if (!isRegionRestrictionError(error)) {
                controller.error(error);
                return;
              }
              const fallbackBody = streamText({
                model: createGLMProvider(env.GLM_API_KEY),
                ...streamOpts,
              }).toUIMessageStreamResponse(responseOpts).body!;
              const fallbackReader = fallbackBody.getReader();
              try {
                await pipeStream(fallbackReader, controller);
              } catch (fallbackError) {
                controller.error(fallbackError);
              }
            }
          },
        });

        return new Response(wrappedStream, {
          headers: primaryResponse.headers,
        });
      },
    },
  },
});
