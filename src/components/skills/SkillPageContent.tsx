"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import type { Skill } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MDXRenderer } from "@/components/writing/MDXRenderer";
import { StickerTag } from "@/components/decorative/StickerTag";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";
import { TapeFrame } from "@/components/decorative/TapeFrame";
import { PaperCard } from "@/components/decorative/PaperCard";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface SkillPageContentProps {
  skill: Skill;
}

export function SkillPageContent({ skill }: SkillPageContentProps) {
  const effectiveCover = skill.cover || skill.firstBodyImage;
  const hasCover = !!effectiveCover;

  return (
    <>
      <Section spacing="default">
        <Container size={hasCover ? "default" : "narrow"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link
              href="/skills"
              className="mb-8 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              All Skills
            </Link>

            <div className={cn(hasCover && "flex items-start gap-8 lg:gap-12")}>
              <div className={cn(hasCover && "min-w-0 flex-1")}>
                <div className="mb-4 flex flex-wrap gap-2">
                  {skill.tags.map((tag, i) => {
                    const rotations = [-2, 1.5, -1, 2, -1.5];
                    return (
                      <StickerTag key={tag} variant="mustard" rotation={rotations[i % rotations.length]}>
                        #{tag}
                      </StickerTag>
                    );
                  })}
                </div>

                <h1 className="font-heading text-headline font-black leading-[0.95] tracking-tighter rotate-[-0.2deg]">
                  {skill.title}
                </h1>

                <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                  <span className="font-heading font-bold">{siteConfig.author}</span>
                  <span>·</span>
                  <time dateTime={skill.date} suppressHydrationWarning>
                    {new Date(skill.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {skill.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {skill.readingTime}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.share) {
                        navigator.share({
                          title: skill.title,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="flex items-center gap-1 transition-colors hover:text-foreground"
                    aria-label="Share skill details"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>

              {hasCover && (
                <div className="hidden flex-shrink-0 md:block md:w-[260px] lg:w-[300px]">
                  <div className="border-3 border-border shadow-tactile rotate-[1deg] overflow-hidden">
                    <Image
                      src={effectiveCover!}
                      alt={skill.title}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </Container>
      </Section>

      <CrookedDivider variant="wavy" color="#D6B347" className="my-4" />

      <Section spacing="default">
        <Container size="narrow" className="max-w-[57.6rem]">
          <motion.div
            initial={{ opacity: 0, marginTop: 20 }}
            animate={{ opacity: 1, marginTop: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col gap-8"
          >
            {/* Purpose Highlight Box */}
            <TapeFrame tapePosition="top">
              <PaperCard rotation={-0.3} className="bg-mustard/10 border-mustard">
                <div className="flex flex-col gap-2">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-mustard">
                    Core Purpose
                  </span>
                  <p className="font-heading text-lg font-black leading-tight text-foreground/90">
                    {skill.purpose}
                  </p>
                </div>
              </PaperCard>
            </TapeFrame>

            {/* Main MDX Content */}
            <div className="border-3 border-border bg-background p-5 shadow-tactile paper-grain dark:bg-background-dark sm:p-8">
              <MDXRenderer code={skill.body.code} />
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
