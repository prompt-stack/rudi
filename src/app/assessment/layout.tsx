import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment - RUDI",
  description: "Evaluate your AI literacy and readiness across key dimensions",
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}