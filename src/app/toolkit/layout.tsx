import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Toolkit | RUDI - Templates, Guides & Resources",
  description: "Free AI implementation toolkit with templates, policy guides, prompt libraries, and practical resources. Everything you need for responsible AI adoption in your organization.",
  keywords: "AI toolkit, AI templates, AI policy templates, prompt library, AI implementation guides, AI resources, AI governance templates, free AI tools",
  openGraph: {
    title: "Free AI Toolkit | RUDI",
    description: "Free templates, guides, and resources for AI implementation.",
    url: "https://rudi.app/toolkit",
    type: "website",
  },
};

export default function ToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}