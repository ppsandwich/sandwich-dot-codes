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
import { cn } from "@/lib/utils";

interface SkillsPageContentProps {
  skills: Skill[];
  initialTagFilter?: string;
}

export function SkillsPageContent({ skills, initialTagFilter }: SkillsPageContentProps) {
  const router = useRouter();
  const initialTag = initialTagFilter || "all";
  const [activeTagFilter, setActiveTagFilter] = useState(initialTag);

  const allTags = Array.from(new Set(skills.flatMap((skill) => skill.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

  useEffect(() => {
    setActiveTagFilter(initialTag);
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
              AI Instructions
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted rotate-[0.2deg]">
              Markdown files (such as `skill.md` or `SKILL.md`) that teach AI coding agents and assistants how to perform specific tasks, orchestrate workflows, and execute multi-step tools.
            </p>
          </motion.div>
          <div className="absolute -right-2 top-4 rotate-[8deg] sm:right-4">
            <DoodleAccent variant="star" color="#D6B347" size={48} />
          </div>
        </div>

        {allTags.length > 0 && (
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
            {allTags.map((tag) => (
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
