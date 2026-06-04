import type { Metadata } from "next";
import { allSkills } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { SkillsPageContent } from "@/components/skills/SkillsPageContent";

interface SkillsPageProps {
  searchParams?: {
    tag?: string | string[];
  };
}

export const metadata: Metadata = {
  title: "Skills",
  description: "Specialized skillsets, technical tools, and design playbooks developed while building software experiments.",
};

function getFirstParam(param?: string | string[]) {
  return Array.isArray(param) ? param[0] : param;
}

export default function SkillsPage({ searchParams }: SkillsPageProps) {
  const skills = allSkills.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <SkillsPageContent
      skills={skills}
      initialTagFilter={getFirstParam(searchParams?.tag)}
    />
  );
}
