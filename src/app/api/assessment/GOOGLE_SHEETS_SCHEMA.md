# Google Sheets Schema for RUDI Assessment

## Important: Column Order
This document defines the EXACT column order that must match your Google Sheets headers.
Last updated: When we reordered questions (Q1=Frequency, Q2=Tool Familiarity)

## Spreadsheet Configuration
- **Sheet Name**: Responses
- **Range**: A:Q (17 columns)
- **First Row**: Headers (see below)

## Column Headers (A-Q)

| Column | Header Name | Data Type | Question # | Description |
|--------|-------------|-----------|------------|-------------|
| **A** | Timestamp | ISO DateTime | - | When assessment was submitted |
| **B** | Organization | Text | - | Organization name or "Individual" |
| **C** | Operational Score | Number | - | 0-100 operational dimension score |
| **D** | Conceptual Score | Number | - | 0-100 conceptual dimension score |
| **E** | Governance Score | Number | - | 0-100 governance dimension score |
| **F** | Overall Score | Number | - | 0-100 weighted overall score |
| **G** | Level | Text | - | Level key (e.g., "intermediate") |
| **H** | Q1 - Frequency | Text | Q1 | How often use AI (e.g., "Daily or almost daily") |
| **I** | Q2 - Tools Used | Text List | Q2 | Comma-separated tools (e.g., "chatgpt, claude") |
| **J** | Q3 - Task Complexity | Text | Q3 | Most complex task achieved |
| **K** | Q4 - Understanding | Text | Q4 | Understanding of how AI works |
| **L** | Q5 - Comfort Level | Text | Q5 | Comfort learning new tools |
| **M** | Q6 - Verification | Text | Q6 | How verify AI content |
| **N** | Q7 - Concerns | Text List | Q7 | Comma-separated concerns |
| **O** | Q8 - Priorities | Text List | Q8 | Comma-separated 60-day priorities |
| **P** | Q9 - Role | Text | Q9 | Optional: User's role |
| **Q** | Q10 - Org AI Usage | Text | Q10 | Optional: Organization's AI maturity |

## Data Format Notes

### Text Lists (Checkbox Questions)
- **Tools Used (I)**: "chatgpt, claude, coding, image"
- **Concerns (N)**: "privacy, bias, guidelines"
- **Priorities (O)**: "ethics, admin, data"
- Empty if none selected

### Single Choice Questions
- Full text of selected option, NOT the numeric value
- Example: "Daily or almost daily" not "4"

### Optional Fields
- Columns P and Q may be empty if user skipped
- Organization (B) defaults to "Individual" if not provided

## Sample Row
```
2024-01-15T10:30:00Z | ABC Corp | 65 | 70 | 55 | 63 | intermediate | Weekly (1-3 times per week) | chatgpt, claude | Created basic content (emails, summaries, lists) | It recognizes patterns from large amounts of data | Comfortable - I figure things out independently | Quick review and basic edits | privacy, accuracy, bias | ethics, admin | educator | Several pilots across units
```

## Level Values
- `no_exposure` → "AI Novice"
- `pre_beginner` → "AI Curious"
- `beginner` → "AI Explorer"
- `intermediate` → "AI Practitioner"
- `advanced` → "AI Leader"

## Important Implementation Note
⚠️ **The order here MUST match the order in `/src/app/api/assessment/submit/route.ts`**
If questions are reordered in the assessment, update both this document AND the API route.