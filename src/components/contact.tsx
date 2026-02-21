import { useState, useRef, type FormEvent } from 'react'
import { Briefcase, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { fadeLeft, fadeRight, fadeUp, useAnimateOnce } from '@/lib/motion'
import { submitContact } from '@/lib/contact-action'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const TURNSTILE_SITE_KEY = '0x4AAAAAAACgPR25YE3q-aaB'

export function Contact() {
  const { inViewProps, variants, container } = useAnimateOnce('contact', 0.2)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [submission, setSubmission] = useState<{
    status: Status
    error: string
  }>({ status: 'idle', error: '' })
  const turnstileRef = useRef<TurnstileInstance>(null)

  const canSubmit = turnstileToken && submission.status !== 'submitting'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!turnstileToken) return

    setSubmission({ status: 'submitting', error: '' })

    try {
      const result = await submitContact({
        data: { ...form, turnstileToken },
      })

      if (result.success) {
        setSubmission({ status: 'success', error: '' })
        setForm({ name: '', email: '', message: '' })
      } else {
        setSubmission({ status: 'error', error: result.error })
      }
    } catch (err) {
      setSubmission({
        status: 'error',
        error:
          err instanceof Error ? err.message : 'Something went wrong.',
      })
    } finally {
      // Turnstile tokens are single-use — always reset
      setTurnstileToken(null)
      turnstileRef.current?.reset()
    }
  }

  return (
    <m.section
      id="contact"
      variants={container(0.15)}
      {...inViewProps}
      className="flex flex-col gap-12 px-6 py-25 lg:flex-row lg:gap-20 lg:px-20"
    >
      <m.div
        variants={variants(fadeLeft)}
        className="flex flex-1 flex-col gap-7"
      >
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // CONTACT
        </span>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-[44px] md:leading-[1.15]">
          Let&apos;s build
          <br />
          something great.
        </h2>

        <p className="max-w-120 text-base leading-relaxed text-text-secondary">
          Whether you have a project in mind or just want to chat — I&apos;m
          always open to new work.
        </p>

        <a
          href="#" // TODO: Add real Fiverr URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[15px] font-bold text-background transition-opacity hover:opacity-90"
        >
          <Briefcase className="size-5" />
          View Fiverr Profile
        </a>
      </m.div>

      <m.form
        variants={variants(fadeRight)}
        className="flex flex-1 flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={200}
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-12 rounded-[10px] border border-border bg-surface px-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={320}
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-12 rounded-[10px] border border-border bg-surface px-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            required
            maxLength={5000}
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className="resize-none rounded-[10px] border border-border bg-surface p-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ theme: 'dark', size: 'flexible' }}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-8 py-4 text-base font-bold text-background shadow-[0_8px_24px_#5CCC8E40] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submission.status === 'submitting' ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          <AnimatePresence mode="wait">
            {submission.status === 'success' && (
              <m.div
                key="success"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center gap-2 rounded-[10px] border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
              >
                <CheckCircle className="size-4 shrink-0" />
                Message sent! I&apos;ll get back to you soon.
              </m.div>
            )}

            {submission.status === 'error' && (
              <m.div
                key="error"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center gap-2 rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle className="size-4 shrink-0" />
                {submission.error || 'Something went wrong. Please try again.'}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </m.form>
    </m.section>
  )
}
