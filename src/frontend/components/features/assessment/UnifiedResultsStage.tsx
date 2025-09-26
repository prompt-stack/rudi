import { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Trophy,
  Network,
  Workflow,
  Fingerprint,
  GraduationCap,
  Download,
  Mail
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface RadarDataPoint {
  dimension: string;
  score: number;
}

interface CompetencyLevel {
  score: number;
  label: string;
}

interface UnifiedResultsStageProps {
  radarData: RadarDataPoint[];
  competencyLevels: CompetencyLevel[];
  maxScore: number;
  onRetake: () => void;
}

const levelColors = {
  'No Exposure': 'bg-gray-100 text-gray-700 border-gray-200',
  'Pre-Beginner': 'bg-amber-100 text-amber-600 border-amber-200',
  'Beginner': 'bg-amber-100 text-amber-600 border-amber-200',
  'Intermediate': 'bg-navy-100 text-navy-900 border-navy-200',
  'Advanced': 'bg-green-100 text-green-600 border-green-200'
};

const dimensionIcons = {
  'Conceptual': Network,
  'Operational': Workflow,
  'Governance': Fingerprint
};

/**
 * UnifiedResultsStage Component
 *
 * Displays assessment results with skill pattern analysis, competency radar chart,
 * and personalized learning recommendations based on user performance.
 *
 * @component
 * @param {UnifiedResultsStageProps} props - Component props
 * @param {RadarDataPoint[]} props.radarData - Scores for each dimension (Conceptual, Operational, Governance)
 * @param {CompetencyLevel[]} props.competencyLevels - Level configurations with score thresholds
 * @param {number} props.maxScore - Maximum possible score for normalization
 * @param {() => void} props.onRetake - Callback to restart assessment
 * @returns {JSX.Element} Results display with radar chart, skill pattern, and next steps
 *
 * Features:
 * - Skill pattern identification (Theorist, Practitioner, Leader, etc.)
 * - Radar chart visualization of competencies
 * - Email report functionality
 * - PDF export capability
 * - Dynamic learning resource recommendations
 */
export default function UnifiedResultsStage({
  radarData,
  competencyLevels,
  maxScore,
  onRetake
}: UnifiedResultsStageProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const getLabelForScore = (score: number) => {
    const clamped = Math.max(0, Math.min(maxScore, Math.round(score)));
    return competencyLevels.find(level => level.score === clamped)?.label ?? 'No Exposure';
  };

  // Generate skill pattern insights
  const getSkillPatternInsight = () => {
    const levels = radarData.map(d => ({
      dimension: d.dimension,
      score: d.score,
      level: getLabelForScore(d.score)
    }));

    const conceptual = levels.find(l => l.dimension === 'Conceptual');
    const operational = levels.find(l => l.dimension === 'Operational');
    const governance = levels.find(l => l.dimension === 'Governance');

    if (conceptual && operational && governance) {
      const scores = [conceptual.score, operational.score, governance.score];
      const maxDimScore = Math.max(...scores);
      const minDimScore = Math.min(...scores);
      const gap = maxDimScore - minDimScore;

      if (gap > 2) {
        if (conceptual.score === maxDimScore && operational.score === minDimScore) {
          return {
            pattern: '📚 The Theorist',
            insight: 'Strong conceptual understanding, limited hands-on experience',
            recommendation: 'Focus on practical AI tool usage and workflow integration'
          };
        } else if (operational.score === maxDimScore && conceptual.score === minDimScore) {
          return {
            pattern: '⚡ The Practitioner',
            insight: 'Excel at using AI tools, could deepen understanding',
            recommendation: 'Explore AI fundamentals and underlying principles'
          };
        } else if (governance.score === minDimScore) {
          return {
            pattern: '🚀 The Enthusiast',
            insight: 'Active AI user, governance awareness needs attention',
            recommendation: 'Learn about AI ethics, privacy, and responsible use'
          };
        }
      } else if (gap <= 1) {
        if (maxDimScore >= 3) {
          return {
            pattern: '🌟 The Leader',
            insight: 'Well-rounded competencies across all dimensions',
            recommendation: 'Ready to mentor others and lead AI initiatives'
          };
        } else if (maxDimScore >= 2) {
          return {
            pattern: '📈 Rising Talent',
            insight: 'Developing consistently across all areas',
            recommendation: 'Continue structured learning with real-world application'
          };
        }
      }
    }

    return {
      pattern: '🌱 Explorer',
      insight: 'Beginning your AI literacy journey',
      recommendation: 'Start with foundational concepts and basic tools'
    };
  };

  const skillPattern = getSkillPatternInsight();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Send email and results to backend
      setEmailSubmitted(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Panel - Results Summary */}
        <div className="md:w-2/5 p-6 bg-gradient-to-br from-gray-50 to-white md:border-r border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full mb-3">
              <Trophy className="h-8 w-8 text-accent-600" />
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              {skillPattern.pattern}
            </h2>
            <p className="text-sm text-secondary">
              {skillPattern.insight}
            </p>
          </div>

          {/* Competency Levels */}
          <div className="space-y-3 mb-6">
            {radarData.map((item) => {
              const level = getLabelForScore(item.score);
              const IconComponent = dimensionIcons[item.dimension as keyof typeof dimensionIcons] || Network;

              return (
                <div key={item.dimension} className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <IconComponent className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-primary">{item.dimension}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    levelColors[level as keyof typeof levelColors] || levelColors['No Exposure']
                  }`}>
                    {level}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendation */}
          <div className="bg-primary-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-primary mb-2">Next Steps</h3>
            <p className="text-xs text-secondary leading-relaxed">{skillPattern.recommendation}</p>
          </div>

          {/* Email Capture */}
          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Get your detailed report via email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Mail className="icon-xs" />
                  Send
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
              <p className="text-sm text-green-600 font-medium">✓ Report sent to {email}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onRetake}
              className="flex-1 px-4 py-2 border border-gray-300 text-secondary rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-gray-300 text-secondary rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Download className="icon-xs" />
              PDF
            </button>
          </div>
        </div>

        {/* Right Panel - Radar Chart & Resources */}
        <div className="md:w-3/5 p-6">
          {/* Radar Chart */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="text-base font-semibold text-primary mb-3">Competency Radar</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fontSize: 13, fontWeight: 500, fill: '#6b7280' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, maxScore]}
                    tickCount={maxScore + 1}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#111827"
                    fill="#374151"
                    fillOpacity={0.15}
                    strokeWidth={2.5}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Resources */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-3">Your Next Steps</h3>
            <div className="space-y-3">
              {/* Dynamic resources based on overall score */}
              {(() => {
                const avgScore = radarData.reduce((sum, d) => sum + d.score, 0) / radarData.length;

                if (avgScore <= 1) {
                  // Novice/Curious - Start with basics
                  return (
                    <>
                      <a
                        href="/resources"
                        className="flex items-center justify-between p-2 bg-navy-50 rounded-lg border border-navy-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-navy-800" />
                          <div>
                            <p className="text-xs font-medium text-primary">AI Vocabulary Guide</p>
                            <p className="text-[10px] text-secondary">Essential terminology • PDF</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-navy-500 group-hover:text-navy-800 group-hover:translate-x-1 transition-all" />
                      </a>
                      <a
                        href="/educators"
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary-500" />
                          <div>
                            <p className="text-xs font-medium text-primary">Introduction to AI</p>
                            <p className="text-[10px] text-secondary">Beginner resources</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    </>
                  );
                } else if (avgScore <= 3) {
                  // Explorer/Practitioner - Build skills
                  return (
                    <>
                      <a
                        href="/toolkit"
                        className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <Workflow className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-xs font-medium text-primary">AI Implementation Toolkit</p>
                            <p className="text-[10px] text-secondary">Templates & guides</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-green-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                      </a>
                      <a
                        href="/resources"
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary-500" />
                          <div>
                            <p className="text-xs font-medium text-primary">RUDI Framework Guide</p>
                            <p className="text-[10px] text-secondary">Complete methodology</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    </>
                  );
                } else {
                  // Champion - Advanced resources
                  return (
                    <>
                      <a
                        href="/resources"
                        className="flex items-center justify-between p-2 bg-navy-50 rounded-lg border border-navy-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4 text-navy-800" />
                          <div>
                            <p className="text-xs font-medium text-primary">Responsible AI Guide</p>
                            <p className="text-[10px] text-secondary">Governance framework</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-navy-500 group-hover:text-navy-800 group-hover:translate-x-1 transition-all" />
                      </a>
                      <a
                        href="/workshop"
                        className="flex items-center justify-between p-2 bg-accent-50 rounded-lg border border-accent-100 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-accent-600" />
                          <div>
                            <p className="text-xs font-medium text-primary">Leadership Workshop</p>
                            <p className="text-[10px] text-secondary">Lead AI transformation</p>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-accent-400 group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
                      </a>
                    </>
                  );
                }
              })()}

              {/* Always show workshop as option */}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <a
                  href="/workshop"
                  className="flex items-center justify-between p-2 bg-primary-50 rounded-lg border border-primary-100 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="text-xs font-medium text-primary">Book Discovery Session</p>
                      <p className="text-[10px] text-secondary">Personalized guidance</p>
                    </div>
                  </div>
                  <ArrowRight className="h-3 w-3 text-primary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}