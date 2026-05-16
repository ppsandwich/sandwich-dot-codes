import { cn } from "@/lib/utils";

interface CrookedDividerProps {
  className?: string;
  color?: string;
  variant?: "zigzag" | "wavy" | "scribble";
}

export function CrookedDivider({
  className,
  color = "#463F3A",
  variant = "scribble",
}: CrookedDividerProps) {
  const paths: Record<string, string> = {
    zigzag:
      "M0 20 L15 5 L30 20 L45 5 L60 20 L75 5 L90 20 L105 5 L120 20 L135 5 L150 20 L165 5 L180 20 L195 5 L210 20 L225 5 L240 20 L255 5 L270 20 L285 5 L300 20",
    wavy:
      "M0 15 C25 5, 50 25, 75 15 C100 5, 125 25, 150 15 C175 5, 200 25, 225 15 C250 5, 275 25, 300 15",
    scribble:
      "M0 15 C10 8, 20 22, 35 12 C50 2, 60 20, 80 14 C100 8, 110 22, 130 10 C150 0, 160 24, 185 12 C210 0, 220 20, 245 14 C260 8, 275 22, 300 15",
  };

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 300 25"
        preserveAspectRatio="none"
        className="h-6 w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={paths[variant]}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
