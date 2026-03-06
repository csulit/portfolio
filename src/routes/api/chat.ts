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

Tech Stack:
- Frontend: TypeScript, React, TanStack Start, React Native
- Backend: PostgreSQL, MySQL, Prisma, Drizzle ORM, BullMQ, Redis
- AI/Infra: OpenAI, Claude, Node.js, Bun, AWS, Cloudflare, Railway

Guidelines:
- Be helpful, concise, and professional
- For specific project inquiries or quotes, direct users to the contact form
- Don't make up information not provided above
- Keep responses brief and relevant to Gelo's services`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { env } = await import("cloudflare:workers");
        const {
          createOpenAIProvider,
          createGLMProvider,
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

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
        });
      },
    },
  },
});
