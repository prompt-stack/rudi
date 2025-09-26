/**
 * Assessment Questions
 * RUDI AI Readiness Assessment question bank
 */

import { AssessmentQuestion } from './types';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Q1: Frequency - Establish baseline usage
  {
    id: "frequency",
    order: 1,
    type: "single",
    dimension: "operational",
    text: "How often do you currently use AI tools?",
    options: [
      { value: 0, text: "Never", level: "no_exposure" },
      { value: 1, text: "Rarely (a few times ever)", level: "pre_beginner" },
      { value: 2, text: "Monthly (1-3 times per month)", level: "beginner" },
      { value: 3, text: "Weekly (1-3 times per week)", level: "intermediate" },
      { value: 4, text: "Daily or almost daily", level: "advanced" }
    ]
  },

  // Q2: Tool Familiarity - Which tools they've used
  {
    id: "tool_familiarity",
    order: 2,
    type: "checkbox",
    dimension: "operational",
    text: "Which specific AI tools have you used for work or personal tasks?",
    instruction: "Select all that apply",
    options: [
      { value: "chatgpt", text: "ChatGPT", weight: 1 },
      { value: "gemini", text: "Google Gemini", weight: 1 },
      { value: "claude", text: "Claude (Anthropic)", weight: 2 },
      { value: "perplexity", text: "Perplexity AI", weight: 2 },
      { value: "coding", text: "Cursor / Claude Code / Codeium", weight: 2 },
      { value: "image", text: "Midjourney / DALL-E / Adobe Firefly", weight: 2 },
      { value: "education", text: "MagicSchool AI / Khanmigo", weight: 3 },
      { value: "meeting", text: "Otter.ai / Read.ai (meeting tools)", weight: 3 },
      { value: "genspark", text: "GenSpark / Manus (agents)", weight: 4 },
      { value: "prototyping", text: "Lovable / Bolt.new / v0", weight: 4 },
      { value: "video", text: "Runway / Pika Labs (video tools)", weight: 4 },
      { value: "voice", text: "ElevenLabs / Descript (voice tools)", weight: 4 },
      { value: "none", text: "None of these", weight: 0 }
    ]
  },

  // Q3: Task Complexity - What they've accomplished
  {
    id: "task_complexity",
    order: 3,
    type: "single",
    dimension: "operational",
    text: "What's the most complex thing you've successfully done with AI?",
    options: [
      { value: 0, text: "I haven't used AI tools", level: "no_exposure" },
      { value: 1, text: "Asked simple questions or got quick answers", level: "pre_beginner" },
      { value: 2, text: "Created basic content (emails, summaries, lists)", level: "beginner" },
      { value: 3, text: "Completed multi-step projects with heavy editing", level: "intermediate" },
      { value: 4, text: "Built AI workflows or trained others to use AI", level: "advanced" }
    ]
  },

  // Q4: Understanding - Conceptual knowledge
  {
    id: "understanding",
    order: 4,
    type: "single",
    dimension: "conceptual",
    text: "Which best describes your understanding of how AI works?",
    options: [
      { value: 0, text: "I don't understand how AI works", level: "no_exposure" },
      { value: 1, text: "It's like a very smart computer or search engine", level: "pre_beginner" },
      { value: 2, text: "It recognizes patterns from large amounts of data", level: "beginner" },
      { value: 3, text: "It generates responses based on training data, with inherent limitations and biases", level: "intermediate" },
      { value: 4, text: "I understand the technical architecture, training processes, and can explain trade-offs", level: "advanced" }
    ]
  },

  // Q5: Comfort Level - Learning aptitude
  {
    id: "comfort_level",
    order: 5,
    type: "single",
    dimension: "conceptual",
    text: "How comfortable are you learning new AI tools?",
    options: [
      { value: 0, text: "Very uncomfortable - I avoid new technology", level: "no_exposure" },
      { value: 1, text: "Uncomfortable - I need lots of help and time", level: "pre_beginner" },
      { value: 2, text: "Neutral - I can learn with some guidance", level: "beginner" },
      { value: 3, text: "Comfortable - I figure things out independently", level: "intermediate" },
      { value: 4, text: "Very comfortable - I enjoy exploring and teaching others", level: "advanced" }
    ]
  },

  // Q6: Verification - Governance practices
  {
    id: "verification",
    order: 6,
    type: "single",
    dimension: "governance",
    text: "When using AI-generated content for important work, what do you typically do?",
    options: [
      { value: 0, text: "I don't use AI-generated content", level: "no_exposure" },
      { value: 1, text: "Use it directly as-is if it looks good", level: "pre_beginner" },
      { value: 2, text: "Quick review and basic edits", level: "beginner" },
      { value: 3, text: "Thorough fact-checking and note it's AI-assisted", level: "intermediate" },
      { value: 4, text: "Complete verification with documentation and audit trail", level: "advanced" }
    ]
  },

  // Q7: Concerns - Governance awareness
  {
    id: "concerns",
    order: 7,
    type: "checkbox",
    dimension: "governance",
    text: "What governance and ethical aspects of AI are you most aware of?",
    instruction: "Select up to 3 that concern you most",
    maxSelections: 3,
    options: [
      { value: "understanding", text: "Don't understand it well enough", weight: 1 },
      { value: "privacy", text: "Data privacy and security", weight: 2 },
      { value: "accuracy", text: "Accuracy and reliability of outputs", weight: 2 },
      { value: "dependency", text: "People becoming too dependent on AI", weight: 2 },
      { value: "bias", text: "Bias and fairness issues", weight: 3 },
      { value: "job", text: "Job displacement", weight: 1 },
      { value: "cheating", text: "Cheating or misuse", weight: 2 },
      { value: "guidelines", text: "Lack of organizational guidelines", weight: 3 },
      { value: "ethics", text: "Ethical decision-making", weight: 3 },
      { value: "no_concerns", text: "No concerns", weight: 0 }
    ]
  },

  // Q8: Priority - Multiple practical goals (captures diverse needs)
  {
    id: "priority",
    order: 8,
    type: "checkbox",
    dimension: "readiness",
    text: "What are your AI priorities for the next 60 days?",
    instruction: "Select up to 2 most important",
    maxSelections: 2,
    options: [
      { value: "ethics", text: "Understanding AI ethics and responsible use", weight: 3 },
      { value: "admin", text: "Saving time on routine tasks (admin, reports, documentation)", weight: 2 },
      { value: "communication", text: "Improving communication and content creation", weight: 2 },
      { value: "data", text: "Building data insights and analytics capabilities", weight: 4 },
      { value: "creative", text: "Creative work (design, marketing, presentations)", weight: 3 },
      { value: "learning", text: "Personal learning and skill development", weight: 1 }
    ]
  },

  // Q9: Role - Demographics (optional)
  {
    id: "role",
    order: 9,
    type: "single",
    dimension: "demographic",
    text: "Which best describes your role?",
    optional: true,
    options: [
      { value: "technical", text: "Technical (Development, Engineering, IT)" },
      { value: "non_technical", text: "Non-Technical (Business, Creative, Operations)" },
      { value: "educator", text: "Educator/Nonprofit" },
      { value: "student", text: "Student" }
    ]
  },

  // Q10: Organizational Usage (optional)
  {
    id: "org_ai_usage",
    order: 10,
    type: "single",
    dimension: "organizational",
    text: "How would you describe your organization's current AI usage?",
    optional: true,
    options: [
      { value: 0, text: "No use yet", level: "no_exposure" },
      { value: 1, text: "Individual staff experimenting informally", level: "pre_beginner" },
      { value: 2, text: "Small pilot(s) in one area", level: "beginner" },
      { value: 3, text: "Several pilots across units", level: "intermediate" },
      { value: 4, text: "Operationalized in standard workflows (with safeguards)", level: "advanced" }
    ]
  }
];

// Helper function to get question by ID
export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return assessmentQuestions.find(q => q.id === id);
}

// Helper function to get questions by dimension
export function getQuestionsByDimension(dimension: string): AssessmentQuestion[] {
  return assessmentQuestions.filter(q => q.dimension === dimension);
}