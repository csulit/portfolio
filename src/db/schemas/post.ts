import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull().default(''),
  category: text('category').notNull().default('Engineering'),
  coverImage: text('cover_image'),
  readTime: integer('read_time').notNull().default(5),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  publishedAt: text('published_at'),
  updatedAt: text('updated_at'),
  metaDescription: text('meta_description'),
})
