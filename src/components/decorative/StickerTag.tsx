import { cn } from "@/lib/utils";

type StickerVariant = "default" | "salmon" | "teal" | "mustard" | "slime" | "lavender" | "muted";

interface StickerTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StickerVariant;
  rotation?: number;
}

const variantStyles: Record<StickerVariant, string> = {
  default: "bg-background text-foreground",
  salmon: "bg-salmon text-foreground",
  teal: "bg-teal text-foreground",
  mustard: "bg-mustard text-foreground",
  slime: "bg-slime text-foreground",
  lavender: "bg-lavender text-foreground",
  muted: "bg-muted text-background",
};

export function StickerTag({
  variant = "default",
  rotation = -2,
  className,
  children,
  ...props
}: StickerTagProps) {
  return (
    <span
      className={cn("sticker", variantStyles[variant], className)}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
    </span>
  );
}
