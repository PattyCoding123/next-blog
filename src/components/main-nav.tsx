import Link from "next/link";

import { Icons } from "./icons";
import { siteConfig } from "@/config/site";

const items = [
  {
    site: "github",
    href: "https://github.com/PattyCoding123",
    Icon: Icons.github,
  },
  {
    site: "linkedin",
    href: "https://www.linkedin.com/in/patrick-ducusin-879b25208/",
    Icon: Icons.linkedin,
  },
];

// The function should return a valid JSX Element represnting
// the main navigation bar of the website. It is a RSC.
export default function MainNavbar() {
  return (
    <nav className="container sticky top-0 z-10 flex items-center justify-between gap-6 border-b-2 bg-background py-2 md:gap-10">
      <Link
        href="/"
        className="flex items-center space-x-2 text-xl text-foreground"
      >
        <Icons.logo className="h-8 w-8" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {items.map((item, index) => (
          <Link
            className="group flex gap-3 rounded-full p-2 text-sm font-semibold leading-6
             text-gray-700 hover:bg-gray-50 dark:hover:bg-none"
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* shrink-0 to prevent the icon from shrinking smaller than original size */}
            <span className="flex shrink-0 border-spacing-1 items-center justify-center text-lg font-medium text-foreground group-hover:text-indigo-600 dark:hover:text-black">
              <span className="sr-only">{item.site}</span>
              <item.Icon className="h-8 w-8" />
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
