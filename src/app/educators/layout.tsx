import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Training for Educators | RUDI - Teach Responsible AI",
  description: "Empower educators with AI literacy training and resources. Learn to integrate responsible AI in education, create curriculum, and prepare students for an AI-powered future.",
  keywords: "AI for educators, AI in education, teaching AI, AI curriculum, educator AI training, AI literacy for teachers, responsible AI education, generative AI teaching resources",
  openGraph: {
    title: "AI Training for Educators | RUDI",
    description: "Empower educators with AI literacy training and teaching resources.",
    url: "https://rudi.app/educators",
    type: "website",
  },
};

export default function EducatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}