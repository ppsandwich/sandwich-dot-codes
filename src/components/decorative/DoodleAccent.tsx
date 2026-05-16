import { cn } from "@/lib/utils";

interface DoodleAccentProps {
  variant?: "star" | "circle" | "squiggle" | "arrow" | "x" | "dot-cluster";
  color?: string;
  size?: number;
  className?: string;
}

export function DoodleAccent({
  variant = "star",
  color = "#463F3A",
  size = 32,
  className,
}: DoodleAccentProps) {
  const renderDoodle = () => {
    switch (variant) {
      case "star":
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2 L19 12 L30 12 L21 18 L24 28 L16 22 L8 28 L11 18 L2 12 L13 12 Z"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case "circle":
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 3"
              fill="none"
            />
          </svg>
        );
      case "squiggle":
        return (
          <svg width={size * 2} height={size / 2} viewBox="0 0 64 16" fill="none">
            <path
              d="M2 8 C8 2, 16 14, 24 8 C32 2, 40 14, 48 8 C56 2, 62 14, 62 8"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );
      case "arrow":
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
              d="M6 26 C12 18, 18 12, 26 6"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M18 6 L26 6 L26 14"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case "x":
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
              d="M6 6 L26 26"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M26 6 L6 26"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        );
      case "dot-cluster":
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <circle cx="8" cy="8" r="3" fill={color} />
            <circle cx="20" cy="6" r="2" fill={color} />
            <circle cx="14" cy="16" r="3.5" fill={color} />
            <circle cx="6" cy="22" r="2" fill={color} />
            <circle cx="24" cy="20" r="2.5" fill={color} />
            <circle cx="16" cy="28" r="1.5" fill={color} />
          </svg>
        );
    }
  };

  return (
    <span className={cn("inline-block pointer-events-none", className)} aria-hidden="true">
      {renderDoodle()}
    </span>
  );
}
