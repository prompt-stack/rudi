'use client';

import Link from 'next/link';
import { CheckCircle2, DollarSign, Users2, Building2, ArrowRight, TrendingUp, Award, Clock, FileCheck } from 'lucide-react';

export default function UpskillOhioPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-green-50/50 to-white">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="icon-xs" />
              State-Funded Workforce Initiative
            </div>
            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              Upskill <span className="font-medium text-green-600">Ohio</span>
            </h1>
            <p className="text-lead text-secondary max-w-3xl mx-auto mb-10">
              State-funded AI training for your entire workforce
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <CheckCircle2 className="icon-md text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-2">FREE Training</h3>
              <p className="text-sm text-secondary">State pays 100%</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <Users2 className="icon-md text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-2">Train 90 Employees</h3>
              <p className="text-sm text-secondary">Annually</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <Building2 className="icon-md text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-2">Any Ohio Employer</h3>
              <p className="text-sm text-secondary">With W2 employees qualifies</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <DollarSign className="icon-md text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-2">$2,000 per Employee</h3>
              <p className="text-sm text-secondary">Fully reimbursed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Big Numbers */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            The <span className="font-medium text-green-600">Numbers</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl mb-4">
                <DollarSign className="icon-lg text-green-600" />
              </div>
              <div className="text-5xl font-light text-primary mb-2">$180,000</div>
              <div className="text-sm text-secondary mb-2">Maximum funding per year</div>
              <p className="text-xs text-tertiary">$30,000 per application period × 6 windows</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl mb-4">
                <Users2 className="icon-lg text-green-600" />
              </div>
              <div className="text-5xl font-light text-primary mb-2">90</div>
              <div className="text-sm text-secondary mb-2">Employees trained annually</div>
              <p className="text-xs text-tertiary">15 employees × 6 application windows</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl mb-4">
                <Award className="icon-lg text-green-600" />
              </div>
              <div className="text-5xl font-light text-primary mb-2">$2,000</div>
              <div className="text-sm text-secondary mb-2">Per employee certificate</div>
              <p className="text-xs text-tertiary">Fully reimbursed by the state</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-title font-light tracking-tight text-primary mb-12 text-center">
            How It <span className="font-medium text-green-600">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-100 relative">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full text-xl font-semibold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Apply</h3>
              <p className="text-sm text-secondary">
                Submit your application during one of six bi-monthly windows
              </p>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300">
                <ArrowRight className="icon-md" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 relative">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full text-xl font-semibold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Get Approved</h3>
              <p className="text-sm text-secondary">
                State reviews and approves eligible training programs
              </p>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300">
                <ArrowRight className="icon-md" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 relative">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full text-xl font-semibold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Train Team</h3>
              <p className="text-sm text-secondary">
                Complete RUDI AI certification training with your employees
              </p>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300">
                <ArrowRight className="icon-md" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full text-xl font-semibold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Get Reimbursed</h3>
              <p className="text-sm text-secondary">
                Receive up to $2,000 per employee upon completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-title font-light tracking-tight text-primary mb-8 text-center">
              Who <span className="font-medium text-green-600">Qualifies</span>
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 p-8 md:p-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="icon-sm text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">Any Ohio Employer</h3>
                    <p className="text-secondary">
                      Private companies, nonprofits, and public employers with W2 employees in Ohio
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="icon-sm text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">All Organization Sizes</h3>
                    <p className="text-secondary">
                      From small businesses to large enterprises - every size qualifies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="icon-sm text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">Multiple Rounds</h3>
                    <p className="text-secondary">
                      Apply every two months - train up to 15 employees per funding round
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="icon-sm text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">No Cost to You</h3>
                    <p className="text-secondary">
                      The state of Ohio covers 100% of eligible training costs through TechCred
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-title font-light tracking-tight text-primary mb-6">
              Ready to <span className="font-medium text-green-600">Get Started?</span>
            </h2>
            <p className="text-large text-secondary mb-8">
              Learn about application windows, eligibility requirements, and how to apply for Ohio TechCred funding
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ohio-techcred" className="btn-primary inline-flex items-center justify-center gap-2">
                View TechCred Details & Apply
                <ArrowRight className="icon-xs" />
              </Link>
              <Link href="/assessment" className="btn-secondary inline-flex items-center justify-center gap-2">
                Take Readiness Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-green-600">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2">$180K</div>
              <div className="text-sm opacity-90">Max Annual Funding</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2">90</div>
              <div className="text-sm opacity-90">Employees/Year</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2">6</div>
              <div className="text-sm opacity-90">Application Windows</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2">100%</div>
              <div className="text-sm opacity-90">State Funded</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}