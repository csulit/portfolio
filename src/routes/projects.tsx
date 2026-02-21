import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/projects')({ component: ProjectsPage })

interface Tag {
  label: string
  category?: boolean
}

interface Project {
  title: string
  description: string
  tags: Array<Tag>
  category: string
  highlighted?: boolean
}

const categories = ['All', 'SaaS', 'Mobile', 'AI / ML'] as const

const projects: Array<Project> = [
  {
    title: 'AI Document Processing Pipeline',
    description:
      'Built an AI-powered document processing system using GPT-4o/4o-mini agents with automated extraction, classification, and structured output. Handles high-throughput workloads with BullMQ queues and Prisma/PostgreSQL.',
    tags: [
      { label: 'AI / ML', category: true },
      { label: 'OpenAI' },
      { label: 'BullMQ' },
      { label: 'Prisma' },
      { label: 'PostgreSQL' },
    ],
    category: 'AI / ML',
    highlighted: true,
  },
  {
    title: 'Full-Stack SaaS Platform',
    description:
      'Production SaaS application built with TanStack Start (React), TypeScript, PostgreSQL, and Prisma. Includes authentication, dashboards, and background job processing via BullMQ/Redis.',
    tags: [
      { label: 'SaaS', category: true },
      { label: 'React' },
      { label: 'TypeScript' },
      { label: 'Prisma' },
      { label: 'BullMQ' },
    ],
    category: 'SaaS',
  },
  {
    title: 'React Native Mobile App',
    description:
      'Cross-platform mobile application with smooth animations, offline support, and a polished UX — built with React Native and TypeScript.',
    tags: [
      { label: 'Mobile', category: true },
      { label: 'React Native' },
      { label: 'TypeScript' },
    ],
    category: 'Mobile',
  },
]

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const { mountProps, variants, container, prefersReduced } = useAnimateOnce('projects-page')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <m.section
          variants={container(0.1, 0.1)}
          {...mountProps}
          className="flex flex-col items-center gap-5 px-6 pt-20 pb-15 lg:px-20"
        >
          <m.span
            variants={variants(fadeUp)}
            className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[1px] text-accent"
          >
            // ALL PROJECTS
          </m.span>
          <m.h1
            variants={variants(fadeUp)}
            className="text-center text-4xl font-extrabold tracking-tight text-text-primary md:text-[56px] md:leading-[1.1]"
          >
            Things I&apos;ve shipped.
          </m.h1>
          <m.p
            variants={variants(fadeUp)}
            className="max-w-155 text-center text-[17px] leading-relaxed text-text-secondary"
          >
            A curated collection of real-world projects — from SaaS products to
            AI tools and mobile apps.
          </m.p>
        </m.section>

        {/* Filter bar */}
        <m.div
          variants={container(0.06, 0.3)}
          {...mountProps}
          className="flex flex-wrap items-center gap-3 px-6 pb-12 lg:px-20"
        >
          {categories.map((cat) => (
            <m.button
              key={cat}
              variants={variants(fadeUp)}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'rounded-lg px-5 py-2 text-[13px] font-medium transition-colors',
                activeFilter === cat
                  ? 'bg-accent font-bold text-background'
                  : 'border border-border bg-surface text-text-secondary hover:text-text-primary',
              )}
            >
              {cat}
            </m.button>
          ))}
        </m.div>

        {/* Project grid */}
        <section className="grid grid-cols-1 gap-6 px-6 pb-25 md:grid-cols-2 lg:px-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <m.div
                key={project.title}
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                  'flex flex-col overflow-hidden rounded-[20px] bg-background',
                  project.highlighted
                    ? 'border border-accent-glow shadow-[0_4px_24px_var(--color-accent-muted)]'
                    : 'border border-border',
                )}
              >
                <div className="flex h-55 items-center justify-center bg-surface-alt">
                  <span className="text-[13px] font-medium text-text-placeholder">
                    [ Project Screenshot ]
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={cn(
                          'rounded-md px-2.5 py-1 text-[11px] font-semibold',
                          tag.category
                            ? 'bg-accent-dark text-accent'
                            : 'border border-border bg-surface text-text-secondary',
                        )}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-text-primary">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  )
}
