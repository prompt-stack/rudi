'use client'

import React, { useState } from 'react'
import { usePolicies } from '@/frontend/contexts/AIContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/frontend/components/primitives/ui/card'
import { Button } from '@/frontend/components/primitives/ui/button'
import { Badge } from '@/frontend/components/primitives/ui/badge'
import { FileText, Plus, Save, Download, Check, AlertCircle, Edit3 } from 'lucide-react'

interface PolicySection {
  id: string
  title: string
  content: string
  isRequired: boolean
  suggestions?: string[]
}

const policyTemplates = {
  governance: {
    name: 'AI Governance Policy',
    sections: [
      { title: 'Purpose and Scope', isRequired: true },
      { title: 'Definitions', isRequired: true },
      { title: 'Governance Structure', isRequired: true },
      { title: 'Roles and Responsibilities', isRequired: true },
      { title: 'Risk Management', isRequired: true },
      { title: 'Compliance and Audit', isRequired: true },
      { title: 'Training Requirements', isRequired: false },
      { title: 'Review and Updates', isRequired: true }
    ]
  },
  ethics: {
    name: 'AI Ethics Policy',
    sections: [
      { title: 'Ethical Principles', isRequired: true },
      { title: 'Fairness and Non-discrimination', isRequired: true },
      { title: 'Transparency and Explainability', isRequired: true },
      { title: 'Privacy and Data Protection', isRequired: true },
      { title: 'Human Oversight', isRequired: true },
      { title: 'Accountability', isRequired: true },
      { title: 'Societal Impact', isRequired: false }
    ]
  },
  usage: {
    name: 'AI Usage Guidelines',
    sections: [
      { title: 'Acceptable Use', isRequired: true },
      { title: 'Prohibited Activities', isRequired: true },
      { title: 'Data Requirements', isRequired: true },
      { title: 'Model Selection Criteria', isRequired: true },
      { title: 'Testing and Validation', isRequired: true },
      { title: 'Deployment Guidelines', isRequired: true },
      { title: 'Monitoring and Maintenance', isRequired: true }
    ]
  }
}

export default function PolicyBuilder() {
  const { policyDocuments, createPolicyDocument, updatePolicyDocument } = usePolicies()
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof policyTemplates>('governance')
  const [currentSections, setCurrentSections] = useState<PolicySection[]>([])
  const [policyTitle, setPolicyTitle] = useState('')
  const [industry, setIndustry] = useState('')
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const startNewPolicy = (templateType: keyof typeof policyTemplates) => {
    const template = policyTemplates[templateType]
    const sections: PolicySection[] = template.sections.map((section, index) => ({
      id: `section-${index}`,
      title: section.title,
      content: '',
      isRequired: section.isRequired,
      suggestions: getSuggestionsForSection(section.title, industry)
    }))
    
    setSelectedTemplate(templateType)
    setCurrentSections(sections)
    setPolicyTitle(template.name)
  }

  const getSuggestionsForSection = (sectionTitle: string, industry: string): string[] => {
    // This would normally use AI to generate suggestions
    const baseSuggestions: Record<string, string[]> = {
      'Purpose and Scope': [
        'Define the objectives of AI usage in your organization',
        'Specify which AI applications this policy covers',
        'Outline the expected benefits and outcomes'
      ],
      'Ethical Principles': [
        'Commit to fairness and non-discrimination',
        'Ensure transparency in AI decision-making',
        'Prioritize human welfare and safety'
      ],
      'Risk Management': [
        'Identify potential risks of AI implementation',
        'Establish risk assessment procedures',
        'Define mitigation strategies'
      ]
    }
    
    return baseSuggestions[sectionTitle] || []
  }

  const updateSectionContent = (sectionId: string, content: string) => {
    setCurrentSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, content } : section
      )
    )
  }

  const savePolicy = () => {
    const policyDoc = {
      title: policyTitle,
      type: selectedTemplate as 'governance' | 'ethics' | 'usage',
      status: 'draft' as const,
      version: '1.0',
      content: currentSections.map(s => s.content).join('\n\n'),
      sections: currentSections.map((s, idx) => ({
        id: s.id,
        title: s.title,
        content: s.content,
        order: idx,
        isRequired: s.isRequired
      })),
      industry
    }
    
    createPolicyDocument(policyDoc)
  }

  const getSectionCompleteness = () => {
    const required = currentSections.filter(s => s.isRequired)
    const completed = required.filter(s => s.content.length > 0)
    return { completed: completed.length, total: required.length }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Policy Builder</h2>
          <p className="text-muted-foreground">Create comprehensive AI governance documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={savePolicy} disabled={currentSections.length === 0}>
            <Save className="mr-2 h-4 w-4" />
            Save Policy
          </Button>
        </div>
      </div>

      {/* Template Selection */}
      {currentSections.length === 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(policyTemplates).map(([key, template]) => (
            <Card 
              key={key}
              className="cursor-pointer transition-all hover:shadow-lg"
              onClick={() => startNewPolicy(key as keyof typeof policyTemplates)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {template.name}
                </CardTitle>
                <CardDescription>
                  {template.sections.length} sections • {
                    template.sections.filter(s => s.isRequired).length
                  } required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {template.sections.slice(0, 3).map((section, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {section.isRequired ? (
                        <AlertCircle className="h-3 w-3 text-amber-500" />
                      ) : (
                        <Check className="h-3 w-3 text-green-500" />
                      )}
                      <span className="text-muted-foreground">{section.title}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    +{template.sections.length - 3} more sections
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Policy Editor */}
      {currentSections.length > 0 && (
        <>
          {/* Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{policyTitle}</CardTitle>
                <Badge variant={getSectionCompleteness().completed === getSectionCompleteness().total ? 'success' : 'warning'}>
                  {getSectionCompleteness().completed}/{getSectionCompleteness().total} Required Sections
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Sections */}
          <div className="space-y-4">
            {currentSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {section.title}
                      </CardTitle>
                      {section.isRequired && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingSection(
                        editingSection === section.id ? null : section.id
                      )}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                {editingSection === section.id && (
                  <CardContent>
                    <div className="space-y-3">
                      {section.suggestions && section.suggestions.length > 0 && (
                        <div className="rounded-lg bg-muted p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Suggestions:
                          </p>
                          <ul className="space-y-1">
                            {section.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                • {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <textarea
                        className="w-full min-h-[150px] p-3 border rounded-lg"
                        placeholder={`Enter content for ${section.title}...`}
                        value={section.content}
                        onChange={(e) => updateSectionContent(section.id, e.target.value)}
                      />
                    </div>
                  </CardContent>
                )}
                {!editingSection && section.content && (
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{section.content}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCurrentSections([])}>
              Cancel
            </Button>
            <Button onClick={savePolicy}>
              Save as Draft
            </Button>
            <Button 
              variant="default"
              disabled={getSectionCompleteness().completed < getSectionCompleteness().total}
            >
              Submit for Review
            </Button>
          </div>
        </>
      )}

      {/* Existing Policies */}
      {policyDocuments.length > 0 && currentSections.length === 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Existing Policies</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {policyDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                    <Badge 
                      variant={
                        doc.status === 'approved' ? 'success' :
                        doc.status === 'published' ? 'info' :
                        doc.status === 'review' ? 'warning' :
                        'secondary'
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Version {doc.version} • {doc.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
                    {doc.approvedBy && (
                      <span>Approved by {doc.approvedBy}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
