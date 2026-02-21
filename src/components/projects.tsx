import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'

interface Tag {
  label: string
  color: string
  bg: string
}

interface Project {
  title: string
  description: string
  tags: Array<Tag>
  highlighted?: boolean
}

const projects: Array<Project> = [
  {
    title: 'AI Document Processing Pipeline',
    description:
      'Built an AI-powered document processing system using GPT-4o agents with automated extraction, classification, and structured output. Handles high-throughput workloads with queue-based orchestration.',
    tags: [
      { label: 'AI / LLM', color: 'text-accent', bg: 'bg-accent-soft' },
      { label: 'OpenAI', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'BullMQ', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'PostgreSQL', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
    highlighted: true,
  },
  {
    title: 'Full-Stack SaaS Platform',
    description:
      'Production SaaS application with auth, dashboards, and background job processing. Built end-to-end with a modern React framework, TypeScript, and a robust data layer.',
    tags: [
      { label: 'SaaS', color: 'text-accent', bg: 'bg-accent-soft' },
      { label: 'React', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'TypeScript', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'Prisma', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
  },
  {
    title: 'React Native Mobile App',
    description:
      'Cross-platform mobile application with smooth animations, offline support, and a polished UX — built with React Native and TypeScript.',
    tags: [
      { label: 'Mobile', color: 'text-indigo', bg: 'bg-indigo-soft' },
      { label: 'React Native', color: 'text-text-secondary', bg: 'bg-surface' },
      { label: 'TypeScript', color: 'text-text-secondary', bg: 'bg-surface' },
    ],
  },
]

export function Projects() {
  const { inViewProps, variants, container } = useAnimateOnce('projects-home', 0.2)

  return (
    <m.section
      id="projects"
      variants={container(0.12)}
      {...inViewProps}
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
        {...inViewProps}
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
            </div>
          </m.div>
        ))}
      </m.div>
    </m.section>
  )
}
