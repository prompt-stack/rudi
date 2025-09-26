'use client';

import Link from 'next/link';
import { Award, CheckCircle, Clock, BookOpen, Target, Shield, Users, Zap, FileCheck, ArrowRight, Building2 } from 'lucide-react';
import Certificate from '@/frontend/components/Certificate';

export default function CredentialsPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="badge-primary mb-6">
              <Award className="icon-xs" />
              Professional AI Certificates
            </div>
            <h1 className="text-title font-light tracking-tight text-primary mb-6">
              RUDI <span className="font-medium text-accent">AI Certificates</span>
            </h1>
            <p className="text-lead text-secondary max-w-3xl mx-auto">
              Industry-recognized certificates in responsible AI implementation.
              Stackable certificates that grow with your expertise.
            </p>
          </div>
        </div>
      </section>

      {/* TechCred Banner */}
      <section className="section-padding bg-gradient-to-r from-green-50 to-navy-50 border-t border-subtle">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="icon-xs" />
              Ohio Employers: Get 100% Reimbursement
            </div>
            <h2 className="text-title font-light tracking-tight text-primary mb-4">
              Training That's <span className="font-medium text-accent">Fully Funded</span>
            </h2>
            <p className="text-large text-secondary mb-8">
              Ohio employers can receive up to $2,000 per employee in TechCred reimbursements for our AI certificates.
              Train your entire team with no out-of-pocket costs.
            </p>
            <Link
              href="/ohio-techcred"
              className="btn-primary group inline-block"
            >
              Learn About TechCred Funding
              <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Three-Tier Credential System */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-6 text-center">
            Progressive <span className="font-medium text-accent">Certification Path</span>
          </h2>
          <p className="text-large text-secondary text-center mb-12 max-w-3xl mx-auto">
            Build your AI expertise through our three-tier certification system,
            designed to take you from foundational understanding to leadership capability.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Foundation Credential */}
            <div className="card-sleek overflow-hidden interactive-scale">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="feature-icon">
                    <Award className="icon-md" />
                  </div>
                  <span className="badge-default text-xs">LEVEL 1</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">AI Literacy Certificate</h3>
                <p className="text-secondary text-sm">Foundation in Responsible AI</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="icon-xs text-tertiary" />
                    <span className="text-primary font-medium">8 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="icon-xs text-tertiary" />
                    <span className="text-primary font-medium">Entry Level</span>
                  </div>
                </div>

                <h4 className="font-semibold text-primary mb-3">What You'll Earn:</h4>
                <ul className="space-y-2 text-sm text-secondary mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Fundamental understanding of AI capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Basic prompt engineering skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Ethics and responsible use principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Hands-on experience with AI tools</span>
                  </li>
                </ul>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Credential Includes:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Digital certificate with unique ID</li>
                    <li>• LinkedIn badge</li>
                    <li>• RUDI Framework fundamentals</li>
                    <li>• 1 year of credential validity</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Applied Credential */}
            <div className="card-sleek overflow-hidden interactive-scale">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="feature-icon">
                    <Award className="icon-md" />
                  </div>
                  <span className="badge-default text-xs">LEVEL 2</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Applied AI Practitioner</h3>
                <p className="text-secondary text-sm">Workplace AI Implementation</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">12 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">Intermediate</span>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3">What You'll Earn:</h4>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Advanced prompt engineering techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Workflow automation with AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Department-specific applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Performance measurement skills</span>
                  </li>
                </ul>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Credential Includes:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Professional certificate</li>
                    <li>• Portfolio project</li>
                    <li>• RUDI Applied Framework</li>
                    <li>• 2 years of credential validity</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Leadership Credential */}
            <div className="card-sleek overflow-hidden interactive-scale relative">
              <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="feature-icon">
                    <Award className="icon-md" />
                  </div>
                  <span className="badge-primary text-xs">LEVEL 3</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">AI Integration Leader</h3>
                <p className="text-secondary text-sm">Strategic AI Leadership</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">20 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">Leadership</span>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3">What You'll Earn:</h4>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Strategic AI implementation planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Governance & risk management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>ROI measurement frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="icon-xs text-accent flex-shrink-0 mt-0.5" />
                    <span>Team training & change management</span>
                  </li>
                </ul>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Credential Includes:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Executive certificate</li>
                    <li>• Capstone project</li>
                    <li>• Full RUDI Framework certification</li>
                    <li>• 3 years of credential validity</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credential Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-12 text-center">
            Why RUDI <span className="font-medium">Certificates Matter</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-100 to-navy-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-navy-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Recognition</h3>
              <p className="text-sm text-gray-600">
                Recognized by Ohio employers and eligible for TechCred reimbursement
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Practical Skills</h3>
              <p className="text-sm text-gray-600">
                Hands-on training with immediate workplace application
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-100 to-navy-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-navy-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Completion</h3>
              <p className="text-sm text-gray-600">
                Complete in 8-20 hours with flexible scheduling options
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stackable Path</h3>
              <p className="text-sm text-gray-600">
                Build expertise progressively with our three-tier system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Example Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-title font-light tracking-tight text-primary mb-6">
              Your Professional <span className="font-medium text-accent">Certificate</span>
            </h2>
            <p className="text-large text-secondary max-w-3xl mx-auto">
              Every RUDI certificate features unique verification ID,
              QR code for instant validation, and recognition from industry leaders.
            </p>
          </div>

          {/* Certificate Display */}
          <div className="max-w-5xl mx-auto mb-12">
            <Certificate
              credentialType="leader"
              completionDate="Upon Completion"
            />
          </div>

          {/* Verification Features */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <FileCheck className="icon-md text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-2">Unique Certificate ID</h3>
                <p className="text-sm text-secondary">
                  Each certificate has a unique identifier for instant verification at rudi.app/verify
                </p>
              </div>
              <div className="text-center">
                <Award className="icon-md text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-2">Digital Badges</h3>
                <p className="text-sm text-secondary">
                  Share your achievement on LinkedIn with professional digital badges
                </p>
              </div>
              <div className="text-center">
                <Shield className="icon-md text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-2">Secure Verification</h3>
                <p className="text-sm text-secondary">
                  Tamper-proof certificates with QR code for employer verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm font-semibold uppercase tracking-wider">For Organizations</span>
                </div>
                <h2 className="text-3xl font-light tracking-tight mb-4">
                  Team <span className="font-medium">Certification Programs</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Train your entire team with custom cohort programs.
                  Volume discounts available for 10+ employees.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-400" />
                    Custom scheduling to minimize disruption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-400" />
                    Department-specific examples and use cases
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-400" />
                    Progress tracking and reporting dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="icon-xs text-green-400" />
                    TechCred application support included
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6">Volume Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-gray-300">5-9 employees</span>
                    <span className="font-bold">10% off</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-gray-300">10-24 employees</span>
                    <span className="font-bold">15% off</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-gray-300">25-49 employees</span>
                    <span className="font-bold">20% off</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">50+ employees</span>
                    <span className="font-bold">Custom pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-surface-light">
        <div className="container-narrow text-center">
          <h2 className="text-title font-light tracking-tight text-primary mb-6">
            Start Your <span className="font-medium text-accent">AI Certification Journey</span>
          </h2>
          <p className="text-large text-secondary mb-10">
            Join thousands of professionals who have earned RUDI certificates.
            TechCred funding available for Ohio employers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="btn-primary group"
            >
              Take AI Readiness Assessment
              <ArrowRight className="inline-block ml-2 icon-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ohio-techcred"
              className="btn-secondary"
            >
              Learn About TechCred Funding
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}