'use client';

import Link from 'next/link';
import {
  BookOpen, Clock, Users, Award, ChevronRight, Star,
  TrendingUp, Brain, Code, Briefcase, Target, CheckCircle,
  ArrowRight, Building2, GraduationCap, Sparkles
} from 'lucide-react';

export default function CoursesPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="badge-primary mb-6">
              <GraduationCap className="icon-xs" />
              RUDI Applied GenAI Program
            </div>
            <h1 className="text-title font-light tracking-tight text-primary mb-6">
              Comprehensive <span className="font-medium text-accent">AI Education</span>
            </h1>
            <p className="text-lead text-secondary max-w-3xl mx-auto mb-10">
              From AI literacy to advanced implementation. Choose your learning path based on your role,
              experience, and organizational goals.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/assessment" className="btn-primary group">
                Take Assessment First
                <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#courses" className="btn-secondary">
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            Choose Your <span className="font-medium text-accent">Learning Path</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="card-sleek p-6 text-center">
              <div className="feature-icon mx-auto mb-4">
                <Brain className="icon-md" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Foundation Track</h3>
              <p className="text-sm text-secondary mb-4">
                Start here if new to AI. Build understanding of concepts, tools, and responsible use.
              </p>
              <p className="text-xs text-tertiary">Beginner</p>
            </div>

            <div className="card-sleek p-6 text-center">
              <div className="feature-icon mx-auto mb-4">
                <Briefcase className="icon-md" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Business Track</h3>
              <p className="text-sm text-secondary mb-4">
                Apply AI to real business challenges. ROI-focused with immediate implementation.
              </p>
              <p className="text-xs text-tertiary">Intermediate</p>
            </div>

            <div className="card-sleek p-6 text-center">
              <div className="feature-icon mx-auto mb-4">
                <Code className="icon-md" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Technical Track</h3>
              <p className="text-sm text-secondary mb-4">
                Advanced patterns, RAG, fine-tuning, and production deployment strategies.
              </p>
              <p className="text-xs text-tertiary">Advanced</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-secondary mb-4">Not sure where to start?</p>
            <Link href="/assessment" className="text-accent font-medium hover:underline">
              Take our AI readiness assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="section-padding" id="courses">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            Complete <span className="font-medium text-accent">Course Catalog</span>
          </h2>

          {/* Course 01: AI Literacy Foundation */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-100 to-navy-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-navy-900">01</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">AI Literacy Foundation</h3>
                <p className="text-sm text-secondary">All learners • No prerequisites</p>
              </div>
              <div className="ml-auto">
                <span className="badge-primary">
                  <Star className="icon-xs" />
                  Most Popular
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Unit 1 */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Unit 1: AI Foundations</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Course Introduction & Fundamentals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Evolution of Intelligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Traditional AI vs Generative AI</span>
                  </li>
                </ul>
              </div>

              {/* Unit 2 */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Unit 2: Large Language Models</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Introduction to LLMs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Architecture & How They Work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Limitations & Hallucinations</span>
                  </li>
                </ul>
              </div>

              {/* Unit 3 */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Unit 3: Prompting</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Introduction to Prompting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Prompt Engineering Fundamentals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Advanced Techniques</span>
                  </li>
                </ul>
              </div>

              {/* Unit 4 */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Unit 4: Responsible AI</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Ethics & Responsible Use</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Course 02: CS Fundamentals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-100 to-navy-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-navy-900">02</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">CS for Non-CS</h3>
                <p className="text-sm text-secondary">No prerequisites • For non-technical professionals</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Basic Workflows</h4>
                <p className="text-sm text-secondary">Process automation and efficiency patterns</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Data Structures & Logic</h4>
                <p className="text-sm text-secondary">Organizing information and decision flows</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Systems Thinking</h4>
                <p className="text-sm text-secondary">Understanding interconnected processes</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Problem Decomposition</h4>
                <p className="text-sm text-secondary">Breaking complex problems into steps</p>
              </div>
            </div>
          </div>

          {/* Course 03: Advanced AI Patterns */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">03</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Advanced AI Patterns</h3>
                <p className="text-sm text-secondary">Advanced users • Helpful to have CS for non-CS</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Advanced Workflows</h4>
                <p className="text-sm text-secondary">Complex automation and techniques</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Agents & Orchestration</h4>
                <p className="text-sm text-secondary">Multi-agent systems and coordination</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Custom AI Assistants</h4>
                <p className="text-sm text-secondary">Building specialized AI tools</p>
              </div>
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">AI Coding Assistance</h4>
                <p className="text-sm text-secondary">Building with AI development tools</p>
              </div>
            </div>
          </div>

          {/* Course 04: Business Applications */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-amber-700">04</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Business Applications</h3>
                <p className="text-sm text-secondary">Business teams • No prerequisites</p>
              </div>
              <div className="ml-auto">
                <span className="badge-default">
                  <TrendingUp className="icon-xs" />
                  High ROI
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Writing & Research */}
              <div className="card-sleek p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-primary">Writing & Research</h4>
                  <Star className="icon-xs text-amber-500" />
                </div>
                <p className="text-sm text-secondary mb-3">Content creation and competitive analysis</p>
                <div className="space-y-1 text-xs">
                  <p className="text-green-600 font-medium">1,544% ROI annually</p>
                  <p className="text-tertiary">70% time reduction</p>
                </div>
              </div>

              {/* Marketing & Design */}
              <div className="card-sleek p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-primary">Marketing & Design</h4>
                  <Star className="icon-xs text-amber-500" />
                </div>
                <p className="text-sm text-secondary mb-3">Campaign creation and content generation</p>
                <div className="space-y-1 text-xs">
                  <p className="text-green-600 font-medium">450% ROI in Q1</p>
                  <p className="text-tertiary">150% better lead quality</p>
                </div>
              </div>

              {/* Financial Analysis */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Financial Analysis</h4>
                <p className="text-sm text-secondary mb-3">Modeling, forecasting, and budget planning</p>
                <div className="space-y-1 text-xs">
                  <p className="text-tertiary">Automated reporting</p>
                  <p className="text-tertiary">Variance analysis</p>
                </div>
              </div>

              {/* Sales & Operations */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Sales & Operations</h4>
                <p className="text-sm text-secondary mb-3">Workflow optimization and automation</p>
                <div className="space-y-1 text-xs">
                  <p className="text-tertiary">Process efficiency</p>
                  <p className="text-tertiary">Pipeline management</p>
                </div>
              </div>

              {/* Product Development */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold text-primary mb-3">Product Development</h4>
                <p className="text-sm text-secondary mb-3">Rapid prototyping and user research</p>
                <div className="space-y-1 text-xs">
                  <p className="text-tertiary">Agile AI integration</p>
                  <p className="text-tertiary">Feature prioritization</p>
                </div>
              </div>

              {/* Grant Writing */}
              <div className="card-sleek p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-primary">Grant Writing</h4>
                  <Sparkles className="icon-xs text-navy-500" />
                </div>
                <p className="text-sm text-secondary mb-3">Comprehensive grant application workflow</p>
                <div className="space-y-1 text-xs">
                  <p className="text-navy-800 font-medium">Specialized module</p>
                  <p className="text-tertiary">End-to-end process</p>
                </div>
              </div>
            </div>
          </div>

          {/* Role-Specific Applications */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-red-700">05</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Role-Specific Applications</h3>
                <p className="text-sm text-secondary">Specialized applications • Job-function focused</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Finance & Operations */}
              <div>
                <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <Briefcase className="icon-xs" />
                  Finance & Operations
                </h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    AI-Assisted Grant Writing
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Business & Financial Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Budgeting & Planning
                  </li>
                </ul>
              </div>

              {/* Marketing & Creative */}
              <div>
                <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <Target className="icon-xs" />
                  Marketing & Creative
                </h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Marketing & Design
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Social Media Management
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Advertising & Campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Sales Enablement
                  </li>
                </ul>
              </div>

              {/* HR & Learning */}
              <div>
                <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <Users className="icon-xs" />
                  HR & Learning
                </h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    HR & Recruiting
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Learning & Development
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="icon-xs text-tertiary" />
                    Performance Management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Formats */}
      <section className="section-padding bg-surface-light">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            Flexible <span className="font-medium text-accent">Learning Options</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-navy-100 to-navy-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="icon-sm text-navy-800" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Self-Paced Online</h3>
              <p className="text-xs text-secondary">Videos, exercises, quizzes at your own pace</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="icon-sm text-green-600" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Live Workshops</h3>
              <p className="text-xs text-secondary">Instructor-led virtual or in-person sessions</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-navy-100 to-navy-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="icon-sm text-navy-800" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Executive Express</h3>
              <p className="text-xs text-secondary">30-minute condensed format for leaders</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="icon-sm text-amber-600" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Hands-On Labs</h3>
              <p className="text-xs text-secondary">Practice with real tools and scenarios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Evidence Section */}
      <section className="section-padding bg-surface-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-title font-light tracking-tight text-primary mb-4">
              Research-Backed <span className="font-medium text-accent">Training Approach</span>
            </h2>
            <p className="text-secondary max-w-3xl mx-auto">
              Based on MIT NANDA's State of AI in Business 2025 Report analyzing 300+ AI implementations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card-sleek p-6">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <p className="text-sm font-semibold text-primary mb-1">Organizations Get Zero ROI</p>
              <p className="text-xs text-secondary">Without proper training and implementation approach</p>
            </div>

            <div className="card-sleek p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">2x</div>
              <p className="text-sm font-semibold text-primary mb-1">Success Rate with Partners</p>
              <p className="text-xs text-secondary">External partnerships vs. internal builds</p>
            </div>

            <div className="card-sleek p-6">
              <div className="text-3xl font-bold text-navy-800 mb-2">90%</div>
              <p className="text-sm font-semibold text-primary mb-1">Employees Use Shadow AI</p>
              <p className="text-xs text-secondary">Personal tools deliver better ROI than official initiatives</p>
            </div>
          </div>

          <div className="card-sleek p-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Key Research Findings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-primary mb-3">The GenAI Divide</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="icon-xs text-tertiary flex-shrink-0 mt-0.5" />
                    <span>Only 5% of custom enterprise AI tools reach production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="icon-xs text-tertiary flex-shrink-0 mt-0.5" />
                    <span>7 of 9 major sectors show no structural change from AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="icon-xs text-tertiary flex-shrink-0 mt-0.5" />
                    <span>The core barrier: AI systems don't learn or adapt</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-primary mb-3">What Actually Works</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Deep customization to specific workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Learning-capable systems that improve over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Bottom-up adoption from frontline managers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-navy-50 rounded-lg">
              <p className="text-sm text-navy-900">
                <strong>Report Finding:</strong> "Organizations that successfully cross the GenAI Divide do three things differently:
                they buy rather than build, empower line managers rather than central labs, and select tools that
                integrate deeply while adapting over time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="card-sleek p-12 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="icon-sm text-accent" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">For Organizations</span>
                </div>
                <h2 className="text-2xl font-light tracking-tight text-primary mb-4">
                  Enterprise <span className="font-medium">Learning Solutions</span>
                </h2>
                <p className="text-secondary mb-6">
                  Transform your organization with comprehensive AI training. Custom learning paths,
                  team licenses, and dedicated support to ensure successful implementation.
                </p>
                <ul className="space-y-3 text-sm text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    Volume discounts for team licenses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    Custom learning paths for your industry
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    White label options for consultants
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    Ohio TechCred eligible for full reimbursement
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
                  <p className="text-xs sm:text-sm text-tertiary mb-2">Proven ROI from Research</p>
                  <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">450%</p>
                  <p className="text-xs text-tertiary mb-4 sm:mb-6">Average ROI for organizations</p>
                  <p className="text-xs sm:text-sm text-tertiary mb-1 sm:mb-2">Back-office savings</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">$2-10M/year</p>
                  <Link href="/research" className="btn-primary w-full mb-2 sm:mb-3 text-sm sm:text-base py-2 sm:py-2.5">
                    View Full Research
                  </Link>
                  <Link href="/certificates" className="btn-secondary w-full text-sm sm:text-base py-2 sm:py-2.5">
                    Learn About Credentials
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-surface-dark">
        <div className="container-narrow text-center">
          <h2 className="text-title font-light tracking-tight text-white mb-6">
            Ready to Start Your <span className="font-medium">AI Journey?</span>
          </h2>
          <p className="text-large text-gray-300 mb-10">
            Join thousands of professionals building practical AI skills.
            Ohio employers eligible for full TechCred reimbursement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="btn-white group">
              Start with Assessment
              <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/certificates" className="btn-outline-white">
              Earn Credentials
            </Link>
            <Link href="/ohio-techcred" className="btn-outline-white">
              Get Training Reimbursed
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}