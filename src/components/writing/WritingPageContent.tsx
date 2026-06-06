"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Article } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { cn } from "@/lib/utils";

interface WritingPageContentProps {
  articles: Article[];
  initialTagFilter?: string;
}

export function WritingPageContent({ articles, initialTagFilter }: WritingPageContentProps) {
  const router = useRouter();
  const initialTag = initialTagFilter || "all";
  const [activeTagFilter, setActiveTagFilter] = useState(initialTag);

  const tagCounts = articles.flatMap((article) => article.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Array.from(new Set(articles.flatMap((article) => article.tags))).sort((a, b) => {
    const countA = tagCounts[a] || 0;
    const countB = tagCounts[b] || 0;
    if (countB !== countA) {
      return countB - countA;
    }
    return a.localeCompare(b);
  });

  const topTags = sortedTags.slice(0, 8);
  const shouldCollapse = sortedTags.length > 8;
  const isInitialTagHidden = initialTag !== "all" && !topTags.includes(initialTag);

  const [isExpanded, setIsExpanded] = useState(isInitialTagHidden);
  const displayedTags = shouldCollapse && !isExpanded ? topTags : sortedTags;

  useEffect(() => {
    setActiveTagFilter(initialTag);
    if (initialTag !== "all" && !topTags.includes(initialTag)) {
      setIsExpanded(true);
    }
  }, [initialTag]);

  const updateTagFilter = (tag: string) => {
    setActiveTagFilter(tag);
    router.replace(tag === "all" ? "/writing" : `/writing?tag=${encodeURIComponent(tag)}`, {
      scroll: false,
    });
  };

  const filteredArticles = articles.filter(
    (article) => activeTagFilter === "all" || article.tags.includes(activeTagFilter),
  );
  const hasActiveFilter = activeTagFilter !== "all";

  return (
    <Section spacing="loose">
      <Container>
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <StickerTag variant="teal" rotation={2} className="mb-4">
              Writing
            </StickerTag>
            <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[0.3deg]">
              The Words
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted rotate-[-0.2deg]">
              Thoughts on AI, web development, creative coding, and the strange
              things that happen when you stare at code long enough.
            </p>
          </motion.div>
          <div className="absolute -right-2 top-4 rotate-[-8deg] sm:right-4">
            <DoodleAccent variant="squiggle" color="#6F9D9A" size={48} />
          </div>
        </div>

        {sortedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8 flex flex-wrap gap-2"
            aria-label="Filter articles by tag"
          >
            <button
              onClick={() => updateTagFilter("all")}
              aria-pressed={activeTagFilter === "all"}
              className={cn(
                "border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider",
                "transition-all duration-200 hover:scale-105",
                activeTagFilter === "all"
                  ? "bg-teal text-background shadow-tactile-sm"
                  : "bg-background hover:bg-teal/20",
              )}
            >
              All Tags
            </button>
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => updateTagFilter(tag)}
                aria-pressed={activeTagFilter === tag}
                className={cn(
                  "border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider",
                  "transition-all duration-200 hover:scale-105",
                  activeTagFilter === tag
                    ? "bg-teal text-background shadow-tactile-sm"
                    : "bg-background hover:bg-teal/20",
                )}
              >
                #{tag}
              </button>
            ))}
            {shouldCollapse && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-teal/10",
                  "transition-all duration-200 hover:scale-105",
                )}
              >
                {isExpanded ? "Show Less" : "Show All"}
              </button>
            )}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTagFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center">
            <DoodleAccent variant="circle" color="#7C736C" size={48} className="mb-4" />
            <p className="font-heading text-lg font-bold text-muted">
              {articles.length === 0
                ? "No articles yet. The pen is warming up."
                : "No articles found for this tag."}
            </p>
            {hasActiveFilter && (
              <button
                onClick={() => updateTagFilter("all")}
                className={cn(
                  "mt-4 border-3 border-border bg-background px-4 py-2 font-heading text-sm font-bold uppercase tracking-wider",
                  "shadow-tactile transition-all hover:scale-105 hover:bg-mustard/20",
                )}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
