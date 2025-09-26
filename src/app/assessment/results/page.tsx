'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import MinimalResults from '@/frontend/components/features/assessment/MinimalResults';
import { Level, LevelConfig } from '@/frontend/data/assessment/types';

function ResultsContent() {
  const searchParams = useSearchParams();
  const [shareUrl, setShareUrl] = useState<string>('');

  // Get scores from URL parameters
  const operational = parseInt(searchParams.get('o') || '0');
  const conceptual = parseInt(searchParams.get('c') || '0');
  const governance = parseInt(searchParams.get('g') || '0');
  const level = searchParams.get('l') || 'beginner';
  const orgName = searchParams.get('org');

  // Set share URL after component mounts
  useEffect(() => {
    const url = `${window.location.origin}/assessment/results?o=${operational}&c=${conceptual}&g=${governance}&l=${level}${orgName ? `&org=${encodeURIComponent(orgName)}` : ''}`;
    setShareUrl(url);
  }, [operational, conceptual, governance, level, orgName]);

  // Reconstruct results object
  const results = {
    scores: {
      operational,
      conceptual,
      governance,
      overall: Math.round(operational * 0.4 + conceptual * 0.3 + governance * 0.3)
    },
    level: level as Level,
    levelInfo: getLevelInfo(level)
  };

  // Convert to radar data
  const radarData = [
    { dimension: 'Operational', score: operational / 20 },
    { dimension: 'Conceptual', score: conceptual / 20 },
    { dimension: 'Governance', score: governance / 20 }
  ];

  return (
    <MinimalResults
      results={results}
      radarData={radarData}
      onRetake={() => window.location.href = '/assessment'}
      shareUrl={shareUrl}
      orgName={orgName}
    />
  );
}

function getLevelInfo(level: string): LevelConfig {
  const levels: Record<string, LevelConfig> = {
    no_exposure: {
      min: 0,
      max: 20,
      label: "AI Novice",
      description: "Just starting your AI journey",
      color: "red"
    },
    pre_beginner: {
      min: 21,
      max: 35,
      label: "AI Curious",
      description: "Beginning to explore AI possibilities",
      color: "orange"
    },
    beginner: {
      min: 36,
      max: 50,
      label: "AI Explorer",
      description: "Actively learning and experimenting with AI",
      color: "yellow"
    },
    intermediate: {
      min: 51,
      max: 75,
      label: "AI Practitioner",
      description: "Regularly using AI in your work",
      color: "blue"
    },
    advanced: {
      min: 76,
      max: 100,
      label: "AI Leader",
      description: "Leading AI adoption and innovation",
      color: "green"
    }
  };

  return levels[level] || levels.beginner;
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-gray-600">Loading results...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}