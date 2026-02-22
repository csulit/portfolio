CREATE TABLE `newsletter_subscribers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `newsletter_subscribers_email_unique` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
ALTER TABLE `posts` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `excerpt` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `category` text DEFAULT 'Engineering' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `cover_image` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `read_time` integer DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `featured` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `published` integer DEFAULT false NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);