import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ROADMAP_PASSWORD = process.env.ROADMAP_PASSWORD || "sandwich";
const COOKIE_NAME = "roadmap_auth";
const SALT = "sandwich-codes-roadmap-2026";

function hashPassword(password: string): string {
  return createHash("sha256").update(password + SALT).digest("hex");
}

export function isValidAuth(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  if (!authCookie) return false;
  return authCookie.value === hashPassword(ROADMAP_PASSWORD);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password !== ROADMAP_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const hashed = hashPassword(password);
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, hashed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
