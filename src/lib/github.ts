export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  homepage?: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  html_url: string;
  date: string;
  repo: string;
}

const GITHUB_USERNAME = "sandwich-codes";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchRecentCommits(): Promise<GitHubCommit[]> {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!reposRes.ok) return [];
    const repos = await reposRes.json();

    const commits: GitHubCommit[] = [];

    for (const repo of repos.slice(0, 3)) {
      try {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              ...(process.env.GITHUB_TOKEN && {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              }),
            },
            next: { revalidate: 3600 },
          },
        );

        if (commitsRes.ok) {
          const repoCommits = await commitsRes.json();
          for (const commit of repoCommits) {
            commits.push({
              sha: commit.sha.substring(0, 7),
              message: commit.commit.message.split("\n")[0],
              html_url: commit.html_url,
              date: commit.commit.author.date,
              repo: repo.name,
            });
          }
        }
      } catch {
        // Skip this repo
      }
    }

    return commits
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  } catch {
    return [];
  }
}
