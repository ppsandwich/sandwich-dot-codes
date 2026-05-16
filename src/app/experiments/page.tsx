import type { Metadata } from "next";
import { allExperiments } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ExperimentsPageContent } from "@/components/projects/ExperimentsPageContent";

export const metadata: Metadata = {
  title: "Experiments",
  description: "Playground projects, prototypes, and technical explorations.",
};

export default function ExperimentsPage() {
  const experiments = allExperiments.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return <ExperimentsPageContent experiments={experiments} />;
}
