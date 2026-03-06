import { createOpenAI } from "@ai-sdk/openai";
import { createZhipu } from "zhipu-ai-provider";

export const AI_PROVIDERS = ["openai", "glm"] as const;
export type AIProvider = (typeof AI_PROVIDERS)[number];
export const DEFAULT_PROVIDER: AIProvider = "openai";

export function createOpenAIProvider(apiKey: string) {
  const openai = createOpenAI({ apiKey });
  return openai("gpt-4.1-mini");
}

export function createGLMProvider(apiKey: string) {
  const zhipu = createZhipu({ apiKey });
  return zhipu("glm-4.7-flashx");
}

export function isRegionRestrictionError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes(
      "Country, region, or territory not supported",
    );
  }
  return false;
}
