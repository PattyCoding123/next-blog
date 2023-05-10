import { type Icon } from "@/components/icons";

export type SiteConfig = {
  title: string;
  description: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon?: Icon;
};
