import type { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Sandwich Codes",
  author: "Dylan Gibbs",
  description: "AI project portfolio and editorial website showcasing music, AI agent instructions, and GitHub-hosted applications.",
  url: "https://sandwich.codes",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/ppsandwich",
    twitter: undefined,
  },
};

export const navItems: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Music", href: "/music" },
  { label: "Photos", href: "/photos" },
  { label: "Skills", href: "/skills" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
