import { AdaptiveEngine } from './adaptive-engine'
import assessmentData from '@/frontend/data/rudi-assessment'

function testAssessmentFlow() {
  console.log('Testing RUDI Adaptive Assessment Flow\n')
  console.log('=' .repeat(50))

  const engine = new AdaptiveEngine()

  console.log(`Total questions available: ${assessmentData.questions.length}`)
  console.log(`- Baseline + Track: 2`)
  console.log(`- Content questions: ${assessmentData.questions.length - 2}`)

  const questionsByDimension = assessmentData.questions.reduce((acc, q) => {
    if (q.dimension !== 'meta') {
      acc[q.dimension] = (acc[q.dimension] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  console.log('\nQuestions by dimension:')
  Object.entries(questionsByDimension).forEach(([dim, count]) => {
    console.log(`- ${dim}: ${count}`)
  })

  console.log('\n' + '='.repeat(50))
  console.log('Simulating Technical User Path (Intermediate level)\n')

  const responses = [
    { questionId: 'baseline', optionIndex: 2 }, // "I use AI tools occasionally"
    { questionId: 'track_determination', optionIndex: 1 }, // "Software development..."
  ]

  let currentQuestionId = 'baseline'
  let questionCount = 0

  for (const response of responses) {
    const question = assessmentData.questions.find(q => q.id === response.questionId)
    if (!question) continue

    const selectedOption = question.options[response.optionIndex]
    console.log(`Q${++questionCount}: ${question.text}`)
    console.log(`   A: ${selectedOption.text}`)

    engine.updateState({
      questionId: question.id,
      dimension: question.dimension,
      value: selectedOption.value,
      level: selectedOption.level,
      tags: selectedOption.tags
    })

    const nextQuestionId = engine.getNextQuestion(question.id, selectedOption)

    if (nextQuestionId === 'summary') {
      console.log('\n→ Assessment complete!')
      break
    }

    currentQuestionId = nextQuestionId
  }

  console.log('\nSimulating adaptive questions...')

  while (currentQuestionId && currentQuestionId !== 'summary') {
    const question = assessmentData.questions.find(q => q.id === currentQuestionId)
    if (!question) {
      console.log(`Warning: Question ${currentQuestionId} not found`)
      break
    }

    console.log(`Q${++questionCount}: [${question.dimension}] ${question.text.substring(0, 50)}...`)

    const selectedOption = question.options[1] || question.options[0]

    engine.updateState({
      questionId: question.id,
      dimension: question.dimension,
      value: selectedOption.value,
      level: selectedOption.level,
      tags: selectedOption.tags
    })

    currentQuestionId = engine.getNextQuestion(question.id, selectedOption)

    if (questionCount > 15) {
      console.log('Safety break - too many questions')
      break
    }
  }

  const realQuestions = questionCount - 2 // Exclude baseline and track
  console.log(`\n✓ Total questions asked: ${questionCount}`)
  console.log(`✓ Real assessment questions: ${realQuestions}`)
  console.log(`✓ Within range (5-10): ${realQuestions >= 5 && realQuestions <= 10 ? 'YES' : 'NO'}`)

  console.log('\n' + '='.repeat(50))
  console.log('Test Complete')
}

if (require.main === module) {
  testAssessmentFlow()
}

export { testAssessmentFlow }