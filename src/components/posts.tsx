import { getSortedPostsData } from "@/lib/posts-data-parser";
import ListItem from "./list-item";

export default function Posts() {
  // Since the dir is in the root of the project, we don't need to pass any args
  const posts = getSortedPostsData();

  return (
    <section className="mx-auto mt-6 max-w-2xl">
      <h2 className="text-4xl font-bold text-foreground">Blog</h2>
      <ul className="w-full">
        {posts.map((post) => (
          <ListItem post={post} key={post.id} />
        ))}
      </ul>
    </section>
  );
}
