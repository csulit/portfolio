import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { posts } from './post'
import { tags } from './tag'

export const postTags = sqliteTable(
  'post_tags',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
  ],
)
