'use client';

import { Suspense } from 'react';
import AssessmentSurvey from '@/frontend/components/features/assessment/AssessmentSurvey';

export default function SurveyPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-gray-600">Loading assessment...</div>
      </div>
    }>
      <AssessmentSurvey />
    </Suspense>
  );
}