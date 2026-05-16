"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";

const categories = [
  {
    title: "Editor",
    items: [
      { name: "VS Code", note: "With a heavily customized theme and too many extensions" },
      { name: "Neovim", note: "For when I'm feeling masochistic" },
      { name: "Fira Code", note: "Ligatures or die" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "TypeScript", note: "Daily driver, strict mode always" },
      { name: "Rust", note: "For WASM experiments and when I want to suffer productively" },
      { name: "Python", note: "Data science, scripting, quick prototypes" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Next.js", note: "App Router, Server Components, the whole thing" },
      { name: "React", note: "With TypeScript, always" },
      { name: "Tailwind CSS", note: "Utility-first, no custom CSS unless absolutely necessary" },
      { name: "Framer Motion", note: "For making things feel alive" },
    ],
  },
  {
    title: "Hardware",
    items: [
      { name: "MacBook Pro M3", note: "The one that doesn't sound like a jet engine" },
      { name: "LG 27\" 4K", note: "Vertical orientation for code, landscape for everything else" },
      { name: "HHKB Professional", note: "Topre switches, no going back" },
    ],
  },
  {
    title: "Design",
    items: [
      { name: "Figma", note: "For wireframes and component systems" },
      { name: "Excalidraw", note: "For architecture diagrams that look hand-drawn" },
      { name: "Procreate", note: "For doodles and textures" },
    ],
  },
];

export function UsesPageContent() {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <StickerTag variant="slime" rotation={2} className="mb-4">
            Uses
          </StickerTag>
          <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[0.2deg]">
            The Toolkit
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted rotate-[-0.1deg]">
            Hardware, software, and tools I use to build things. Inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal underline decoration-teal/40 decoration-2 underline-offset-4 hover:decoration-teal"
            >
              uses.tech
            </a>
            .
          </p>
        </motion.div>

        <CrookedDivider variant="scribble" className="my-8" />

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: catIndex * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="rotate-[-0.2deg]"
            >
              <h2 className="mb-4 font-heading text-subhead font-black">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li
                    key={item.name}
                    className="border-l-4 border-mustard pl-4"
                    style={{ transform: `rotate(${i % 2 === 0 ? -0.2 : 0.2}deg)` }}
                  >
                    <span className="font-heading text-base font-bold">{item.name}</span>
                    <p className="text-sm text-muted">{item.note}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <DoodleAccent variant="squiggle" color="#6F9D9A" size={48} />
        </div>
      </Container>
    </Section>
  );
}
