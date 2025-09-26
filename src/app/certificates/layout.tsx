import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Certificates | RUDI - Professional AI Training for Respponsible Use",
  description: "Earn industry-recognized AI certificates in responsible AI implementation. Stackable certificates from foundation to leadership level. TechCred eligible for Ohio employers - up to $2,000 reimbursement per employee.",
  keywords: "AI certificates, AI training certificates, professional AI certificates, TechCred eligible, Ohio TechCred, responsible AI certificate, AI literacy certificate, applied AI practitioner certificate, AI integration leader certificate",
  openGraph: {
    title: "Professional AI Certificates | RUDI",
    description: "Industry-recognized AI certificates. Stackable learning path from foundation to leadership. Ohio TechCred eligible.",
    url: "https://rudi.app/certificates",
    type: "website",
  },
};

export default function CredentialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}