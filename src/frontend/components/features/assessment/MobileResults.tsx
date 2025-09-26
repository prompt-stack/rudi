import { useState } from 'react';
import { Share2, RefreshCw, ChevronRight } from 'lucide-react';

interface MobileResultsProps {
  results: any;
  onRetake: () => void;
  shareUrl?: string;
  orgName?: string | null;
}

export default function MobileResults({ results, onRetake, shareUrl, orgName }: MobileResultsProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Readiness Assessment',
          text: `I scored ${results.scores.overall}% as an ${results.levelInfo.label}`,
          url: shareUrl
        });
      } catch (err) {
        // Share cancelled or failed
      }
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      // Fallback to copy if clipboard API is available
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Unable to share. Please copy this link: ' + shareUrl);
      }
    } else {
      // Final fallback - show alert with URL
      alert('Share this link: ' + shareUrl);
    }
  };

  // Level colors
  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'no_exposure': 'from-red-500 to-red-600',
      'pre_beginner': 'from-orange-500 to-orange-600',
      'beginner': 'from-yellow-500 to-yellow-600',
      'intermediate': 'from-blue-500 to-blue-600',
      'advanced': 'from-green-500 to-green-600'
    };
    return colors[level] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-xl font-light text-gray-900">
            Assessment <span className="font-medium">Complete</span>
          </h1>
          {orgName && (
            <p className="text-sm text-gray-600 mt-1">{orgName}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Level Card */}
        <div className={`bg-gradient-to-r ${getLevelColor(results.level)} rounded-xl p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Your Level</p>
              <h2 className="text-2xl font-bold">{results.levelInfo.label}</h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{results.scores.overall}%</div>
              <p className="text-white/80 text-xs">Overall Score</p>
            </div>
          </div>
          <p className="text-white/90 text-sm">{results.levelInfo.description}</p>
        </div>

        {/* Dimension Scores */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Your Strengths</h3>

          <div className="space-y-4">
            {/* Operational */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Operational</p>
                  <p className="text-xs text-gray-600">Tools & practical skills</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{results.scores.operational}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-full transition-all"
                  style={{ width: `${results.scores.operational}%` }}
                />
              </div>
            </div>

            {/* Conceptual */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Conceptual</p>
                  <p className="text-xs text-gray-600">Understanding AI</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{results.scores.conceptual}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-full transition-all"
                  style={{ width: `${results.scores.conceptual}%` }}
                />
              </div>
            </div>

            {/* Governance */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Governance</p>
                  <p className="text-xs text-gray-600">Responsible practices</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{results.scores.governance}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-full transition-all"
                  style={{ width: `${results.scores.governance}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Recommended Next Steps</h3>
          <p className="text-sm text-gray-600 mb-4">
            {results.scores.overall < 30
              ? "Start with our AI Literacy Foundation course to build essential understanding."
              : results.scores.overall < 50
              ? "You're ready for hands-on learning. Try our Applied AI workshops."
              : results.scores.overall < 70
              ? "Advance your skills with specialized AI integration training."
              : "Consider our AI Leadership certification to guide transformation."}
          </p>
          <a
            href="/courses"
            className="inline-flex items-center text-sm font-medium text-navy-700 hover:text-navy-800"
          >
            View Recommended Courses
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-navy-800 text-white px-4 py-3 rounded-xl font-medium hover:bg-navy-900 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {showCopied ? 'Link Copied!' : 'Share Results'}
          </button>
          <button
            onClick={onRetake}
            className="flex-1 bg-white text-gray-700 border border-gray-200 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake
          </button>
        </div>
      </div>
    </div>
  );
}