import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started with AI Training | RUDI - Contact Us",
  description: "Start your AI transformation journey. Get personalized training recommendations, TechCred application support, and expert guidance for your organization's AI implementation.",
  keywords: "get started AI training, AI consultation, TechCred application help, AI implementation support, contact RUDI, AI training inquiry",
  openGraph: {
    title: "Get Started with AI Training | RUDI",
    description: "Start your AI transformation journey with personalized recommendations.",
    url: "https://rudi.app/get-started",
    type: "website",
  },
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}