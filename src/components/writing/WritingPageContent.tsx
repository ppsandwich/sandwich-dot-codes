"use client";

import { motion } from "framer-motion";
import type { Article } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";

interface WritingPageContentProps {
  articles: Article[];
}

export function WritingPageContent({ articles }: WritingPageContentProps) {
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="py-16 text-center">
            <DoodleAccent variant="circle" color="#7C736C" size={48} className="mb-4" />
            <p className="font-heading text-lg font-bold text-muted">
              No articles yet. The pen is warming up.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
