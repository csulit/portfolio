import { useState } from 'react'
import { Briefcase, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex h-18 items-center justify-between px-6 lg:px-20">
        <a href="#" className="text-[22px] font-extrabold tracking-tight text-accent">
          gelo.dev
        </a>

        <div className="flex items-center gap-10">
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="https://www.fiverr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90 sm:flex"
          >
            <Briefcase className="size-4" />
            Hire Me on Fiverr
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-text-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-border px-6 pb-5 pt-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.fiverr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90 sm:hidden"
          >
            <Briefcase className="size-4" />
            Hire Me on Fiverr
          </a>
        </div>
      )}
    </nav>
  )
}
