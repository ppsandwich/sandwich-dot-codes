import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSkills } from "contentlayer/generated";
import { SkillPageContent } from "@/components/skills/SkillPageContent";

interface SkillPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allSkills.map((skill) => ({
    slug: skill.slug,
  }));
}

export function generateMetadata({ params }: SkillPageProps): Metadata {
  const skill = allSkills.find((s) => s.slug === params.slug);
  if (!skill) return {};
  return {
    title: skill.title,
    description: skill.purpose,
    openGraph: {
      title: skill.title,
      description: skill.purpose,
      type: "article",
      publishedTime: skill.date,
      tags: skill.tags,
    },
  };
}

export default function SkillPage({ params }: SkillPageProps) {
  const skill = allSkills.find((s) => s.slug === params.slug);
  if (!skill) notFound();

  return <SkillPageContent skill={skill} />;
}
