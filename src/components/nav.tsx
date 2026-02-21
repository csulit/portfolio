import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { navSlide, snappyTransition, useAnimateOnce } from '@/lib/motion'

const navLinks = [
  { label: 'About', to: '/' as const, hash: 'about' },
  { label: 'Services', to: '/' as const, hash: 'services' },
  { label: 'Projects', to: '/projects' as const, hash: undefined },
  { label: 'Contact', to: '/' as const, hash: 'contact' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { mountProps, variants, prefersReduced } = useAnimateOnce('nav')

  return (
    <m.nav
      variants={variants(navSlide)}
      {...mountProps}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
    >
      <div className="flex h-18 items-center justify-between px-6 lg:px-20">
        <Link to="/" className="text-[22px] font-extrabold tracking-tight text-accent">
          cgelo.dev
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

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

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={snappyTransition}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-5 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  )
}
