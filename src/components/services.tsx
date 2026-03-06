import { Monitor, Smartphone, Cpu, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'

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
      'Custom web applications designed to grow with your business. Whether it\u2019s an internal tool, a customer-facing platform, or a full SaaS product \u2014 I build it fast, reliable, and ready to scale.',
  },
  {
    icon: Smartphone,
    iconColor: 'text-indigo',
    iconBg: 'bg-indigo-soft',
    title: 'Mobile Apps',
    description:
      'Cross-platform iOS & Android apps with a native feel and smooth UX. One codebase, two platforms, faster time to market.',
  },
  {
    icon: Cpu,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-muted',
    title: 'AI / LLM Integration',
    description:
      'Bring AI into your product \u2014 from intelligent assistants and content generation to automated workflows and data analysis. I handle the architecture so you get real results, not just a demo.',
    highlighted: true,
  },
  {
    icon: Rocket,
    iconColor: 'text-amber',
    iconBg: 'bg-amber-soft',
    title: 'SaaS MVP Development',
    description:
      'Go from idea to paying customers, fast. Authentication, billing, dashboards, and your core features \u2014 built right and ready to scale from day one.',
  },
]

export function Services() {
  const { inViewProps, variants, container } = useAnimateOnce('services', 0.2)

  return (
    <m.section
      id="services"
      variants={container(0.12)}
      {...inViewProps}
      className="flex flex-col items-center gap-14 px-6 py-25 lg:px-20"
    >
      <m.div
        variants={variants(fadeUp)}
        className="flex flex-col items-center gap-3"
      >
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // SERVICES
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          What I build for you.
        </h2>
        <p className="text-base text-text-secondary">
          End-to-end software development, from idea to deployed product.
        </p>
      </m.div>

      <m.div
        variants={container(0.1)}
        {...inViewProps}
        className="grid w-full grid-cols-1 gap-5 md:grid-cols-2"
      >
        {services.map((service) => (
          <m.div
            key={service.title}
            variants={variants(fadeUp)}
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
          </m.div>
        ))}
      </m.div>
    </m.section>
  )
}
