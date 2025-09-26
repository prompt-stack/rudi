import assessmentData from '@/frontend/data/rudi-assessment'

interface AssessmentQuestion {
  id: string
  order: number
  type: string
  text: string
  dimension: string
  showIf?: string[]
  options: Array<{
    value: number
    text: string
    level: string
    nextQuestion?: string
    tags?: string[]
  }>
}

interface AdaptiveState {
  responses: Array<{
    questionId: string
    dimension: string
    value: number
    level: string
    selectedLevel?: string
  }>
  userTags: string[]
  questionsAsked: Set<string>
  dimensionCoverage: Map<string, number>
  adjustedLevel?: string // Track if we've adjusted difficulty
}

export class AdaptiveEngine {
  private state: AdaptiveState
  private readonly MIN_QUESTIONS = 5
  private readonly MAX_QUESTIONS = 10
  private readonly DIMENSIONS = ['conceptual', 'operational', 'governance']

  constructor() {
    this.state = {
      responses: [],
      userTags: [],
      questionsAsked: new Set(['baseline']),
      dimensionCoverage: new Map([
        ['conceptual', 0],
        ['operational', 0],
        ['governance', 0]
      ]),
      adjustedLevel: undefined
    }
  }

  getNextQuestion(currentQuestionId: string, selectedOption: {
    value: number
    text: string
    level: string
    nextQuestion?: string | null
    tags?: string[]
  }): string | 'summary' {
    // Update state based on response
    if (selectedOption.tags) {
      this.state.userTags = [...new Set([...this.state.userTags, ...selectedOption.tags])]
    }

    // Track dimension coverage
    const currentQuestion = this.getAllQuestions().find(q => q.id === currentQuestionId)
    if (currentQuestion?.dimension && currentQuestion.dimension !== 'meta') {
      const currentCount = this.state.dimensionCoverage.get(currentQuestion.dimension) || 0
      this.state.dimensionCoverage.set(currentQuestion.dimension, currentCount + 1)
    }

    // Special handling for track_determination - after this, we need to find first question
    if (currentQuestionId === 'track_determination') {
      const nextQuestion = this.findBestNextQuestion()
      return nextQuestion || 'summary'
    }

    // HARD STOP at maximum questions (excluding meta questions)
    const realQuestionsAsked = Array.from(this.state.questionsAsked).filter(
      id => !['baseline', 'track_determination'].includes(id)
    ).length

    if (realQuestionsAsked >= this.MAX_QUESTIONS) {
      return 'summary'
    }

    // Check if we've asked minimum real questions
    const hasMinimum = realQuestionsAsked >= this.MIN_QUESTIONS

    // If explicit next question exists and it's not null
    if (selectedOption.nextQuestion && selectedOption.nextQuestion !== null) {
      // If it's summary and we have minimum, end it
      if (selectedOption.nextQuestion === 'summary' && hasMinimum) {
        return 'summary'
      }

      // Don't add the same question twice
      if (!this.state.questionsAsked.has(selectedOption.nextQuestion)) {
        this.state.questionsAsked.add(selectedOption.nextQuestion)
      }

      // If we haven't hit minimum, try to continue
      if (!hasMinimum && selectedOption.nextQuestion === 'summary') {
        return this.findSupplementalQuestion() || 'summary'
      }

      return selectedOption.nextQuestion
    }

    // Always try to find next question unless we've hit maximum
    const nextQuestion = this.findBestNextQuestion()

    // Only end if we have minimum AND can't find more questions
    if (!nextQuestion && hasMinimum) {
      return 'summary'
    }

    // If we found a question, use it; otherwise end
    return nextQuestion || 'summary'
  }

