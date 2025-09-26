import type { Metadata, Viewport } from "next";
import "./reset.css";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "RUDI - Responsible AI Training & Implementation",
  description: "Professional AI training and certificate programs. TechCred eligible courses in prompt engineering, AI implementation, and responsible AI governance. Ohio employers get up to $2,000 per employee.",
  keywords: "AI training, AI certificates, responsible AI, generative AI training, TechCred eligible, Ohio TechCred, AI literacy, prompt engineering, AI implementation, AI governance, workplace AI",
  authors: [{ name: "RUDI" }],
  metadataBase: new URL('https://rudi.app'),
  openGraph: {
    title: "RUDI - Responsible AI Training & Implementation",
    description: "Professional AI training and certificates. TechCred eligible for Ohio employers.",
    type: "website",
    url: "https://rudi.app",
    siteName: "RUDI",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUDI - Responsible AI Training",
    description: "Professional AI training and certificate programs. TechCred eligible.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}