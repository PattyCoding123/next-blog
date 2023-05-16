import { z } from "zod";

export const blogPostMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  tags: z.string(),
});

export type BlogPostMeta = z.infer<typeof blogPostMetadataSchema>;

export const blogPostSchema = z.object({
  metadata: blogPostMetadataSchema,
  content: z.string(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
