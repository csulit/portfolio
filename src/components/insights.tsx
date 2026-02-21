import { ArrowRight } from 'lucide-react'
import { m } from 'framer-motion'
import { fadeUp, useAnimateOnce } from '@/lib/motion'

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
}

// TODO: Replace with real blog posts or connect to a CMS
const posts: Array<Post> = [
  {
    id: 'post-1',
    title: 'TODO: Add blog post title',
    excerpt:
      'TODO: Add a short excerpt or summary of the blog post here.',
    date: '2026-02-01',
  },
  {
    id: 'post-2',
    title: 'TODO: Add blog post title',
    excerpt:
      'TODO: Add a short excerpt or summary of the blog post here.',
    date: '2026-01-15',
  },
  {
    id: 'post-3',
    title: 'TODO: Add blog post title',
    excerpt:
      'TODO: Add a short excerpt or summary of the blog post here.',
    date: '2025-12-20',
  },
]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function Insights() {
  const { inViewProps, variants, container } = useAnimateOnce('insights', 0.2)

  return (
    <m.section
      id="insights"
      variants={container(0.12)}
      {...inViewProps}
      className="flex flex-col items-center gap-14 px-6 py-25 lg:px-20"
    >
      <m.div
        variants={variants(fadeUp)}
        className="flex flex-col items-center gap-3"
      >
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // INSIGHTS
        </span>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary md:text-[40px]">
          Writing &amp; thoughts.
        </h2>
        <p className="text-base text-text-secondary">
          Occasional notes on engineering, AI, and building products.
        </p>
      </m.div>

      <m.div
        variants={container(0.12)}
        {...inViewProps}
        className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
      >
        {posts.map((post) => (
          <m.article
            key={post.id}
            variants={variants(fadeUp)}
            className="group flex flex-col gap-4 rounded-[20px] border border-border bg-surface p-7 transition-colors hover:border-text-muted"
          >
            <time className="text-xs font-medium text-text-muted">
              {formatDate(post.date)}
            </time>

            <h3 className="text-lg font-bold leading-snug tracking-tight text-text-primary">
              {post.title}
            </h3>

            <p className="flex-1 text-sm leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>

            {/* TODO: Add real blog post link */}
            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
              Read more
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </m.article>
        ))}
      </m.div>
    </m.section>
  )
}
