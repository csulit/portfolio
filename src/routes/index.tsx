import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { TechStack } from '@/components/tech-stack'
import { Services } from '@/components/services'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
