import { z } from 'zod'

export type ActionResult = { success: true } | { success: false; error: string }

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'A valid email is required.')
  .max(320, 'Email must be under 320 characters.')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format.')

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(200, 'Name must be under 200 characters.'),
  email: emailField,
  message: z
    .string()
    .trim()
    .min(1, 'Message is required.')
    .max(5000, 'Message must be under 5000 characters.'),
  turnstileToken: z.string().min(1, 'Please complete the verification.'),
})

export const newsletterSchema = z.object({
  email: emailField,
})
