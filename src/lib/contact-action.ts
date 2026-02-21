import { createServerFn } from '@tanstack/react-start'

type ContactResult = { success: true } | { success: false; error: string }

export const submitContact = createServerFn({ method: 'POST' })
  .validator(
    (
      data: unknown,
    ): {
      name: string
      email: string
      message: string
      turnstileToken: string
    } => {
      if (
        !data ||
        typeof data !== 'object' ||
        !('name' in data) ||
        !('email' in data) ||
        !('message' in data) ||
        !('turnstileToken' in data)
      ) {
        throw new Error('Missing required fields.')
      }

      const { name, email, message, turnstileToken } = data as Record<
        string,
        unknown
      >

      if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof message !== 'string' ||
        typeof turnstileToken !== 'string'
      ) {
        throw new Error('Invalid field types.')
      }

      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      const trimmedMessage = message.trim()

      if (!trimmedName || trimmedName.length > 200) {
        throw new Error('Name is required and must be under 200 characters.')
      }

      if (!trimmedEmail || trimmedEmail.length > 320) {
        throw new Error('A valid email is required.')
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('Invalid email format.')
      }

      if (!trimmedMessage || trimmedMessage.length > 5000) {
        throw new Error(
          'Message is required and must be under 5000 characters.',
        )
      }

      if (!turnstileToken) {
        throw new Error('Please complete the verification.')
      }

      return {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        turnstileToken,
      }
    },
  )
  .handler(async ({ data }): Promise<ContactResult> => {
    const { name, email, message, turnstileToken } = data

    // Dynamic imports to keep server-only modules out of the client bundle
    const { env } = await import('cloudflare:workers')
    const { getDb } = await import('@/db')
    const { contactMessages } = await import('@/db/schema')

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

    const verifyResult = (await verifyResponse.json()) as { success: boolean }

    if (!verifyResult.success) {
      return { success: false, error: 'Verification failed. Please try again.' }
    }

    // Insert into D1
    const db = getDb(env.DB)
    await db.insert(contactMessages).values({ name, email, message })

    return { success: true }
  })
