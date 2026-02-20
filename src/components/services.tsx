import { Monitor, Smartphone, Cpu, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  title: string
  description: string
  highlighted?: boolean
}

const services: Array<Service> = [
  {
    icon: Monitor,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-soft',
    title: 'Full-Stack Web Apps',
    description:
      'Scalable, fast, and modern web applications built with React, TypeScript, and PostgreSQL. From MVPs to production SaaS.',
  },
  {
    icon: Smartphone,
    iconColor: 'text-indigo',
    iconBg: 'bg-indigo-soft',
    title: 'Mobile Apps',
    description:
      'Cross-platform iOS & Android apps with React Native. Native feel, shared codebase, and smooth UX baked in.',
  },
  {
    icon: Cpu,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-muted',
    title: 'AI / LLM Integration',
    description:
      'Integrate GPT-4, Claude, Gemini and other LLMs into your product. RAG pipelines, agents, prompt engineering, and more.',
    highlighted: true,
  },
  {
    icon: Rocket,
    iconColor: 'text-amber',
    iconBg: 'bg-amber-soft',
    title: 'SaaS MVP Development',
    description:
      'Launch your SaaS fast. Auth, billing, dashboards, and core features — built right and ready to scale from day one.',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="flex flex-col items-center gap-14 px-6 py-25 lg:px-20"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // SERVICES
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          What I build for you.
        </h2>
        <p className="text-base text-text-secondary">
          End-to-end software development, from idea to deployed product.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className={cn(
              'flex flex-col gap-5 rounded-[20px] bg-surface p-8 pt-9',
              service.highlighted
                ? 'border border-accent-glow shadow-[0_4px_24px_#5CCC8E20]'
                : 'border border-border',
            )}
          >
            <div
              className={cn('flex size-13 items-center justify-center rounded-[14px]', service.iconBg)}
            >
              <service.icon className={cn('size-6.5', service.iconColor)} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-text-primary">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
