import { getPostsMetadata } from "@/lib/posts-data-parser";
import ListItem from "./list-item";

export default async function Posts() {
  const postsMetadata = await getPostsMetadata(); // Generally first request.

  if (!postsMetadata) {
    return (
      <p className="mt-10 text-center text-foreground">
        There are currently no posts.
      </p>
    );
  }
  return (
    <section className="mx-auto mt-6 max-w-2xl">
      <h2 className="text-4xl font-bold text-foreground">Blog</h2>
      <ul className="w-full list-none">
        {postsMetadata.map((post) => (
          <ListItem post={post} key={post.id} />
        ))}
      </ul>
    </section>
  );
}
