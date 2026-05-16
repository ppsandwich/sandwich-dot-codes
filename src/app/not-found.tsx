"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { StickerTag } from "@/components/decorative/StickerTag";

export default function NotFound() {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <DoodleAccent variant="x" color="#D98B73" size={64} className="mb-6" />
          <h1 className="font-heading text-display font-black leading-[0.95] tracking-tetter rotate-[-1deg]">
            404
          </h1>
          <p className="mt-4 text-lg text-muted rotate-[0.3deg]">
            This page wandered off into the void.
            <br />
            Even the doodles can&apos;t find it.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block border-3 border-border bg-foreground px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-background shadow-tactile transition-all hover:shadow-tactile-lg hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
