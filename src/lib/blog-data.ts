export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: BlogCategory
  coverImage?: string
  readTime: number
  featured: boolean
  published: boolean
  createdAt: string
}

export const BLOG_CATEGORIES = ['All', 'AI', 'Engineering', 'Career'] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const CATEGORY_COLORS: Record<
  Exclude<BlogCategory, 'All'>,
  { bg: string; text: string }
> = {
  Engineering: { bg: 'bg-indigo-soft', text: 'text-indigo' },
  AI: { bg: 'bg-accent-soft', text: 'text-accent' },
  Career: { bg: 'bg-amber-soft', text: 'text-amber' },
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const BLOG_POSTS: Array<BlogPost> = [
  {
    id: 'post-1',
    title: 'Building AI-Powered Document Processing Pipelines',
    slug: 'building-ai-powered-document-processing-pipelines',
    excerpt:
      'A deep dive into architecting scalable document processing systems using GPT-4o agents, BullMQ queues, and structured output — lessons learned from production.',
    category: 'AI',
    readTime: 8,
    featured: true,
    published: true,
    createdAt: '2026-02-15',
  },
  {
    id: 'post-2',
    title: 'From Next.js to TanStack Start: A Migration Story',
    slug: 'from-nextjs-to-tanstack-start',
    excerpt:
      'Why I moved my production apps from Next.js to TanStack Start, the trade-offs involved, and what I gained in developer experience and performance.',
    category: 'Engineering',
    readTime: 6,
    featured: false,
    published: true,
    createdAt: '2026-01-28',
  },
  {
    id: 'post-3',
    title: 'Lessons from 5 Years of Remote Engineering',
    slug: 'lessons-from-5-years-of-remote-engineering',
    excerpt:
      'Practical advice on staying productive, building trust with distributed teams, and growing your career as a remote software engineer.',
    category: 'Career',
    readTime: 5,
    featured: false,
    published: true,
    createdAt: '2026-01-10',
  },
]
