import Link from "next/link";
import { type Metadata } from "next";

import ListItem from "@/components/list-item";
import { getPostsMetadata } from "@/lib/posts-data-parser";
import { Icons } from "@/components/icons";

export const revalidate = 86400; // 24 hours

// Receive the tag from the params object. (dynamic route)
interface TagPageProps {
  params: {
    tag: string;
  };
}

// Allows us to generate static paths for each tag,
// helping us optimize our website by statically generating routes
// at build time instead of on-demand at request time.
export async function generateStaticParams() {
  const postsMetadata = await getPostsMetadata(); // * Deduped request.

  if (!postsMetadata) return []; // Incase there are no posts.

  const tags = new Set(postsMetadata.map((metadata) => metadata.tags).flat());
  return Array.from(tags).map((tag) => ({ tag }));
}

// Generate dynamic metadata for each tag.
export function generateMetadata({ params }: TagPageProps): Metadata {
  return {
    title: `Posts about ${params.tag}`,
  };
}

export default async function TagPage({ params: { tag } }: TagPageProps) {
  const postsMetadata = await getPostsMetadata(); // * Deduped request.

  if (!postsMetadata) {
    return <p className="mt-10 text-center">Sorry, no posts were fetched.</p>;
  }

  const tagPosts = postsMetadata.filter((metadata) =>
    metadata.tags.includes(tag)
  );

  if (!tagPosts.length) {
    return (
      <main className="mx-auto flex flex-col items-center px-6">
        <p className="mt-10">Sorry, no posts were found for this tag.</p>
        <Link className="mt-4 flex items-center justify-start" href="/">
          <Icons.arrowLeft />
          Go back to home page
        </Link>
      </main>
    );
  }

  return (
    <main className="prose prose-xl prose-slate mx-auto px-6 dark:prose-invert">
      <h2 className="mb-0 mt-12 text-3xl"> Results for: #{tag}</h2>
      <section className="mx-auto mt-6 max-w-2xl">
        <ul className="w-full list-none p-0">
          {tagPosts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
      <Link className="mt-16 flex items-center justify-start" href="/">
        <Icons.arrowLeft />
        Go back to home page
      </Link>
    </main>
  );
}
