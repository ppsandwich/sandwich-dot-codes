import { NextResponse } from "next/server";
import { fetchGitHubLanguages } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const languages = await fetchGitHubLanguages();
  return NextResponse.json(languages, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
