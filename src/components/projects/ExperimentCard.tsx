"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Experiment } from "contentlayer/generated";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: Experiment;
  index?: number;
}

export function ExperimentCard({ experiment, index = 0 }: ExperimentCardProps) {
  const rotation = index % 3 === 0 ? -0.7 : index % 3 === 1 ? 0.5 : -0.3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Link href={experiment.url} className="group block">
        <div
          className={cn(
            "relative border-3 border-border bg-background p-5 shadow-tactile",
            "transition-all duration-300",
            "hover:shadow-tactile-lg hover:scale-[1.02] hover:rotate-0",
            "paper-grain min-h-[200px]",
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="mb-3 flex items-center gap-2">
            <StickerTag variant="salmon" rotation={index % 2 === 0 ? -3 : 2}>
              Experiment
            </StickerTag>
            <DoodleAccent
              variant={index % 3 === 0 ? "x" : index % 3 === 1 ? "squiggle" : "dot-cluster"}
              size={14}
            />
          </div>

          <h3 className="font-heading text-lg font-black transition-colors group-hover:text-mustard">
            {experiment.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {experiment.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {experiment.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border-2 border-border px-2 py-0.5 font-heading text-xs font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {experiment.github && (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Github size={14} />
                Code
              </span>
            )}
            {experiment.demo && (
              <span className="flex items-center gap-1 text-xs text-muted">
                <ExternalLink size={14} />
                Demo
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
