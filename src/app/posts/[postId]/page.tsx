import Link from "next/link";
import { notFound } from "next/navigation";

import getFormattedDate from "@/lib/get-formatted-date";
import { Icons } from "@/components/icons";
import { getPostData, getSortedPostsData } from "@/lib/posts-data-parser";

// Because this page is dynamic, we will have access to a params object.
// This object will contain the postId.
interface PostPageProps {
  params: {
    postId: string;
  };
}

// Generate dynamic metadata for each post.
export function generateMetadata({ params }: PostPageProps) {
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
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) {
    notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);

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
