import type { Metadata } from "next";
import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { WritingPageContent } from "@/components/writing/WritingPageContent";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts on AI, web development, and digital craft.",
};

export default function WritingPage() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return <WritingPageContent articles={articles} />;
}
