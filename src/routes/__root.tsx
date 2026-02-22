import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { LazyMotion, domAnimation } from 'framer-motion'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Gelo | Senior Software Engineer & AI Solutions Builder',
      },
      {
        name: 'description',
        content:
          'Gelo — Senior Software Engineer & AI Solutions Builder. Full-stack web apps, React Native mobile apps, and AI/LLM-integrated SaaS products.',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large',
      },
      {
        name: 'theme-color',
        content: '#0B0F14',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://cgelo.dev',
      },
      {
        property: 'og:title',
        content: 'Gelo | Senior Software Engineer & AI Solutions Builder',
      },
      {
        property: 'og:description',
        content:
          'Full-stack web apps, React Native mobile apps, and AI/LLM-integrated SaaS products.',
      },
      {
        property: 'og:image',
        content: 'https://cgelo.dev/og.png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:alt',
        content:
          'Gelo — Senior Software Engineer & AI Solutions Builder',
      },
      {
        property: 'og:site_name',
        content: 'cgelo.dev',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Gelo | Senior Software Engineer & AI Solutions Builder',
      },
      {
        name: 'twitter:description',
        content:
          'Full-stack web apps, React Native mobile apps, and AI/LLM-integrated SaaS products.',
      },
      {
        name: 'twitter:image',
        content: 'https://cgelo.dev/og.png',
      },
      {
        name: 'twitter:image:alt',
        content:
          'Gelo — Senior Software Engineer & AI Solutions Builder',
      },
    ],
    links: [
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'canonical',
        href: 'https://cgelo.dev',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700;9..40,800&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700;9..40,800&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootComponent() {
  return <Outlet />
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[1px] text-accent">
          // 404
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-text-primary md:text-7xl">
          Page not found.
        </h1>
        <p className="max-w-md text-[17px] leading-relaxed text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
