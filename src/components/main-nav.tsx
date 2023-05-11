import Link from "next/link";

import { Icons } from "./icons";
import { siteConfig } from "@/config/site";

const items = [
  {
    href: "https://github.com/PattyCoding123",
    Icon: Icons.github,
  },
  {
    href: "https://www.linkedin.com/in/patrick-ducusin-879b25208/",
    Icon: Icons.linkedin,
  },
];

/**
 * The following is a navigation bar that is used in the root layout.
 * It should be responsive in design.
 * @returns {JSX.Element} The main navigation bar.
 */
export default function MainNavbar() {
  return (
    <nav className="container sticky top-0 flex items-center justify-between gap-6 border-b-2 py-2 md:gap-10">
      <Link href="/" className="flex items-center space-x-2 text-lg">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {items.map((item, index) => (
          <Link
            className="group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:text-indigo-600"
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* shrink-0 to prevent the icon from shrinking smaller than original size */}
            <span className="flex shrink-0 items-center justify-center text-lg font-medium text-foreground group-hover:text-indigo-600">
              <item.Icon className="h-8 w-8" />
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
