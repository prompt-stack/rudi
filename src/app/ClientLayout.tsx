'use client';

import { usePathname } from 'next/navigation';
import { Header } from "@/frontend/components/layouts";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAssessmentPage = pathname?.startsWith('/assessment');

  return (
    <>
      {!isAssessmentPage && <Header />}
      <div className={!isAssessmentPage ? "pt-16" : ""}>
        {children}
      </div>
    </>
  );
}