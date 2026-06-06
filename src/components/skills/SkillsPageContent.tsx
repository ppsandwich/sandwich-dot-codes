"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Skill } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SkillCard } from "@/components/skills/SkillCard";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { TapeFrame } from "@/components/decorative/TapeFrame";
import { PaperCard } from "@/components/decorative/PaperCard";
import { cn } from "@/lib/utils";

interface SkillsPageContentProps {
  skills: Skill[];
  initialTagFilter?: string;
}

export function SkillsPageContent({ skills, initialTagFilter }: SkillsPageContentProps) {
  const router = useRouter();
  const initialTag = initialTagFilter || "all";
  const [activeTagFilter, setActiveTagFilter] = useState(initialTag);

  const tagCounts = skills.flatMap((skill) => skill.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Array.from(new Set(skills.flatMap((skill) => skill.tags))).sort((a, b) => {
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
    router.replace(tag === "all" ? "/skills" : `/skills?tag=${encodeURIComponent(tag)}`, {
      scroll: false,
    });
  };

  const filteredSkills = skills.filter(
    (skill) => activeTagFilter === "all" || skill.tags.includes(activeTagFilter),
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
            <StickerTag variant="mustard" rotation={-2} className="mb-4">
              Agent Skills
            </StickerTag>
            <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.3deg]">
              The Skills
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted rotate-[0.2deg]">
              They don&apos;t pay the bills, but they make AI more effective for my hyper-niche use cases.
            </p>
          </motion.div>
          <div className="absolute -right-2 top-4 rotate-[8deg] sm:right-4">
            <DoodleAccent variant="star" color="#D6B347" size={48} />
          </div>
        </div>

        {/* Conceptual Guide Card - NO IMAGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-12"
        >
          <TapeFrame tapePosition="top-left">
            <PaperCard rotation={0.2} className="bg-teal/5 border-teal/40 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-between">
                <div className="space-y-4 max-w-2xl flex-1">
                  <h2 className="font-heading text-xl md:text-2xl font-black text-foreground">
                    What is a Skill File?
                  </h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    A <code className="px-1.5 py-0.5 font-mono text-xs font-bold text-salmon bg-foreground/5 border-2 border-border/20 rounded">skill.md</code> (or <code className="px-1.5 py-0.5 font-mono text-xs font-bold text-salmon bg-foreground/5 border-2 border-border/20 rounded">SKILL.md</code>) is a structured instruction guide designed to teach AI coding agents and assistants how to perform specific development tasks, execute workflows, or coordinate multi-step tool calls.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    By codifying rules, technical requirements, and challenges into standardized Markdown, these instructions act as operational runbooks that agents can read, understand, and execute autonomously inside a codebase.
                  </p>
                </div>
                <div className="w-full md:w-80 border-2 border-dashed border-teal/30 p-4 bg-teal/10 rounded rotate-[0.5deg]">
                  <h3 className="font-heading text-sm font-bold text-teal mb-3 uppercase tracking-wider">
                    Core Sections
                  </h3>
                  <ul className="space-y-2 text-xs font-heading">
                    <li className="flex items-start gap-2">
                      <span className="text-salmon font-black">01.</span>
                      <div>
                        <strong>Core Purpose:</strong> A high-level description of what the skill achieves.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-salmon font-black">02.</span>
                      <div>
                        <strong>The Skill:</strong> Detailed rules, patterns, and tool-use procedures.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-salmon font-black">03.</span>
                      <div>
                        <strong>Challenges & Improvements:</strong> Real-world hurdles and planned upgrades.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </PaperCard>
          </TapeFrame>
        </motion.div>

        {sortedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8 flex flex-wrap gap-2"
            aria-label="Filter skills by tag"
          >
            <button
              onClick={() => updateTagFilter("all")}
              aria-pressed={activeTagFilter === "all"}
              className={cn(
                "border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider",
                "transition-all duration-200 hover:scale-105",
                activeTagFilter === "all"
                  ? "bg-mustard text-background shadow-tactile-sm"
                  : "bg-background hover:bg-mustard/20",
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
                    ? "bg-mustard text-background shadow-tactile-sm"
                    : "bg-background hover:bg-mustard/20",
                )}
              >
                #{tag}
              </button>
            ))}
            {shouldCollapse && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-mustard/10",
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
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.slug} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="py-16 text-center">
            <DoodleAccent variant="circle" color="#7C736C" size={48} className="mb-4" />
            <p className="font-heading text-lg font-bold text-muted">
              {skills.length === 0
                ? "No skills listed yet."
                : "No skills found for this tag."}
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
