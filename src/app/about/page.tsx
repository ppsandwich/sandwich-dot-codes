import type { Metadata } from "next";
import { AboutPageContent } from "@/components/layout/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description: "Who makes Sandwich Codes and why.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
