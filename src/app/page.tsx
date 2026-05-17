import { allProjects, allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturedProjectsSection } from "@/components/projects/FeaturedProjectsSection";
import { WritingPreviewSection } from "@/components/writing/WritingPreviewSection";
import { GitHubSection } from "@/components/layout/GitHubSection";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";

export default function HomePage() {
  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const showcaseProjects = allProjects
    .filter((p) => p.showcase)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)
    .map((p) => ({ title: p.title, showcase: p.showcase!, url: p.url }));

  const recentArticles = allArticles
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 2);

  return (
    <>
      <HeroSection showcases={showcaseProjects} />
      <CrookedDivider variant="scribble" className="my-4" />
      <FeaturedProjectsSection projects={featuredProjects} />
      <CrookedDivider variant="wavy" color="#6F9D9A" className="my-4" />
      <WritingPreviewSection articles={recentArticles} />
      <CrookedDivider variant="zigzag" color="#D98B73" className="my-4" />
      <GitHubSection />
    </>
  );
}
