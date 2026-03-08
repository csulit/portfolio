import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { projects, CATEGORIES } from '@/lib/project-data'

export const Route = createFileRoute('/projects')({ component: ProjectsPage })

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
          {CATEGORIES.map((cat) => (
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
                <div className={cn('flex h-55 flex-col items-center justify-center gap-3 bg-linear-to-br', project.gradient)}>
                  <project.icon className={cn('size-10 opacity-60', project.iconColor)} />
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('flex items-center gap-1.5 text-xs font-medium tracking-wide transition-opacity hover:opacity-80', project.iconColor)}
                    >
                      View Live <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium tracking-wide text-text-muted">Coming Soon</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3.5 p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={cn(
                          'rounded-md px-2.5 py-1 text-[11px] font-semibold',
                          tag.primary
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
