"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";
import { TapeFrame } from "@/components/decorative/TapeFrame";
import { PaperCard } from "@/components/decorative/PaperCard";

export function AboutPageContent() {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <StickerTag variant="lavender" rotation={-2} className="mb-4">
            About
          </StickerTag>
          <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.3deg]">
            Hello, I&apos;m
            <br />
            <span className="text-mustard">a Developer</span>
          </h1>
        </motion.div>

        <CrookedDivider variant="scribble" className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="space-y-6 text-lg leading-relaxed text-foreground/90"
        >
          <p className="rotate-[-0.2deg]">
            I build weird things on the internet. Some of them are useful. Most of them
            are experiments in making code feel more human, more playful, and more alive.
          </p>
          <p className="rotate-[0.15deg]">
            By day, I work on web applications and AI tooling. By night, I poke at neural
            networks until they make art, turn voice recordings into 3D landscapes, and
            wonder what happens if you give pixels the ability to reproduce.
          </p>
          <p className="rotate-[-0.1deg]">
            I believe the best software has personality. Not personality as in &ldquo;quirky
            copy on a SaaS landing page,&rdquo; but personality as in you can feel that a
            human being made deliberate, opinionated choices about every pixel and every
            interaction.
          </p>
        </motion.div>

        <CrookedDivider variant="wavy" color="#6F9D9A" className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h2 className="mb-6 font-heading text-headline font-black rotate-[0.3deg]">
            The Philosophy
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { label: "Build weird", desc: "If it doesn't surprise you, it won't surprise anyone else." },
              { label: "Ship fast", desc: "Perfect is the enemy of interesting. Get it out, learn, iterate." },
              { label: "Stay curious", desc: "The best projects come from 'what if' questions at 2am." },
              { label: "Keep it real", desc: "Authenticity beats polish every time." },
            ].map((item, i) => (
              <TapeFrame key={item.label} tapePosition={i % 2 === 0 ? "top-left" : "top-right"}>
                <PaperCard rotation={i % 2 === 0 ? -0.5 : 0.5}>
                  <h3 className="font-heading text-lg font-black text-mustard">{item.label}</h3>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </PaperCard>
              </TapeFrame>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <DoodleAccent variant="star" color="#D6B347" size={48} />
        </div>
      </Container>
    </Section>
  );
}
