# Assessment Module Structure

## Overview
Clean, modular structure for the RUDI AI Readiness Assessment

## Directory Structure

```
/src/app/assessment/
  page.tsx              # Landing page (uses AssessmentIntro component)
  survey/page.tsx       # Survey page (uses AssessmentSurvey component)
  results/page.tsx      # Results page (future)

/src/frontend/components/features/assessment/
  AssessmentIntro.tsx   # Landing/intro component
  AssessmentSurvey.tsx  # Main survey component

/src/frontend/data/assessment/
  index.ts              # Main export point
  types.ts              # TypeScript interfaces
  questions.ts          # Assessment questions
  scoring.ts            # Scoring logic

/src/app/api/assessment/submit/
  route.ts              # Google Sheets submission API
```

## Key Features

### Modular Design
- **Separation of Concerns**: Questions, scoring, and types are in separate files
- **Type Safety**: Full TypeScript support with proper interfaces
- **Easy to Modify**: Questions can be updated without touching scoring logic
- **Clear Naming**: No more "V2" or "Simple" prefixes

### Question Structure
- 10 questions across 3 dimensions (Operational, Conceptual, Governance)
- Support for single-choice and multiple-choice questions
- Optional demographic questions
- Clean flow from frequency → tools → complexity → understanding

### Scoring System
- Weighted scoring across three dimensions:
  - Operational: 40% (usage and experience)
  - Conceptual: 30% (understanding)
  - Governance: 30% (responsible practices)
- 5 proficiency levels: Novice → Curious → Explorer → Practitioner → Champion
- Smart adjustments based on self-assessment

## Usage

```typescript
import {
  assessmentConfig,
  calculateScore,
  AssessmentResponses
} from '@/frontend/data/assessment';

// Get questions
const questions = assessmentConfig.questions;

// Calculate score from responses
const result = calculateScore(responses);
console.log(result.level); // 'intermediate'
console.log(result.scores.overall); // 65
```

## Maintenance

### To Add a Question:
1. Add to `questions.ts`
2. Update scoring in `scoring.ts` if needed
3. Add types to `types.ts` if needed

### To Modify Scoring:
1. Edit `scoring.ts`
2. Adjust weights or thresholds as needed

### To Change UI:
1. Edit `AssessmentSurvey.tsx` for survey flow
2. Edit `AssessmentIntro.tsx` for landing page