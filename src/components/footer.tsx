import { Github, Briefcase } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const workLinks = [
  { label: 'Fiverr Profile', href: 'https://www.fiverr.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Tech Stack', href: '#tech-stack' },
]

export function Footer() {
  return (
    <footer className="flex flex-col border-t border-border bg-background">
      <div className="flex flex-col gap-12 px-6 py-16 lg:flex-row lg:justify-between lg:gap-20 lg:px-20">
        <div className="flex flex-col gap-4 lg:w-80">
          <span className="text-2xl font-extrabold tracking-tight text-accent">
            gelo.dev
          </span>
          <p className="max-w-75 text-sm leading-relaxed text-text-secondary">
            Building the web, one pixel at a time. Senior Software Engineer
            &amp; AI Solutions Builder based in the Philippines.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-[10px] border border-border bg-surface text-text-secondary transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <Github className="size-4.5" />
            </a>
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-[10px] border border-border bg-surface text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Fiverr"
            >
              <Briefcase className="size-4.5" />
            </a>
          </div>
        </div>

        <div className="flex gap-16 lg:gap-20">
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-semibold text-text-primary">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-semibold text-text-primary">
              Work With Me
            </span>
            {workLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row lg:px-20">
        <span className="text-[13px] text-text-muted">
          &copy; 2026 Gelo. All rights reserved.
        </span>
        <span className="text-[13px] text-text-muted">
          Designed &amp; built with &hearts; from the Philippines
        </span>
      </div>
    </footer>
  )
}
