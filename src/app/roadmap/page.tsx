import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { RoadmapPageContent } from "@/components/roadmap/RoadmapPageContent";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "The big board of things to build, fix, and dream up.",
};

const ROADMAP_PASSWORD = process.env.ROADMAP_PASSWORD || "sandwich";
const COOKIE_NAME = "roadmap_auth";
const SALT = "sandwich-codes-roadmap-2026";

function hashPassword(password: string): string {
  return createHash("sha256").update(password + SALT).digest("hex");
}

function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  if (!authCookie) return false;
  return authCookie.value === hashPassword(ROADMAP_PASSWORD);
}

function readBoard() {
  try {
    const filePath = join(process.cwd(), "content", "roadmap.json");
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { columns: [] };
  }
}

export default function RoadmapPage() {
  const board = readBoard();
  const auth = isAuthenticated();

  return <RoadmapPageContent initialBoard={board} initialAuth={auth} />;
}
