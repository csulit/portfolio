import { Link } from '@tanstack/react-router'
import { MapPin, Github } from 'lucide-react'
import { m } from 'framer-motion'
import { fadeUp, fadeIn, scaleIn, useAnimateOnce } from '@/lib/motion'

export function Hero() {
  const { mountProps, variants, container } = useAnimateOnce('hero')

  return (
    <m.section
      variants={container(0.1, 0.15)}
      {...mountProps}
      className="flex w-full flex-col items-center gap-8 bg-background px-6 py-25 lg:px-20 lg:pb-30"
    >
      <m.div
        variants={variants(scaleIn)}
        className="flex items-center gap-2 rounded-full bg-accent-muted px-4 py-1.5"
      >
        <span className="size-2 rounded-full bg-accent" />
        <span className="text-[13px] font-medium text-accent">
          Available for freelance work
        </span>
      </m.div>

      <m.h1
        variants={variants(fadeUp)}
        className="text-center text-5xl font-extrabold tracking-tight text-text-primary md:text-7xl lg:text-[80px]"
      >
        Hi, I&apos;m Gelo.
      </m.h1>

      <m.p
        variants={variants(fadeUp)}
        className="text-center text-xl font-bold tracking-tight text-accent md:text-[28px]"
      >
        Senior Software Engineer &amp; AI Solutions Builder
      </m.p>

      <m.p
        variants={variants(fadeUp)}
        className="max-w-2xl text-center text-lg text-text-secondary"
      >
        I build full-stack web apps, mobile experiences, and AI-powered tools
        {'\n'}that ship fast and scale further.
      </m.p>

      <m.div
        variants={variants(fadeUp)}
        className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
      >
        <Link
          to="/"
          hash="contact"
          className="w-full rounded-[10px] bg-accent px-9 py-4 text-center text-base font-bold text-background shadow-[0_8px_32px_#5CCC8E50] transition-opacity hover:opacity-90 sm:w-auto"
        >
          Get in Touch
        </Link>
        <a
          href="#" // TODO: Add real GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-surface-alt px-9 py-4 text-center text-base font-bold text-text-primary transition-colors hover:border-text-secondary sm:w-auto"
        >
          <Github className="size-5" />
          View My GitHub
        </a>
      </m.div>

      <m.div
        variants={variants(fadeIn)}
        className="flex items-center gap-2"
      >
        <MapPin className="size-4 text-text-secondary" />
        <span className="text-sm text-text-secondary">
          Based in the Philippines
        </span>
      </m.div>
    </m.section>
  )
}
