import { cn } from "@/lib/utils";

interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rotation?: number;
  shadow?: boolean;
}

export function PaperCard({
  rotation = -0.5,
  shadow = true,
  className,
  children,
  ...props
}: PaperCardProps) {
  return (
    <div
      className={cn(
        "relative border-3 border-border bg-background p-6",
        "transition-transform duration-300 ease-out",
        "hover:rotate-0 hover:scale-[1.02]",
        shadow && "shadow-tactile",
        "paper-grain",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
    </div>
  );
}
