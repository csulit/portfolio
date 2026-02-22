import { m } from 'framer-motion'
import { fadeUp, useAnimateOnce } from '@/lib/motion'

export function BlogHero() {
  const { mountProps, variants, container } = useAnimateOnce('blog-hero')

  return (
    <m.section
      variants={container(0.1, 0.1)}
      {...mountProps}
      className="flex flex-col items-center gap-5 px-6 pt-20 pb-15 lg:px-20"
    >
      <m.span
        variants={variants(fadeUp)}
        className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[1px] text-accent"
      >
        // BLOG
      </m.span>
      <m.h1
        variants={variants(fadeUp)}
        className="text-center text-4xl font-extrabold tracking-tight text-text-primary md:text-[56px] md:leading-[1.1]"
      >
        Writing &amp; insights.
      </m.h1>
      <m.p
        variants={variants(fadeUp)}
        className="max-w-140 text-center text-[17px] leading-relaxed text-text-secondary"
      >
        Occasional notes on engineering, AI, and building products — straight
        from the trenches.
      </m.p>
    </m.section>
  )
}
