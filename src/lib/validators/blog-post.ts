import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
