"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanCard, type KanbanCardData } from "./KanbanCard";

export interface ColumnConfig {
  id: string;
  title: string;
  color: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  rotation: number;
}

interface KanbanColumnProps {
  column: { id: string; title: string; cards: KanbanCardData[] };
  config: ColumnConfig;
  isAuthenticated: boolean;
  onMoveCard: (cardId: string, fromColumn: string, toColumn: string, toIndex: number) => void;
  onAddCard: (columnId: string, text: string) => void;
  onDeleteCard: (cardId: string, columnId: string) => void;
  onEditCard: (cardId: string, columnId: string, newText: string) => void;
}

export function KanbanColumn({
  column,
  config,
  isAuthenticated,
  onMoveCard,
  onAddCard,
  onDeleteCard,
  onEditCard,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState("");

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);

    const cardsContainer = e.currentTarget.querySelector("[data-cards]");
    if (!cardsContainer) {
      setDropIndex(column.cards.length);
      return;
    }

    const cardElements = Array.from(cardsContainer.querySelectorAll("[data-card-item]"));
    let insertIndex = cardElements.length;

    for (let i = 0; i < cardElements.length; i++) {
      const rect = cardElements[i].getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        insertIndex = i;
        break;
      }
    }

    setDropIndex(insertIndex);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOver(false);
      setDropIndex(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsOver(false);

    const cardId = e.dataTransfer.getData("text/plain");
    const sourceColumnId = e.dataTransfer.getData("application/column");

    if (cardId && sourceColumnId) {
      const targetIndex = dropIndex ?? column.cards.length;
      onMoveCard(cardId, sourceColumnId, column.id, targetIndex);
    }

    setDropIndex(null);
  }

  function handleAddCard() {
    const trimmed = newText.trim();
    if (trimmed) {
      onAddCard(column.id, trimmed);
      setNewText("");
      setIsAdding(false);
    }
  }

  const colorClasses = { bg: config.cardBg, border: config.cardBorder };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "flex min-w-[260px] flex-col rounded-lg border-3 border-border paper-grain",
        "transition-all duration-200",
        isOver && "shadow-tactile-lg scale-[1.01]",
      )}
      style={{ transform: `rotate(${config.rotation}deg)` }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={cn("border-b-3 border-border px-4 py-3", config.headerBg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("h-3 w-3 rounded-full", config.color)} />
            <h3 className="font-heading text-sm font-black uppercase tracking-wider">
              {column.title}
            </h3>
          </div>
          <span className="rounded-full border-2 border-border px-2 py-0.5 font-heading text-xs font-bold">
            {column.cards.length}
          </span>
        </div>
      </div>

      <div data-cards className="flex flex-1 flex-col gap-2 p-3">
        <AnimatePresence mode="popLayout">
          {column.cards.map((card, index) => (
            <div key={card.id} data-card-item>
              {dropIndex === index && (
                <motion.div
                  layoutId="drop-indicator"
                  className={cn("mb-2 h-1 rounded-full border-2 border-dashed border-border", config.color)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              <KanbanCard
                card={card}
                columnId={column.id}
                colorClasses={colorClasses}
                isAuthenticated={isAuthenticated}
                onDragStart={() => {}}
                onDelete={onDeleteCard}
                onEdit={onEditCard}
                index={index}
              />
            </div>
          ))}
        </AnimatePresence>

        {dropIndex !== null && dropIndex >= column.cards.length && (
          <div
            className={cn("h-1 rounded-full border-2 border-dashed border-border", config.color)}
          />
        )}

        {isOver && column.cards.length === 0 && (
          <div className={cn("flex h-16 items-center justify-center rounded border-2 border-dashed border-border/50", config.color)}>
            <span className="font-heading text-xs text-muted">Drop here</span>
          </div>
        )}

        {isAuthenticated && (
          <div className="mt-auto pt-2">
            {isAdding ? (
              <div className="flex flex-col gap-2">
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddCard();
                    if (e.key === "Escape") {
                      setNewText("");
                      setIsAdding(false);
                    }
                  }}
                  placeholder="What needs doing?"
                  className="w-full border-3 border-border bg-background p-2 font-body text-sm text-foreground outline-none focus:shadow-tactile-sm"
                  autoFocus
                />
                <div className="flex gap-1">
                  <button
                    onClick={handleAddCard}
                    className="flex-1 border-2 border-border bg-mustard/30 px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-colors hover:bg-mustard/50"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => { setNewText(""); setIsAdding(false); }}
                    className="border-2 border-border px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-colors hover:bg-salmon/30"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className={cn(
                  "flex w-full items-center justify-center gap-1 border-2 border-dashed border-border/40 py-2",
                  "font-heading text-xs font-bold uppercase tracking-wider text-muted",
                  "transition-all hover:border-border hover:bg-mustard/10 hover:text-foreground",
                )}
              >
                <Plus size={14} />
                Add card
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
