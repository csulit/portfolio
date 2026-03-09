import { createOpenAI } from "@ai-sdk/openai";
import { createZhipu } from "zhipu-ai-provider";

export const AI_PROVIDERS = ["deepseek", "glm"] as const;
export type AIProvider = (typeof AI_PROVIDERS)[number];
export const DEFAULT_PROVIDER: AIProvider = "deepseek";

const CF_AI_GATEWAY_URL =
  "https://gateway.ai.cloudflare.com/v1/fe47d31d254d3761dd503998399fd37d/openai-gateway/openai";

export function createOpenAIProvider(apiKey: string, cfAigToken?: string) {
  const openai = createOpenAI({
    apiKey: cfAigToken ?? apiKey,
    baseURL: cfAigToken ? CF_AI_GATEWAY_URL : undefined,
  });
  return openai("gpt-4.1-mini");
}

export function createGLMProvider(apiKey: string) {
  const zhipu = createZhipu({ apiKey });
  return zhipu("glm-4.7-flashx");
}
