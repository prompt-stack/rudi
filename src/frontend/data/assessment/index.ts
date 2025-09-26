/**
 * Assessment Module
 * Central export point for all assessment-related data and functions
 */

// Export types
export * from './types';

// Export questions
export { assessmentQuestions, getQuestionById, getQuestionsByDimension } from './questions';

// Export scoring
export { scoringConfig, calculateScore, getRecommendation } from './scoring';

// Combined assessment configuration
import { assessmentQuestions } from './questions';
import { scoringConfig } from './scoring';
import { AssessmentConfig } from './types';

export const assessmentConfig: AssessmentConfig = {
  title: "AI Readiness Assessment",
  description: "A quick assessment to understand your AI literacy and readiness",
  questions: assessmentQuestions,
  scoring: scoringConfig
};