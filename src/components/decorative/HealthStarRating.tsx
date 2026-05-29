"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HealthStarRatingProps {
  commitCount?: number;
  className?: string;
}

function StarIcon({ fill }: { fill: "full" | "half" | "empty" }) {
  if (fill === "half") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#F5C542" />
            <stop offset="50%" stopColor="white" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#halfStar)"
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={fill === "full" ? "#F5C542" : "white"}
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStars(count: number): ("full" | "half" | "empty")[] {
  const rating = Math.min(count / 10, 5);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const stars: ("full" | "half" | "empty")[] = [];

  for (let i = 0; i < fullStars; i++) stars.push("full");
  if (hasHalf && stars.length < 5) stars.push("half");
  while (stars.length < 5) stars.push("empty");

  return stars;
}

export function HealthStarRating({ commitCount, className }: HealthStarRatingProps) {
  const [count, setCount] = useState(commitCount ?? 0);

  useEffect(() => {
    if (commitCount === undefined) {
      fetch("/api/github-weekly-commits")
        .then((res) => (res.ok ? res.json() : { count: 0 }))
        .then((data) => setCount(data.count ?? 0))
        .catch(() => {});
    }
  }, [commitCount]);

  const stars = getStars(count);

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-1 rounded-md border-2 border-white/20 bg-[#1B5E50] px-3 py-2 shadow-lg",
        className,
      )}
      title={`${count} commits this week`}
    >
      <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-white">
        Health Star Rating
      </span>
      <div className="flex gap-0.5">
        {stars.map((fill, i) => (
          <div key={i} className="h-5 w-5">
            <StarIcon fill={fill} />
          </div>
        ))}
      </div>
      <span className="text-[10px] text-white/80">
        {count} GitHub commit{count !== 1 ? "s" : ""} this week
      </span>
    </div>
  );
}
