import { fetchGitHubTimeline, fetchGitHubLanguages } from "@/lib/github";
import { GitHubSectionClient } from "./GitHubSectionClient";

export async function GitHubSection() {
  const [timeline, languages] = await Promise.all([
    fetchGitHubTimeline(),
    fetchGitHubLanguages(),
  ]);

  return <GitHubSectionClient initialTimeline={timeline} initialLanguages={languages} />;
}
