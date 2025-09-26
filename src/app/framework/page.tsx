'use client';

import { FrameworkMatrix } from '@/frontend';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Microscope,
  Rocket,
  Network,
  Zap,
  BarChart3,
  Fingerprint,
  Workflow,
  LineChart,
  Building2,
  Users2,
  Gauge,
  Gem
} from 'lucide-react';
import Link from 'next/link';

export default function FrameworkPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Microscope className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                Framework • Methodology • Research-Based Approach
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              The RUDI{' '}
              <span className="font-medium text-accent">
                Framework
              </span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              A comprehensive, research-based framework for building AI literacy systematically
              across technical and non-technical teams in your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-title font-light text-primary mb-4">
              Three Core{' '}
              <span className="font-medium text-accent">Dimensions</span>
            </h2>
            <p className="text-large text-secondary">
              RUDI addresses AI literacy across three interconnected competency dimensions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl mb-6">
                <Network className="icon-md text-navy-800" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Conceptual</h3>
              <p className="text-secondary mb-6 leading-relaxed">
                Understanding AI fundamentals, architectures, capabilities, limitations, and societal impact
              </p>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl mb-6">
                <Workflow className="icon-md text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Operational</h3>
              <p className="text-secondary mb-6 leading-relaxed">
                Practical skills for using AI tools, prompt engineering, and workflow integration
              </p>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl mb-6">
                <Fingerprint className="icon-md text-navy-800" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Governance</h3>
              <p className="text-secondary mb-6 leading-relaxed">
                Risk management, ethical guidelines, compliance, and responsible AI deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Framework Matrix */}
      <FrameworkMatrix />

      {/* Why RUDI Works */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-title font-light text-primary mb-8">
                Why Organizations{' '}
                <span className="font-medium text-accent">Choose RUDI</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Evidence-Based',
                    desc: 'Built on research from 500+ professionals across industries'
                  },
                  {
                    title: 'Comprehensive Coverage',
                    desc: 'Addresses technical and non-technical users equally'
                  },
                  {
                    title: 'Progressive Learning',
                    desc: 'Clear progression from beginner to advanced competencies'
                  },
                  {
                    title: 'Actionable Insights',
                    desc: 'Assessments lead directly to personalized learning paths'
                  },
                  {
                    title: 'Measurable Outcomes',
                    desc: 'Track progress with quantifiable competency metrics'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="icon-sm text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{item.title}</h4>
                      <p className="text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl">
                  <Rocket className="icon-md text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-primary">
                  The RUDI Journey
                </h3>
              </div>
              <div className="space-y-6">
                {[
                  { step: 'Assess', desc: 'Baseline current AI literacy levels', icon: Gauge },
                  { step: 'Analyze', desc: 'Identify gaps and opportunities', icon: Microscope },
                  { step: 'Train', desc: 'Deliver targeted education', icon: GraduationCap },
                  { step: 'Implement', desc: 'Apply skills to real work', icon: Zap },
                  { step: 'Measure', desc: 'Track progress and iterate', icon: LineChart }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="icon-sm text-primary-600" />
                      </div>
                      {i < 4 && (
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-6 w-[2px] bg-gradient-to-b from-primary-200 to-transparent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-1">{item.step}</h4>
                      <p className="text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Credibility */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Gem className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                Evidence-Based • Research-Driven • Field-Tested
              </span>
            </div>
            <h2 className="text-title font-light text-primary mb-4 text-center">
              Built on{' '}
              <span className="font-medium text-accent">Solid Research</span>
            </h2>
            <p className="text-large text-secondary text-center">
              The RUDI framework emerges from extensive research and real-world validation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center group hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">
                <Users2 className="icon-md text-primary-400" />
              </div>
              <div className="text-3xl font-light text-primary-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <p className="text-secondary font-medium">Professionals</p>
              <p className="text-tertiary text-sm mt-1">Surveyed</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center group hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">
                <Building2 className="icon-md text-accent-400" />
              </div>
              <div className="text-3xl font-light text-accent-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
              <p className="text-secondary font-medium">Organizations</p>
              <p className="text-tertiary text-sm mt-1">Assessed</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center group hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">
                <BarChart3 className="icon-md text-primary-400" />
              </div>
              <div className="text-3xl font-light text-primary-600 mb-2 group-hover:scale-110 transition-transform">15</div>
              <p className="text-secondary font-medium">Industries</p>
              <p className="text-tertiary text-sm mt-1">Represented</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center group hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">
                <Sparkles className="icon-md text-accent-400" />
              </div>
              <div className="text-3xl font-light text-accent-600 mb-2 group-hover:scale-110 transition-transform">3</div>
              <p className="text-secondary font-medium">Years</p>
              <p className="text-tertiary text-sm mt-1">Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Brandon */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100">
              <div className="grid md:grid-cols-3 gap-12 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-title font-light text-primary mb-6">
                    Meet the{' '}
                    <span className="font-medium text-accent">Founder</span>
                  </h2>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Brandon Z. Hoff
                  </h3>
                  <p className="text-secondary leading-relaxed mb-6">
                    Brandon Z. Hoff founded RUDI AI with a mission to democratize AI literacy
                    across organizations. With extensive experience in education technology
                    and digital transformation, Brandon identified the critical gap between
                    AI&apos;s rapid advancement and organizational readiness.
                  </p>
                  <blockquote className="border-l-4 border-primary-300 pl-6 mb-8 italic text-secondary">
                    &quot;Every organization needs a structured approach to AI adoption.
                    RUDI provides the framework, tools, and support to make that journey successful.&quot;
                  </blockquote>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/get-started" className="btn-primary group">
                      Work With Us
                      <ArrowRight className="inline-block icon-sm ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/workshop" className="btn-secondary">
                      Book a Workshop
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <div className="w-56 h-56 bg-gradient-to-br from-primary-100 via-primary-200 to-accent-100 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-6xl font-light text-primary-700">BZH</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent-500 rounded-full opacity-20 blur-xl" />
                  </div>
                </div>
              </div>
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
              Ready to Build{' '}
              <span className="font-medium">AI Literacy?</span>
            </h2>
            <p className="text-lead text-primary-100 mb-10 max-w-2xl mx-auto">
              Start with our free assessment to understand your current state,
              then explore our workshops and training programs.
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
                href="/workshop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all hover:scale-105 group"
              >
                Book Discovery Workshop
                <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}