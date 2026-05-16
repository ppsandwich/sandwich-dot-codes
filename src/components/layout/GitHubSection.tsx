import { fetchGitHubRepos, fetchRecentCommits } from "@/lib/github";
import { GitHubSectionClient } from "./GitHubSectionClient";

export async function GitHubSection() {
  const [repos, commits] = await Promise.all([
    fetchGitHubRepos(),
    fetchRecentCommits(),
  ]);

  return <GitHubSectionClient repos={repos} commits={commits} />;
}
