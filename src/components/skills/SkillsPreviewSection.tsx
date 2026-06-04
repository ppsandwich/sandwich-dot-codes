"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SkillCard } from "@/components/skills/SkillCard";
import type { Skill } from "contentlayer/generated";

interface SkillsPreviewSectionProps {
  skills: Skill[];
}

export function SkillsPreviewSection({ skills }: SkillsPreviewSectionProps) {
  const displaySkills = skills.slice(0, 4);

  return (
    <Section spacing="default">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-12 flex items-end justify-between rotate-[-0.2deg]"
        >
          <div>
            <h2 className="font-heading text-headline font-black">AI Instructions</h2>
            <p className="mt-2 text-muted">
              Structured skill guides that teach AI agents how to execute tasks and workflows.
            </p>
          </div>
          <Link
            href="/skills"
            className="hidden items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-teal transition-all hover:gap-3 md:flex"
          >
            All skills <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {displaySkills.map((skill, i) => (
            <SkillCard
              key={skill.slug}
              skill={skill}
              index={i}
              variant="compact"
            />
          ))}
        </div>

        <Link
          href="/skills"
          className="mt-8 flex items-center justify-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-teal transition-all hover:gap-3 md:hidden"
        >
          All skills <ArrowRight size={16} />
        </Link>
      </Container>
    </Section>
  );
}
