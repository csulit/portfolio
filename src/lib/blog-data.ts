export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: BlogPostCategory
  coverImage?: string
  readTime: number
  featured: boolean
  published: boolean
  createdAt: string
  article: BlogArticle
}

export interface BlogArticle {
  badgeLabel?: string
  subtitle: string
  intro: string
  problemHeading: string
  problem: string
  architectureHeading: string
  architecture: string
  lessonsHeading: string
  lessons: string[]
  code: string[]
}

export const BLOG_CATEGORIES = ['All', 'AI', 'Engineering', 'Career'] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
export type BlogPostCategory = Exclude<BlogCategory, 'All'>

export const CATEGORY_COLORS: Record<BlogPostCategory, { bg: string; text: string }> = {
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
    title: 'How I built an AI-powered code reviewer that actually saves time',
    slug: 'how-i-built-an-ai-powered-code-reviewer-that-actually-saves-time',
    excerpt:
      'Building AI tools that fit into real developer workflows - not just demos. Here is what I learned shipping a GPT-4 powered PR reviewer to 200+ users.',
    category: 'AI',
    coverImage: '/images/blog-post-ai-reviewer.png',
    readTime: 8,
    featured: true,
    published: true,
    createdAt: '2026-02-14',
    article: {
      badgeLabel: 'AI & Engineering',
      subtitle:
        'Building AI tools that fit into real developer workflows, not just demos. Here is what I learned shipping a GPT-4 powered PR reviewer to 200+ users.',
      intro:
        "Code review had become the bottleneck on every team I touched. The issue was never ownership. It was context switching fatigue. By the time you reached the third pull request of the day, your quality bar dropped because your attention was already spent.",
      problemHeading: 'The Problem with Existing Code Review Tools',
      problem:
        'Most tools either stop at syntax checks or generate generic AI comments. Neither one helps with team-specific architecture decisions. We needed a reviewer that understood project conventions, surfaced risky changes quickly, and stayed quiet when the diff was straightforward.',
      architectureHeading: 'Architecture & Technical Approach',
      architecture:
        'The app runs as a GitHub App webhook pipeline. For each PR event, it fetches the diff, retrieves related files, and builds a prompt chain with repository context. We then score suggestions by confidence and only publish findings that cross a threshold to reduce noise for maintainers.',
      lessonsHeading: 'What I Learned Along the Way',
      lessons: [
        'The highest value feedback is structural, not syntactic. Suggestions about decomposition and naming conventions were consistently rated as useful.',
        'Feedback loops beat model upgrades. Adding lightweight thumbs-up and thumbs-down signals improved precision faster than prompt tweaks alone.',
        'Adoption depends on trust. Showing fewer but more accurate comments made teams keep the integration enabled across repositories.',
      ],
      code: [
        'async function reviewPullRequest(pr: PullRequest) {',
        '  const diff = await github.getDiff(pr.id);',
        '  const context = await retriever.getRelevantFiles(diff);',
        '  const prompt = buildPromptChain(diff, context);',
        '',
        '  const review = await gpt4.complete(prompt);',
        '  return filterHighConfidence(review.suggestions);',
        '}',
      ],
    },
  },
  {
    id: 'post-2',
    title: 'TypeScript patterns I wish I knew 2 years ago',
    slug: 'typescript-patterns-i-wish-i-knew-2-years-ago',
    excerpt:
      'Generics, discriminated unions, template literals - the patterns that changed how I write TypeScript.',
    category: 'Engineering',
    coverImage:
      'https://images.unsplash.com/photo-1753998941540-081eed4f6397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE3NDc1MzN8&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: 5,
    featured: false,
    published: true,
    createdAt: '2026-01-30',
    article: {
      subtitle:
        'Generics, discriminated unions, and template literal types changed how I model APIs and UI state in production TypeScript codebases.',
      intro:
        'I spent years writing TypeScript that was technically typed but still easy to misuse. The turning point came when I started designing types around constraints first, then implementation details second.',
      problemHeading: 'Where Most TypeScript Code Starts to Hurt',
      problem:
        'Many codebases rely on loose object shapes and manual runtime branching. That leaves room for invalid states and hidden coupling. The real cost is not compile errors, it is confidence loss when refactoring under deadlines.',
      architectureHeading: 'Patterns That Scale in Real Projects',
      architecture:
        'Use discriminated unions for UI states, constrain public helpers with generic bounds, and encode naming conventions with template literal types. These patterns shift validation left and make invalid states impossible at compile time.',
      lessonsHeading: 'Key Takeaways',
      lessons: [
        'Type safety is most valuable at boundaries: API clients, forms, and domain mappers.',
        'Small utility types pay off when they describe intent, not cleverness.',
        'If a type needs a long comment, it usually needs a simpler shape.',
      ],
      code: [
        'type RequestState<T> =',
        "  | { status: 'idle' }",
        "  | { status: 'loading' }",
        "  | { status: 'success'; data: T }",
        "  | { status: 'error'; message: string }",
      ],
    },
  },
  {
    id: 'post-3',
    title: 'RAG pipelines in production: what actually works',
    slug: 'rag-pipelines-in-production-what-actually-works',
    excerpt:
      "After shipping 3 RAG-based products, here's the architecture that actually holds up under real user load.",
    category: 'AI',
    coverImage:
      'https://images.unsplash.com/photo-1767478913474-c39ca36c3bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE3NDc1NDV8&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: 10,
    featured: false,
    published: true,
    createdAt: '2026-01-10',
    article: {
      subtitle:
        'After shipping three RAG products, these are the retrieval and evaluation decisions that kept relevance high as data volume and traffic grew.',
      intro:
        'The first version of a RAG pipeline usually looks great in demos. The cracks show in production when documents drift, embeddings age, and response quality changes week to week without obvious causes.',
      problemHeading: 'Why RAG Breaks After Launch',
      problem:
        'Teams over-index on model choice and under-invest in retrieval quality instrumentation. Without chunk quality checks, query classification, and relevance metrics, degradation can go unnoticed until users report wrong answers.',
      architectureHeading: 'What Held Up in Production',
      architecture:
        'We used hybrid retrieval, reranking, and strict prompt templates for citation output. More importantly, we tracked retrieval recall and answer grounding in CI-like evaluation jobs so regressions were caught before each release.',
      lessonsHeading: 'What Actually Worked',
      lessons: [
        'Evaluation pipelines are product features, not internal nice-to-haves.',
        'Chunking strategy should be domain-specific and revisited as content changes.',
        'Latency budgets force better architecture decisions than benchmark leaderboards.',
      ],
      code: [
        'const candidates = await hybridRetrieve(query);',
        'const ranked = await rerank(query, candidates);',
        'const context = ranked.slice(0, 6);',
        'return answerWithCitations(query, context);',
      ],
    },
  },
  {
    id: 'post-4',
    title: 'From employee to freelancer: my first 12 months',
    slug: 'from-employee-to-freelancer-my-first-12-months',
    excerpt:
      'Revenue, mistakes, lessons learned - an honest breakdown of going independent as a senior software engineer.',
    category: 'Career',
    coverImage:
      'https://images.unsplash.com/photo-1587614227447-2697e25730a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE3NDc1NTd8&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: 7,
    featured: false,
    published: true,
    createdAt: '2025-12-22',
    article: {
      subtitle:
        'An honest look at cash flow, sales mistakes, and system changes that helped me move from burnout cycles to predictable freelance delivery.',
      intro:
        'Leaving full-time work felt exciting for about two weeks. After that, every missed scope boundary and every slow invoice showed up as stress. Year one taught me that freelancing is mostly operational discipline.',
      problemHeading: 'What Was Harder Than Expected',
      problem:
        'My biggest mistakes were not technical. They were packaging, positioning, and project control. I wrote custom proposals too often, underpriced discovery, and accepted vague success criteria that increased revision loops.',
      architectureHeading: 'Operating System for Solo Work',
      architecture:
        'I moved to standardized engagements with fixed discovery, explicit delivery milestones, and written acceptance criteria. That reduced scope drift and made scheduling realistic without sacrificing quality.',
      lessonsHeading: 'Year-One Lessons',
      lessons: [
        'The sales process should disqualify poor-fit projects early.',
        'Boundaries protect delivery quality as much as they protect your calendar.',
        'Retainers become viable only after you can repeat outcomes reliably.',
      ],
      code: [
        'const engagement = {',
        "  discoveryDays: 5,",
        "  milestones: ['plan', 'build', 'handoff'],",
        "  successCriteria: ['latency', 'conversion', 'maintainability'],",
        '}',
      ],
    },
  },
]
