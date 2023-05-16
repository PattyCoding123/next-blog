import type { JSXElementConstructor, ReactElement } from "react";
import { z } from "zod";

export const BlogPostMetadatadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
});

export type BlogPostMetadata = z.infer<typeof BlogPostMetadatadataSchema>;

// ReactElement any is for the content of the blog post from MDX file.
export type BlogPost = {
  metadata: BlogPostMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
