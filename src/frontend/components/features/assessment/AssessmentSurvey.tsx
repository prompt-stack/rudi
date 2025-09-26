'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { assessmentConfig, calculateScore, AssessmentResponses } from '@/frontend/data/assessment';
import { ChevronLeft, ChevronDown, X, Home, Building2 } from 'lucide-react';

/**
 * AssessmentSurvey Component
 *
 * Interactive survey component for RUDI AI literacy assessment.
 * Features adaptive questioning across three dimensions: Conceptual, Operational, and Governance.
 *
 * @component
 * @returns {JSX.Element} Full-screen assessment survey with progress tracking and results
 *
 * @example
 * <AssessmentSurvey />
 *
 * Query Parameters:
 * - org: Optional organization name for customized results
 */
export default function AssessmentSurvey() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgName = searchParams.get('org');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [showResults, setShowResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const question = assessmentConfig.questions[currentQuestion];
  const isLastQuestion = currentQuestion === assessmentConfig.questions.length - 1;
  const progress = ((currentQuestion + 1) / assessmentConfig.questions.length) * 100;

  const handleSingleAnswer = async (value: number | string) => {
    // Prevent multiple clicks on the last question
    if (isLastQuestion && isProcessing) return;

    setResponses({ ...responses, [question.id]: value });

    // For the last question, show processing state
    if (isLastQuestion) {
      setIsProcessing(true);
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setTimeout(() => {
        setShowResults(true);
      }, isMobile ? 1500 : 2500);
    } else {
      // Auto-advance for non-last questions
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 400);
    }
  };

  const handleCheckboxAnswer = (value: string, checked: boolean) => {
    const current = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
    const maxSelections = (question as any).maxSelections;

    if (value === 'none' || value === 'no_concerns' || value === 'never_used') {
      setResponses({ ...responses, [question.id]: checked ? [value] : [] });
    } else {
      const filtered = current.filter((v: string) =>
        v !== 'none' && v !== 'no_concerns' && v !== 'never_used'
      );

      if (checked) {
        if (maxSelections && filtered.length >= maxSelections) {
          return;
        }
        setResponses({ ...responses, [question.id]: [...filtered, value] });
      } else {
        setResponses({ ...responses, [question.id]: filtered.filter((v: string) => v !== value) });
      }
    }
  };

  const handleNext = () => {
    // Prevent double submission
    if (isLastQuestion && isProcessing) return;

    if (isLastQuestion) {
      setIsProcessing(true);
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setTimeout(() => {
        setShowResults(true);
      }, isMobile ? 1500 : 2500);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = () => {
    const response = responses[question.id];
    if (question.type === 'checkbox') {
      return response && Array.isArray(response) && response.length > 0;
    }
    return response !== undefined;
  };

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get display text for multi-select dropdown
  const getDropdownDisplayText = () => {
    const selected = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
    if (selected.length === 0) return 'Select options...';
    if (selected.length === 1) {
      const option = question.options.find((o: any) => o.value === selected[0]);
      return option?.text || selected[0];
    }
    return `${selected.length} selected`;
  };

  // Handle results and redirect
  useEffect(() => {
    if (showResults && !hasSubmitted) {
      setHasSubmitted(true); // Prevent duplicate submissions
      const results = calculateScore(responses);
      const assessmentData = {
        responses,
        results,
        timestamp: new Date().toISOString(),
        organization: orgName
      };
      localStorage.setItem('lastAssessment', JSON.stringify(assessmentData));

      // Navigate to results immediately - don't wait for API
      const resultsUrl = `/assessment/results?o=${results.scores.operational}&c=${results.scores.conceptual}&g=${results.scores.governance}&l=${results.level}${orgName ? `&org=${encodeURIComponent(orgName)}` : ''}`;
      router.push(resultsUrl);

      // Send to Google Sheets in background (truly fire and forget)
      setTimeout(() => {
        fetch('/api/assessment/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organization: orgName,
            responses,
            scores: results.scores,
            level: results.level,
            timestamp: assessmentData.timestamp
          })
        }).catch(err => {
          // Failed to save assessment - silently fail in production
          if (process.env.NODE_ENV !== 'production') {
            console.error('Failed to save assessment:', err);
          }
        });
      }, 0);
    }
  }, [showResults, responses, router, orgName, hasSubmitted]);

  // Show processing state after final question OR during navigation
  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50/50 to-white">
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-navy-800"></div>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Processing your results...</h2>
            <p className="text-base text-gray-600">One moment while we calculate your AI readiness level</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50/50 to-white">
      {/* Subtle Progress Bar */}
      <div className="w-full bg-gray-200">
        <div
          className="h-0.5 bg-gray-900 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex md:items-center md:justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {/* Header - matching main site style */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-light tracking-tight text-gray-900">
                  AI Readiness <span className="font-medium">Assessment</span>
                </h1>
                {orgName && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    <Building2 className="w-3 h-3 inline mr-1" />
                    {orgName}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowExitModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                Exit
              </button>
            </div>

            {/* Anonymous Survey Message - First Question Only */}
            {currentQuestion === 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  This short, anonymous survey will help {orgName ? (
                    <span className="font-medium">{orgName}</span>
                  ) : (
                    'your organization'
                  )} better understand your comfort
                  and familiarity level with AI. Your responses will not be linked to your name.
                </p>
                {!orgName && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Tip: Organizations can create custom assessments for their teams.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Question */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {question.text}
              {question.id === 'tool_familiarity' && <span className="text-red-500 ml-1">*</span>}
            </h2>
            <p className="text-sm text-gray-500">
              {question.instruction ||
               (question.type === 'checkbox' ? 'Select all that apply' : 'Select one')}
              {(question as any).maxSelections && ` (Max ${(question as any).maxSelections} selections)`}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 mb-6">
            {question.type === 'single' ? (
              // Radio buttons for single select
              question.options.map((option: any) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSingleAnswer(option.value)}
                  className={`group flex items-center p-3 border rounded-lg transition-all text-left w-full ${
                    responses[question.id] === option.value
                      ? 'border-gray-400 bg-gray-50'
                      : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    responses[question.id] === option.value
                      ? 'border-gray-900'
                      : 'border-gray-300'
                  }`}>
                    {responses[question.id] === option.value && (
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                    )}
                  </div>
                  <span className="ml-3 text-gray-700">{option.text}</span>
                </button>
              ))
            ) : (
              // Multi-select dropdown for checkboxes on mobile, regular checkboxes on desktop
              (question.id === 'tool_familiarity' || question.id === 'concerns') ? (
                <>
                <div className="sm:hidden">
                  {/* Mobile dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{getDropdownDisplayText()}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {question.options.map((option: any) => {
                          const selectedArray = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
                          const isSelected = selectedArray.includes(option.value);
                          const isNoneOption = option.value === 'never_used' || option.value === 'no_concerns';
                          const maxSelections = (question as any).maxSelections;
                          const currentSelections = selectedArray.length;
                          const isDisabled = maxSelections && currentSelections >= maxSelections && !isSelected && !isNoneOption;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                if (!isDisabled) {
                                  handleCheckboxAnswer(option.value, !isSelected);
                                  if (isNoneOption) setShowDropdown(false);
                                }
                              }}
                              className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${
                                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <span className={`${isSelected ? 'font-medium' : ''} ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                {option.text}
                              </span>
                              {isSelected && (
                                <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Selected items display */}
                  {(() => {
                    const selectedArray = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
                    return selectedArray.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedArray.map((value: string) => {
                        const option = question.options.find((o: any) => o.value === value);
                        return (
                          <span
                            key={value}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full"
                          >
                            {option?.text}
                            <button
                              type="button"
                              onClick={() => handleCheckboxAnswer(value, false)}
                              className="hover:text-gray-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Desktop grid for tool_familiarity */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-2">
                  {question.options.map((option: any) => {
                    const selectedArray = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
                    const isSelected = selectedArray.includes(option.value);
                    const isNoneOption = option.value === 'never_used' || option.value === 'no_concerns';
                    const maxSelections = (question as any).maxSelections;
                    const currentSelections = selectedArray.length;
                    const isDisabled = maxSelections && currentSelections >= maxSelections && !isSelected && !isNoneOption;

                    return (
                      <label
                        key={option.value}
                        className={`group flex items-center p-3 border border-gray-200 rounded-lg transition-all ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'
                        } ${isNoneOption ? 'col-span-2' : ''}`}
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={isSelected}
                          disabled={isDisabled}
                          onChange={(e) => handleCheckboxAnswer(option.value, e.target.checked)}
                          className="w-4 h-4 accent-gray-900 rounded focus:ring-0 focus:ring-offset-0"
                        />
                        <span className={`ml-3 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                          {option.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
                </>
              ) : (
                // Regular checkboxes for non-tool_familiarity questions
                <div className="space-y-2">
                  {question.options.map((option: any) => {
                    const selectedArray = Array.isArray(responses[question.id]) ? responses[question.id] as string[] : [];
                    const isSelected = selectedArray.includes(option.value);
                    const isNoneOption = option.value === 'none' || option.value === 'no_concerns' || option.value === 'never_used';
                    const maxSelections = (question as any).maxSelections;
                    const currentSelections = selectedArray.length;
                    const isDisabled = maxSelections && currentSelections >= maxSelections && !isSelected && !isNoneOption;

                    return (
                      <label
                        key={option.value}
                        className={`group flex items-center p-3 border border-gray-200 rounded-lg transition-all ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={isSelected}
                          disabled={isDisabled}
                          onChange={(e) => handleCheckboxAnswer(option.value, e.target.checked)}
                          className="w-4 h-4 accent-gray-900 rounded focus:ring-0 focus:ring-offset-0"
                        />
                        <span className={`ml-3 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                          {option.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            {currentQuestion > 0 ? (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            ) : (
              <div />
            )}

            {/* Progress Text */}
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {assessmentConfig.questions.length}
            </span>

            {/* Next/Submit Button */}
            {question.type === 'checkbox' && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  canProceed()
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLastQuestion ? 'Submit' : 'Continue'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Exit Assessment?</h3>
            <p className="text-sm text-gray-600 mb-6">
              {currentQuestion > 0
                ? `You're ${Math.round(progress)}% through the assessment. Your progress will be lost if you exit.`
                : 'Are you sure you want to exit the assessment?'}
            </p>

            <div className="space-y-2">
              <button
                onClick={() => router.push('/assessment')}
                className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Exit to Start
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Exit to Main Site
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
              >
                Continue Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}