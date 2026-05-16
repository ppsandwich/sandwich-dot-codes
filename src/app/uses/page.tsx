import type { Metadata } from "next";
import { UsesPageContent } from "@/components/layout/UsesPageContent";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and tools behind Sandwich Codes.",
};

export default function UsesPage() {
  return <UsesPageContent />;
}
