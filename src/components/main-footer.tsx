import Link from "next/link";
import { Icons } from "./icons";

export default function MainFooter() {
  return (
    <footer className="mx-auto py-12 text-center text-foreground">
      <Link
        href="https://github.com/PattyCoding123/next-blog"
        target="_blank"
        className="flex items-center hover:text-foreground/70 hover:underline"
      >
        <Icons.github className="mr-2 h-6 w-6" />
        Source code
      </Link>
    </footer>
  );
}
