'use client';

import Link from 'next/link';
import { CheckCircle2, Calendar, DollarSign, Building2, Award, Users, Clock, FileText, ArrowRight, CheckCircle } from 'lucide-react';

export default function OhioTechCredPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Upskill Ohio Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 border-b border-green-700">
        <div className="container-wide py-3">
          <div className="flex items-center justify-center gap-2 text-white text-sm">
            <span className="font-medium">Part of the Upskill Ohio Initiative</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/upskill-ohio" className="underline hover:no-underline hidden sm:inline">
              Learn more →
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="icon-xs" />
              Ohio TechCred Eligible Training
            </div>
            <h1 className="text-title font-light tracking-tight text-primary mb-6">
              Get <span className="font-medium text-accent">$2,000 Reimbursement</span> Per Employee
            </h1>
            <p className="text-lead text-secondary max-w-3xl mx-auto mb-10">
              RUDI's AI training programs are eligible for Ohio TechCred funding.
              Train your team in responsible AI implementation with up to $30,000 in reimbursements per funding round.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-sleek p-6">
              <DollarSign className="icon-lg text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Up to $2,000 Per Credential</h3>
              <p className="text-sm text-secondary">
                Maximum TechCred reimbursement available for eligible AI training programs
              </p>
            </div>
            <div className="card-sleek p-6">
              <Building2 className="icon-lg text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">All Ohio Employers</h3>
              <p className="text-sm text-secondary">
                Private companies, nonprofits, and public employers are eligible to apply
              </p>
            </div>
            <div className="card-sleek p-6">
              <Calendar className="icon-lg text-navy-800 mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">6 Application Windows</h3>
              <p className="text-sm text-secondary">
                Apply every other month throughout 2025 for maximum flexibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Training Qualifies */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            Why RUDI is <span className="font-medium text-accent">TechCred Eligible</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="icon-sm text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Technology-Focused</h3>
                  <p className="text-sm text-secondary">
                    Generative AI and prompt engineering are exactly the skills Ohio wants to develop
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="icon-sm text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Industry-Recognized</h3>
                  <p className="text-sm text-secondary">
                    Our RUDI Framework is used by organizations across Ohio for responsible AI adoption
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="icon-sm text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Short-Term Completion</h3>
                  <p className="text-sm text-secondary">
                    All programs complete in 8-20 hours, well within the 12-month requirement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="icon-sm text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Practical Application</h3>
                  <p className="text-sm text-secondary">
                    Hands-on training with immediate workplace application, not just theory
                  </p>
                </div>
              </div>
            </div>
            <div className="card-sleek p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Latest TechCred Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">AI Credentials Awarded</span>
                  <span className="stat-value">1,300+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Most Requested Category</span>
                  <span className="text-lg font-bold text-primary">AI/ML</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Avg Reimbursement</span>
                  <span className="text-lg font-bold text-primary">$1,850</span>
                </div>
              </div>
              <p className="text-xs text-tertiary mt-4">*Based on latest round results</p>
            </div>
          </div>
        </div>
      </section>

      {/* TechCred Programs */}
      <section className="section-padding bg-surface-light">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            TechCred-Eligible <span className="font-medium text-accent">Training Programs</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Foundation */}
            <div className="card-sleek overflow-hidden">
              <div className="bg-gradient-to-r from-navy-50 to-navy-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-primary">AI Literacy Foundation</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="icon-xs text-secondary" />
                  <span className="text-sm text-secondary">8 Hours</span>
                  <span className="text-sm font-semibold text-green-600 ml-auto">TechCred Eligible</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    AI fundamentals for non-technical staff
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Prompt engineering basics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Responsible AI principles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Hands-on tool practice
                  </li>
                </ul>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Status</p>
                  <p className="text-lg font-bold text-green-600">TechCred Eligible</p>
                  <p className="text-xs text-gray-500 mt-1">Apply for reimbursement</p>
                </div>
              </div>
            </div>

            {/* Applied */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-navy-50 to-navy-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">Applied AI Practitioner</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">12 Hours</span>
                  <span className="text-sm font-semibold text-green-600 ml-auto">TechCred Eligible</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Advanced prompt engineering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Workflow automation with AI
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Department-specific applications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Performance measurement
                  </li>
                </ul>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Status</p>
                  <p className="text-lg font-bold text-green-600">TechCred Eligible</p>
                  <p className="text-xs text-gray-500 mt-1">Apply for reimbursement</p>
                </div>
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Integration Leader</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">20 Hours</span>
                  <span className="text-sm font-semibold text-green-600 ml-auto">TechCred Eligible</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Strategic AI implementation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Governance & risk management
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    ROI measurement frameworks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Team training & change management
                  </li>
                </ul>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">TechCred Reimbursement</p>
                  <p className="text-lg font-bold text-green-600">TechCred Eligible</p>
                  <p className="text-xs text-gray-500 mt-1">Apply for full reimbursement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-8 text-center">
            2025 Application <span className="font-medium">Windows</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 opacity-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">January</span>
                <span className="text-xs text-red-600 font-medium">CLOSED</span>
              </div>
              <p className="text-xs text-gray-600">Jan 2-31, 2025</p>
              <p className="text-xs text-gray-500 mt-1">Training could start Dec 1, 2024</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 opacity-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">March</span>
                <span className="text-xs text-red-600 font-medium">CLOSED</span>
              </div>
              <p className="text-xs text-gray-600">Mar 1-31, 2025</p>
              <p className="text-xs text-gray-500 mt-1">Training could start Feb 1, 2025</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 opacity-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">May</span>
                <span className="text-xs text-red-600 font-medium">CLOSED</span>
              </div>
              <p className="text-xs text-gray-600">May 1-30, 2025</p>
              <p className="text-xs text-gray-500 mt-1">Training could start Apr 1, 2025</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 opacity-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">July</span>
                <span className="text-xs text-red-600 font-medium">CLOSED</span>
              </div>
              <p className="text-xs text-gray-600">Jul 1-31, 2025</p>
              <p className="text-xs text-gray-500 mt-1">Training could start Jun 1, 2025</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 opacity-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">September</span>
                <span className="text-xs text-red-600 font-medium">CLOSED</span>
              </div>
              <p className="text-xs text-gray-600">Sep 2-30, 2025</p>
              <p className="text-xs text-gray-500 mt-1">Training could start Aug 1, 2025</p>
            </div>

            <div className="border-2 border-green-500 bg-green-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">November</span>
                <span className="text-xs text-green-600 font-medium">UPCOMING</span>
              </div>
              <p className="text-xs text-gray-900 font-medium">Nov 3-Dec 1, 2025</p>
              <p className="text-xs text-gray-700 mt-1">Training can start Oct 1, 2025</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> Training must start on or after the effective date (1st of month before application window).
              Cannot backdate training if you miss the window.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-8 text-center">
            How TechCred <span className="font-medium">Works</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Get Ohio Supplier ID</h3>
                  <p className="text-sm text-gray-600">
                    Register at <a href="https://supplier.ohio.gov" target="_blank" className="text-green-600 hover:underline">supplier.ohio.gov</a> (20-30 min).
                    You'll receive a temporary Supplier ID immediately - no need to wait for permanent approval to apply for TechCred.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Apply During Open Window</h3>
                  <p className="text-sm text-gray-600">
                    Submit application at <a href="https://techcred.ohio.gov" target="_blank" className="text-green-600 hover:underline">techcred.ohio.gov</a> during an open window.
                    Select "Business Technology" → Search for "Generative AI" → Choose "Credential not listed" option.
                    We provide all required documentation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Wait for Approval</h3>
                  <p className="text-sm text-gray-600">
                    Results typically come 30-45 days after window closes.
                    It's competitive based on relevance, impact, and cost-effectiveness.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Training</h3>
                  <p className="text-sm text-gray-600">
                    Employees complete training within 12 months of award.
                    We provide certificates and all documentation needed for reimbursement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Get Reimbursed</h3>
                  <p className="text-sm text-gray-600">
                    Submit proof of completion, payment receipts, and employee verification (last 4 digits of SSN) within 6 weeks.
                    Receive reimbursement in 60-90 days (up to $2,000 per employee).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Application Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-8 text-center">
            Step-by-Step <span className="font-medium">Application Guide</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Ohio Supplier Registration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                Ohio Supplier Registration
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">1.</span>
                  <span className="text-gray-600">Create OH|ID account at <a href="https://ohid.ohio.gov/home" target="_blank" className="text-green-600 hover:underline">ohid.ohio.gov/home</a></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">2.</span>
                  <span className="text-gray-600">Go to <a href="https://supplier.ohio.gov" target="_blank" className="text-green-600 hover:underline">supplier.ohio.gov</a> → Click &quot;New Registration&quot;</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">3.</span>
                  <span className="text-gray-600">Enter business info (choose &quot;Business&quot; not &quot;Individual&quot;, select &quot;Payee&quot; not &quot;DBA&quot;)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">4.</span>
                  <span className="text-gray-600">Add banking information and upload W-9</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">5.</span>
                  <span className="text-gray-600">Submit and screenshot your temporary Supplier ID (available immediately!)</span>
                </li>
              </ol>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800">
                  <strong>Tip:</strong> You can apply for TechCred with your temporary ID - no need to wait 3-5 days for permanent approval
                </p>
              </div>
            </div>

            {/* TechCred Application */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                TechCred Application
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">1.</span>
                  <span className="text-gray-600">Go to Training Plan → Add Credential</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">2.</span>
                  <span className="text-gray-600">Select &quot;Business Technology&quot; category</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">3.</span>
                  <span className="text-gray-600">Search &quot;Generative AI&quot; or scroll to bottom</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">4.</span>
                  <span className="text-gray-600">Check &quot;Credential not listed, I wish to submit an additional credential for review&quot;</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">5.</span>
                  <span className="text-gray-600">Select completion method (online, in-person, or hybrid)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">6.</span>
                  <span className="text-gray-600">Choose credential type: &quot;Documentation&quot; for training programs</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-900 flex-shrink-0">7.</span>
                  <span className="text-gray-600">Upload RUDI-provided documentation (we supply everything you need)</span>
                </li>
              </ol>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Required for Reimbursement:</strong> Employee SSN (last 4 digits) and date of birth will be needed when requesting payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-8 text-center">
            What RUDI <span className="font-medium">Provides</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Documentation</h3>
                  <p className="text-sm text-gray-600">
                    Detailed syllabus, learning objectives, and skill outcomes for TechCred application
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Certificates</h3>
                  <p className="text-sm text-gray-600">
                    Branded certificates with unique IDs and completion verification
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Instructors</h3>
                  <p className="text-sm text-gray-600">
                    Certified AI practitioners with real-world implementation experience
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Organization Invoicing</h3>
                  <p className="text-sm text-gray-600">
                    Invoices in your organization's name (not individual employees)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600">
                    Online, hybrid, or on-site options to fit your team's needs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Application Support</h3>
                  <p className="text-sm text-gray-600">
                    Guidance through the TechCred application process
                  </p>
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
            Ready to Apply for <span className="font-medium">TechCred Funding?</span>
          </h2>
          <p className="text-large text-gray-300 mb-10">
            The January 2025 window is open now through January 31st.
            Don't miss your chance for up to $30,000 in training reimbursements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-white group"
            >
              Get TechCred Documentation
              <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/assessment"
              className="btn-outline-white"
            >
              Assess Your Team's AI Readiness
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Questions about TechCred eligibility? Call us at (614) 555-0123 or email techcred@rudi.app
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}