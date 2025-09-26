'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface AITool {
  id: string
  name: string
  description: string
  category: 'policy' | 'compliance' | 'prompt' | 'ethics' | 'playground'
  icon: string
  isEnabled: boolean
  config?: Record<string, any>
}

export interface PromptTemplate {
  id: string
  name: string
  category: string
  template: string
  variables: string[]
  description?: string
  examples?: string[]
  tags: string[]
  industry?: string
}

export interface PolicyDocument {
  id: string
  title: string
  type: 'governance' | 'ethics' | 'usage' | 'compliance'
  status: 'draft' | 'review' | 'approved' | 'published'
  version: string
  content: string
  sections: PolicySection[]
  createdAt: Date
  updatedAt: Date
  approvedBy?: string
  industry?: string
}

export interface PolicySection {
  id: string
  title: string
  content: string
  order: number
  isRequired: boolean
  guidelines?: string[]
}

export interface ComplianceCheck {
  id: string
  name: string
  description: string
  category: string
  status: 'passed' | 'failed' | 'warning' | 'pending'
  checkDate: Date
  details?: string
  recommendations?: string[]
}

export interface EthicsScenario {
  id: string
  title: string
  description: string
  industry: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  scenario: string
  options: EthicsOption[]
  correctOptionId?: string
  explanation?: string
  relatedPolicies?: string[]
}

export interface EthicsOption {
  id: string
  text: string
  impact: 'positive' | 'negative' | 'neutral'
  explanation?: string
}

export interface AIPlaygroundSession {
  id: string
  model: string
  prompt: string
  response: string
  parameters: {
    temperature?: number
    maxTokens?: number
    topP?: number
  }
  timestamp: Date
  feedback?: 'helpful' | 'unhelpful'
  notes?: string
}

interface AIState {
  tools: AITool[]
  promptTemplates: PromptTemplate[]
  promptHistory: AIPlaygroundSession[]
  policyDocuments: PolicyDocument[]
  complianceChecks: ComplianceCheck[]
  ethicsScenarios: EthicsScenario[]
  activeToolId: string | null
  isLoading: boolean
  error: string | null
}

interface AIContextValue extends AIState {
  // Tool management
  setActiveTool: (toolId: string) => void
  toggleTool: (toolId: string) => void
  
  // Prompt management
  savePromptTemplate: (template: PromptTemplate) => void
  deletePromptTemplate: (id: string) => void
  addToPromptHistory: (session: AIPlaygroundSession) => void
  
  // Policy management
  createPolicyDocument: (doc: Omit<PolicyDocument, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePolicyDocument: (id: string, updates: Partial<PolicyDocument>) => void
  approvePolicyDocument: (id: string, approver: string) => void
  
  // Compliance management
  runComplianceCheck: (checkId: string) => Promise<ComplianceCheck>
  getComplianceStatus: () => 'compliant' | 'non-compliant' | 'partial'
  
  // Ethics management
  submitEthicsResponse: (scenarioId: string, optionId: string) => void
  getEthicsScore: () => number
}

const AIContext = createContext<AIContextValue | null>(null)

// Default AI tools for RUDI
const defaultTools: AITool[] = [
  {
    id: 'policy-builder',
    name: 'AI Policy Builder',
    description: 'Create comprehensive AI governance policies',
    category: 'policy',
    icon: '📜',
    isEnabled: true
  },
  {
    id: 'compliance-checker',
    name: 'Compliance Checker',
    description: 'Verify AI usage compliance with regulations',
    category: 'compliance',
    icon: '✅',
    isEnabled: true
  },
  {
    id: 'prompt-library',
    name: 'Prompt Library',
    description: 'Industry-specific prompt templates',
    category: 'prompt',
    icon: '📚',
    isEnabled: true
  },
  {
    id: 'ethics-simulator',
    name: 'Ethics Simulator',
    description: 'Practice ethical AI decision-making',
    category: 'ethics',
    icon: '⚖️',
    isEnabled: true
  },
  {
    id: 'ai-playground',
    name: 'AI Playground',
    description: 'Experiment with AI models safely',
    category: 'playground',
    icon: '🎮',
    isEnabled: true
  }
]

// Industry-specific prompt templates
const defaultPromptTemplates: PromptTemplate[] = [
  {
    id: 'hr-job-description',
    name: 'Job Description Generator',
    category: 'HR',
    template: 'Create a job description for a {position} role requiring {experience} years of experience in {industry}. Key responsibilities: {responsibilities}. Required skills: {skills}.',
    variables: ['position', 'experience', 'industry', 'responsibilities', 'skills'],
    description: 'Generate comprehensive job descriptions',
    tags: ['hr', 'recruitment', 'job-posting'],
    industry: 'HR'
  },
  {
    id: 'edu-lesson-plan',
    name: 'Lesson Plan Creator',
    category: 'Education',
    template: 'Create a {duration}-minute lesson plan for {grade} grade students on the topic of {topic}. Learning objectives: {objectives}. Include {activityType} activities.',
    variables: ['duration', 'grade', 'topic', 'objectives', 'activityType'],
    description: 'Design structured lesson plans',
    tags: ['education', 'teaching', 'curriculum'],
    industry: 'Education'
  },
  {
    id: 'gov-policy-brief',
    name: 'Policy Brief Writer',
    category: 'Government',
    template: 'Write a policy brief on {issue} for {audience}. Current situation: {situation}. Proposed solution: {solution}. Expected impact: {impact}.',
    variables: ['issue', 'audience', 'situation', 'solution', 'impact'],
    description: 'Create concise policy briefs',
    tags: ['government', 'policy', 'public-sector'],
    industry: 'Government'
  }
]

export function AIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AIState>({
    tools: defaultTools,
    promptTemplates: defaultPromptTemplates,
    promptHistory: [],
    policyDocuments: [],
    complianceChecks: [],
    ethicsScenarios: [],
    activeToolId: null,
    isLoading: false,
    error: null
  })

