'use client';

import {
  FileText,
  TrendingUp,
  AlertTriangle,
  Target,
  Users,
  Brain,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
  BookOpen,
  Download,
  ExternalLink,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function ResearchPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                Research • Industry Reports • Data-Driven Insights
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              Industry{' '}
              <span className="font-medium text-accent">Research</span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              Latest findings on AI adoption, workforce readiness, and organizational transformation
              from leading research institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Report: MIT GenAI Divide */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur">
                    <FileText className="icon-xs" />
                    Featured Report
                  </span>
                  <span className="text-sm opacity-90">MIT NANDA • July 2025</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  The GenAI Divide: State of AI in Business 2025
                </h2>
                <p className="text-lg opacity-95 max-w-3xl">
                  MIT research reveals that 95% of organizations are getting zero ROI from GenAI investments,
                  with the core barrier being systems that don't learn, adapt, or integrate into workflows.
                </p>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 mb-10">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-6">Key Findings</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <XCircle className="icon-sm text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">95% Failure Rate</p>
                          <p className="text-sm text-secondary">Organizations see no measurable P&L impact from AI</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <AlertTriangle className="icon-sm text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">The Learning Gap</p>
                          <p className="text-sm text-secondary">AI tools don't retain feedback or improve over time</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Users className="icon-sm text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">Shadow AI Economy</p>
                          <p className="text-sm text-secondary">90% of employees use personal AI tools at work</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <TrendingUp className="icon-sm text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">Training is #1 Barrier</p>
                          <p className="text-sm text-secondary">Lack of AI literacy prevents successful adoption</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-6">Industry Impact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Technology</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-accent" />
                          </div>
                          <span className="text-xs text-gray-600">High</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Healthcare</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-1/12 bg-gray-400" />
                          </div>
                          <span className="text-xs text-gray-600">Low</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Financial Services</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-1/12 bg-gray-400" />
                          </div>
                          <span className="text-xs text-gray-600">Low</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Education</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-1/6 bg-gray-500" />
                          </div>
                          <span className="text-xs text-gray-600">Moderate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-primary mb-4">Report Highlights</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-2">$40B</div>
                      <p className="text-sm text-gray-700">Enterprise investment with minimal ROI</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-2">5%</div>
                      <p className="text-sm text-gray-700">Of custom AI tools reach production</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-2">2x</div>
                      <p className="text-sm text-gray-700">Success rate for external partnerships</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://res.cloudinary.com/ddbqbo1mo/image/upload/v1756217038/State_of_AI_in_Business_2025_Report_sikpey.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 btn-primary"
                    >
                      <Download className="icon-sm" />
                      Download Full Report
                    </a>
                    <Link
                      href="/assessment"
                      className="inline-flex items-center gap-2 px-6 py-3 btn-secondary"
                    >
                      Take RUDI Assessment
                      <ArrowRight className="icon-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How RUDI Addresses These Challenges */}
      <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-title font-light text-primary mb-4">
              How RUDI Addresses{' '}
              <span className="font-medium text-accent">The GenAI Divide</span>
            </h2>
            <p className="text-large text-secondary">
              The MIT report validates RUDI's approach: organizations need structured training,
              clear frameworks, and adaptive learning paths to succeed with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <AlertTriangle className="icon-md text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    MIT Finding: The Learning Gap
                  </h3>
                  <p className="text-secondary mb-4">
                    "Most GenAI systems do not retain feedback, adapt to context, or improve over time."
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-accent mb-2">RUDI Solution:</p>
                    <p className="text-sm text-gray-700">
                      Our framework teaches teams how to build feedback loops, customize tools for workflows,
                      and create learning-capable AI systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Users className="icon-md text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    MIT Finding: Shadow AI Economy
                  </h3>
                  <p className="text-secondary mb-4">
                    "90% of employees use personal AI tools, while official initiatives stall."
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-accent mb-2">RUDI Solution:</p>
                    <p className="text-sm text-gray-700">
                      We formalize shadow AI usage through proper training, governance frameworks,
                      and official tool adoption strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Brain className="icon-md text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    MIT Finding: Training is #1 Barrier
                  </h3>
                  <p className="text-secondary mb-4">
                    "Lack of AI literacy and proper training prevents successful adoption."
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-accent mb-2">RUDI Solution:</p>
                    <p className="text-sm text-gray-700">
                      Comprehensive literacy framework covering conceptual understanding,
                      operational skills, and governance competencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Target className="icon-md text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    MIT Finding: 95% Failure Rate
                  </h3>
                  <p className="text-secondary mb-4">
                    "Only 5% of organizations see measurable ROI from GenAI investments."
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-accent mb-2">RUDI Solution:</p>
                    <p className="text-sm text-gray-700">
                      Clear competency matrix, measurable outcomes, and structured implementation
                      paths that drive real business value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free RUDI Training Materials CTA */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 text-center border-2 border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6">
              <BookOpen className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Free RUDI Training Materials
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Download our comprehensive guides including the AI Vocabulary Guide,
              RUDI Framework Matrix, and Responsible Use Guide to start building AI literacy in your organization.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary group"
            >
              <Download className="icon-sm" />
              Access Free Resources
              <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Research & Resources */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-title font-light text-primary mb-4">
              Quick{' '}
              <span className="font-medium text-accent">Links</span>
            </h2>
            <p className="text-large text-secondary">
              Additional tools and resources to support your AI journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <BookOpen className="icon-sm text-gray-600" />
                </div>
                <h3 className="font-semibold text-primary">RUDI Framework Guide</h3>
              </div>
              <p className="text-secondary text-sm mb-4">
                Complete guide to implementing the RUDI AI Literacy Framework in your organization.
              </p>
              <Link href="/framework" className="text-sm text-accent hover:text-primary font-medium">
                View Framework →
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <BarChart3 className="icon-sm text-gray-600" />
                </div>
                <h3 className="font-semibold text-primary">Assessment Tool</h3>
              </div>
              <p className="text-secondary text-sm mb-4">
                Evaluate your organization's AI readiness across all three RUDI dimensions.
              </p>
              <Link href="/assessment" className="text-sm text-accent hover:text-primary font-medium">
                Start Assessment →
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Lightbulb className="icon-sm text-gray-600" />
                </div>
                <h3 className="font-semibold text-primary">Discovery Workshop</h3>
              </div>
              <p className="text-secondary text-sm mb-4">
                Book a workshop to explore how RUDI can transform your AI adoption strategy.
              </p>
              <Link href="/workshop" className="text-sm text-accent hover:text-primary font-medium">
                Book Workshop →
              </Link>
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
              Bridge the{' '}
              <span className="font-medium">GenAI Divide</span>
            </h2>
            <p className="text-lead text-primary-100 mb-10 max-w-2xl mx-auto">
              Join the 5% of organizations successfully implementing AI with measurable ROI.
              Start with our assessment to understand your readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 group"
              >
                Take Free Assessment
                <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
              >
                Get Started with RUDI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}