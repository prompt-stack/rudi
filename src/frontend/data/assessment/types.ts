/**
 * Assessment Types
 * Centralized type definitions for the RUDI AI Assessment
 */

// Question Types
export type QuestionType = 'single' | 'checkbox';
export type Dimension = 'operational' | 'conceptual' | 'governance' | 'readiness' | 'demographic' | 'organizational';
export type Level = 'no_exposure' | 'pre_beginner' | 'beginner' | 'intermediate' | 'advanced';

// Question Option Types
export interface SingleChoiceOption {
  value: number | string;
  text: string;
  level?: Level;
}

export interface MultiChoiceOption {
  value: string;
  text: string;
  weight: number;
}

// Question Structure
export interface AssessmentQuestion {
  id: string;
  order: number;
  type: QuestionType;
  dimension: Dimension;
  text: string;
  instruction?: string;
  optional?: boolean;
  maxSelections?: number;
  options: SingleChoiceOption[] | MultiChoiceOption[];
}

// Scoring Types
export interface DimensionConfig {
  weight: number;
  questions: string[];
}

export interface LevelConfig {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
}

export interface ScoringConfig {
  dimensions: Record<string, DimensionConfig>;
  levels: Record<Level, LevelConfig>;
}

// Response Types
export interface AssessmentResponses {
  [questionId: string]: number | string | string[] | undefined;
  frequency?: number;
  tool_familiarity?: string[];
  task_complexity?: number;
  understanding?: number;
  comfort_level?: number;
  verification?: number;
  concerns?: string[];
  priority?: string[];  // Changed from number to string array for checkbox
  role?: string;
  org_ai_usage?: number;
}

// Score Types
export interface AssessmentScores {
  operational: number;
  conceptual: number;
  governance: number;
  overall: number;
}

// Result Types
export interface AssessmentResult {
  scores: AssessmentScores;
  level: Level;
  levelInfo: LevelConfig;
}

// Radar Chart Data
export interface RadarChartData {
  dimension: string;
  score: number;
}

// Assessment Configuration
export interface AssessmentConfig {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  scoring: ScoringConfig;
}

// Submission Types (for Google Sheets)
export interface AssessmentSubmission {
  organization?: string;
  responses: AssessmentResponses;
  scores: AssessmentScores;
  level: string;
  timestamp: string;
}