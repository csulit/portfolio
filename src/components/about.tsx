import { m } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, useAnimateOnce } from '@/lib/motion'

const stats = [
  { value: '7+', label: 'Years Experience' },
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
          the Philippines, helping startups and businesses bring their software
          ideas to life. I specialize in building production-grade full-stack web
          applications, React Native mobile apps, and AI-powered SaaS products —
          from concept to deployment.
        </p>
        <p className="text-base leading-[1.7] text-text-secondary">
          Whether you need a complete SaaS platform, a mobile app, or AI/LLM
          capabilities integrated into your product, I deliver end-to-end
          solutions built for performance and scale — using whatever technology
          fits your project best.
        </p>
        <p className="text-base leading-[1.7] text-text-secondary">
          I work directly with founders and teams who want a technical partner,
          not just a developer. You get clear communication, fast iteration, and
          production-ready code — shipped on time.
        </p>
        <m.div
          variants={container(0.1)}
          {...inViewProps}
          className="grid grid-cols-3 border-t border-border pt-6 text-center"
        >
          {stats.map((stat) => (
            <m.div
              key={stat.label}
              variants={variants(fadeUp)}
              className="flex flex-col gap-1"
            >
              <span className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-[11px] text-text-secondary sm:text-[13px]">
                {stat.label}
              </span>
            </m.div>
          ))}
        </m.div>
      </m.div>
    </m.section>
  )
}
