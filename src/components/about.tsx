const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '10+', label: 'SaaS Products Built' },
]

export function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-12 px-6 py-25 lg:flex-row lg:items-start lg:gap-20 lg:px-20"
    >
      <div className="flex shrink-0 flex-col gap-6 lg:w-120">
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
      </div>

      <div className="flex flex-col gap-5">
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
        <div className="flex gap-0 border-t border-border pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-1 flex-col gap-1">
              <span className="text-4xl font-extrabold tracking-tight text-accent">
                {stat.value}
              </span>
              <span className="text-[13px] text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
