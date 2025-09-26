import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Training Resources | RUDI - Free PDFs, Guides & Tools",
  description: "Free AI training resources including PDFs, guides, toolkits, and educational materials. Download comprehensive resources for responsible AI implementation and prompt engineering.",
  keywords: "AI resources, AI training PDFs, AI guides, prompt engineering resources, AI toolkit, free AI training materials, AI education resources, generative AI guides",
  openGraph: {
    title: "Free AI Training Resources | RUDI",
    description: "Free PDFs, guides, toolkits, and educational materials for AI training and implementation.",
    url: "https://rudi.app/resources",
    type: "website",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}