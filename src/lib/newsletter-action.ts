import { createServerFn } from '@tanstack/react-start'

type NewsletterResult = { success: true } | { success: false; error: string }

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: unknown): { email: string } => {
      if (!data || typeof data !== 'object' || !('email' in data)) {
        throw new Error('Email is required.')
      }

      const { email } = data as Record<string, unknown>

      if (typeof email !== 'string') {
        throw new Error('Invalid email.')
      }

      const trimmedEmail = email.trim().toLowerCase()

      if (!trimmedEmail || trimmedEmail.length > 320) {
        throw new Error('A valid email is required.')
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('Invalid email format.')
      }

      return { email: trimmedEmail }
    },
  )
  .handler(async ({ data }): Promise<NewsletterResult> => {
    const { email } = data

    const { env } = await import('cloudflare:workers')
    const { getDb } = await import('@/db')
    const { newsletterSubscribers } = await import('@/db/schema')

    const db = getDb(env.DB)
    await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing()

    return { success: true }
  })
