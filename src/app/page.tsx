/**
 * @page Landing Page - RUDI
 * @purpose Main landing page showcasing RUDI responsible AI framework for adult learners
 */
'use client';

import {
  Shield,
  Users,
  Award,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Building2,
  GraduationCap,
  Briefcase,
  CircleDot,
  Sparkles,
  FileCheck,
  Calendar,
  TrendingUp,
  BookOpen,
  DollarSign,
  Brain,
  Target,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - Emphasizing Responsible AI */}
      <section className="relative section-padding bg-gradient-to-b from-navy-50/30 to-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="icon-xs text-navy-800" />
              <span className="text-sm font-medium text-gray-600">Responsible Applied AI Training for Adult Learners</span>
            </div>

            <h1 className="text-display font-light tracking-tight text-gray-900 mb-6">
              Responsible Use of{' '}
              <span className="font-medium text-navy-800">
                Digital Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Transform your organization with comprehensive AI literacy training.
              Go from foundation to advanced implementation. Build a workforce that uses AI
              responsibly and effectively.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="/assessment" className="btn-primary group inline-block">
                Take Free AI Readiness Assessment
                <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </a>
              <a href="/courses" className="btn-secondary group inline-block">
                View Training Programs
                <BookOpen className="inline-block ml-2 icon-xs" strokeWidth={2} />
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="icon-xs text-green-600" />
                <span>MIT Research Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="icon-xs text-green-600" />
                <span>100% TechCred Eligible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="icon-xs text-green-600" />
                <span>Adult-Focused Curriculum</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - Your Employees Are Already Using AI */}
      <section className="section-padding border-t border-gray-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="icon-sm text-amber-600" />
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">The Hidden Reality</span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Your Employees Are Already Using AI.{' '}
                <span className="font-medium text-navy-800">You Don't Have to Do It Alone.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                MIT research shows 90% of employees use AI tools at work—often without guidance,
                training, or oversight. This creates risks, but also opportunities.
                You can transform this shadow usage into strategic advantage.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">Employees using personal AI tools without policies</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">Sensitive data potentially exposed to AI systems</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">Missing 450% average ROI from proper implementation</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-navy-50 rounded-lg border border-navy-200">
                <p className="text-sm text-navy-900">
                  <strong>The Solution:</strong> Comprehensive AI literacy training designed for adult learners.
                  Build responsible AI practices across your organization.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="card-sleek p-6 bg-white">
                <div className="text-3xl font-bold text-navy-800 mb-2">90%</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Using Shadow AI</p>
                <p className="text-xs text-gray-600">Employees already using personal AI tools</p>
              </div>
              <div className="card-sleek p-6 bg-white">
                <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Getting Zero ROI</p>
                <p className="text-xs text-gray-600">Organizations without proper training</p>
              </div>
              <div className="card-sleek p-6 bg-white">
                <div className="text-3xl font-bold text-green-600 mb-2">450%</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Average Returns</p>
                <p className="text-xs text-gray-600">With responsible AI implementation</p>
              </div>
              <div className="card-sleek p-6 bg-white">
                <div className="text-3xl font-bold text-navy-800 mb-2">100%</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Funded Training</p>
                <p className="text-xs text-gray-600">Ohio TechCred eligible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Literacy Matters */}
      <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Why AI Literacy <span className="font-medium text-navy-800">Matters Now</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AI literacy isn't just about workplace productivity—it's about preparing adult learners
              for a fundamentally different future. Whether you're a professional, educator, or leader,
              understanding AI is no longer optional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="icon-md text-navy-800" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">For Professionals</h3>
              <p className="text-sm text-gray-600">
                Stay relevant in your field. Learn to augment your expertise with AI tools
                while maintaining ethical standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="icon-md text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">For Educators</h3>
              <p className="text-sm text-gray-600">
                Master AI yourself first, then bring it to your classroom.
                Our adult-focused training prepares you to teach others.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="icon-md text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">For Organizations</h3>
              <p className="text-sm text-gray-600">
                Build a culture of responsible innovation. Transform risk into competitive
                advantage with proper governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Education Path */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Comprehensive <span className="font-medium text-navy-800">Responsible AI Education</span>
            </h2>
            <p className="text-lg text-gray-600">
              From literacy to leadership—a complete learning journey for adult professionals
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Foundation */}
            <div className="card-sleek p-8 relative overflow-hidden bg-white border border-navy-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-navy-100/50 to-transparent rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="icon-md text-navy-800" />
                  <span className="text-xs font-semibold text-navy-800 uppercase tracking-wider">Foundation</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">AI Literacy Foundation</h3>
                <p className="text-gray-600 mb-6">
                  Essential AI knowledge for every adult learner. No technical background required.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Understanding AI fundamentals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Responsible use & ethics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Basic prompt engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>8 Professional Development Hours</span>
                  </li>
                </ul>
                <a href="/courses" className="text-navy-800 font-medium hover:text-navy-900 transition-colors">
                  View curriculum →
                </a>
              </div>
            </div>

            {/* Practitioner */}
            <div className="card-sleek p-8 relative overflow-hidden bg-white border border-navy-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-navy-100/50 to-transparent rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="icon-md text-navy-800" />
                  <span className="text-xs font-semibold text-navy-800 uppercase tracking-wider">Applied</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Applied AI Practitioner</h3>
                <p className="text-gray-600 mb-6">
                  Practical implementation for your specific role and department.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Department-specific workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>ROI-focused implementation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Tool selection & optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>12 Professional Development Hours</span>
                  </li>
                </ul>
                <a href="/certificates" className="text-navy-800 font-medium hover:text-navy-900 transition-colors">
                  Learn about certificates →
                </a>
              </div>
            </div>

            {/* Leader */}
            <div className="card-sleek p-8 relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/50 to-transparent rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="icon-md text-amber-600" />
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Leadership</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">AI Integration Leader</h3>
                <p className="text-gray-600 mb-6">
                  Lead responsible AI transformation across your organization.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Governance frameworks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Change management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>Risk mitigation strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-600" />
                    <span>20 Professional Development Hours</span>
                  </li>
                </ul>
                <a href="/certificates" className="text-amber-600 font-medium hover:text-amber-600 transition-colors">
                  View certification →
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/assessment" className="btn-primary inline-block">
              Find Your Starting Point
              <ArrowRight className="inline-block ml-2 icon-xs" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* Ohio TechCred Banner */}
      <section className="section-padding bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="icon-sm" />
                <span className="text-sm font-semibold uppercase tracking-wider opacity-90">Ohio Employers</span>
              </div>
              <h2 className="text-2xl font-light mb-2">
                Get <span className="font-medium">100% Training Reimbursement</span>
              </h2>
              <p className="text-navy-100">
                All RUDI courses are eligible for Ohio TechCred funding. Up to $2,000 per employee.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="/ohio-techcred" className="btn-white">
                Learn About TechCred
                <ArrowRight className="inline-block ml-2 icon-xs" strokeWidth={2} />
              </a>
              <a href="/assessment" className="btn-outline-white">
                Check Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Your AI Journey Path */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Your Path to <span className="font-medium text-navy-800">Responsible AI Success</span>
            </h2>
            <p className="text-lg text-gray-600">
              A proven journey from assessment to organizational transformation
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 relative">
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-navy-200 via-navy-400 to-navy-200"></div>

              {[
                {
                  title: 'Assess',
                  description: 'Free organizational AI readiness assessment',
                  icon: BarChart3,
                  link: '/assessment',
                  color: 'navy'
                },
                {
                  title: 'Learn',
                  description: 'Adult-focused curriculum and training',
                  icon: GraduationCap,
                  link: '/courses',
                  color: 'navy'
                },
                {
                  title: 'Implement',
                  description: 'Department-specific workflows',
                  icon: Target,
                  link: '/courses',
                  color: 'navy'
                },
                {
                  title: 'Certify',
                  description: 'Industry-recognized certificates',
                  icon: Award,
                  link: '/certificates',
                  color: 'navy'
                },
                {
                  title: 'Optimize',
                  description: 'Continuous improvement and ROI',
                  icon: TrendingUp,
                  link: '/framework',
                  color: 'navy'
                }
              ].map((step, i) => (
                <a key={i} href={step.link} className="relative group">
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 rounded-full bg-white border-2 border-${step.color}-500 flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-${step.color}-50 group-hover:scale-110`}>
                      <step.icon className={`icon-sm text-${step.color}-600`} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose RUDI */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Why Organizations Choose <span className="font-medium text-navy-800">RUDI</span>
            </h2>
            <p className="text-lg text-gray-600">
              Evidence-based training designed specifically for adult learners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-sleek p-8 bg-white">
              <Shield className="icon-lg text-navy-800 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">Responsible Focus</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ethics-first approach to AI implementation. Protect data while enabling innovation.
              </p>
              <a href="/framework" className="text-navy-800 text-sm font-medium hover:text-navy-900">
                View framework →
              </a>
            </div>

            <div className="card-sleek p-8 bg-white">
              <Users className="icon-lg text-navy-800 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">Adult Learning</h3>
              <p className="text-gray-600 text-sm mb-4">
                Designed for professionals, not students. Practical, applicable, and immediately useful.
              </p>
              <a href="/courses" className="text-navy-800 text-sm font-medium hover:text-navy-900">
                Browse courses →
              </a>
            </div>

            <div className="card-sleek p-8 bg-white">
              <TrendingUp className="icon-lg text-green-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">Proven ROI</h3>
              <p className="text-gray-600 text-sm mb-4">
                450% average return. $2-10M annual savings. Based on MIT research.
              </p>
              <a href="/research" className="text-green-600 text-sm font-medium hover:text-green-600">
                View research →
              </a>
            </div>

            <div className="card-sleek p-8 bg-white">
              <DollarSign className="icon-lg text-amber-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">100% Funded</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ohio employers get full reimbursement through TechCred. Up to $2,000 per employee.
              </p>
              <a href="/ohio-techcred" className="text-amber-600 text-sm font-medium hover:text-amber-600">
                Learn more →
              </a>
            </div>

            <div className="card-sleek p-8 bg-white">
              <Award className="icon-lg text-navy-800 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">Credentials</h3>
              <p className="text-gray-600 text-sm mb-4">
                Three-tier certification program recognized by employers nationwide.
              </p>
              <a href="/certificates" className="text-navy-800 text-sm font-medium hover:text-navy-900">
                View certificates →
              </a>
            </div>

            <div className="card-sleek p-8 bg-white">
              <Building2 className="icon-lg text-navy-800 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-3">Custom Training</h3>
              <p className="text-gray-600 text-sm mb-4">
                Department-specific workflows tailored to your organization's needs.
              </p>
              <a href="/courses" className="text-navy-800 text-sm font-medium hover:text-navy-900">
                Explore options →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-light mb-6">
            Ready to Build <span className="font-medium">Responsible AI Practices?</span>
          </h2>
          <p className="text-lg opacity-90 mb-10">
            Start with a free assessment. Get trained. Earn certificates. Transform your organization.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="/assessment" className="btn-white">
              <FileCheck className="inline-block mr-2 w-4 h-4" strokeWidth={2} />
              Take Free Assessment
            </a>
            <a href="/courses" className="btn-outline-white">
              Browse Training Programs
            </a>
            <a href="/ohio-techcred" className="btn-outline-white">
              Learn About Funding
            </a>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm opacity-60">
              Questions? Contact us at rudi@hoffdigital.com
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}