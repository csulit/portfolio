import { Link } from '@tanstack/react-router'
import { Github, Briefcase } from 'lucide-react'
import { m } from 'framer-motion'
import { fadeIn, useAnimateOnce } from '@/lib/motion'

const navLinks = [
  { label: 'About', to: '/' as const, hash: 'about' },
  { label: 'Services', to: '/' as const, hash: 'services' },
  { label: 'Projects', to: '/projects' as const, hash: undefined },
  { label: 'Contact', to: '/' as const, hash: 'contact' },
]

export function Footer() {
  const { inViewProps, variants } = useAnimateOnce('footer', 0.2)

  return (
    <m.footer
      variants={variants(fadeIn)}
      {...inViewProps}
      className="flex flex-col border-t border-border bg-background"
    >
      <div className="flex flex-col gap-12 px-6 py-16 lg:flex-row lg:justify-between lg:gap-20 lg:px-20">
        <div className="flex flex-col gap-4 lg:w-80">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-accent">
            cgelo.dev
          </Link>
          <p className="max-w-75 text-sm leading-relaxed text-text-secondary">
            Building the web, one pixel at a time. Senior Software Engineer
            &amp; AI Solutions Builder based in the Philippines.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gelomacariomolo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-[10px] border border-border bg-surface text-text-secondary transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <Github className="size-4.5" />
            </a>
            <a
              href="#" // TODO: Add real Fiverr URL
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
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-semibold text-text-primary">
              Work With Me
            </span>
            <a
              href="#" // TODO: Add real Fiverr URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Fiverr Profile
            </a>
            <a
              href="https://github.com/gelomacariomolo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              GitHub
            </a>
            <Link
              to="/"
              hash="tech-stack"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Tech Stack
            </Link>
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
    </m.footer>
  )
}
