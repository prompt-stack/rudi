/**
 * Assessment Scoring Logic
 * Calculates scores based on responses to assessment questions
 */

import {
  AssessmentResponses,
  AssessmentScores,
  AssessmentResult,
  ScoringConfig,
  Level,
  LevelConfig,
  MultiChoiceOption
} from './types';
import { assessmentQuestions } from './questions';

// Scoring configuration
export const scoringConfig: ScoringConfig = {
  dimensions: {
    operational: {
      weight: 0.4,
      questions: ["tool_familiarity", "frequency", "task_complexity"]
    },
    conceptual: {
      weight: 0.3,
      questions: ["understanding", "comfort_level"]
    },
    governance: {
      weight: 0.3,
      questions: ["verification", "concerns"]
    }
  },
  levels: {
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
  }
};

/**
 * Calculate assessment scores based on responses
 *
 * Computes scores across three dimensions (Operational, Conceptual, Governance)
 * and determines overall AI literacy level.
 *
 * @param {AssessmentResponses} responses - User responses to assessment questions
 * @returns {AssessmentResult} Computed scores, level classification, and recommendations
 *
 * @example
 * const result = calculateScore({
 *   tool_familiarity: ['chatgpt', 'copilot'],
 *   frequency: 3,
 *   understanding: 2
 * });
 * // Returns: { scores: {...}, level: 'intermediate', levelInfo: {...}, recommendations: [...] }
 */
export function calculateScore(responses: AssessmentResponses): AssessmentResult {
  const scores: AssessmentScores = {
    operational: calculateOperationalScore(responses),
    conceptual: calculateConceptualScore(responses),
    governance: calculateGovernanceScore(responses),
    overall: 0
  };

  // Calculate weighted overall score
  scores.overall = Math.round(
    scores.operational * scoringConfig.dimensions.operational.weight +
    scores.conceptual * scoringConfig.dimensions.conceptual.weight +
    scores.governance * scoringConfig.dimensions.governance.weight
  );

  // Apply priority adjustment
  scores.overall = applyPriorityAdjustment(scores.overall, responses.priority);

  // Determine level
  const { level, levelInfo } = determineLevel(scores.overall);

  return {
    scores,
    level,
    levelInfo
  };
}

/**
 * Calculate operational dimension score (40% weight)
 */
function calculateOperationalScore(responses: AssessmentResponses): number {
  let score = 0;

  // Tool familiarity - weighted by tool sophistication
  const toolsUsed = responses.tool_familiarity || [];
  let toolScore = 0;

  if (toolsUsed.includes('none')) {
    toolScore = 0;
  } else {
    const toolQuestion = assessmentQuestions.find(q => q.id === 'tool_familiarity');
    if (toolQuestion) {
      toolScore = toolsUsed.reduce((sum: number, tool: string) => {
        const option = toolQuestion.options.find((o) => (o as MultiChoiceOption).value === tool) as MultiChoiceOption | undefined;
        return sum + (option?.weight || 0);
      }, 0);
      // Normalize: max possible is ~20 points, scale to 0-33
      toolScore = Math.min(33, (toolScore / 20) * 33);
    }
  }

  // Frequency score (0-4 scale to 0-33)
  const frequencyScore = (responses.frequency || 0) * 8.25;

  // Task complexity score (0-4 scale to 0-34)
  const complexityScore = (responses.task_complexity || 0) * 8.5;

  score = Math.round(toolScore + frequencyScore + complexityScore);
  return Math.min(100, score); // Cap at 100
}

/**
 * Calculate conceptual dimension score (30% weight)
 */
function calculateConceptualScore(responses: AssessmentResponses): number {
  // Understanding score (0-4 scale to 0-50)
  const understandingScore = (responses.understanding || 0) * 12.5;

  // Comfort level score (0-4 scale to 0-50)
  const comfortScore = (responses.comfort_level || 0) * 12.5;

  const score = Math.round(understandingScore + comfortScore);
  return Math.min(100, score); // Cap at 100
}

