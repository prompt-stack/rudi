'use client';

import {
  FileText,
  Download,
  ArrowRight,
  BookOpen,
  Target,
  Shield,
  Users,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResourcesPage() {
  const resources = [
    {
      id: 'vocabulary',
      title: 'AI Vocabulary Guide',
      subtitle: 'Essential AI Terminology',
      module: 'Module 1',
      description: 'Master the language of AI with our comprehensive vocabulary guide. Essential terminology and concepts for understanding AI in business contexts.',
      pdfUrl: 'https://res.cloudinary.com/ddbqbo1mo/image/upload/v1758216388/RUDI-Complete-01-Vocabulary_hvzup6.pdf',
      coverImage: '/api/placeholder/400/560', // We'll use placeholder for now
      color: 'blue',
      icon: BookOpen,
      features: [
        'Core AI concepts explained',
        'Business-focused definitions',
        'Practical examples',
        'Industry terminology'
      ]
    },
    {
      id: 'framework',
      title: 'RUDI Framework Matrix',
      subtitle: 'Competency Progression Model',
      module: 'Module 2',
      description: 'Complete implementation guide for the RUDI AI Literacy Framework. Map AI literacy across domains and proficiency levels.',
      pdfUrl: 'https://res.cloudinary.com/ddbqbo1mo/image/upload/v1757614617/RUDI-Complete-02-Framework_gsinpi.pdf',
      coverImage: 'https://res.cloudinary.com/ddbqbo1mo/image/upload/v1758721796/cover-framework-SCR-20250911-matq_noajby.jpg',
      color: 'green',
      icon: Target,
      features: [
        '3 core dimensions',
        '5 proficiency levels',
        'Competency matrix',
        'Assessment tools'
      ]
    },
    {
      id: 'responsible',
      title: 'Responsible Use Guide',
      subtitle: 'Ethics & Governance',
      module: 'Module 3',
      description: 'Ethics, governance, and best practices for responsible AI deployment. Implement the Ban/Control/Allow framework in your organization.',
      pdfUrl: 'https://res.cloudinary.com/ddbqbo1mo/image/upload/v1757614618/RUDI-Complete-03-Responsible-Use_czmejf.pdf',
      coverImage: '/api/placeholder/400/560',
      color: 'purple',
      icon: Shield,
      features: [
        'Ban/Control/Allow framework',
        'Risk management strategies',
        'Policy templates',
        'Compliance guidelines'
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
              <FileText className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                Resources • Training Materials • Implementation Guides
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              Free RUDI{' '}
              <span className="font-medium text-accent">Resources</span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              Download our comprehensive training materials and implementation guides
              to build AI literacy across your organization.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-accent" />
                <span>No email required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-accent" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-accent" />
                <span>Share with your team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {resources.map((resource) => {
                const Icon = resource.icon;
                const bgColor = {
                  blue: 'from-gray-50 to-white border-gray-200',
                  green: 'from-gray-50 to-white border-gray-200',
                  purple: 'from-gray-50 to-white border-gray-200'
                }[resource.color];
                const iconColor = {
                  blue: 'text-gray-600 bg-gray-100',
                  green: 'text-gray-600 bg-gray-100',
                  purple: 'text-gray-600 bg-gray-100'
                }[resource.color];
                const btnColor = {
                  blue: 'btn-primary',
                  green: 'btn-primary',
                  purple: 'btn-primary'
                }[resource.color];
                const moduleColor = {
                  blue: 'text-gray-600 bg-gray-50 border-gray-200',
                  green: 'text-gray-600 bg-gray-50 border-gray-200',
                  purple: 'text-gray-600 bg-gray-50 border-gray-200'
                }[resource.color];

                return (
                  <div key={resource.id} className="group">
                    {/* PDF Cover Preview */}
                    <div className={`relative bg-gradient-to-br ${bgColor} rounded-t-2xl border-2 overflow-hidden aspect-[3/4] flex items-center justify-center`}>
                      <div className="absolute top-4 right-4 z-10">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${moduleColor}`}>
                          {resource.module}
                        </span>
                      </div>

                      {/* Use actual cover image if available, otherwise show styled placeholder */}
                      {resource.coverImage && !resource.coverImage.includes('placeholder') ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={resource.coverImage}
                            alt={`${resource.title} cover`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                        </div>
                      ) : (
                        <div className="text-center p-8">
                          <div className={`inline-flex p-6 rounded-2xl ${iconColor} mb-6`}>
                            <Icon className="w-16 h-16" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">
                            {resource.subtitle}
                          </p>
                        </div>
                      )}

                      {!resource.coverImage || resource.coverImage.includes('placeholder') ? (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
                      ) : null}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-b-2xl border-2 border-t-0 border-gray-200 p-6">
                      <p className="text-sm text-gray-600 mb-4">
                        {resource.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {resource.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="icon-xs text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={resource.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 ${btnColor} group`}
                      >
                        <Download className="icon-sm" />
                        Download PDF
                        <ArrowRight className="icon-xs group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-title font-light text-primary mb-4">
              How to Use These{' '}
              <span className="font-medium text-accent">Resources</span>
            </h2>
            <p className="text-large text-secondary">
              A suggested implementation path for maximum impact
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Start with Vocabulary</h3>
                  <p className="text-sm text-gray-600">
                    Build a common language across your team
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="icon-sm text-gray-300" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Assess with Framework</h3>
                  <p className="text-sm text-gray-600">
                    Map current competencies and identify gaps
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="icon-sm text-gray-300" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Implement Governance</h3>
                  <p className="text-sm text-gray-600">
                    Deploy responsible use policies
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="icon-sm text-gray-300" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg mb-4">
                    4
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Scale & Iterate</h3>
                  <p className="text-sm text-gray-600">
                    Expand adoption and refine approach
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-10 md:p-14 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Need Implementation{' '}
                <span className="font-medium">Support?</span>
              </h2>
              <p className="text-lg opacity-95 mb-8 max-w-2xl mx-auto">
                While these resources provide a strong foundation, personalized guidance
                can accelerate your AI literacy journey.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <Users className="icon-md mb-3" />
                  <h3 className="font-semibold mb-2">Discovery Workshop</h3>
                  <p className="text-sm opacity-90">
                    2-hour session to assess your organization's readiness
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <Target className="icon-md mb-3" />
                  <h3 className="font-semibold mb-2">Custom Training</h3>
                  <p className="text-sm opacity-90">
                    Tailored programs for your specific industry and needs
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <Lightbulb className="icon-md mb-3" />
                  <h3 className="font-semibold mb-2">Implementation</h3>
                  <p className="text-sm opacity-90">
                    Hands-on support to deploy RUDI in your organization
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/workshop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-50 transition-all hover:scale-105"
                >
                  Book Discovery Workshop
                  <ArrowRight className="icon-sm" />
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all"
                >
                  Take Assessment First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-primary mb-6 text-center">
              Related Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/research"
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="icon-sm text-gray-600" />
                  <div>
                    <p className="font-medium text-primary group-hover:text-gray-700 transition-colors">Industry Research</p>
                    <p className="text-xs text-gray-500">MIT GenAI Divide Report</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/framework"
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Target className="icon-sm text-gray-600" />
                  <div>
                    <p className="font-medium text-primary group-hover:text-gray-700 transition-colors">Interactive Framework</p>
                    <p className="text-xs text-gray-500">Explore the matrix online</p>
                  </div>
                </div>
              </Link>

              <a
                href="https://bzhoff.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="icon-sm text-gray-600" />
                  <div>
                    <p className="font-medium text-primary group-hover:text-gray-700 transition-colors">Substack</p>
                    <p className="text-xs text-gray-500">Weekly AI insights</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}