  private findSupplementalQuestion(): string | null {
    const isTechnical = this.state.userTags.includes('technical')
    const userLevel = this.getUserLevel()

    // First try exact level match
    const exactLevelQuestions = this.getAllQuestions().filter(q => {
      if (this.state.questionsAsked.has(q.id)) return false
      if (q.dimension === 'meta') return false

      const isQuestionTechnical = q.id.startsWith('tech_')
      if (isQuestionTechnical !== isTechnical) return false

      const questionLevel = this.getQuestionLevel(q.id)
      return questionLevel === userLevel
    })

    // Sort by least-covered dimensions
    const sortedExact = exactLevelQuestions.sort((a, b) => {
      const aCount = this.state.dimensionCoverage.get(a.dimension) || 0
      const bCount = this.state.dimensionCoverage.get(b.dimension) || 0
      return aCount - bCount
    })

    if (sortedExact.length > 0) {
      const selected = sortedExact[0]
      this.state.questionsAsked.add(selected.id)
      return selected.id
    }

    // If no exact matches, try adjacent levels
    const adjacentQuestions = this.getAllQuestions().filter(q => {
      if (this.state.questionsAsked.has(q.id)) return false
      if (q.dimension === 'meta') return false

      const isQuestionTechnical = q.id.startsWith('tech_')
      if (isQuestionTechnical !== isTechnical) return false

      const questionLevel = this.getQuestionLevel(q.id)
      const levelDiff = Math.abs(this.getLevelValue(questionLevel) - this.getLevelValue(userLevel))
      return levelDiff === 1
    })

    const sortedAdjacent = adjacentQuestions.sort((a, b) => {
      const aCount = this.state.dimensionCoverage.get(a.dimension) || 0
      const bCount = this.state.dimensionCoverage.get(b.dimension) || 0
      return aCount - bCount
    })

    if (sortedAdjacent.length > 0) {
      const selected = sortedAdjacent[0]
      this.state.questionsAsked.add(selected.id)
      return selected.id
    }

    return null
  }

  private findBestNextQuestion(): string | null {
    // Determine user track (technical or non-technical)
    const isTechnical = this.state.userTags.includes('technical')
    const userLevel = this.getUserLevel()

    // Get uncovered dimensions
    const uncoveredDimensions = this.DIMENSIONS.filter(
      dim => (this.state.dimensionCoverage.get(dim) || 0) === 0
    )

    // Get all available questions
    const allQuestions = this.getAllQuestions()

    // First attempt: Find exact level match for uncovered dimensions
    if (uncoveredDimensions.length > 0) {
      const exactLevelQuestions = allQuestions.filter(q => {
        if (!uncoveredDimensions.includes(q.dimension)) return false
        if (this.state.questionsAsked.has(q.id)) return false

        // Match track (technical vs non-technical)
        const isQuestionTechnical = q.id.startsWith('tech_')
        const isQuestionNonTechnical = q.id.startsWith('nontech_')

        // Skip if track doesn't match
        if (isTechnical && !isQuestionTechnical) return false
        if (!isTechnical && !isQuestionNonTechnical) return false

        // Exact level match first
        const questionLevel = this.getQuestionLevel(q.id)
        return questionLevel === userLevel
      })

      if (exactLevelQuestions.length > 0) {
        const selected = exactLevelQuestions[0]
        this.state.questionsAsked.add(selected.id)
        return selected.id
      }

      // Second attempt: Allow adjacent levels for uncovered dimensions
      const flexibleQuestions = allQuestions.filter(q => {
        if (!uncoveredDimensions.includes(q.dimension)) return false
        if (this.state.questionsAsked.has(q.id)) return false

        const isQuestionTechnical = q.id.startsWith('tech_')
        if (isQuestionTechnical !== isTechnical) return false

        const questionLevel = this.getQuestionLevel(q.id)
        const levelDiff = Math.abs(this.getLevelValue(questionLevel) - this.getLevelValue(userLevel))
        return levelDiff === 1 // Only adjacent levels, not 2+ away
      })

      if (flexibleQuestions.length > 0) {
        const selected = flexibleQuestions[0]
        this.state.questionsAsked.add(selected.id)
        return selected.id
      }
    }

    // Otherwise find any matching question we haven't asked
    return this.findSupplementalQuestion()
  }

