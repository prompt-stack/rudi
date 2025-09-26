const fs = require('fs')
const path = require('path')

console.log('RUDI Assessment V2 Structure Check\n')
console.log('=' .repeat(50))

const baseDir = path.join(__dirname, '../src/frontend/data/rudi-assessment-v2')

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    console.log(`Error loading ${filePath}: ${err.message}`)
    return null
  }
}

const tracks = ['technical', 'non-technical']
const dimensions = ['conceptual', 'operational', 'governance']

let totalQuestions = 0
const questionMatrix = {}

for (const track of tracks) {
  questionMatrix[track] = {}

  for (const dimension of dimensions) {
    const filePath = path.join(baseDir, 'questions', track, `${dimension}.json`)
    const data = loadJSON(filePath)

    if (data && data.questions) {
      questionMatrix[track][dimension] = data.questions.length
      totalQuestions += data.questions.length

      const levelCounts = {}
      data.questions.forEach(q => {
        levelCounts[q.level] = (levelCounts[q.level] || 0) + 1
      })

      console.log(`\n${track.toUpperCase()} - ${dimension}:`)
      console.log(`  Total: ${data.questions.length} questions`)
      console.log('  By level:')
      Object.entries(levelCounts).forEach(([level, count]) => {
        console.log(`    - ${level}: ${count}`)
      })
    }
  }
}

console.log('\n' + '=' .repeat(50))
console.log('SUMMARY:')
console.log(`Total questions: ${totalQuestions}`)
console.log('\nMatrix Coverage:')
console.log('              Conceptual  Operational  Governance')
for (const track of tracks) {
  const row = `${track.padEnd(13)} ${questionMatrix[track].conceptual || 0}`.padEnd(25) +
              `${questionMatrix[track].operational || 0}`.padEnd(13) +
              `${questionMatrix[track].governance || 0}`
  console.log(row)
}

console.log('\n' + '=' .repeat(50))
console.log('With 2 meta questions (baseline + track), total: ' + (totalQuestions + 2))