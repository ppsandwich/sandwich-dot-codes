"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Folder, Beaker, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: "project" | "article" | "experiment";
  tags: string[];
}

interface SearchModalProps {
  items: SearchItem[];
}

const typeIcons = {
  project: Folder,
  article: FileText,
  experiment: Beaker,
};

const typeLabels = {
  project: "Project",
  article: "Article",
  experiment: "Experiment",
};

export function SearchModal({ items }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router],
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 border-2 border-border/50 bg-background/50 px-3 py-1.5",
          "font-body text-sm text-muted",
          "transition-all hover:border-border hover:bg-background",
        )}
        aria-label="Open search (Ctrl+K)"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="ml-2 hidden rounded border border-border/50 px-1.5 py-0.5 font-mono text-xs sm:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed left-1/2 top-[20%] z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
            >
              <Command
                className="border-3 border-border bg-background shadow-tactile-lg"
                shouldFilter={true}
                loop
              >
                <div className="flex items-center border-b-3 border-border px-4">
                  <Search size={18} className="shrink-0 text-muted" />
                  <Command.Input
                    placeholder="Search projects, articles, experiments..."
                    className="flex-1 bg-transparent px-3 py-4 font-body text-sm outline-none placeholder:text-muted/60"
                    autoFocus
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="shrink-0 text-muted transition-colors hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-muted">
                    No results found. Try a different search.
                  </Command.Empty>

                  {items.map((item) => {
                    const Icon = typeIcons[item.type];
                    return (
                      <Command.Item
                        key={item.url}
                        value={`${item.title} ${item.description} ${item.tags.join(" ")} ${item.type}`}
                        onSelect={() => handleSelect(item.url)}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded px-3 py-3",
                          "transition-colors",
                          "data-[selected=true]:bg-mustard/20",
                        )}
                      >
                        <Icon size={18} className="mt-0.5 shrink-0 text-muted" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-sm font-bold">
                              {item.title}
                            </span>
                            <span className="rounded border border-border/50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                              {typeLabels[item.type]}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted">
                            {item.description}
                          </p>
                        </div>
                      </Command.Item>
                    );
                  })}
                </Command.List>

                <div className="flex items-center justify-between border-t border-border/30 px-4 py-2 text-xs text-muted">
                  <div className="flex items-center gap-3">
                    <span>
                      <kbd className="rounded border border-border/50 px-1 py-0.5 font-mono">↑↓</kbd>{" "}
                      Navigate
                    </span>
                    <span>
                      <kbd className="rounded border border-border/50 px-1 py-0.5 font-mono">↵</kbd>{" "}
                      Select
                    </span>
                    <span>
                      <kbd className="rounded border border-border/50 px-1 py-0.5 font-mono">esc</kbd>{" "}
                      Close
                    </span>
                  </div>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
