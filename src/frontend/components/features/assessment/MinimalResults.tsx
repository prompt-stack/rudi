import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Share2, RefreshCw, Building2 } from 'lucide-react';
import { AssessmentResult, RadarChartData } from '@/frontend/data/assessment/types';

interface MinimalResultsProps {
  results: AssessmentResult;
  radarData: RadarChartData[];
  onRetake: () => void;
  shareUrl?: string;
  orgName?: string | null;
}

export default function MinimalResults({ results, radarData, onRetake, shareUrl, orgName }: MinimalResultsProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showTeamLinkCopied, setShowTeamLinkCopied] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  const handleShare = async () => {
    if (!shareUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My AI Readiness Results',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (err) {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  const handleCreateOrgLink = () => {
    if (newOrgName.trim()) {
      window.location.href = `/assessment/survey?org=${encodeURIComponent(newOrgName)}`;
    }
  };

  const handleCopyTeamLink = async () => {
    if (!newOrgName.trim()) return;

    const teamLink = `${window.location.origin}/assessment/survey?org=${encodeURIComponent(newOrgName)}`;
    try {
      await navigator.clipboard.writeText(teamLink);
      setShowTeamLinkCopied(true);
      setTimeout(() => setShowTeamLinkCopied(false), 2000);
    } catch (err) {
      alert(`Share this link with your team: ${teamLink}`);
    }
  };

  return (
    <div className="min-h-screen md:fixed md:inset-0 bg-gradient-to-b from-gray-50/50 to-white p-4 md:p-6 md:flex md:items-center md:justify-center">
      <div className="bg-white shadow-xl rounded-xl border border-gray-100 w-full md:w-auto mx-auto p-6 md:p-6 md:max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-light text-gray-900 mb-2">{results.levelInfo.label}</h1>
                <p className="text-sm md:text-base text-gray-600">
                  Level {results.level === 'no_exposure' ? '1' : results.level === 'pre_beginner' ? '2' : results.level === 'beginner' ? '3' : results.level === 'intermediate' ? '4' : '5'} • {(results.scores.overall / 20).toFixed(1)} Overall Readiness
                </p>
              </div>
              <button
                onClick={() => setShowOrgModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto justify-center"
              >
                <Building2 className="w-4 h-4" />
                Create for Team
              </button>
            </div>
          </div>

          {/* Main Grid with Radar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Radar Chart */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Competency Map</h3>
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100">
                <div className="h-[280px] md:h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                      <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 500 }}
                      />
                      <PolarRadiusAxis
                        domain={[0, 5]}
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        axisLine={false}
                      />
                      <Radar
                        dataKey="score"
                        stroke="#111827"
                        fill="#374151"
                        fillOpacity={0.15}
                        strokeWidth={2.5}
                        animationDuration={800}
                        animationEasing="ease-out"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="space-y-5 md:space-y-6">
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <div className="text-3xl md:text-5xl font-light text-gray-900">{(results.scores.operational / 20).toFixed(1)}</div>
                  <div className="text-xs text-gray-400">/5</div>
                </div>
                <div className="text-sm md:text-base font-medium text-gray-900">Operational</div>
                <div className="text-xs md:text-sm text-gray-500 mb-3">Tools & practical skills</div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-gray-900 rounded-full transition-all" style={{ width: `${(results.scores.operational / 100) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <div className="text-3xl md:text-5xl font-light text-gray-900">{(results.scores.conceptual / 20).toFixed(1)}</div>
                  <div className="text-xs text-gray-400">/5</div>
                </div>
                <div className="text-sm md:text-base font-medium text-gray-900">Conceptual</div>
                <div className="text-xs md:text-sm text-gray-500 mb-3">Understanding & principles</div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-gray-900 rounded-full transition-all" style={{ width: `${(results.scores.conceptual / 100) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <div className="text-3xl md:text-5xl font-light text-gray-900">{(results.scores.governance / 20).toFixed(1)}</div>
                  <div className="text-xs text-gray-400">/5</div>
                </div>
                <div className="text-sm md:text-base font-medium text-gray-900">Governance</div>
                <div className="text-xs md:text-sm text-gray-500 mb-3">Ethics & responsible use</div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-gray-900 rounded-full transition-all" style={{ width: `${(results.scores.governance / 100) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations and Actions */}
          <div className="border-t border-gray-200 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Path */}
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Your Learning Path</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Build hands-on experience with AI tools and daily practice</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Explore advanced prompt engineering techniques</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Strengthen governance and ethical AI knowledge</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 md:justify-center">
                <button
                  onClick={handleShare}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  {showCopied ? 'Link Copied!' : 'Share Results'}
                </button>
                <button
                  onClick={onRetake}
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Create Team Assessment</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Start a new assessment for your organization or team members.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value.slice(0, 50))}
                placeholder="e.g., Acme Corporation"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{newOrgName.length}/50 characters</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Your team assessment will include:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Organization name in the assessment</li>
                <li>• Shareable link for team members</li>
                <li>• Individual results tracking</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={handleCreateOrgLink}
                  disabled={!newOrgName.trim()}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 ${
                    newOrgName.trim()
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Start Assessment
                </button>
                <button
                  onClick={handleCopyTeamLink}
                  disabled={!newOrgName.trim()}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 ${
                    newOrgName.trim()
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  {showTeamLinkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              <button
                onClick={() => {
                  setShowOrgModal(false);
                  setNewOrgName('');
                  setShowTeamLinkCopied(false);
                }}
                className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}