/*
  Content Collections Configuration (Astro v6).

  This file defines the schema for all content on the site.
  Astro validates every markdown file against these schemas at build time,
  so typos or missing fields get caught early — before they reach production.

  IMPORTANT: In Astro v6 this file MUST live at src/content.config.ts
  (not inside src/content/ — that was the old location).
*/

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* Articles (Noticias) — blog posts and news updates */
const articles = defineCollection({
  // The glob loader reads .md files from the articles folder
  // and derives each entry's id (slug) from the filename
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(), // Accepts "2025-06-20" strings → converts to Date
    featuredImage: z.string(), // External URL (Cloudinary, picsum, etc.)
    tags: z.array(z.string()),
    excerpt: z.string(), // Short summary shown on listing cards
  }),
});

export const collections = { articles };
