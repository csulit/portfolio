import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { BlogHero } from '@/components/blog/blog-hero'
import { FeaturedPost } from '@/components/blog/featured-post'
import { BlogGrid } from '@/components/blog/blog-grid'
import { NewsletterSection } from '@/components/blog/newsletter-section'
import { BLOG_POSTS, type BlogCategory } from '@/lib/blog-data'

export const Route = createFileRoute('/blog')({ component: BlogPage })

function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>('All')

  const featuredPost = BLOG_POSTS.find((p) => p.featured)
  const latestPosts = BLOG_POSTS.filter((p) => !p.featured)

  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />
      <main className="flex-1">
        <BlogHero />
        {featuredPost && <FeaturedPost post={featuredPost} />}
        <BlogGrid
          posts={latestPosts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
