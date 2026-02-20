import { ExternalLink } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useMotionPreference } from '@/lib/motion'

interface Tag {
  label: string
  color: string
  bg: string
}

interface Project {
  title: string
  description: string
  tags: Array<Tag>
  linkLabel: string
  highlighted?: boolean
}

const projects: Array<Project> = [
  {
    title: 'InvoiceForge',
    description:
      'A SaaS invoicing platform for freelancers — with recurring billing, PDF generation, and client portal.',
    tags: [
      { label: 'SaaS', color: 'text-accent', bg: 'bg-accent-soft' },
      { label: 'React', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'PostgreSQL', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
    linkLabel: 'Live Demo',
  },
  {
    title: 'HabitFlow',
    description:
      'A cross-platform habit tracker app with streaks, analytics, and daily reminders — built with React Native and Expo.',
    tags: [
      { label: 'Mobile', color: 'text-indigo', bg: 'bg-indigo-soft' },
      { label: 'React Native', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
    linkLabel: 'App Store',
  },
  {
    title: 'DocuMind AI',
    description:
      'AI-powered document Q&A tool. Upload PDFs, chat with your documents using RAG and GPT-4 under the hood.',
    tags: [
      { label: 'AI / LLM', color: 'text-accent', bg: 'bg-accent-soft' },
      { label: 'TypeScript', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
    linkLabel: 'Live Demo',
    highlighted: true,
  },
]

export function Projects() {
  const { variants, container } = useMotionPreference()

  return (
    <m.section
      id="projects"
      variants={container(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col items-center gap-14 bg-surface px-6 py-25 lg:px-20"
    >
      <m.div
        variants={variants(fadeUp)}
        className="flex flex-col items-center gap-3"
      >
        <span className="w-fit rounded-md border border-border bg-background px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // PROJECTS
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          Things I&apos;ve shipped.
        </h2>
        <p className="text-base text-text-secondary">
          A selection of real-world projects built for real users.
        </p>
      </m.div>

      <m.div
        variants={container(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <m.div
            key={project.title}
            variants={variants(fadeUp)}
            className={cn(
              'flex flex-col overflow-hidden rounded-[20px] bg-background',
              project.highlighted
                ? 'border border-accent-glow shadow-[0_4px_24px_#5CCC8E20]'
                : 'border border-border',
            )}
          >
            <div className="flex h-50 items-center justify-center bg-surface-alt">
              <span className="text-[13px] font-medium text-text-placeholder">
                [ Project Screenshot ]
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn(
                      'rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold',
                      tag.color,
                      tag.bg,
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

              <div className="mt-auto flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-background transition-opacity hover:opacity-90"
                >
                  <ExternalLink className="size-3.5" />
                  {project.linkLabel}
                </button>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </m.section>
  )
}
