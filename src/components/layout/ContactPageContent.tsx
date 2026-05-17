"use client";

import { motion } from "framer-motion";
import { Github, Mail, Twitter } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { TapeFrame } from "@/components/decorative/TapeFrame";
import { PaperCard } from "@/components/decorative/PaperCard";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";
import { siteConfig } from "@/lib/config";

export function ContactPageContent() {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <StickerTag variant="salmon" rotation={-3} className="mb-4">
            Contact
          </StickerTag>
          <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.4deg]">
            Let&apos;s
            <br />
            <span className="text-teal">Talk</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted rotate-[0.2deg]">
            Want to collaborate on something weird? Have questions about a project?
            Just want to say hi? I&apos;m around.
          </p>
        </motion.div>

        <CrookedDivider variant="wavy" color="#D98B73" className="my-8" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              icon: <Github size={24} />,
              label: "GitHub",
              value: "silentsoar",
              href: siteConfig.links.github,
              color: "foreground",
            },
            {
              icon: <Mail size={24} />,
              label: "Email",
              value: "dfgibbs@gmail.com",
              href: "mailto:dfgibbs@gmail.com",
              color: "mustard",
            },
            ...(siteConfig.links.twitter
              ? [
                  {
                    icon: <Twitter size={24} />,
                    label: "Twitter",
                    value: "@sandwichcodes",
                    href: siteConfig.links.twitter,
                    color: "teal",
                  },
                ]
              : []),
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <TapeFrame tapePosition={i % 2 === 0 ? "top-left" : "top-right"}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <PaperCard rotation={i % 2 === 0 ? -0.5 : 0.5}>
                    <div className="flex items-start gap-4">
                      <div className="text-muted transition-colors group-hover:text-mustard">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-widest text-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 font-heading text-lg font-black transition-colors group-hover:text-mustard">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </PaperCard>
                </a>
              </TapeFrame>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mt-12 text-center"
        >
          <DoodleAccent variant="star" color="#D6B347" size={32} className="mb-4" />
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-muted">
            Response time: usually within 24 hours
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
