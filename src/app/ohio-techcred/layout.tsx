import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ohio TechCred 2025 | AI Training Reimbursement - Get $2,000 Per Employee",
  description: "Ohio TechCred eligible AI training programs. Ohio employers receive up to $2,000 per employee reimbursement. Complete application guide, Ohio Supplier ID setup, 2025 application windows. Columbus, Cleveland, Cincinnati, Toledo, Akron.",
  keywords: "Ohio TechCred 2025, TechCred Ohio, Ohio AI training reimbursement, TechCred eligible training Ohio, Ohio employer AI grants, Ohio workforce development grants, TechCred application Ohio, Ohio Supplier ID, generative AI training Columbus Ohio, AI training Cleveland, TechCred funding Cincinnati, Ohio business technology grants",
  openGraph: {
    title: "Ohio TechCred 2025 | AI Training Reimbursement | RUDI",
    description: "Ohio employers get up to $2,000 per employee for AI training. Complete TechCred application guide and 2025 windows.",
    url: "https://rudi.app/ohio-techcred",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://rudi.app/ohio-techcred",
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Ohio",
    "geo.position": "40.4173;-82.9071",
  },
};

export default function OhioTechCredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}