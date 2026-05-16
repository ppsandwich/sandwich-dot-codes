import { cn } from "@/lib/utils";

interface ScribbleArrowProps {
  direction?: "right" | "down" | "left" | "up";
  color?: string;
  className?: string;
}

export function ScribbleArrow({
  direction = "right",
  color = "#463F3A",
  className,
}: ScribbleArrowProps) {
  const rotation: Record<string, string> = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <span
      className={cn("inline-block", rotation[direction], className)}
      aria-hidden="true"
    >
      <svg
        width="80"
        height="24"
        viewBox="0 0 80 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12 C10 8, 20 16, 30 12 C40 8, 50 16, 60 12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52 6 L62 12 L52 18"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
