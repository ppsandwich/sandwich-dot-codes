import { NextResponse } from "next/server";
import { isValidAuth } from "../auth/route";

export const revalidate = 0;

interface KanbanCard {
  id: string;
  text: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBoard {
  columns: KanbanColumn[];
}

const GITHUB_OWNER = "silentsoar";
const GITHUB_REPO = "sandwich-dot-codes";
const FILE_PATH = "content/roadmap.json";

const githubHeaders = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

async function readBoard(): Promise<KanbanBoard> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), FILE_PATH);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { columns: [] };
  }
}

async function getFileSha(): Promise<string | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      { headers: githubHeaders, next: { revalidate: 0 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.sha;
  } catch {
    return null;
  }
}

async function writeBoard(board: KanbanBoard): Promise<{ success: boolean; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { success: false, error: "No GITHUB_TOKEN configured — changes are session-only" };
  }

  const sha = await getFileSha();
  if (!sha) {
    return { success: false, error: "Could not read current file from GitHub" };
  }

  const content = Buffer.from(JSON.stringify(board, null, 2) + "\n").toString("base64");

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          ...githubHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update roadmap board",
          content,
          sha,
        }),
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || `GitHub API ${res.status}` };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to reach GitHub API" };
  }
}

export async function GET() {
  const board = await readBoard();
  return NextResponse.json(board, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!isValidAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const board: KanbanBoard = await request.json();
  const result = await writeBoard(board);

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
    headers: { "Cache-Control": "no-store" },
  });
}
