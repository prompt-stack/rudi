import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Research & Insights | RUDI - Responsible AI Studies",
  description: "Latest research, case studies, and insights on responsible AI implementation. Explore data-driven findings on AI adoption, effectiveness, and best practices in workplace AI integration.",
  keywords: "AI research, responsible AI research, AI case studies, generative AI insights, AI implementation research, AI effectiveness studies, workplace AI research",
  openGraph: {
    title: "AI Research & Insights | RUDI",
    description: "Research, case studies, and insights on responsible AI implementation.",
    url: "https://rudi.app/research",
    type: "website",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}