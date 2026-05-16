"use client";

import { motion } from "framer-motion";
import type { Experiment } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ExperimentCard } from "@/components/projects/ExperimentCard";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";

interface ExperimentsPageContentProps {
  experiments: Experiment[];
}

export function ExperimentsPageContent({ experiments }: ExperimentsPageContentProps) {
  return (
    <Section spacing="loose">
      <Container>
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <StickerTag variant="salmon" rotation={-3} className="mb-4">
              Experiments
            </StickerTag>
            <h1 className="font-heading text-display font-black leading-[0.95] tracking-tetter rotate-[-0.5deg]">
              The Lab
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted rotate-[0.3deg]">
              Half-baked ideas, technical playgrounds, and things that might
              become real projects someday. Or not.
            </p>
          </motion.div>
          <div className="absolute -right-2 top-0 rotate-[5deg] sm:right-4">
            <DoodleAccent variant="x" color="#D98B73" size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment, i) => (
            <ExperimentCard key={experiment.slug} experiment={experiment} index={i} />
          ))}
        </div>

        {experiments.length === 0 && (
          <div className="py-16 text-center">
            <DoodleAccent variant="dot-cluster" color="#7C736C" size={48} className="mb-4" />
            <p className="font-heading text-lg font-bold text-muted">
              The lab is empty. Experiments brewing.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
