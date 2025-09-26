# RUDI Assessment Scoring System Documentation

## Scoring Levels (0-4 Scale)
- **0**: No Exposure - Never used AI
- **1**: Pre-Beginner - Minimal exposure
- **2**: Beginner - Basic understanding
- **3**: Intermediate - Regular usage
- **4**: Advanced - Expert level

## How Scoring Works

### 1. **Baseline Question Weight (30%)**
The first question categorizes users and heavily influences final score:
- Carries 30% weight in final calculation
- Determines the user's path (novice/explorer/user/practitioner/leader)

### 2. **Dimension Scores (70%)**
Three dimensions are assessed:
- **Conceptual**: Understanding of AI concepts
- **Operational**: Practical usage skills
- **Governance**: Ethics, safety, responsibility

### 3. **Weighted Calculation**
```
Final Score = (Baseline × 0.3) + (Dimension Average × 0.7)
```

## Question Inventory

### Total Questions Available: 13

#### Baseline (1 question)
- Entry question that routes to different paths

#### Conceptual Questions (3 questions)
- `conceptual_basic` (shown to: novice, explorer)
- `conceptual_intermediate` (shown to: user)
- `conceptual_advanced` (shown to: practitioner, leader)

#### Operational Questions (3 questions)
- `operational_basic` (shown to: novice, explorer, user)
- `operational_intermediate` (shown to: user)
- `operational_advanced` (shown to: practitioner, leader)

#### Governance Questions (3 questions)
- `governance_basic` (shown to: novice, explorer)
- `governance_intermediate` (shown to: user)
- `governance_advanced` (shown to: practitioner, leader)

#### Follow-up (1 optional question)
- Meta question about learning needs (doesn't affect score)

## Adaptive Paths

### Path 1: Novice (Baseline = 0)
1. Baseline → conceptual_basic
2. conceptual_basic → governance_basic
3. governance_basic → follow_up
4. **Engine fills**: operational_basic (to reach 5 questions)
5. **Engine fills**: Any remaining question for dimension balance

### Path 2: Explorer (Baseline = 1)
1. Baseline → conceptual_basic
2. conceptual_basic → governance_basic or operational_basic
3. governance_basic → follow_up
4. **Engine fills**: Missing dimension questions
5. **Engine fills**: Additional question for balance

### Path 3: User (Baseline = 2)
1. Baseline → operational_intermediate
2. operational_intermediate → conceptual_intermediate or governance_intermediate
3. conceptual_intermediate → governance_intermediate
4. governance_intermediate → summary
5. **Engine fills**: Additional questions if needed

### Path 4: Practitioner (Baseline = 3)
1. Baseline → operational_advanced
2. operational_advanced → conceptual_advanced or governance_advanced
3. conceptual_advanced → governance_advanced
4. governance_advanced → summary
5. **Engine fills**: Additional questions if needed

### Path 5: Leader (Baseline = 4)
1. Baseline → governance_advanced
2. governance_advanced → summary
3. **Engine fills**: operational_advanced
4. **Engine fills**: conceptual_advanced
5. **Engine fills**: Additional question for 5 minimum

## Edge Cases

### Maximum Score Scenario
If someone answers "4" (Advanced) to everything:
- Baseline: 4
- Operational: 4
- Conceptual: 4
- Governance: 4
- **Final Score**: (4 × 0.3) + (4 × 0.7) = 1.2 + 2.8 = **4.0**

### Minimum Score Scenario
If someone answers "0" (No Exposure) to everything:
- Baseline: 0
- All dimensions: 0
- **Final Score**: (0 × 0.3) + (0 × 0.7) = **0.0**

### Mixed Performance
Example: Advanced baseline but beginner in practice
- Baseline: 4 (claims expertise)
- Operational: 2 (actual skills are basic)
- Conceptual: 2 (limited understanding)
- Governance: 3 (some awareness)
- **Final Score**: (4 × 0.3) + ((2+2+3)/3 × 0.7) = 1.2 + 1.63 = **2.83**

## Why This Works

1. **Baseline as Reality Check**: The 30% weight on baseline prevents gaming but doesn't dominate
2. **Dimension Balance**: 70% weight on actual performance across dimensions
3. **Adaptive Engine**: Ensures everyone gets tested on all three dimensions
4. **Minimum 5 Questions**: Statistical validity while respecting user time
5. **Path Flexibility**: Different depths for different expertise levels

## Question Distribution by Value

| Value | Count | Percentage |
|-------|-------|------------|
| 0     | 4     | 12%        |
| 1     | 7     | 21%        |
| 2     | 10    | 30%        |
| 3     | 10    | 30%        |
| 4     | 7     | 21%        |

This bell-curve distribution ensures most questions target intermediate levels while still testing extremes.