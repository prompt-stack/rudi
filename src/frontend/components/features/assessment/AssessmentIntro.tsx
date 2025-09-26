'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, User, Building2, ArrowRight, Home, ArrowLeft } from 'lucide-react';

export default function AssessmentIntro() {
  const router = useRouter();
  const [showOrgInput, setShowOrgInput] = useState(false);
  const [orgName, setOrgName] = useState('');

  const startIndividualAssessment = () => {
    router.push('/assessment/survey');
  };

  const startOrgAssessment = () => {
    if (orgName.trim()) {
      router.push(`/assessment/survey?org=${encodeURIComponent(orgName.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Navigation Header */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            AI Readiness <span className="font-medium">Assessment</span>
          </h1>
          <p className="text-base text-gray-600">
            Evaluate your AI literacy and readiness across key dimensions
          </p>
        </div>

        {!showOrgInput ? (
          <>
            {/* Assessment Options */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Individual Assessment */}
              <button
                onClick={startIndividualAssessment}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">For Individuals</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Take a personal assessment to understand your AI readiness
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                      Start Assessment
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>

              {/* Team Assessment */}
              <button
                onClick={() => setShowOrgInput(true)}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">For Teams</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Create an assessment for your organization or team
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                      Create Team Assessment
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 text-center">
                <span className="font-medium">Anonymous & Secure:</span> Your responses are not linked to personal information.
                Takes approximately 3-5 minutes to complete.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Organization Setup */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Create Team Assessment</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Enter your organization name to generate a custom assessment link you can share with your team.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow alphanumeric, spaces, and common business punctuation
                    const sanitized = value.replace(/[^a-zA-Z0-9\s\-&.,]/g, '');
                    // Limit to 50 characters
                    setOrgName(sanitized.slice(0, 50));
                  }}
                  placeholder="e.g., Acme Corporation"
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && startOrgAssessment()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {orgName.length}/50 characters
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Your team assessment will include:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Organization name in the assessment intro</li>
                  <li>• Custom shareable link for your team</li>
                  <li>• Anonymous individual results</li>
                  <li>• Future: Aggregate team insights dashboard</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startOrgAssessment}
                  disabled={!orgName.trim()}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    orgName.trim()
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Create & Start Assessment
                </button>
                <button
                  onClick={() => {
                    setShowOrgInput(false);
                    setOrgName('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}