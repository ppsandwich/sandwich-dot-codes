import type { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI experiments, web toys, and strange digital artifacts.",
};

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return <ProjectsPageContent projects={projects} />;
}
