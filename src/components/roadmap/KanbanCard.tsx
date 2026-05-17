"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { GripVertical, X, Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KanbanCardData {
  id: string;
  text: string;
}

interface KanbanCardProps {
  card: KanbanCardData;
  columnId: string;
  colorClasses: { bg: string; border: string };
  isAuthenticated: boolean;
  onDragStart: (cardId: string, columnId: string) => void;
  onDelete: (cardId: string, columnId: string) => void;
  onEdit: (cardId: string, columnId: string, newText: string) => void;
  index: number;
}

export function KanbanCard({
  card,
  columnId,
  colorClasses,
  isAuthenticated,
  onDragStart,
  onDelete,
  onEdit,
  index,
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(card.text);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rotation = ((index * 7 + 3) % 5) - 2;

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== card.text) {
      onEdit(card.id, columnId, trimmed);
    } else {
      setEditText(card.text);
    }
    setIsEditing(false);
  }

  function handleNativeDragStart(e: React.DragEvent<HTMLDivElement>) {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", card.id);
    e.dataTransfer.setData("application/column", columnId);
    onDragStart(card.id, columnId);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div
        draggable={isAuthenticated}
        onDragStart={handleNativeDragStart}
        onDragEnd={() => setIsDragging(false)}
        className={cn(
          "group relative border-3 border-border p-3 paper-grain",
          "transition-all duration-200",
          "hover:shadow-tactile-sm",
          colorClasses.bg,
          colorClasses.border,
          isAuthenticated ? "cursor-grab active:cursor-grabbing" : "cursor-default",
          isDragging && "shadow-tactile-lg z-50 opacity-80",
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {isAuthenticated && (
          <div className="absolute -top-1.5 -left-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <GripVertical size={14} className="text-muted" />
          </div>
        )}

        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setEditText(card.text);
                  setIsEditing(false);
                }
              }}
              onBlur={handleSave}
              className="w-full border-b-2 border-border bg-transparent font-body text-sm text-foreground outline-none"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="shrink-0 rounded p-0.5 transition-colors hover:bg-mustard/30"
              aria-label="Save"
            >
              <Check size={14} className="text-muted" />
            </button>
          </div>
        ) : (
          <p className="pr-8 font-body text-sm leading-relaxed text-foreground">
            {card.text}
          </p>
        )}

        {isAuthenticated && !isEditing && (
          <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => {
                setEditText(card.text);
                setIsEditing(true);
              }}
              className="rounded p-1 transition-colors hover:bg-mustard/30"
              aria-label="Edit card"
            >
              <Pencil size={12} className="text-muted" />
            </button>
            <button
              onClick={() => onDelete(card.id, columnId)}
              className="rounded p-1 transition-colors hover:bg-salmon/30"
              aria-label="Delete card"
            >
              <X size={12} className="text-muted" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