  private getUserLevel(): string {
    // If we've adjusted the level based on responses, use that
    if (this.state.adjustedLevel) {
      return this.state.adjustedLevel
    }

    // Check if user is struggling (selecting lower options)
    const recentResponses = this.state.responses.slice(-3).filter(
      r => r.dimension !== 'meta'
    )

    if (recentResponses.length >= 2) {
      const avgValue = recentResponses.reduce((sum, r) => sum + r.value, 0) / recentResponses.length
      const baseLevel = this.getBaseLevel()

      // If user is consistently selecting lower options, adjust difficulty down
      if (avgValue <= 1) {
        const currentLevelValue = this.getLevelValue(baseLevel)
        if (currentLevelValue > 0) {
          this.state.adjustedLevel = this.getLevelFromValue(currentLevelValue - 1)
          return this.state.adjustedLevel
        }
      }
    }

    return this.getBaseLevel()
  }

  private getBaseLevel(): string {
    if (this.state.userTags.includes('novice')) return 'no_exposure'
    if (this.state.userTags.includes('explorer')) return 'pre_beginner'
    if (this.state.userTags.includes('user')) return 'beginner'
    if (this.state.userTags.includes('practitioner')) return 'intermediate'
    if (this.state.userTags.includes('leader')) return 'advanced'
    return 'beginner' // default
  }

  private getLevelFromValue(value: number): string {
    switch(value) {
      case 0: return 'no_exposure'
      case 1: return 'pre_beginner'
      case 2: return 'beginner'
      case 3: return 'intermediate'
      case 4: return 'advanced'
      default: return 'beginner'
    }
  }

  private getQuestionLevel(questionId: string): string {
    if (questionId.includes('no_exposure')) return 'no_exposure'
    if (questionId.includes('pre_beginner')) return 'pre_beginner'
    if (questionId.includes('beginner')) return 'beginner'
    if (questionId.includes('intermediate')) return 'intermediate'
    if (questionId.includes('advanced')) return 'advanced'
    return 'beginner' // default
  }

  private getLevelValue(level: string): number {
    switch(level) {
      case 'no_exposure': return 0
      case 'pre_beginner': return 1
      case 'beginner': return 2
      case 'intermediate': return 3
      case 'advanced': return 4
      default: return 2
    }
  }

  private matchesUserLevel(question: AssessmentQuestion): boolean {
    if (!question.showIf || question.showIf.length === 0) return true
    return question.showIf.some(tag => this.state.userTags.includes(tag))
  }

  private getAllQuestions(): AssessmentQuestion[] {
    return assessmentData.questions.filter(q => q.dimension !== 'meta')
  }

  shouldContinue(): boolean {
    // Exclude meta questions from count
    const realQuestionsAsked = Array.from(this.state.questionsAsked).filter(
      id => !['baseline', 'track_determination'].includes(id)
    ).length
    return realQuestionsAsked < this.MIN_QUESTIONS
  }

  getQuestionsAskedCount(): number {
    // Exclude both meta questions from count
    return Array.from(this.state.questionsAsked).filter(
      id => !['baseline', 'track_determination'].includes(id)
    ).length
  }

  updateState(response: {
    questionId: string
    dimension: string
    value: number
    level: string
    tags?: string[]
  }) {
    this.state.responses.push(response)
    this.state.questionsAsked.add(response.questionId)
    if (response.tags) {
      this.state.userTags = [...new Set([...this.state.userTags, ...response.tags])]
    }
    // Update dimension coverage
    if (response.dimension && response.dimension !== 'meta') {
      const currentCount = this.state.dimensionCoverage.get(response.dimension) || 0
      this.state.dimensionCoverage.set(response.dimension, currentCount + 1)
    }
  }

  reset() {
    this.state = {
      responses: [],
      userTags: [],
      questionsAsked: new Set(['baseline']),
      dimensionCoverage: new Map([
        ['conceptual', 0],
        ['operational', 0],
        ['governance', 0]
      ]),
      adjustedLevel: undefined
    }
  }
}