import { Clock } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import {
  BLOG_CATEGORIES,
  CATEGORY_COLORS,
  formatDate,
  type BlogCategory,
  type BlogPost,
} from '@/lib/blog-data'

interface BlogGridProps {
  posts: Array<BlogPost>
  activeFilter: BlogCategory
  onFilterChange: (category: BlogCategory) => void
}

export function BlogGrid({ posts, activeFilter, onFilterChange }: BlogGridProps) {
  const { inViewProps, variants, container, prefersReduced } =
    useAnimateOnce('blog-grid', 0.1)

  const filtered =
    activeFilter === 'All'
      ? posts
      : posts.filter((p) => p.category === activeFilter)

  return (
    <m.section
      variants={container(0.1)}
      {...inViewProps}
      className="bg-surface px-6 py-20 lg:px-20"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <m.h2
            variants={variants(fadeUp)}
            className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl"
          >
            Latest Posts
          </m.h2>

          <m.div variants={variants(fadeUp)} className="flex flex-wrap gap-2.5">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange(cat)}
                className={cn(
                  'rounded-lg px-5 py-2 text-[13px] font-medium transition-colors',
                  activeFilter === cat
                    ? 'bg-accent font-bold text-background'
                    : 'border border-border bg-background text-text-secondary hover:text-text-primary',
                )}
              >
                {cat}
              </button>
            ))}
          </m.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => {
              const colors = CATEGORY_COLORS[post.category]
              return (
                <m.article
                  key={post.id}
                  layout={!prefersReduced}
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-background"
                >
                  <div className="h-50 overflow-hidden bg-linear-to-br from-accent/10 to-indigo/10">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-xs font-medium tracking-wide text-text-muted">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3.5 p-7">
                    <span
                      className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold ${colors.bg} ${colors.text}`}
                    >
                      {post.category}
                    </span>

                    <h3 className="text-lg font-bold leading-snug tracking-tight text-text-primary">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="transition-colors group-hover:text-accent"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <time>{formatDate(post.createdAt)}</time>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </m.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </m.section>
  )
}
