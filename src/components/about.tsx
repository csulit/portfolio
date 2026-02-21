import { m } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, useAnimateOnce } from '@/lib/motion'

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '5+', label: 'SaaS Products Built' },
]

export function About() {
  const { inViewProps, variants, container } = useAnimateOnce('about', 0.2)

  return (
    <m.section
      id="about"
      variants={container(0.15)}
      {...inViewProps}
      className="flex flex-col items-center gap-12 px-6 py-25 lg:flex-row lg:items-start lg:gap-20 lg:px-20"
    >
      <m.div
        variants={variants(fadeLeft)}
        className="flex shrink-0 flex-col gap-6 lg:w-120"
      >
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // ABOUT ME
        </span>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-[44px] md:leading-[1.15]">
          Turning complex
          <br />
          problems into
          <br />
          elegant software.
        </h2>
      </m.div>

      <m.div
        variants={variants(fadeRight)}
        className="flex flex-col gap-5"
      >
        <p className="text-base leading-[1.7] text-text-primary">
          I&apos;m Gelo — a Senior Software Engineer and solo founder based in
          the Philippines. I specialize in building production-grade full-stack
          web applications, React Native mobile apps, and AI/LLM-integrated SaaS
          products.
        </p>
        <p className="text-base leading-[1.7] text-text-secondary">
          With deep expertise in TypeScript, React, PostgreSQL, and modern AI
          tooling, I help startups and businesses go from idea to launched
          product — fast. I&apos;ve shipped SaaS platforms, built mobile apps,
          and integrated cutting-edge LLM pipelines into real-world products.
        </p>
        <m.div
          variants={container(0.1)}
          {...inViewProps}
          className="grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3 sm:gap-0"
        >
          {stats.map((stat) => (
            <m.div
              key={stat.label}
              variants={variants(fadeUp)}
              className="flex flex-col gap-1"
            >
              <span className="text-4xl font-extrabold tracking-tight text-accent">
                {stat.value}
              </span>
              <span className="text-[13px] text-text-secondary">
                {stat.label}
              </span>
            </m.div>
          ))}
        </m.div>
      </m.div>
    </m.section>
  )
}
