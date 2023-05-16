import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import { compileMDX } from "next-mdx-remote/rsc";

import Video from "@/components/video";
import CustomImage from "@/components/custom-image";
import { env } from "@/env.mjs";
import { type BlogPostMetadata, type BlogPost } from "./validators/blog-post";
import { type FileTree, fileTreeSchema } from "./validators/file-tree";

/**
 * This function will fetch a MDX file from our GitHub repo and compile it.
 */
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

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  /**
   * The compileMDX function returns an object with two properties:
   * - frontmatter: The frontmatter of the MDX file (if any)
   * - content: The compiled MDX content
   *
   * Additionally, we can pass in components and options to the compileMDX function.
   * Components include any JSX element that were included in the MDX file that we
   * defined in our app. For instance, any <Video /> component that we defined in our
   * MDX file will be passed into the compileMDX function as a component. We can then
   * pass in a component object to the compileMDX function that will be used to render
   * that <Video /> component.
   *
   */
  const { frontmatter, content } = await compileMDX<
    Omit<BlogPostMetadata, "id">
  >({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
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

    if (!res.ok) {
      return undefined;
    }

    // Parse the response into a FileTree object using the fileTreeSchema validator.
    const repoFileTree: FileTree = fileTreeSchema.parse(await res.json());

    // Only get the files that end with .mdx
    const filesArray = repoFileTree.tree
      .map((obj) => obj.path)
      .filter((path) => path.endsWith(".mdx"));

    const postsMetadata: BlogPostMetadata[] = [];

    // Get the metadata for each post concurrently.
    const posts = await Promise.all(
      // Each "file" will contain .mdx at the end of the string.
      filesArray.map((file) => getPostByName(file))
    );

    // Only push the metadata to the postsMetadata array if the post exists.
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
