import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { m } from 'framer-motion'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/blog/newsletter-section'
import { fadeUp, useAnimateOnce } from '@/lib/motion'
import { BLOG_POSTS, CATEGORY_COLORS, formatDate } from '@/lib/blog-data'

const SITE_URL = 'https://cgelo.dev'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params: { slug } }) => {
    const sortedPosts = BLOG_POSTS.filter((item) => item.published).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    const post = sortedPosts.find((item) => item.slug === slug)

    if (!post) {
      throw notFound()
    }

    return { post, sortedPosts }
  },
  head: ({ params, loaderData }) => {
    const fallbackPost = BLOG_POSTS.find(
      (item) => item.slug === params.slug && item.published,
    )
    const post = loaderData?.post ?? fallbackPost

    if (!post) {
      return {
        meta: [
          { title: 'Post not found | Gelo Blog' },
          { name: 'robots', content: 'noindex,follow' },
        ],
        links: [{ rel: 'canonical', href: `${SITE_URL}/blog/${params.slug}` }],
      }
    }

    const title = `${post.title} | Gelo Blog`
    const description = post.excerpt
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`
    const imageUrl =
      post.coverImage && post.coverImage.startsWith('http')
        ? post.coverImage
        : `${SITE_URL}${post.coverImage ?? '/og.png'}`

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:image', content: imageUrl },
        { property: 'article:published_time', content: post.createdAt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
      ],
      links: [{ rel: 'canonical', href: canonicalUrl }],
    }
  },
  notFoundComponent: BlogPostNotFound,
  component: BlogPostDetailPage,
})

function BlogPostNotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center lg:px-20">
        <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[1px] text-accent">
          // BLOG
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-6xl">
          Post not found.
        </h1>
        <p className="max-w-140 text-[17px] leading-relaxed text-text-secondary">
          The article you are looking for does not exist yet.
        </p>
        <Link
          to="/blog"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Back to Blog
        </Link>
      </main>
      <Footer />
    </div>
  )
}

function BlogPostDetailPage() {
  const { post, sortedPosts } = Route.useLoaderData()
  const { mountProps, variants } = useAnimateOnce(`blog-post-${post.slug}`)
  const article = post.article

  const relatedPosts = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 3)

  const currentIndex = sortedPosts.findIndex((item) => item.slug === post.slug)
  const prevPost =
    currentIndex >= 0
      ? sortedPosts[(currentIndex + 1) % sortedPosts.length]
      : undefined
  const nextPost =
    currentIndex >= 0
      ? sortedPosts[(currentIndex - 1 + sortedPosts.length) % sortedPosts.length]
      : undefined

  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <Nav />

      <main className="flex-1">
        <m.section
          variants={variants(fadeUp)}
          {...mountProps}
          className="flex flex-col bg-background"
        >
          <div className="relative h-120 w-full overflow-hidden">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/15 via-surface to-indigo/15">
                <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold tracking-[1px] text-text-secondary">
                  {post.category}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/45 to-background" />
          </div>

          <div className="px-6 py-12 lg:px-20">
            <div className="mx-auto flex max-w-180 flex-col items-center gap-6 text-center">
              <span className="rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold tracking-[1px] text-accent">
                {article.badgeLabel ?? post.category}
              </span>

              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-primary md:text-[42px] md:leading-[1.15]">
                {post.title}
              </h1>

              <p className="max-w-150 text-pretty text-[18px] leading-relaxed text-text-secondary">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary">
                <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-background">
                  G
                </div>
                <span className="font-semibold text-text-primary">Gelo</span>
                <span className="text-text-muted">&middot;</span>
                <time>{formatDate(post.createdAt)}</time>
                <span className="text-text-muted">&middot;</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-14 lg:px-20">
            <div className="mx-auto flex max-w-180 flex-col gap-8">
              <p className="text-[17px] leading-[1.75] text-text-secondary">
                {article.intro}
              </p>

              <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary">
                {article.problemHeading}
              </h2>
              <p className="text-[17px] leading-[1.75] text-text-secondary">
                {article.problem}
              </p>

              <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary">
                {article.architectureHeading}
              </h2>
              <p className="text-[17px] leading-[1.75] text-text-secondary">
                {article.architecture}
              </p>

              <div className="overflow-hidden rounded-lg border-l-[3px] border-accent bg-surface p-6">
                <p className="mb-3 text-[11px] font-semibold tracking-[1px] text-accent">
                  TYPESCRIPT
                </p>
                <pre className="overflow-x-auto text-sm leading-7 text-text-secondary">
                  <code>{article.code.join('\n')}</code>
                </pre>
              </div>

              <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary">
                {article.lessonsHeading}
              </h2>
              {article.lessons.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[17px] leading-[1.75] text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </m.section>

        <section className="border-y border-border px-6 py-10 lg:px-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
            {prevPost && (
              <Link
                to="/blog/$slug"
                params={{ slug: prevPost.slug }}
                className="group flex flex-col gap-2"
              >
                <span className="flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                  <ArrowLeft className="size-3.5" />
                  Previous Article
                </span>
                <span className="text-[17px] font-bold leading-snug text-text-primary transition-colors group-hover:text-accent">
                  {prevPost.title}
                </span>
              </Link>
            )}

            {nextPost && (
              <Link
                to="/blog/$slug"
                params={{ slug: nextPost.slug }}
                className="group flex flex-col items-start gap-2 md:items-end"
              >
                <span className="flex items-center gap-2 text-[13px] font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                  Next Article
                  <ArrowRight className="size-3.5" />
                </span>
                <span className="text-left text-[17px] font-bold leading-snug text-text-primary transition-colors group-hover:text-accent md:text-right">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </section>

        <section className="bg-surface px-6 py-18 lg:px-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary">
                You might also enjoy
              </h2>
              <Link
                to="/blog"
                className="flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-text-secondary"
              >
                View All Posts
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relatedColor = CATEGORY_COLORS[relatedPost.category]
                return (
                  <article
                    key={relatedPost.slug}
                    className="group overflow-hidden rounded-[20px] border border-border bg-background"
                  >
                    <Link to="/blog/$slug" params={{ slug: relatedPost.slug }}>
                      <div className="h-52 overflow-hidden bg-surface-alt">
                        {relatedPost.coverImage && (
                          <img
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-3.5 p-7">
                        <span
                          className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold ${relatedColor.bg} ${relatedColor.text}`}
                        >
                          {relatedPost.category}
                        </span>

                        <h3 className="text-lg font-bold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent">
                          {relatedPost.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-text-secondary">
                          {relatedPost.excerpt}
                        </p>

                        <div className="mt-1 flex items-center justify-between text-xs text-text-muted">
                          <time>{formatDate(relatedPost.createdAt)}</time>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  )
}
