'use client';

import {
  FileText,
  Shield,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Download,
  ExternalLink,
  Lightbulb,
  Target,
  Workflow,
  BookOpen,
  AlertCircle,
  Zap,
  Scale,
  Brain,
  Layers,
  Settings,
  ClipboardList,
  HelpCircle,
  Award,
  TrendingUp,
  Lock,
  Globe,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function ToolkitPage() {
  const policyResources = [
    {
      title: 'AI Governance Framework',
      description: 'Comprehensive framework for establishing AI governance structures',
      icon: Shield,
      topics: ['Leadership roles', 'Oversight committees', 'Decision frameworks', 'Accountability measures'],
      downloadUrl: '/toolkit/governance-framework.pdf'
    },
    {
      title: 'Risk Assessment Template',
      description: 'Evaluate and categorize AI risks across your organization',
      icon: AlertCircle,
      topics: ['Risk identification', 'Impact assessment', 'Mitigation strategies', 'Monitoring protocols'],
      downloadUrl: '/toolkit/risk-assessment.pdf'
    },
    {
      title: 'Ethical Guidelines',
      description: 'Principles and practices for responsible AI deployment',
      icon: Scale,
      topics: ['Fairness principles', 'Transparency requirements', 'Bias prevention', 'Human oversight'],
      downloadUrl: '/toolkit/ethical-guidelines.pdf'
    },
    {
      title: 'Data Privacy Protocol',
      description: 'Ensure compliance with data protection regulations',
      icon: Lock,
      topics: ['Data classification', 'Consent management', 'Security measures', 'Retention policies'],
      downloadUrl: '/toolkit/data-privacy.pdf'
    }
  ];

  const implementationGuides = [
    {
      title: 'Pilot Program Playbook',
      description: 'Step-by-step guide to launching AI pilot programs',
      icon: Zap,
      sections: ['Project selection', 'Team formation', 'Success metrics', 'Scaling strategies']
    },
    {
      title: 'Change Management Guide',
      description: 'Navigate organizational transformation with AI',
      icon: Users,
      sections: ['Stakeholder engagement', 'Communication plans', 'Training programs', 'Adoption tracking']
    },
    {
      title: 'Vendor Evaluation Framework',
      description: 'Assess and select AI vendors and solutions',
      icon: ClipboardList,
      sections: ['Requirements gathering', 'Evaluation criteria', 'Due diligence', 'Contract considerations']
    },
    {
      title: 'ROI Measurement Toolkit',
      description: 'Track and measure AI investment returns',
      icon: TrendingUp,
      sections: ['KPI definition', 'Baseline establishment', 'Impact measurement', 'Reporting templates']
    }
  ];

  const practicalTools = [
    {
      category: 'Assessment Tools',
      icon: Target,
      tools: [
        { name: 'AI Readiness Checklist', type: 'Excel', size: '245 KB' },
        { name: 'Capability Maturity Model', type: 'PDF', size: '1.2 MB' },
        { name: 'Skills Gap Analysis', type: 'Word', size: '180 KB' }
      ]
    },
    {
      category: 'Policy Templates',
      icon: FileText,
      tools: [
        { name: 'AI Use Policy Template', type: 'Word', size: '320 KB' },
        { name: 'Data Governance Policy', type: 'Word', size: '285 KB' },
        { name: 'Responsible AI Charter', type: 'PDF', size: '450 KB' }
      ]
    },
    {
      category: 'Training Materials',
      icon: BookOpen,
      tools: [
        { name: 'Executive AI Briefing', type: 'PPT', size: '3.4 MB' },
        { name: 'Employee Training Deck', type: 'PPT', size: '2.8 MB' },
        { name: 'Workshop Facilitation Guide', type: 'PDF', size: '890 KB' }
      ]
    },
    {
      category: 'Communication Resources',
      icon: MessageSquare,
      tools: [
        { name: 'Stakeholder Comm Plan', type: 'Word', size: '215 KB' },
        { name: 'FAQ Template', type: 'Word', size: '125 KB' },
        { name: 'Success Story Template', type: 'PPT', size: '1.1 MB' }
      ]
    }
  ];

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                AI Toolkit • Implementation Resources • Best Practices
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              AI Implementation{' '}
              <span className="font-medium text-accent">
                Toolkit
              </span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              Everything you need to develop, implement, and scale AI initiatives
              in your organization. From policy templates to practical tools.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>40+ Resources</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Ready to customize</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Industry-agnostic</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Regularly updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 1: Policy Development */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-full mb-6">
              <span className="text-sm font-bold text-navy-800">PART 1</span>
            </div>
            <h2 className="text-title font-light text-primary mb-4">
              Policy Development{' '}
              <span className="font-medium text-accent">Resources</span>
            </h2>
            <p className="text-large text-secondary">
              Establish robust governance frameworks and policies for responsible AI adoption
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            {policyResources.map((resource, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl">
                      <resource.icon className="icon-md text-navy-800" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="icon-sm text-gray-600" />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-secondary mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="space-y-2">
                    {resource.topics.map((topic, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-navy-400 rounded-full" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 bg-gray-50/50 rounded-b-2xl">
                  <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-navy-800 hover:text-navy-900 transition-colors">
                    Download Template
                    <ArrowRight className="icon-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Implementation Guides */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
              <span className="text-sm font-bold text-green-600">PART 2</span>
            </div>
            <h2 className="text-title font-light text-primary mb-4">
              Implementation{' '}
              <span className="font-medium text-accent">Guides</span>
            </h2>
            <p className="text-large text-secondary">
              Practical playbooks and methodologies for successful AI deployment
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {implementationGuides.map((guide, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl mb-4">
                  <guide.icon className="icon-sm text-green-600" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{guide.title}</h3>
                <p className="text-sm text-secondary mb-4">{guide.description}</p>
                <ul className="space-y-1 mb-6">
                  {guide.sections.map((section, j) => (
                    <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{section}</span>
                    </li>
                  ))}
                </ul>
                <button className="text-sm font-medium text-green-600 hover:text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Guide
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 3: Practical Tools & Templates */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-full mb-6">
              <span className="text-sm font-bold text-navy-800">PART 3</span>
            </div>
            <h2 className="text-title font-light text-primary mb-4">
              Practical Tools &{' '}
              <span className="font-medium text-accent">Templates</span>
            </h2>
            <p className="text-large text-secondary">
              Ready-to-use templates, checklists, and tools to accelerate your AI journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {practicalTools.map((category, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="icon-sm text-navy-800" />
                    <h3 className="font-semibold text-primary">{category.category}</h3>
                  </div>
                  <p className="text-xs text-secondary">{category.tools.length} resources available</p>
                </div>
                <div className="p-4 space-y-3">
                  {category.tools.map((tool, j) => (
                    <button key={j} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-navy-800 transition-colors">
                          {tool.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{tool.type}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{tool.size}</span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-navy-800 transition-colors mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl mb-6">
                  <Lightbulb className="w-8 h-8 text-accent-600" />
                </div>
                <h2 className="text-title font-light text-primary mb-4">
                  Quick Start{' '}
                  <span className="font-medium text-accent">Guide</span>
                </h2>
                <p className="text-large text-secondary max-w-2xl mx-auto">
                  Not sure where to begin? Follow this recommended pathway for your AI implementation journey.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mb-12">
                {[
                  { step: '1', title: 'Assess', desc: 'Current state analysis', icon: Target },
                  { step: '2', title: 'Plan', desc: 'Strategy development', icon: Brain },
                  { step: '3', title: 'Govern', desc: 'Policy framework', icon: Shield },
                  { step: '4', title: 'Pilot', desc: 'Test & learn', icon: Zap },
                  { step: '5', title: 'Scale', desc: 'Enterprise rollout', icon: TrendingUp }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-3">
                        <span className="text-lg font-bold text-primary-600">{item.step}</span>
                      </div>
                      <h4 className="font-semibold text-primary mb-1">{item.title}</h4>
                      <p className="text-xs text-secondary">{item.desc}</p>
                    </div>
                    {i < 4 && (
                      <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary-200 to-transparent" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment" className="btn-primary group">
                  Start with Assessment
                  <ArrowRight className="inline-block icon-sm ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/workshop" className="btn-secondary">
                  Get Expert Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-primary mb-8 text-center">
              Additional Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/resources" className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-50 rounded-xl">
                    <FileText className="icon-sm text-navy-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-navy-800 transition-colors">
                      Training Materials
                    </h4>
                    <p className="text-sm text-secondary">
                      RUDI framework guides and vocabulary resources
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/research" className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <BarChart3 className="icon-sm text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-green-600 transition-colors">
                      Industry Research
                    </h4>
                    <p className="text-sm text-secondary">
                      Latest reports and case studies on AI adoption
                    </p>
                  </div>
                </div>
              </Link>

              <a href="https://bzhoff.substack.com" target="_blank" rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-50 rounded-xl">
                    <ExternalLink className="icon-sm text-navy-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-navy-800 transition-colors">
                      Weekly Insights
                    </h4>
                    <p className="text-sm text-secondary">
                      Subscribe for AI trends and best practices
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative section-padding">
          <div className="container-wide text-center">
            <h2 className="text-display font-light text-white mb-6">
              Need Help{' '}
              <span className="font-medium">Getting Started?</span>
            </h2>
            <p className="text-lead text-primary-100 mb-10 max-w-2xl mx-auto">
              Our team can help you select the right resources and create a customized
              implementation plan for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/workshop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 group"
              >
                Book Discovery Workshop
                <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}