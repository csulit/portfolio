import { Quote } from 'lucide-react'
import { m } from 'framer-motion'
import { fadeUp, useAnimateOnce } from '@/lib/motion'

interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
}

// TODO: Add real testimonials from clients
const testimonials: Array<Testimonial> = [
  {
    id: 'testimonial-1',
    quote: 'TODO: Add real testimonial',
    name: 'TODO: Client Name',
    role: 'TODO: Role',
    company: 'TODO: Company',
  },
  {
    id: 'testimonial-2',
    quote: 'TODO: Add real testimonial',
    name: 'TODO: Client Name',
    role: 'TODO: Role',
    company: 'TODO: Company',
  },
  {
    id: 'testimonial-3',
    quote: 'TODO: Add real testimonial',
    name: 'TODO: Client Name',
    role: 'TODO: Role',
    company: 'TODO: Company',
  },
]

export function Testimonials() {
  const { inViewProps, variants, container } = useAnimateOnce('testimonials', 0.2)

  return (
    <m.section
      id="testimonials"
      variants={container(0.12)}
      {...inViewProps}
      className="flex flex-col items-center gap-14 bg-surface px-6 py-25 lg:px-20"
    >
      <m.div
        variants={variants(fadeUp)}
        className="flex flex-col items-center gap-3"
      >
        <span className="w-fit rounded-md border border-border bg-background px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // TESTIMONIALS
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          What people say.
        </h2>
        <p className="text-base text-text-secondary">
          Feedback from clients and collaborators I&apos;ve worked with.
        </p>
      </m.div>

      <m.div
        variants={container(0.12)}
        {...inViewProps}
        className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <m.blockquote
            key={testimonial.id}
            variants={variants(fadeUp)}
            className="flex flex-col gap-6 rounded-[20px] border border-border bg-background p-8"
          >
            <Quote className="size-8 text-accent opacity-40" />

            <p className="flex-1 text-[15px] leading-relaxed text-text-secondary italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 border-t border-border pt-5">
              {/* TODO: Replace with real avatar */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                {testimonial.name
                  .replace('TODO: ', '')
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-primary">
                  {testimonial.name}
                </span>
                <span className="text-xs text-text-muted">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </div>
          </m.blockquote>
        ))}
      </m.div>
    </m.section>
  )
}
