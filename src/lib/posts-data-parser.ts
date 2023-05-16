import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";

import { type BlogPostMetadata, type BlogPost } from "./validators/blog-post";
import { type FileTree, fileTreeSchema } from "./validators/file-tree";
import { env } from "@/env.mjs";

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    "https://raw.githubusercontent.com/PattyCoding123/blog-posts/main/" +
      fileName,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Autorization: `Bearer ${env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // ! Add Error Handling Later
  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  // ! Add Error Handling Later
  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<
    Omit<BlogPostMetadata, "id">
  >({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    metadata: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  return blogPostObj;
}

// Request GITHUB blog meta data from our blog posts repo.
export async function getPostsMetadata(): Promise<
  BlogPostMetadata[] | undefined
> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/PattyCoding123/blog-posts/git/trees/main?recursive=1",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // ! Add Error Handling Later
    if (!res.ok) {
      return undefined;
    }

    const repoFileTree: FileTree = fileTreeSchema.parse(await res.json());

    const filesArray = repoFileTree.tree
      .map((obj) => obj.path)
      .filter((path) => path.endsWith(".mdx"));

    const postsMetadata: BlogPostMetadata[] = [];

    const posts = await Promise.all(
      filesArray.map((file) => getPostByName(file))
    );

    for (const post of posts) {
      if (post) {
        postsMetadata.push(post.metadata);
      }
    }

    return postsMetadata;
  } catch (e) {
    new Response("Error fetching posts meta data", { status: 500 });
  }
}
