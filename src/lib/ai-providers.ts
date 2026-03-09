import { createOpenAI } from "@ai-sdk/openai";
import { createZhipu } from "zhipu-ai-provider";

export const AI_PROVIDERS = ["openai", "glm"] as const;
export type AIProvider = (typeof AI_PROVIDERS)[number];
export const DEFAULT_PROVIDER: AIProvider = "openai";

export function createOpenAIProvider(apiKey: string, cfAigToken?: string) {
  const openai = createOpenAI({
    apiKey: cfAigToken ?? apiKey,
    baseURL: cfAigToken
      ? "https://gateway.ai.cloudflare.com/v1/fe47d31d254d3761dd503998399fd37d/openai-gateway/openai"
      : undefined,
  });
  return openai("gpt-4.1-mini");
}

export function createGLMProvider(apiKey: string) {
  const zhipu = createZhipu({ apiKey });
  return zhipu("glm-4.7-flashx");
}
