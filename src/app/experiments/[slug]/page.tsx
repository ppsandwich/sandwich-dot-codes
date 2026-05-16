import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allExperiments } from "contentlayer/generated";
import { ExperimentPageContent } from "@/components/projects/ExperimentPageContent";

interface ExperimentPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allExperiments.map((experiment) => ({
    slug: experiment.slug,
  }));
}

export function generateMetadata({ params }: ExperimentPageProps): Metadata {
  const experiment = allExperiments.find((e) => e.slug === params.slug);
  if (!experiment) return {};
  return {
    title: experiment.title,
    description: experiment.description,
    openGraph: {
      title: experiment.title,
      description: experiment.description,
      type: "article",
      publishedTime: experiment.date,
      tags: experiment.tags,
    },
  };
}

export default function ExperimentPage({ params }: ExperimentPageProps) {
  const experiment = allExperiments.find((e) => e.slug === params.slug);
  if (!experiment) notFound();

  return <ExperimentPageContent experiment={experiment} />;
}
