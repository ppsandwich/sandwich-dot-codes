"use client";

import { motion } from "framer-motion";
import { Star, GitFork, GitCommit, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WobbleCard } from "@/components/decorative/WobbleCard";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { StickerTag } from "@/components/decorative/StickerTag";
import type { GitHubRepo, GitHubCommit } from "@/lib/github";

interface GitHubSectionClientProps {
  repos: GitHubRepo[];
  commits: GitHubCommit[];
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  Python: "#3572A5",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export function GitHubSectionClient({ repos, commits }: GitHubSectionClientProps) {
  const hasData = repos.length > 0 || commits.length > 0;

  return (
    <Section spacing="default">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 rotate-[-0.2deg]"
        >
          <DoodleAccent variant="circle" color="#6F9D9A" size={32} className="mb-2" />
          <h2 className="font-heading text-headline font-black">GitHub Activity</h2>
          <p className="mt-2 text-muted">
            Recent code, commits, and open-source activity.
          </p>
        </motion.div>

        {!hasData ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-12 text-center"
          >
            <StickerTag variant="teal" rotation={-2}>
              Set GITHUB_TOKEN for live data
            </StickerTag>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {repos.length > 0 && (
              <div>
                <h3 className="mb-4 font-heading text-lg font-black uppercase tracking-wider text-muted">
                  Repositories
                </h3>
                <div className="space-y-4">
                  {repos.slice(0, 4).map((repo, i) => (
                    <motion.div
                      key={repo.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <WobbleCard rotation={i % 2 === 0 ? -0.4 : 0.3}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading text-sm font-black transition-colors group-hover:text-mustard">
                                  {repo.name}
                                </h4>
                                <ExternalLink size={12} className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                              {repo.description && (
                                <p className="mt-1 line-clamp-1 text-xs text-muted">
                                  {repo.description}
                                </p>
                              )}
                            </div>
                            <div className="flex shrink-0 items-center gap-3 text-xs text-muted">
                              <span className="flex items-center gap-1">
                                <Star size={12} />
                                {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork size={12} />
                                {repo.forks_count}
                              </span>
                            </div>
                          </div>
                          {repo.language && (
                            <div className="mt-2 flex items-center gap-1.5">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{
                                  backgroundColor: languageColors[repo.language] || "#7C736C",
                                }}
                              />
                              <span className="text-xs text-muted">{repo.language}</span>
                            </div>
                          )}
                        </WobbleCard>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {commits.length > 0 && (
              <div>
                <h3 className="mb-4 font-heading text-lg font-black uppercase tracking-wider text-muted">
                  Recent Commits
                </h3>
                <div className="space-y-3">
                  {commits.map((commit, i) => (
                    <motion.div
                      key={commit.sha}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 border-l-4 border-teal/40 py-2 pl-4 transition-all hover:border-teal hover:pl-5"
                      >
                        <GitCommit size={16} className="mt-0.5 shrink-0 text-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 font-mono text-sm transition-colors group-hover:text-mustard">
                            {commit.message}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                            <span className="font-heading font-bold">{commit.repo}</span>
                            <span>·</span>
                            <span className="font-mono">{commit.sha}</span>
                            <span>·</span>
                            <time dateTime={commit.date}>
                              {new Date(commit.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
