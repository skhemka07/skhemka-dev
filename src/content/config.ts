import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    phase: z.number(),
    lesson: z.string(), // e.g. "1.1"
    curriculum: z.string(), // e.g. "infra"
    track: z.string(), // e.g. "gcp"
    description: z.string(),
    analogy: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { lessons };
