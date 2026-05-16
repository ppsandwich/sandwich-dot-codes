"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Clock } from "lucide-react";
import type { Experiment } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MDXRenderer } from "@/components/writing/MDXRenderer";
import { StickerTag } from "@/components/decorative/StickerTag";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";

interface ExperimentPageContentProps {
  experiment: Experiment;
}

export function ExperimentPageContent({ experiment }: ExperimentPageContentProps) {
  return (
    <>
      <Section spacing="default">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link
              href="/experiments"
              className="mb-8 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              All Experiments
            </Link>

            <div className="mb-4 flex flex-wrap gap-2">
              {experiment.tags.map((tag) => (
                <StickerTag key={tag} variant="salmon" rotation={Math.random() * 4 - 2}>
                  #{tag}
                </StickerTag>
              ))}
            </div>

            <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.3deg]">
              {experiment.title}
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted rotate-[0.2deg]">
              {experiment.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted">
              <time dateTime={experiment.date}>
                {new Date(experiment.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {experiment.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {experiment.readingTime}
                </span>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              {experiment.github && (
                <a
                  href={experiment.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-3 border-border bg-foreground px-4 py-2 font-heading text-sm font-bold text-background shadow-tactile transition-all hover:shadow-tactile-lg hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <Github size={16} />
                  View Source
                </a>
              )}
              {experiment.demo && (
                <a
                  href={experiment.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-3 border-border bg-salmon px-4 py-2 font-heading text-sm font-bold text-foreground shadow-tactile transition-all hover:shadow-tactile-lg hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <ExternalLink size={16} />
                  Try It
                </a>
              )}
            </div>
          </motion.div>
        </Container>
      </Section>

      <CrookedDivider variant="zigzag" color="#D98B73" className="my-4" />

      <Section spacing="default">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          >
            <MDXRenderer code={experiment.body.code} />
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
