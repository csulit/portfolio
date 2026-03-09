declare module 'cloudflare:workers' {
  interface Env {
    DB: D1Database
    TURNSTILE_SECRET_KEY: string
    GLM_API_KEY: string
    OPENAI_API_KEY: string
    CF_AIG_TOKEN: string
  }
  const env: Env
}
