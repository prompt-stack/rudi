import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RUDI Framework | Responsible Use of Digital Intelligence",
  description: "The RUDI Framework provides a practical approach to responsible AI implementation. Learn the principles, methodology, and best practices for ethical and effective generative AI adoption in your organization.",
  keywords: "RUDI framework, responsible AI framework, AI governance framework, AI implementation methodology, responsible AI principles, AI ethics framework, generative AI governance",
  openGraph: {
    title: "RUDI Framework | Responsible AI Implementation",
    description: "Practical framework for responsible AI implementation. Proven methodology for ethical and effective AI adoption.",
    url: "https://rudi.app/framework",
    type: "website",
  },
};

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}