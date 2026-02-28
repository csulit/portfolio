import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { BlogHero } from '@/components/blog/blog-hero'
import { FeaturedPost } from '@/components/blog/featured-post'
import { BlogGrid } from '@/components/blog/blog-grid'
import { NewsletterSection } from '@/components/blog/newsletter-section'
import { BLOG_POSTS, type BlogCategory } from '@/lib/blog-data'

const SITE_URL = 'https://cgelo.dev'

export const Route = createFileRoute('/blog/')({
  loader: () => {
    const publishedPosts = BLOG_POSTS.filter((post) => post.published)
    const featuredPost = publishedPosts.find((post) => post.featured)
    const latestPosts = featuredPost
      ? publishedPosts.filter((post) => post.slug !== featuredPost.slug)
      : publishedPosts

    return { featuredPost, latestPosts }
  },
  head: () => ({
    meta: [
      { title: 'Blog | Gelo - Engineering, AI, and Career Notes' },
      {
        name: 'description',
        content:
          'Thoughts on AI engineering, software architecture, and career growth from real projects and production lessons.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Blog | Gelo' },
      {
        property: 'og:description',
        content:
          'Thoughts on AI engineering, software architecture, and career growth from real projects and production lessons.',
      },
      { property: 'og:url', content: `${SITE_URL}/blog` },
      { property: 'og:image', content: `${SITE_URL}/og.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Blog | Gelo' },
      {
        name: 'twitter:description',
        content:
          'Thoughts on AI engineering, software architecture, and career growth from real projects and production lessons.',
      },
      { name: 'twitter:image', content: `${SITE_URL}/og.png` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/blog` }],
  }),
  component: BlogPage,
})

function BlogPage() {
  const { featuredPost, latestPosts } = Route.useLoaderData()
  const [activeFilter, setActiveFilter] = useState<BlogCategory>('All')

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
