import type { Metadata } from "next";
import { MusicPageContent } from "@/components/music/MusicPageContent";

export const metadata: Metadata = {
  title: "Music",
  description: "Play original music tracks and sound catalogs by Sandwich Codes.",
};

export default function MusicPage() {
  return <MusicPageContent />;
}
