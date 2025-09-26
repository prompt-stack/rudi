import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upskill Ohio Initiative | State-Funded AI Training | $180K Per Year Free",
  description: "Ohio's state-funded workforce initiative provides up to $180,000 annually in FREE AI training for Ohio employers. Train 90 employees per year at $2,000 each. 100% state-funded through TechCred. Columbus, Cleveland, Cincinnati, Akron, Toledo, Dayton.",
  keywords: "Upskill Ohio, Ohio workforce development 2025, state-funded AI training Ohio, Ohio employer grants, free AI training Ohio, Ohio TechCred 2025, Ohio business training grants, workforce upskilling Ohio, Ohio technology training, AI literacy training Ohio, generative AI training Columbus, Cleveland workforce development, Cincinnati business grants",
  openGraph: {
    title: "Upskill Ohio | State-Funded AI Training for Your Workforce",
    description: "Ohio invests $180K per company annually in AI training. Train up to 90 employees FREE through state-funded TechCred program.",
    url: "https://rudi.app/upskill-ohio",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://rudi.app/upskill-ohio",
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Ohio",
    "geo.position": "40.4173;-82.9071",
  },
};

export default function UpskillOhioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}