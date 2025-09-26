import { useState, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { Share2, RefreshCw, ChevronRight, Monitor, FileText, Building2 } from 'lucide-react';
import { AssessmentResult, RadarChartData } from '@/frontend/data/assessment/types';

interface ArtboardResultsProps {
  results: AssessmentResult;
  radarData: RadarChartData[];
  onRetake: () => void;
  shareUrl?: string;
  orgName?: string | null;
}

export default function ArtboardResults({ results, radarData, onRetake, shareUrl, orgName }: ArtboardResultsProps) {
  const [viewMode, setViewMode] = useState<'screen' | 'document'>('screen');
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [generatedOrgLink, setGeneratedOrgLink] = useState<string>('');
  const [newOrgName, setNewOrgName] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Clean level indicators
  const getLevelIndicator = (level: string) => {
    const indicators: Record<string, string> = {
      'no_exposure': 'L1',
      'pre_beginner': 'L2',
      'beginner': 'L3',
      'intermediate': 'L4',
      'advanced': 'L5'
    };
    return indicators[level] || 'L3';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white flex flex-col items-center justify-center p-4 md:fixed md:inset-0 md:overflow-hidden">
      {/* Format Toggle - Hide on mobile and print */}
      <div className="hidden md:flex print:hidden absolute top-4 right-4 z-10 gap-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <button
          onClick={() => setViewMode('screen')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            viewMode === 'screen'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          16:9
        </button>
        <button
          onClick={() => setViewMode('document')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            viewMode === 'document'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          8.5×11
        </button>
      </div>

      {/* Artboard Container - Responsive */}
      <div className="artboard-container w-full md:w-auto" style={{
        width: !isMounted || window.innerWidth < 768
          ? '100%'
          : viewMode === 'screen'
            ? 'min(calc(100vw - 32px), calc((100vh - 40px) * 1.778))'
            : '8.5in',
        maxWidth: !isMounted || window.innerWidth < 768
          ? 'none'
          : viewMode === 'screen'
            ? 'none'
            : '8.5in',
        height: !isMounted || window.innerWidth < 768
          ? 'auto'
          : viewMode === 'screen'
            ? 'calc(100vh - 40px)'
            : 'auto',
        minHeight: viewMode === 'document' ? '11in' : 'auto',
        maxHeight: viewMode === 'document' ? 'calc(100vh - 80px)' : 'calc(100vh - 40px)',
        overflow: viewMode === 'document' ? 'auto' : 'hidden'
      }}>
        <div
          className="artboard bg-white shadow-xl rounded-xl relative mx-auto flex flex-col border border-gray-100 p-4 md:p-8"
          style={{
            padding: !isMounted || window.innerWidth < 768
              ? '16px'
              : viewMode === 'screen' ? '32px' : '24px',
            height: viewMode === 'screen' ? '100%' : 'auto',
            minHeight: viewMode === 'document' ? '11in' : 'auto'
          }}
        >
          {/* Header Section */}
          <div className={`${viewMode === 'screen' ? 'mb-4' : 'mb-6'} flex-shrink-0`}>
            {/* Title and Level Badge - Side by Side */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-left">
                <h1 className={`${viewMode === 'screen' ? 'text-xl' : 'text-2xl'} font-light tracking-tight text-gray-900`}>
                  Assessment <span className="font-medium">Complete</span>
                </h1>
                <p className={`${viewMode === 'screen' ? 'text-xs' : 'text-sm'} text-gray-500`}>Your personalized AI readiness analysis</p>
              </div>

              {/* Level Badge */}
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-lg ${viewMode === 'screen' ? 'px-3 py-2' : 'px-2 py-1.5'} border border-gray-100`}>
                <div className={`${viewMode === 'screen' ? 'w-9 h-9' : 'w-8 h-8'} rounded-lg bg-gray-900 text-white flex items-center justify-center font-semibold ${viewMode === 'screen' ? 'text-xs' : 'text-xs'}`}>
                  {getLevelIndicator(results.level)}
                </div>
                <div className="text-left">
                  <h2 className={`${viewMode === 'screen' ? 'text-sm' : 'text-sm'} font-semibold text-gray-900`}>{results.levelInfo.label}</h2>
                  <p className={`${viewMode === 'screen' ? 'text-[10px]' : 'text-[10px]'} text-gray-600`}>{results.levelInfo.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className={`${viewMode === 'screen' ? 'mb-3' : 'mb-6'} flex-shrink-0`}>
            <div className={`bg-gradient-to-r from-gray-50/70 to-transparent rounded-lg ${viewMode === 'screen' ? 'p-3' : 'p-2'} border border-gray-100`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`${viewMode === 'screen' ? 'text-sm' : 'text-sm'} font-semibold text-gray-900`}>Overall Readiness</h3>
                  <p className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} text-gray-600`}>Combined score across all dimensions</p>
                </div>
                <div className="text-right">
                  <div className={`${viewMode === 'screen' ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>{results.scores.overall}%</div>
                  <div className={`${viewMode === 'screen' ? 'text-xs' : 'text-[10px]'} font-medium text-gray-600`}>
                    {results.scores.overall < 30 ? "Foundation" :
                     results.scores.overall < 50 ? "Developing" :
                     results.scores.overall < 70 ? "Intermediate" :
                     results.scores.overall < 85 ? "Advanced" :
                     "Expert"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={`grid ${viewMode === 'screen' ? 'lg:grid-cols-2' : 'md:grid-cols-2'} ${viewMode === 'screen' ? 'gap-4' : 'gap-6'} ${viewMode === 'screen' ? 'mb-4' : 'mb-6'}`}>
            {/* Radar Chart */}
            <div>
              <h3 className={`${viewMode === 'screen' ? 'text-sm mb-2' : 'text-sm mb-1'} font-semibold text-gray-900`}>Competency Map</h3>
              <div className={`bg-gradient-to-br from-gray-50/50 to-white rounded-lg ${viewMode === 'screen' ? 'p-3' : 'p-4'} border border-gray-100`}>
                <div className={viewMode === 'screen' ? 'h-[240px]' : 'h-[260px]'}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 20, right: 70, bottom: 20, left: 70 }}>
                      <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fontSize: viewMode === 'screen' ? 12 : 11, fill: '#6b7280' }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 5]}
                        tickCount={6}
                        axisLine={false}
                        tick={{ fontSize: viewMode === 'screen' ? 10 : 9, fill: '#9ca3af' }}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#111827"
                        fill="#374151"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Dimension Scores */}
            <div>
              <h3 className={`${viewMode === 'screen' ? 'text-sm mb-2' : 'text-sm mb-2'} font-semibold text-gray-900`}>Dimension Breakdown</h3>
              <div className={viewMode === 'screen' ? 'space-y-2' : 'space-y-3'}>
                {/* Operational */}
                <div className={`bg-gradient-to-r from-gray-50/50 to-white rounded-lg ${viewMode === 'screen' ? 'p-2' : 'p-3'} border border-gray-100`}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <div className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} font-semibold text-gray-900`}>Operational</div>
                      <div className="text-[10px] text-gray-600">Hands-on skills & tools</div>
                    </div>
                    <div className={`${viewMode === 'screen' ? 'text-base' : 'text-sm'} font-bold text-gray-900`}>{results.scores.operational}%</div>
                  </div>
                  <div className="bg-gray-200/60 rounded-full h-1 mb-0.5">
                    <div
                      className="bg-gray-900 h-1 rounded-full transition-all"
                      style={{ width: `${results.scores.operational}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600">
                    {results.scores.operational < 20 ? "No experience" :
                     results.scores.operational < 40 ? "Limited experience" :
                     results.scores.operational < 60 ? "Developing skills" :
                     results.scores.operational < 80 ? "Proficient usage" :
                     "Expert practitioner"}
                  </p>
                </div>

                {/* Conceptual */}
                <div className={`bg-gradient-to-r from-gray-50/50 to-white rounded-lg ${viewMode === 'screen' ? 'p-2' : 'p-3'} border border-gray-100`}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <div className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} font-semibold text-gray-900`}>Conceptual</div>
                      <div className="text-[10px] text-gray-600">Understanding & principles</div>
                    </div>
                    <div className={`${viewMode === 'screen' ? 'text-base' : 'text-sm'} font-bold text-gray-900`}>{results.scores.conceptual}%</div>
                  </div>
                  <div className="bg-gray-200/60 rounded-full h-1 mb-0.5">
                    <div
                      className="bg-gray-900 h-1 rounded-full transition-all"
                      style={{ width: `${results.scores.conceptual}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600">
                    {results.scores.conceptual < 20 ? "Minimal understanding" :
                     results.scores.conceptual < 40 ? "Basic knowledge" :
                     results.scores.conceptual < 60 ? "Growing knowledge" :
                     results.scores.conceptual < 80 ? "Strong foundation" :
                     "Deep expertise"}
                  </p>
                </div>

                {/* Governance */}
                <div className={`bg-gradient-to-r from-gray-50/50 to-white rounded-lg ${viewMode === 'screen' ? 'p-2' : 'p-3'} border border-gray-100`}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <div className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} font-semibold text-gray-900`}>Governance</div>
                      <div className="text-[10px] text-gray-600">Ethics & responsible use</div>
                    </div>
                    <div className={`${viewMode === 'screen' ? 'text-base' : 'text-sm'} font-bold text-gray-900`}>{results.scores.governance}%</div>
                  </div>
                  <div className="bg-gray-200/60 rounded-full h-1 mb-0.5">
                    <div
                      className="bg-gray-900 h-1 rounded-full transition-all"
                      style={{ width: `${results.scores.governance}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600">
                    {results.scores.governance < 20 ? "Limited awareness" :
                     results.scores.governance < 40 ? "Growing awareness" :
                     results.scores.governance < 60 ? "Risk-conscious" :
                     results.scores.governance < 80 ? "Strong practices" :
                     "Ethics leader"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className={`${viewMode === 'screen' ? 'mb-2' : 'mb-1'} flex-shrink-0`}>
            <h3 className={`${viewMode === 'screen' ? 'text-sm mb-2' : 'text-xs mb-0.5'} font-semibold text-gray-900`}>Your Learning Path</h3>
            <div className={`bg-gradient-to-r from-gray-50/70 to-gray-50/30 rounded-lg ${viewMode === 'screen' ? 'p-3' : 'p-1.5'} border border-gray-100`}>
              <div className={viewMode === 'screen' ? 'space-y-1.5' : 'space-y-1'}>
                {results.scores.operational < 50 && (
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className={`${viewMode === 'screen' ? 'w-3 h-3' : 'w-2.5 h-2.5'} text-gray-600 mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} text-gray-800 font-medium`}>Build Practical Skills</p>
                      <p className={`${viewMode === 'screen' ? 'text-[10px]' : 'text-[10px]'} text-gray-600`}>Start with guided AI tool tutorials and practice daily prompting</p>
                    </div>
                  </div>
                )}
                {results.scores.conceptual < 50 && (
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className={`${viewMode === 'screen' ? 'w-3 h-3' : 'w-2.5 h-2.5'} text-gray-600 mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} text-gray-800 font-medium`}>Strengthen Foundations</p>
                      <p className={`${viewMode === 'screen' ? 'text-[10px]' : 'text-[10px]'} text-gray-600`}>Learn core AI concepts, model types, and technical principles</p>
                    </div>
                  </div>
                )}
                {results.scores.governance < 50 && (
                  <div className="flex items-start gap-1.5">
                    <ChevronRight className={`${viewMode === 'screen' ? 'w-3 h-3' : 'w-2.5 h-2.5'} text-gray-600 mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className={`${viewMode === 'screen' ? 'text-xs' : 'text-xs'} text-gray-800 font-medium`}>Explore Ethics & Governance</p>
                      <p className={`${viewMode === 'screen' ? 'text-[10px]' : 'text-[10px]'} text-gray-600`}>Study responsible AI practices and organizational policies</p>
                    </div>
                  </div>
                )}
                {Object.values(results.scores).every((score) => typeof score === 'number' && score >= 50) && (
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-800 font-medium">Advance Your Expertise</p>
                      <p className="text-[10px] text-gray-600">Ready for specialized AI applications and leadership roles</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100 flex-shrink-0">
            <div className="text-[10px] text-gray-500">
              {orgName && <span className="font-medium">{orgName} • </span>}
              Assessment completed {new Date().toLocaleDateString()} • RUDI Framework
            </div>
            <div className="flex gap-2">
              {shareUrl && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setShowCopied(true);
                    setTimeout(() => setShowCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors relative"
                >
                  <Share2 className="w-3 h-3" />
                  {showCopied ? 'Link Copied!' : 'Share'}
                </button>
              )}
              <button
                onClick={() => setShowOrgModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Building2 className="w-3 h-3" />
                {orgName ? 'New Org' : 'Create for Org'}
              </button>
              <button
                onClick={onRetake}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Retake
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Setup Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            {!generatedOrgLink ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {orgName ? 'Create Assessment for Another Organization' : 'Create Assessment for Your Organization'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {orgName
                    ? `Currently viewing results for ${orgName}. You can create a separate assessment link for a different organization.`
                    : 'Get a custom link to share with your team. Track aggregate results and identify training needs.'}
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder={orgName ? "e.g., Partner Company" : "e.g., Acme Corp"}
                    maxLength={50}
                    value={newOrgName}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow alphanumeric, spaces, and common business punctuation
                      const sanitized = value.replace(/[^a-zA-Z0-9\s\-&.,]/g, '');
                      setNewOrgName(sanitized.slice(0, 50));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Benefits:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Custom assessment link with organization branding</li>
                    <li>• Anonymous individual results</li>
                    <li>• Aggregate team insights dashboard</li>
                    <li>• Training recommendations based on gaps</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (newOrgName) {
                        const orgUrl = `/assessment/survey?org=${encodeURIComponent(newOrgName)}`;
                        const fullUrl = window.location.origin + orgUrl;
                        setGeneratedOrgLink(fullUrl);
                        navigator.clipboard.writeText(fullUrl);
                      }
                    }}
                    disabled={!newOrgName}
                    className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Link
                  </button>
                  <button
                    onClick={() => {
                      setShowOrgModal(false);
                      setNewOrgName('');
                      setGeneratedOrgLink('');
                    }}
                    className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Assessment Link Created!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your custom assessment link for <span className="font-semibold">{newOrgName}</span> is ready.
                </p>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Share this link:</label>
                  <div className="bg-white rounded border border-gray-200 p-2 text-xs text-gray-600 break-all font-mono">
                    {generatedOrgLink}
                  </div>
                  <div className="text-xs text-green-600 mt-2 font-medium">
                    ✓ Link copied to clipboard
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      window.open(generatedOrgLink, '_blank');
                    }}
                    className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Open Assessment in New Tab
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedOrgLink);
                      setShowCopied(true);
                      setTimeout(() => setShowCopied(false), 2000);
                    }}
                    className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Copy Link Again
                  </button>
                  <button
                    onClick={() => {
                      setShowOrgModal(false);
                      setNewOrgName('');
                      setGeneratedOrgLink('');
                    }}
                    className="w-full px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}