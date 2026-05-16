import type { Metadata } from "next";
import { ContactPageContent } from "@/components/layout/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sandwich Codes.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
