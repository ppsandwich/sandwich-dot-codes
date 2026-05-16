"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WobbleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rotation?: number;
}

export function WobbleCard({
  rotation = -1,
  className,
  children,
  ...props
}: WobbleCardProps) {
  return (
    <motion.div
      className={cn(
        "relative border-3 border-border bg-background p-6 shadow-tactile",
        "cursor-pointer paper-grain",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{
        rotate: 0,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
