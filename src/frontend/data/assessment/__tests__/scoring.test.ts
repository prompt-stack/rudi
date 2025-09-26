import { describe, it, expect } from 'vitest'
import { calculateScore, scoringConfig } from '../scoring'
import { AssessmentResponses } from '../types'

describe('Assessment Scoring', () => {
  describe('calculateScore', () => {
    it('should calculate scores for a novice user', () => {
      const responses: AssessmentResponses = {
        frequency: 0,
        tool_familiarity: ['none'],
        task_complexity: 0,
        understanding: 0,
        comfort_level: 0,
        verification: 0,
        concerns: ['no_concerns'],
        priority: [],
        role: 'Individual',
        org_ai_usage: 0
      }

      const result = calculateScore(responses)

      expect(result.scores.operational).toBeLessThanOrEqual(20)
      expect(result.scores.conceptual).toBeLessThanOrEqual(20)
      expect(result.scores.governance).toBeLessThanOrEqual(20)
      expect(result.level).toBe('no_exposure')
    })

    it('should calculate scores for an intermediate user', () => {
      const responses: AssessmentResponses = {
        frequency: 2,
        tool_familiarity: ['chatgpt', 'copilot'],
        task_complexity: 2,
        understanding: 2,
        comfort_level: 2,
        verification: 2,
        concerns: ['accuracy', 'privacy'],
        priority: ['productivity'],
        role: 'Professional',
        org_ai_usage: 2
      }

      const result = calculateScore(responses)

      expect(result.scores.overall).toBeGreaterThan(35)
      expect(result.scores.overall).toBeLessThan(76)
      expect(['beginner', 'intermediate']).toContain(result.level)
    })

    it('should calculate scores for an advanced user', () => {
      const responses: AssessmentResponses = {
        frequency: 4,
        tool_familiarity: ['chatgpt', 'copilot', 'midjourney', 'custom'],
        task_complexity: 4,
        understanding: 4,
        comfort_level: 4,
        verification: 4,
        concerns: ['bias', 'privacy', 'accuracy', 'ethics'],
        priority: ['innovation', 'productivity', 'quality'],
        role: 'Leader',
        org_ai_usage: 4
      }

      const result = calculateScore(responses)

      expect(result.scores.operational).toBeGreaterThan(60)
      expect(result.scores.conceptual).toBeGreaterThan(60)
      expect(result.scores.governance).toBeGreaterThan(60)
      expect(result.level).toBe('advanced')
    })

    it('should return valid level configurations', () => {
      const responses: AssessmentResponses = {
        frequency: 1,
        tool_familiarity: ['chatgpt'],
        task_complexity: 1,
        understanding: 1,
        comfort_level: 1,
        verification: 1,
        concerns: [],
        priority: [],
        role: 'Individual',
        org_ai_usage: 0
      }

      const result = calculateScore(responses)

      expect(result.levelInfo).toBeDefined()
      expect(result.levelInfo.label).toBeDefined()
      expect(result.levelInfo.description).toBeDefined()
      expect(result.levelInfo.color).toBeDefined()
    })
  })

  describe('scoringConfig', () => {
    it('should have correct dimension weights', () => {
      const { dimensions } = scoringConfig

      expect(dimensions.operational.weight).toBe(0.4)
      expect(dimensions.conceptual.weight).toBe(0.3)
      expect(dimensions.governance.weight).toBe(0.3)
    })

    it('should have all level configurations', () => {
      const { levels } = scoringConfig

      expect(levels.no_exposure).toBeDefined()
      expect(levels.pre_beginner).toBeDefined()
      expect(levels.beginner).toBeDefined()
      expect(levels.intermediate).toBeDefined()
      expect(levels.advanced).toBeDefined()
    })

    it('should have non-overlapping level ranges', () => {
      const { levels } = scoringConfig
      const levelKeys = Object.keys(levels) as Array<keyof typeof levels>

      for (let i = 0; i < levelKeys.length - 1; i++) {
        const current = levels[levelKeys[i]]
        const next = levels[levelKeys[i + 1]]

        expect(current.max).toBeLessThan(next.min)
      }
    })
  })
})