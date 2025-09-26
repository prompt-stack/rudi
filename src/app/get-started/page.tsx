'use client';

import { useState } from 'react';
import { Users, Building2, User, CheckCircle, Calendar, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function GetStartedPage() {
  const [orgSize, setOrgSize] = useState<'individual' | 'team' | 'enterprise' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    timeline: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service or CRM
    // Form data would be sent here: { orgSize, ...formData }
  };

  return (
    <div className="gradient-radial min-h-screen">
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Get Started</span>
            <h1 className="text-title text-primary mb-6">
              Begin Your
              <span className="text-gradient"> AI Transformation</span>
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              Tell us about your needs and we'll recommend the best path forward
            </p>
          </div>

          {/* Organization Size Selection */}
          {!orgSize && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={() => setOrgSize('individual')}
                className="card-sleek p-8 text-center hover:scale-105 transition-transform group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-2xl mb-4 group-hover:bg-navy-100 transition-colors">
                  <User className="h-8 w-8 text-navy-800" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Individual</h3>
                <p className="text-secondary text-sm mb-4">
                  I want to assess and improve my personal AI literacy
                </p>
                <div className="text-primary-600 font-medium">
                  Free Assessment →
                </div>
              </button>

              <button
                onClick={() => setOrgSize('team')}
                className="card-sleek p-8 text-center hover:scale-105 transition-transform group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-100 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Team</h3>
                <p className="text-secondary text-sm mb-4">
                  5-20 people need training and assessment
                </p>
                <div className="text-primary-600 font-medium">
                  Workshop + Training →
                </div>
              </button>

              <button
                onClick={() => setOrgSize('enterprise')}
                className="card-sleek p-8 text-center hover:scale-105 transition-transform group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-2xl mb-4 group-hover:bg-navy-200 transition-colors">
                  <Building2 className="h-8 w-8 text-navy-800" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Enterprise</h3>
                <p className="text-secondary text-sm mb-4">
                  20+ employees across multiple departments
                </p>
                <div className="text-primary-600 font-medium">
                  Custom Program →
                </div>
              </button>
            </div>
          )}

          {/* Individual Path */}
          {orgSize === 'individual' && (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setOrgSize(null)}
                className="text-secondary hover:text-primary mb-6 flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="card-sleek p-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Start with Our Free Assessment
                </h2>
                <p className="text-secondary mb-6">
                  Take our 15-minute assessment to understand your current AI literacy level
                  and get personalized recommendations.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Instant Results</p>
                      <p className="text-secondary text-sm">Get your competency radar chart immediately</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Learning Resources</p>
                      <p className="text-secondary text-sm">Access curated materials for your level</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">No Credit Card Required</p>
                      <p className="text-secondary text-sm">Completely free with no obligations</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href="/assessment" className="btn-primary flex-1 text-center">
                    Take Assessment Now
                  </Link>
                  <Link href="/workbooks" className="btn-secondary flex-1 text-center">
                    Browse Workbooks
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Team Path */}
          {orgSize === 'team' && (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setOrgSize(null)}
                className="text-secondary hover:text-primary mb-6 flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="card-sleek p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Perfect for Teams of 5-20
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Team Size
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select size</option>
                        <option value="5-10">5-10 people</option>
                        <option value="11-15">11-15 people</option>
                        <option value="16-20">16-20 people</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (this month)</option>
                        <option value="quarter">This quarter</option>
                        <option value="planning">Just planning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Tell us about your goals
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="What are you hoping to achieve with AI literacy training?"
                    />
                  </div>

                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="font-semibold text-primary mb-3">Recommended: Discovery Workshop</h3>
                    <p className="text-secondary text-sm mb-3">
                      Start with our half-day workshop to assess your team and build a custom roadmap.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">$2,500</span>
                      <span className="text-sm text-secondary">Includes 10 assessments</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Schedule Discovery Call
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Enterprise Path */}
          {orgSize === 'enterprise' && (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setOrgSize(null)}
                className="text-secondary hover:text-primary mb-6 flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="card-sleek p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Enterprise Solutions
                </h2>
                <p className="text-secondary mb-8">
                  For organizations with 20+ employees, we create custom AI literacy programs
                  tailored to your industry, culture, and objectives.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-semibold text-primary mb-3">What We Offer</h3>
                    <div className="space-y-3">
                      {[
                        'Organization-wide assessment and benchmarking',
                        'Custom curriculum development',
                        'Role-specific training paths',
                        'Train-the-trainer programs',
                        'Ongoing support and measurement'
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-primary mb-3">Let's Connect</h3>
                    <p className="text-secondary text-sm mb-4">
                      Schedule a consultation to discuss your organization's specific needs.
                    </p>
                    <div className="space-y-2">
                      <a href="mailto:enterprise@rudi.ai" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                        <Mail className="h-4 w-4" />
                        enterprise@rudi.ai
                      </a>
                      <a href="tel:+1234567890" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                        <Phone className="h-4 w-4" />
                        Schedule a Call
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Calendar className="icon-sm" />
                    Book Consultation
                  </button>
                  <Link href="/methodology" className="btn-secondary flex-1 text-center">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}