import { ExternalLink } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import { projects } from '@/lib/project-data'

/** Map project iconColor to the primary tag background class */
const PRIMARY_TAG_BG: Record<string, string> = {
  'text-accent': 'bg-accent-soft',
  'text-sky': 'bg-sky-soft',
  'text-indigo': 'bg-indigo-soft',
  'text-amber': 'bg-amber-soft',
}

/** Home page shows the first 3 projects */
const featuredProjects = projects.slice(0, 3)

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
        {featuredProjects.map((project) => (
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
            <div className={cn('flex h-50 flex-col items-center justify-center gap-3 bg-linear-to-br', project.gradient)}>
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

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn(
                      'rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold',
                      tag.primary
                        ? cn(project.iconColor, PRIMARY_TAG_BG[project.iconColor])
                        : 'text-text-secondary bg-surface',
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
