import { useState, type SyntheticEvent } from 'react'
import { Mail, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import { subscribeNewsletter } from '@/lib/newsletter-action'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterSection() {
  const { inViewProps, variants } = useAnimateOnce('blog-newsletter', 0.2)

  const [email, setEmail] = useState('')
  const [submission, setSubmission] = useState<{
    status: Status
    error: string
  }>({ status: 'idle', error: '' })

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    if (!email.trim() || submission.status === 'submitting') return

    setSubmission({ status: 'submitting', error: '' })

    try {
      const result = await subscribeNewsletter({ data: { email } })

      if (result.success) {
        setSubmission({ status: 'success', error: '' })
        setEmail('')
      } else {
        setSubmission({ status: 'error', error: result.error })
      }
    } catch (err) {
      setSubmission({
        status: 'error',
        error: err instanceof Error ? err.message : 'Something went wrong.',
      })
    }
  }

  return (
    <m.section
      variants={variants(fadeUp)}
      {...inViewProps}
      className="px-6 py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[28px] border border-accent/30 bg-surface p-10 shadow-[0_4px_24px_var(--color-accent-muted)] md:p-14">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft">
          <Mail className="size-6 text-accent" />
        </div>

        <h2 className="text-center text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">
          Stay in the loop.
        </h2>

        <p className="max-w-100 text-center text-base leading-relaxed text-text-secondary">
          Get occasional updates on new posts, projects, and engineering insights
          — no spam, ever.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            maxLength={320}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={submission.status === 'submitting'}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submission.status === 'submitting' ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

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
              You&apos;re subscribed! Thanks for joining.
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
    </m.section>
  )
}