  useEffect(() => {
    // Load saved AI data from API or local storage
    loadAIData()
  }, [])

  const loadAIData = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      // This would fetch from your API
      // const data = await fetchAIData()
      // setState(prev => ({ ...prev, ...data, isLoading: false }))
      
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load AI data'
      }))
    }
  }

  const setActiveTool = (toolId: string) => {
    setState(prev => ({ ...prev, activeToolId: toolId }))
  }

  const toggleTool = (toolId: string) => {
    setState(prev => ({
      ...prev,
      tools: prev.tools.map(tool =>
        tool.id === toolId ? { ...tool, isEnabled: !tool.isEnabled } : tool
      )
    }))
  }

  const savePromptTemplate = (template: PromptTemplate) => {
    setState(prev => ({
      ...prev,
      promptTemplates: [...prev.promptTemplates, template]
    }))
  }

  const deletePromptTemplate = (id: string) => {
    setState(prev => ({
      ...prev,
      promptTemplates: prev.promptTemplates.filter(t => t.id !== id)
    }))
  }

  const addToPromptHistory = (session: AIPlaygroundSession) => {
    setState(prev => ({
      ...prev,
      promptHistory: [session, ...prev.promptHistory.slice(0, 99)]
    }))
  }

  const createPolicyDocument = (doc: Omit<PolicyDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoc: PolicyDocument = {
      ...doc,
      id: `policy-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setState(prev => ({
      ...prev,
      policyDocuments: [...prev.policyDocuments, newDoc]
    }))
  }

  const updatePolicyDocument = (id: string, updates: Partial<PolicyDocument>) => {
    setState(prev => ({
      ...prev,
      policyDocuments: prev.policyDocuments.map(doc =>
        doc.id === id ? { ...doc, ...updates, updatedAt: new Date() } : doc
      )
    }))
  }

  const approvePolicyDocument = (id: string, approver: string) => {
    updatePolicyDocument(id, { 
      status: 'approved', 
      approvedBy: approver 
    })
  }

  const runComplianceCheck = async (checkId: string): Promise<ComplianceCheck> => {
    // Simulate compliance check
    return new Promise((resolve) => {
      setTimeout(() => {
        const check: ComplianceCheck = {
          id: checkId,
          name: 'AI Usage Compliance',
          description: 'Checking AI usage against company policies',
          category: 'general',
          status: 'passed',
          checkDate: new Date(),
          details: 'All AI usage complies with current policies'
        }
        setState(prev => ({
          ...prev,
          complianceChecks: [...prev.complianceChecks, check]
        }))
        resolve(check)
      }, 1000)
    })
  }

  const getComplianceStatus = (): 'compliant' | 'non-compliant' | 'partial' => {
    const checks = state.complianceChecks
    if (checks.length === 0) return 'partial'
    
    const failed = checks.filter(c => c.status === 'failed').length
    const warnings = checks.filter(c => c.status === 'warning').length
    
    if (failed > 0) return 'non-compliant'
    if (warnings > 0) return 'partial'
    return 'compliant'
  }

  const submitEthicsResponse = (scenarioId: string, optionId: string) => {
    // TODO: Record ethics scenario response to backend
    // { scenarioId, optionId }
  }

  const getEthicsScore = (): number => {
    // Calculate ethics training score
    return 85 // Placeholder
  }

  const value: AIContextValue = {
    ...state,
    setActiveTool,
    toggleTool,
    savePromptTemplate,
    deletePromptTemplate,
    addToPromptHistory,
    createPolicyDocument,
    updatePolicyDocument,
    approvePolicyDocument,
    runComplianceCheck,
    getComplianceStatus,
    submitEthicsResponse,
    getEthicsScore
  }

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
}

// Helper hooks
export function useAITools() {
  const { tools, activeToolId, setActiveTool } = useAI()
  return { tools, activeToolId, setActiveTool }
}

export function usePrompts() {
  const { promptTemplates, promptHistory, savePromptTemplate, addToPromptHistory } = useAI()
  return { promptTemplates, promptHistory, savePromptTemplate, addToPromptHistory }
}

export function usePolicies() {
  const { policyDocuments, createPolicyDocument, updatePolicyDocument, approvePolicyDocument } = useAI()
  return { policyDocuments, createPolicyDocument, updatePolicyDocument, approvePolicyDocument }
}

export function useCompliance() {
  const { complianceChecks, runComplianceCheck, getComplianceStatus } = useAI()
  return { complianceChecks, runComplianceCheck, complianceStatus: getComplianceStatus() }
}