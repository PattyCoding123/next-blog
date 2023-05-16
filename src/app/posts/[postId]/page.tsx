import Link from "next/link";
import { notFound } from "next/navigation";

import getFormattedDate from "@/lib/get-formatted-date";
import { Icons } from "@/components/icons";
import { getPostsMeta, getPostByName } from "@/lib/posts-data-parser";
import { type Metadata } from "next";

// Allows us to generate static paths for each post,
// helping us optimize our website by statically generating routes
// at build time instead of on-demand at request time.
export async function generateStaticParams() {
  const posts = await getPostsMeta(); // Deduped request.

  if (!posts) return []; // Incase there are no posts.

  return posts.map((post) => ({
    params: {
      postId: post.id,
    },
  }));
}

// Because this page is dynamic, we will have access to a params object.
// This object will contain the postId.
interface PostPageProps {
  params: {
    postId: string;
  };
}

// Generate dynamic metadata for each post.
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postId } = params;
  const post = await getPostByName(`${postId}.mdx`); // Deduped request.

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.metadata.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = params; // From params object.
  const post = await getPostByName(`${postId}.mdx`); // Deduped request.

  if (!post) {
    notFound(); // Redirect user to 404 page.
  }

  // Get specific data for this post
  const { metadata, content } = post;

  // Format publish date for post.
  const formattedDate = getFormattedDate(metadata.date);

  return (
    <main className="prose prose-xl prose-slate mx-auto px-6 dark:prose-invert">
      <h2 className="mb-0 mt-4 text-3xl">{metadata.title}</h2>
      <p className="mt-0 text-sm">{formattedDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex gap-4">{metadata.tags}</div>
      </section>
      <p>
        <Link className="flex items-center justify-start" href="/">
          <Icons.arrowLeft />
          Go back to home page
        </Link>
      </p>
    </main>
  );
}