/**
 * Calculate governance dimension score (30% weight)
 */
function calculateGovernanceScore(responses: AssessmentResponses): number {
  // Verification practices score (0-4 scale to 0-60)
  const verificationScore = (responses.verification || 0) * 15;

  // Concerns score - having sophisticated governance concerns shows awareness
  const concerns = responses.concerns || [];
  let concernScore = 0;

  if (concerns.includes('no_concerns')) {
    // No concerns = low governance awareness
    concernScore = 0;
  } else {
    // Count sophisticated governance concerns (weight 3 items)
    const governanceConcerns = ['bias', 'guidelines', 'ethics'];
    const sophisticatedCount = concerns.filter((c: string) =>
      governanceConcerns.includes(c)
    ).length;

    // Having any concerns shows some awareness (base 20 points)
    // Each sophisticated concern adds 6-7 points (up to 40 total)
    concernScore = 20 + (sophisticatedCount * 6.67);
    concernScore = Math.min(40, concernScore);
  }

  const score = Math.round(verificationScore + concernScore);
  return Math.min(100, score); // Cap at 100
}

/**
 * Apply priority-based adjustment to overall score
 */
function applyPriorityAdjustment(overallScore: number, priority?: string[] | number): number {
  // Handle new checkbox format for priority question
  if (Array.isArray(priority)) {
    // Calculate weighted priority score from selected options
    const priorityWeights: Record<string, number> = {
      'learning': 1,      // Basic learning
      'admin': 2,         // Time-saving tasks
      'communication': 2, // Content creation
      'ethics': 3,        // Ethics understanding
      'creative': 3,      // Creative work
      'data': 4          // Data insights (most advanced)
    };

    if (priority.length === 0) return overallScore;

    // Get average weight of selected priorities
    const avgWeight = priority.reduce((sum, p) => sum + (priorityWeights[p] || 2), 0) / priority.length;

    // Map average weight to expected score range (1-4 to 0-100)
    const expectedScore = (avgWeight - 1) * 33.33;
    const scoreDiff = overallScore - expectedScore;

    // Small adjustment if there's a big mismatch
    if (Math.abs(scoreDiff) > 40) {
      const adjustment = scoreDiff > 0 ? -5 : 5;
      return Math.max(0, Math.min(100, overallScore + adjustment));
    }

    return overallScore;
  }

  // Legacy handling for old numeric format (shouldn't occur anymore)
  if (typeof priority === 'number') {
    const expectedPriority = Math.floor(overallScore / 33.33);
    const priorityDiff = priority - expectedPriority;

    if (Math.abs(priorityDiff) > 1) {
      const adjustment = priorityDiff > 0 ? 5 : -5;
      return Math.max(0, Math.min(100, overallScore + adjustment));
    }
  }

  return overallScore;
}

/**
 * Determine level based on overall score
 */
function determineLevel(overallScore: number): { level: Level; levelInfo: LevelConfig } {
  for (const [key, config] of Object.entries(scoringConfig.levels)) {
    if (overallScore >= config.min && overallScore <= config.max) {
      return {
        level: key as Level,
        levelInfo: config
      };
    }
  }

  // Default to novice if no match (shouldn't happen)
  return {
    level: 'no_exposure',
    levelInfo: scoringConfig.levels.no_exposure
  };
}

/**
 * Get recommendation based on level
 */
export function getRecommendation(level: Level): string {
  const recommendations: Record<Level, string> = {
    no_exposure: "Start with our AI Literacy Foundation course to build essential understanding.",
    pre_beginner: "You're ready for hands-on learning. Try our Getting Started with AI Tools workshop.",
    beginner: "Build on your foundation with our Applied AI Practitioner program.",
    intermediate: "Advance your skills with specialized AI integration training for your role.",
    advanced: "You're ready for our AI Leadership certification to guide organizational transformation."
  };

  return recommendations[level] || recommendations.no_exposure;
}