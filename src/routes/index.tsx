import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'

const About = lazy(() =>
  import('@/components/about').then((m) => ({ default: m.About })),
)
const TechStack = lazy(() =>
  import('@/components/tech-stack').then((m) => ({ default: m.TechStack })),
)
const Services = lazy(() =>
  import('@/components/services').then((m) => ({ default: m.Services })),
)
const Projects = lazy(() =>
  import('@/components/projects').then((m) => ({ default: m.Projects })),
)
const Contact = lazy(() =>
  import('@/components/contact').then((m) => ({ default: m.Contact })),
)
const Footer = lazy(() =>
  import('@/components/footer').then((m) => ({ default: m.Footer })),
)

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Suspense>
          <About />
          <TechStack />
          <Services />
          {/* TODO: Uncomment when real testimonials are available */}
          {/* <Testimonials /> */}
          <Projects />
          {/* TODO: Uncomment when blog posts are ready */}
          {/* <Insights /> */}
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )
}
