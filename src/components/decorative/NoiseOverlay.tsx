"use client";

import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  className?: string;
}

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  return <div className={cn("noise-overlay", className)} aria-hidden="true" />;
}
