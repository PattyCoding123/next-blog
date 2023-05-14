import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { type BlogPost, blogPostSchema } from "@/lib/validators/blog-post";
import { ZodError } from "zod";

// Since we use src directory as root, we need to specify it in the args.
const postsDirectory = path.join(process.cwd(), "/src/blogposts");

export function getSortedPostsData() {
  // Get file names under /posts
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
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
    });

    // Sort posts by date, where the most recent date is first
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(`Error parsing blog post: ${e.message}`);
    }
    throw new Error("Something went getting data");
  }
}

// Asynchronous function to get the data of a single post
// given its id.
export async function getPostData(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string.
    // We need to await the result of remark() because it is async.
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    const blogPost = blogPostSchema.parse({
      id,
      ...matterResult.data,
    });

    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
      ...blogPost,
      contentHtml,
    };

    // Combine the data with the id
    return blogPostWithHTML;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(`Error parsing blog post: ${e.message}`);
    }
    throw new Error("Something went getting data");
  }
}
