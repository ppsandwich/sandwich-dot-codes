"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { ScribbleArrow } from "@/components/decorative/ScribbleArrow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden" spacing="loose">
      <Container>
        <div className="relative">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rotate-[-1deg]"
          >
            <StickerTag variant="mustard" rotation={3} className="mb-6">
              AI Experiments
            </StickerTag>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-heading text-display font-black leading-[0.9] tracking-tighter"
          >
            <span className="block rotate-[-0.5deg]">Sandwich</span>
            <span className="ml-4 block rotate-[0.3deg] text-mustard sm:ml-8 md:ml-16">
              Codes
            </span>
          </motion.h1>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 max-w-lg rotate-[0.5deg]"
          >
            <p className="text-lg text-muted sm:text-xl">
              AI experiments, web toys, and strange digital artifacts from the
              intersection of code and chaos.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 flex items-center gap-4"
          >
            <ScribbleArrow direction="right" />
            <span className="font-heading text-sm font-bold uppercase tracking-widest text-muted">
              Explore the weirdness
            </span>
          </motion.div>

          <div className="absolute -right-4 top-8 rotate-12 sm:right-8 md:right-16">
            <DoodleAccent variant="star" color="#D6B347" size={48} />
          </div>
          <div className="absolute -left-2 bottom-0 sm:left-4">
            <DoodleAccent variant="dot-cluster" color="#6F9D9A" size={40} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
