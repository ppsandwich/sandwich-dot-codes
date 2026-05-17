"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { KanbanBoard } from "./KanbanBoard";
import { LoginForm } from "./LoginForm";

interface KanbanCardData {
  id: string;
  text: string;
}

interface KanbanBoardData {
  columns: { id: string; title: string; cards: KanbanCardData[] }[];
}

interface RoadmapPageContentProps {
  initialBoard: KanbanBoardData;
  initialAuth: boolean;
}

export function RoadmapPageContent({ initialBoard, initialAuth }: RoadmapPageContentProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [board, setBoard] = useState<KanbanBoardData>(initialBoard);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setIsLoading(true);
      fetch("/api/roadmap")
        .then((res) => res.json())
        .then((data) => {
          if (data.columns) setBoard(data);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  return (
    <Section spacing="loose">
      <Container>
        <div className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <StickerTag variant="teal" rotation={-2} className="mb-4">
                  Roadmap
                </StickerTag>
                <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.3deg]">
                  Where it&rsquo;s
                  <span className="ml-2 block text-mustard sm:ml-4">going</span>
                </h1>
                <p className="mt-4 max-w-lg text-lg text-muted rotate-[0.2deg]">
                  The big board of things to build, fix, and dream up. Drag cards around to rearrange the future.
                </p>
              </div>
              <div className="mt-2">
                <LoginForm
                  isAuthenticated={isAuthenticated}
                  onAuthChange={setIsAuthenticated}
                />
              </div>
            </div>
          </motion.div>

          <div className="absolute -right-2 top-0 rotate-12 sm:right-4">
            <DoodleAccent variant="arrow" color="#D6B347" size={40} />
          </div>
          <div className="absolute -left-4 bottom-0 rotate-[-8deg] hidden sm:block">
            <DoodleAccent variant="squiggle" color="#6F9D9A" size={48} />
          </div>
        </div>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex items-center gap-2 rounded border-2 border-border/30 bg-mustard/10 px-4 py-2"
          >
            <Map size={16} className="text-muted" />
            <span className="font-heading text-xs font-bold text-muted">
              Log in to drag, add, edit, and delete cards.
            </span>
          </motion.div>
        )}

        <KanbanBoard
          initialBoard={board}
          isAuthenticated={isAuthenticated}
        />
      </Container>
    </Section>
  );
}
