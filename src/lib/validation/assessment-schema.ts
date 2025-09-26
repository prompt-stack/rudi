import { z } from 'zod';

const TOOL_VALUES = [
  'chatgpt', 'gemini', 'claude', 'perplexity', 'coding', 'image',
  'education', 'meeting', 'genspark', 'prototyping', 'video', 'voice', 'none'
] as const;

const CONCERN_VALUES = [
  'understanding', 'privacy', 'accuracy', 'dependency', 'bias',
  'job', 'cheating', 'guidelines', 'ethics', 'no_concerns'
] as const;

const PRIORITY_VALUES = [
  'ethics', 'admin', 'communication', 'data', 'creative', 'learning'
] as const;

const ROLE_VALUES = [
  'technical', 'non_technical', 'educator', 'student'
] as const;

const LEVEL_VALUES = [
  'no_exposure', 'pre_beginner', 'beginner', 'intermediate', 'advanced'
] as const;

export const assessmentResponsesSchema = z.object({
  frequency: z.number().int().min(0).max(4).optional(),
  tool_familiarity: z.array(z.enum(TOOL_VALUES)).min(1).max(13).optional(),
  task_complexity: z.number().int().min(0).max(4).optional(),
  understanding: z.number().int().min(0).max(4).optional(),
  comfort_level: z.number().int().min(0).max(4).optional(),
  verification: z.number().int().min(0).max(4).optional(),
  concerns: z.array(z.enum(CONCERN_VALUES)).max(3).optional(),
  priority: z.array(z.enum(PRIORITY_VALUES)).max(2).optional(),
  role: z.enum(ROLE_VALUES).optional(),
  org_ai_usage: z.number().int().min(0).max(4).optional()
});

export const assessmentScoresSchema = z.object({
  operational: z.number().min(0).max(100),
  conceptual: z.number().min(0).max(100),
  governance: z.number().min(0).max(100),
  overall: z.number().min(0).max(100)
});

export const assessmentSubmissionSchema = z.object({
  organization: z.string().max(100).optional(),
  responses: assessmentResponsesSchema,
  scores: assessmentScoresSchema,
  level: z.enum(LEVEL_VALUES),
  timestamp: z.string().datetime()
});

export type AssessmentSubmissionInput = z.infer<typeof assessmentSubmissionSchema>;