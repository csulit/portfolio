import { createServerFn } from '@tanstack/react-start'
import { newsletterSchema, type ActionResult } from '@/lib/schemas'

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .inputValidator(newsletterSchema)
  .handler(async ({ data }): Promise<ActionResult> => {
    const { email } = data

    const [{ env }, { getDb }, { newsletterSubscribers }] = await Promise.all([
      import('cloudflare:workers'),
      import('@/db'),
      import('@/db/schema'),
    ])

    try {
      const db = getDb(env.DB)
      await db
        .insert(newsletterSubscribers)
        .values({ email })
        .onConflictDoNothing()
    } catch {
      return { success: false, error: 'Something went wrong. Please try again.' }
    }

    return { success: true }
  })
