import Link from "next/link";

import { type BlogPostMetadata } from "@/lib/validators/blog-post";
import getFormattedDate from "@/lib/get-formatted-date";

type Props = {
  post: BlogPostMetadata;
};

// Return a list item for a blog post with a link to the post.
// Each post will have a title and date.
export default function ListItem({ post }: Props) {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <li className="mt-4 text-2xl text-foreground">
      <Link
        className="underline hover:text-foreground/70"
        href={`/posts/${id}`}
      >
        {title}
      </Link>
      <br />
      <p className="mt-1 text-sm text-foreground/60">{formattedDate}</p>
    </li>
  );
}
