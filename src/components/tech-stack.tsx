import {
  Monitor,
  Server,
  Cpu,
  Terminal,
  Layers,
  Smartphone,
  Database,
  GitBranch,
  Zap,
  Cloud,
  Lightbulb,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TechCard {
  icon: LucideIcon
  iconColor: string
  name: string
  highlighted?: boolean
}

interface TechRow {
  icon: LucideIcon
  label: string
  cards: Array<TechCard>
}

const techRows: Array<TechRow> = [
  {
    icon: Monitor,
    label: 'FRONTEND',
    cards: [
      { icon: Terminal, iconColor: 'text-ts-blue', name: 'TypeScript / JS' },
      { icon: Layers, iconColor: 'text-react-blue', name: 'React / TanStack Start' },
      { icon: Smartphone, iconColor: 'text-react-blue', name: 'React Native' },
    ],
  },
  {
    icon: Server,
    label: 'BACKEND & DATA',
    cards: [
      { icon: Database, iconColor: 'text-pg-blue', name: 'PostgreSQL / MySQL' },
      { icon: GitBranch, iconColor: 'text-accent', name: 'Prisma / Drizzle' },
      { icon: Zap, iconColor: 'text-amber', name: 'BullMQ / Redis' },
    ],
  },
  {
    icon: Cpu,
    label: 'AI / INFRA',
    cards: [
      { icon: Cpu, iconColor: 'text-accent', name: 'OpenAI / Claude', highlighted: true },
      { icon: Zap, iconColor: 'text-amber', name: 'Node.js / Bun' },
      { icon: Cloud, iconColor: 'text-indigo', name: 'AWS / CloudFlare / Railway' },
    ],
  },
]

export function TechStack() {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-surface px-6 py-20 lg:px-20">
      <div className="flex flex-col items-center gap-3">
        <span className="w-fit rounded-md border border-border bg-background px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // EXPERTISE
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          The right tool for the right problem.
        </h2>
        <p className="text-base text-text-secondary">
          I adapt to what your project needs — here&apos;s what I reach for most
          often.
        </p>
      </div>

      <div className="flex w-full flex-col gap-8">
        {techRows.map((row) => (
          <div key={row.label} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <row.icon className="size-3.5 text-text-secondary" />
              <span className="text-[11px] font-semibold tracking-[1.5px] text-text-secondary">
                {row.label}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {row.cards.map((card) => (
                <div
                  key={card.name}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-2xl bg-background p-7',
                    card.highlighted
                      ? 'border border-accent-glow shadow-[0_0_20px_#5CCC8E30]'
                      : 'border border-border',
                  )}
                >
                  <card.icon className={cn('size-8', card.iconColor)} />
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      card.highlighted ? 'text-accent' : 'text-text-primary',
                    )}
                  >
                    {card.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center gap-4 rounded-[14px] border border-border bg-background px-8 py-5">
        <Lightbulb className="size-4.5 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed text-text-secondary">
          Not married to any single stack — if there&apos;s a better tool for
          your project, I&apos;ll use it. What matters is shipping something
          great.
        </p>
      </div>
    </section>
  )
}
