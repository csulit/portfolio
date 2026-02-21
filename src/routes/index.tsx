import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { TechStack } from '@/components/tech-stack'
import { Services } from '@/components/services'
// import { Testimonials } from '@/components/testimonials'
import { Projects } from '@/components/projects'
// import { Insights } from '@/components/insights'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Services />
        {/* TODO: Uncomment when real testimonials are available */}
        {/* <Testimonials /> */}
        <Projects />
        {/* TODO: Uncomment when blog posts are ready */}
        {/* <Insights /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
