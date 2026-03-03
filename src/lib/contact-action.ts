import { createServerFn } from '@tanstack/react-start'
import { contactSchema, type ActionResult } from '@/lib/schemas'

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator(contactSchema)
  .handler(async ({ data }): Promise<ActionResult> => {
    const { name, email, message, turnstileToken } = data

    // Dynamic imports to keep server-only modules out of the client bundle
    const [{ env }, { getDb }, { contactMessages }] = await Promise.all([
      import('cloudflare:workers'),
      import('@/db'),
      import('@/db/schema'),
    ])

    // Verify Turnstile token
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    )

    if (!verifyResponse.ok) {
      return { success: false, error: 'Verification failed. Please try again.' }
    }

    const verifyResult = (await verifyResponse.json()) as { success: boolean }

    if (!verifyResult.success) {
      return { success: false, error: 'Verification failed. Please try again.' }
    }

    try {
      const db = getDb(env.DB)
      await db.insert(contactMessages).values({ name, email, message })
    } catch {
      return { success: false, error: 'Something went wrong. Please try again.' }
    }

    return { success: true }
  })
