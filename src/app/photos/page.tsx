import type { Metadata } from "next";
import { PhotosPageContent } from "@/components/photos/PhotosPageContent";
import { getPhotoPortfolio } from "@/lib/photos";

export const revalidate = 60 * 60 * 12;

export const metadata: Metadata = {
  title: "Photos",
  description: "A portfolio of Dylan Gibbs' photography, pulled from his public 500px profile.",
};

export default async function PhotosPage() {
  const portfolio = await getPhotoPortfolio();

  return <PhotosPageContent portfolio={portfolio} />;
}
