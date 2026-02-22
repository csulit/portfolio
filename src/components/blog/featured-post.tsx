import { ArrowRight, Sparkles, Clock } from 'lucide-react'
import { m } from 'framer-motion'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import {
  formatDate,
  CATEGORY_COLORS,
  type BlogPost,
} from '@/lib/blog-data'

export function FeaturedPost({ post }: { post: BlogPost }) {
  const { inViewProps, variants } = useAnimateOnce('blog-featured', 0.2)
  const colors = CATEGORY_COLORS[post.category === 'All' ? 'Engineering' : post.category]

  return (
    <m.section
      variants={variants(fadeUp)}
      {...inViewProps}
      className="px-6 pb-16 lg:px-20"
    >
      <div className="overflow-hidden rounded-3xl border border-accent-glow bg-surface shadow-[0_4px_24px_var(--color-accent-muted)]">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:flex lg:w-90 xl:w-120 shrink-0 items-center justify-center bg-linear-to-br from-accent/20 to-accent/5">
            <Sparkles className="size-16 text-accent opacity-40" />
          </div>

          <div className="flex flex-1 flex-col gap-5 p-8 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-accent-dark px-2.5 py-1 text-[11px] font-bold text-accent">
                Featured
              </span>
              <span
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${colors.bg} ${colors.text}`}
              >
                {post.category}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary md:text-3xl">
              {post.title}
            </h2>

            <p className="max-w-130 text-base leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-text-muted">
              <time>{formatDate(post.createdAt)}</time>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime} min read
              </span>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-bold text-background transition-opacity hover:opacity-90"
            >
              Read Article
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </m.section>
  )
}
