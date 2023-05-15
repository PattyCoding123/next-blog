import Link from "next/link";
import { notFound } from "next/navigation";

import getFormattedDate from "@/lib/get-formatted-date";
import { Icons } from "@/components/icons";
import { getPostData, getSortedPostsData } from "@/lib/posts-data-parser";
import { type Metadata } from "next";

// Allows us to generate static paths for each post,
// helping us optimize our website by statically generating routes
// at build time instead of on-demand at request time.
export function generateStaticParams() {
  const posts = getSortedPostsData(); // Deduped request.
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
export function generateMetadata({ params }: PostPageProps): Metadata {
  const posts = getSortedPostsData(); // Deduped request.
  const { postId } = params;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post not found",
    };
  }
  return {
    title: post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const posts = getSortedPostsData(); // Deduped request.
  const { postId } = params; // From params object.

  if (!posts.find((post) => post.id === postId)) {
    notFound(); // Redirect user to 404 page.
  }

  // Get specific data for this post. Must be awaited due to remark.
  const { title, date, contentHtml } = await getPostData(postId);

  // Format publish date for post.
  const formattedDate = getFormattedDate(date);

  return (
    <main className="prose prose-xl prose-slate mx-auto px-6 dark:prose-invert">
      <h1 className="mb-0 mt-4 text-3xl">{title}</h1>
      <p className="mt-0">{formattedDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link className="flex items-center justify-start" href="/">
            <Icons.arrowLeft />
            Go back to home page
          </Link>
        </p>
      </article>
    </main>
  );
}
