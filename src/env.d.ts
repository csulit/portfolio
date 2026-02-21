declare module 'cloudflare:workers' {
  interface Env {
    DB: D1Database
    TURNSTILE_SECRET_KEY: string
  }
}
