import type { Metadata } from "next";
import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { WritingPageContent } from "@/components/writing/WritingPageContent";

interface WritingPageProps {
  searchParams?: {
    tag?: string | string[];
  };
}

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts on AI, web development, and digital craft.",
};

function getFirstParam(param?: string | string[]) {
  return Array.isArray(param) ? param[0] : param;
}

export default function WritingPage({ searchParams }: WritingPageProps) {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <WritingPageContent
      articles={articles}
      initialTagFilter={getFirstParam(searchParams?.tag)}
    />
  );
}
