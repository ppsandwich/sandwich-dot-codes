import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allArticles } from "contentlayer/generated";
import { ArticlePageContent } from "@/components/writing/ArticlePageContent";

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return <ArticlePageContent article={article} />;
}
