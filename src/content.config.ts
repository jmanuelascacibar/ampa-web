/*
  Content Collections Configuration (Astro v6).

  This file defines the schema for all content on the site.
  Astro validates every markdown file against these schemas at build time,
  so typos or missing fields get caught early — before they reach production.

  IMPORTANT: In Astro v6 this file MUST live at src/content.config.ts
  (not inside src/content/ — that was the old location).

  Each collection here corresponds to a collection in Decap CMS
  (configured in public/admin/config.yml). The field names must match
  exactly between this file and the CMS config.
*/

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* ------------------------------------------------------------------ */
/* Articles (Noticias) — blog posts and news updates                  */
/* ------------------------------------------------------------------ */
const articles = defineCollection({
  // The glob loader reads .md files from the articles folder
  // and derives each entry's id (slug) from the filename
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(), // Accepts "2025-06-20" strings → converts to Date
    featuredImage: z.string().optional(), // Cloudinary URL or local upload path
    tags: z.array(z.string()).default([]),
    excerpt: z.string(), // Short summary shown on listing cards
  }),
});

/* ------------------------------------------------------------------ */
/* Events (Actividades) — excursions, workshops, meetings, parties    */
/* ------------------------------------------------------------------ */
const events = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(), // e.g. "10:00", "17:30"
    location: z.string().optional(), // e.g. "Patio del colegio"
    featuredImage: z.string().optional(),
    status: z.enum(["upcoming", "past"]).default("upcoming"),
    description: z.string(), // Short summary shown on event cards
  }),
});

/* ------------------------------------------------------------------ */
/* Export all collections so Astro can use them                        */
/* ------------------------------------------------------------------ */
export const collections = { articles, events };
