"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Shell: "#89e051",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  SCSS: "#c6538c",
  Svelte: "#ff3e00",
  Lua: "#000080",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Scala: "#c22d40",
  Zig: "#ec915c",
  Nix: "#7e7eff",
  Makefile: "#427819",
  Dockerfile: "#384d54",
  Jupyter: "#DA5B0B",
};

const FALLBACK_COLORS = [
  "#6F9D9A",
  "#D6B347",
  "#D98B73",
  "#9FB06F",
  "#B8A7CC",
  "#9BB7D4",
  "#c9a87c",
  "#7b8ea8",
];

interface LanguageChartProps {
  languages: { name: string; percentage: number }[];
  className?: string;
}

export function LanguageChart({ languages, className }: LanguageChartProps) {
  if (languages.length === 0) return null;

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 70;
  const innerRadius = 40;

  let cumulativeAngle = -90;

  const segments = languages.map((lang, i) => {
    const angle = (lang.percentage / 100) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const color =
      LANGUAGE_COLORS[lang.name] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length];

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(startRad);
    const iy1 = cy + innerRadius * Math.sin(startRad);
    const ix2 = cx + innerRadius * Math.cos(endRad);
    const iy2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const d = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");

    return { d, color, ...lang };
  });

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-6 sm:flex-row sm:items-start", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-[180px] w-[180px] shrink-0"
        role="img"
        aria-label="Pie chart showing code breakdown by language"
      >
        {segments.map((seg) => (
          <path
            key={seg.name}
            d={seg.d}
            fill={seg.color}
            stroke="var(--background, #F5EFE4)"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 sm:flex-col">
        {segments.map((seg) => (
          <div key={seg.name} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm border border-border/20"
              style={{ backgroundColor: seg.color }}
            />
            <span className="font-mono text-xs font-bold">{seg.name}</span>
            <span className="text-xs text-muted">{seg.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
