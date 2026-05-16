"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/writing/ArticleCard";
import type { Article } from "contentlayer/generated";

interface WritingPreviewSectionProps {
  articles: Article[];
}

export function WritingPreviewSection({ articles }: WritingPreviewSectionProps) {
  return (
    <Section spacing="default">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-12 flex items-end justify-between rotate-[0.2deg]"
        >
          <div>
            <h2 className="font-heading text-headline font-black">Recent Writing</h2>
            <p className="mt-2 text-muted">
              Thoughts on AI, web development, and digital craft.
            </p>
          </div>
          <Link
            href="/writing"
            className="hidden items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-teal transition-all hover:gap-3 md:flex"
          >
            All posts <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        <Link
          href="/writing"
          className="mt-8 flex items-center justify-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-teal transition-all hover:gap-3 md:hidden"
        >
          All posts <ArrowRight size={16} />
        </Link>
      </Container>
    </Section>
  );
}
