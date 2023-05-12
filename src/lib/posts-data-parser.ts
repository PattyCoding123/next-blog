import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { blogPostSchema } from "@/lib/validators/blog-post";
import { ZodError } from "zod";

// Since we use src directory as root, we need to specify it in the args.
const postsDirectory = path.join(process.cwd(), "/src/blogposts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    try {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      const blogPost = blogPostSchema.parse({
        id,
        ...matterResult.data,
      });
      return blogPost;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(`Error parsing blog post: ${e.message}`);
      }
      throw new Error("Something went getting data");
    }
  });

  // Sort posts by date, where the most recent date is first
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
