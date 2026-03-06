import { createOpenAI } from "@ai-sdk/openai";

export function createOpenAIProvider(apiKey: string) {
  const openai = createOpenAI({ apiKey });
  return openai("gpt-4.1-mini");
}

export function createGLMProvider(apiKey: string) {
  const glm = createOpenAI({
    apiKey,
    baseURL: "https://open.bigmodel.cn/api/paas/v4",
  });
  return glm("GLM-4.7-FlashX");
}
