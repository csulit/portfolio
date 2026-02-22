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

const testimonials: Array<Testimonial> = [
  {
    id: 'testimonial-1',
    quote:
      'An exceptional engineer who delivers clean, performant code on tight deadlines. Transformed our platform with a modern stack and thoughtful architecture.',
    name: 'Alex Rivera',
    role: 'CTO',
    company: 'Stackline',
  },
  {
    id: 'testimonial-2',
    quote:
      'Working with Christian was a game-changer. He took our vague requirements and turned them into a polished product that exceeded expectations.',
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'Novexa',
  },
  {
    id: 'testimonial-3',
    quote:
      'Rare combination of deep technical skills and design sensibility. Our app performance improved dramatically and the UI felt world-class.',
    name: 'Marcus Tan',
    role: 'Founder',
    company: 'Breezly',
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
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                {testimonial.name
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
