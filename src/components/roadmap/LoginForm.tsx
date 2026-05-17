"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  onAuthChange: (authenticated: boolean) => void;
  isAuthenticated: boolean;
}

export function LoginForm({ onAuthChange, isAuthenticated }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onAuthChange(true);
        setPassword("");
      } else {
        setError("Nope, that's not it.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    onAuthChange(false);
  }

  if (isAuthenticated) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleLogout}
        className={cn(
          "flex items-center gap-2 border-3 border-border px-4 py-2",
          "font-heading text-sm font-bold uppercase tracking-wider",
          "transition-all hover:bg-salmon/20 hover:shadow-tactile-sm",
          "rotate-[0.5deg]",
        )}
      >
        <LogOut size={16} />
        Log out
      </motion.button>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleLogin}
      className={cn(
        "mx-auto max-w-sm border-3 border-border bg-background p-6 paper-grain shadow-tactile",
        "rotate-[-0.5deg]",
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-border bg-mustard/20">
          <Lock size={18} className="text-foreground" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-black">Password, please</h3>
          <p className="text-xs text-muted">This board is for the wizard behind the curtain.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Enter password"
          className={cn(
            "w-full border-3 border-border bg-background px-4 py-2.5 font-body text-sm text-foreground",
            "outline-none transition-all focus:shadow-tactile-sm focus:rotate-[0.3deg]",
            error && "border-salmon",
          )}
          autoFocus
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-xs font-bold text-salmon rotate-[-1deg]"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={isLoading || !password}
          className={cn(
            "border-3 border-border bg-mustard/30 px-4 py-2.5",
            "font-heading text-sm font-bold uppercase tracking-wider",
            "transition-all hover:bg-mustard/50 hover:shadow-tactile-sm hover:rotate-[-0.5deg]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isLoading ? "Checking..." : "Let me in"}
        </button>
      </div>
    </motion.form>
  );
}
