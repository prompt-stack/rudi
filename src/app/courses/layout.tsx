import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Training Courses | RUDI - Responsible AI Implementation",
  description: "Professional AI training courses for all skill levels. Learn prompt engineering, AI workflow automation, and strategic AI implementation. 8-20 hour programs. TechCred eligible for Ohio employers.",
  keywords: "AI courses, AI training, prompt engineering course, generative AI training, AI for business, responsible AI course, AI literacy training, applied AI course, AI leadership training",
  openGraph: {
    title: "AI Training Courses | RUDI",
    description: "Professional AI training from foundation to leadership level. Ohio TechCred eligible.",
    url: "https://rudi.app/courses",
    type: "website",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}