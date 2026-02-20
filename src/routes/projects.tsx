import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
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
  linkLabel: string
  category: string
  highlighted?: boolean
}

const categories = ['All', 'SaaS', 'Mobile', 'AI / ML', 'Open Source'] as const

const projects: Array<Project> = [
  {
    title: 'InvoiceForge',
    description:
      'A SaaS invoicing platform for freelancers — with recurring billing, PDF generation, and client portal.',
    tags: [
      { label: 'SaaS', category: true },
      { label: 'React' },
      { label: 'PostgreSQL' },
    ],
    linkLabel: 'Live Demo',
    category: 'SaaS',
  },
  {
    title: 'HabitFlow',
    description:
      'A cross-platform habit tracker with streaks, analytics, and daily reminders — built with React Native and Expo.',
    tags: [
      { label: 'Mobile', category: true },
      { label: 'React Native' },
      { label: 'Expo' },
    ],
    linkLabel: 'App Store',
    category: 'Mobile',
  },
  {
    title: 'DocuMind AI',
    description:
      'AI-powered document Q&A tool. Upload PDFs, chat with your documents using RAG and GPT-4 under the hood.',
    tags: [
      { label: 'AI / ML', category: true },
      { label: 'Python' },
      { label: 'GPT-4' },
    ],
    linkLabel: 'Live Demo',
    category: 'AI / ML',
    highlighted: true,
  },
  {
    title: 'OpenAPI Kit',
    description:
      'An open-source CLI toolkit for scaffolding REST APIs with auto-generated docs, validation, and auth boilerplate.',
    tags: [
      { label: 'Open Source', category: true },
      { label: 'TypeScript' },
      { label: 'Node.js' },
    ],
    linkLabel: 'npm',
    category: 'Open Source',
  },
  {
    title: 'LinkVault',
    description:
      'A smart bookmark manager with tagging, full-text search, and team workspaces — monetized via Stripe subscriptions.',
    tags: [
      { label: 'SaaS', category: true },
      { label: 'Next.js' },
      { label: 'Stripe' },
    ],
    linkLabel: 'Live Demo',
    category: 'SaaS',
  },
  {
    title: 'CaptionAI',
    description:
      'Auto-caption generator for videos and reels — powered by Whisper and a custom fine-tuned tone classifier.',
    tags: [
      { label: 'AI / ML', category: true },
      { label: 'FastAPI' },
      { label: 'React' },
    ],
    linkLabel: 'Live Demo',
    category: 'AI / ML',
  },
]

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col">
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-6 pt-20 pb-15 lg:px-20">
          <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[1px] text-accent">
            // ALL PROJECTS
          </span>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-text-primary md:text-[56px] md:leading-[1.1]">
            Things I&apos;ve shipped.
          </h1>
          <p className="max-w-[620px] text-center text-[17px] leading-relaxed text-text-secondary">
            A curated collection of real-world projects — from SaaS products to
            AI tools and mobile apps.
          </p>
        </section>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 px-6 pb-12 lg:px-20">
          {categories.map((cat) => (
            <button
              key={cat}
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
            </button>
          ))}
        </div>

        {/* Project grid */}
        <section className="grid grid-cols-1 gap-6 px-6 pb-25 md:grid-cols-2 lg:px-20">
          {filtered.map((project) => (
            <div
              key={project.title}
              className={cn(
                'flex flex-col overflow-hidden rounded-[20px] bg-background',
                project.highlighted
                  ? 'border border-accent-glow shadow-[0_4px_24px_var(--color-accent-muted)]'
                  : 'border border-border',
              )}
            >
              <div className="flex h-[220px] items-center justify-center bg-surface-alt">
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

                <div className="mt-auto flex items-center gap-3 pt-1">
                  <a
                    href="#"
                    className="rounded-lg bg-accent px-4.5 py-2 text-[13px] font-bold text-background transition-opacity hover:opacity-90"
                  >
                    {project.linkLabel}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
