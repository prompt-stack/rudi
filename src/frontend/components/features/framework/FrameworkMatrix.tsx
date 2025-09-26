'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Users,
  Code,
  ArrowRight,
  GraduationCap,
  Network,
  Workflow,
  Fingerprint,
  Sparkles,
  Gauge,
  FileSearch
} from 'lucide-react';

const frameworkData = {
  dimensions: [
    {
      id: 'conceptual',
      name: 'Conceptual',
      icon: Network,
      description: 'Understanding AI at a high level',
      color: 'blue',
      levels: {
        nonTechnical: [
          { level: 'No Exposure', description: 'Has never heard of generative AI.' },
          { level: 'Pre-Beginner', description: 'Has heard the term "AI," maybe ChatGPT, but cannot explain it.' },
          { level: 'Beginner', description: 'Can describe AI as "a tool that generates text/images."' },
          { level: 'Intermediate', description: 'Understands basics: training data, bias, why outputs vary.' },
          { level: 'Advanced', description: 'Can critically discuss AI\'s role in society, ethics, and limitations.' }
        ],
        technical: [
          { level: 'No Exposure', description: 'Has no awareness of AI/ML technologies.' },
          { level: 'Pre-Beginner', description: 'Knows AI exists but confuses it with automation; no exposure to models.' },
          { level: 'Beginner', description: 'Knows AI involves training data and models; aware of major model providers.' },
          { level: 'Intermediate', description: 'Understands concepts like parameters, embeddings, fine-tuning; can explain architectures in plain language.' },
          { level: 'Advanced', description: 'Can explain trade-offs in model design, architectures, and evaluation metrics.' }
        ]
      }
    },
    {
      id: 'operational',
      name: 'Operational',
      icon: Workflow,
      description: 'Using AI tools in practice',
      color: 'green',
      levels: {
        nonTechnical: [
          { level: 'No Exposure', description: 'Has never opened an AI tool.' },
          { level: 'Pre-Beginner', description: 'Can open ChatGPT/DALL·E but doesn\'t know what to type.' },
          { level: 'Beginner', description: 'Can try basic prompts ("Write an email…"), recognizes when output is off.' },
          { level: 'Intermediate', description: 'Uses AI for work tasks: lesson plans, emails, reports; knows how to cross-check.' },
          { level: 'Advanced', description: 'Designs AI-enhanced workflows, mentors peers in safe usage.' }
        ],
        technical: [
          { level: 'No Exposure', description: 'Has never run an AI model, API, or notebook.' },
          { level: 'Pre-Beginner', description: 'Has installed Python/JS but hasn\'t touched AI libraries.' },
          { level: 'Beginner', description: 'Can run a pre-built model or call a basic API.' },
          { level: 'Intermediate', description: 'Builds small automations (APIs, n8n/Zapier), fine-tunes models with guidance.' },
          { level: 'Advanced', description: 'Builds custom pipelines, deploys apps, integrates multiple models, and optimizes performance.' }
        ]
      }
    },
    {
      id: 'governance',
      name: 'Governance',
      icon: Fingerprint,
      description: 'Oversight, ethics, and responsible use',
      color: 'purple',
      levels: {
        nonTechnical: [
          { level: 'No Exposure', description: 'Has no awareness of AI risks.' },
          { level: 'Pre-Beginner', description: 'Knows AI may be biased, but no idea how.' },
          { level: 'Beginner', description: 'Can name risks: privacy, misinformation, bias.' },
          { level: 'Intermediate', description: 'Knows organizational policies, applies them (e.g., not inputting student data).' },
          { level: 'Advanced', description: 'Leads conversations on AI policy, ethics, and adoption.' }
        ],
        technical: [
          { level: 'No Exposure', description: 'Has no awareness of AI ethics or regulation.' },
          { level: 'Pre-Beginner', description: 'Has heard of bias, fairness, or GDPR but never engaged.' },
          { level: 'Beginner', description: 'Knows about data handling, PII, responsible disclosure.' },
          { level: 'Intermediate', description: 'Implements policies: data filters, logging, audits.' },
          { level: 'Advanced', description: 'Designs governance frameworks, bias testing, compliance systems, transparency reports.' }
        ]
      }
    }
  ]
};

const levelColors: Record<string, string> = {
  'No Exposure': 'bg-gray-100 text-gray-700',
  'Pre-Beginner': 'bg-amber-100 text-amber-600',
  'Beginner': 'bg-amber-100 text-amber-600',
  'Intermediate': 'bg-navy-100 text-navy-900',
  'Advanced': 'bg-green-100 text-green-600'
};

const levelGradients: Record<string, string> = {
  'No Exposure': 'from-gray-50 to-gray-100',
  'Pre-Beginner': 'from-amber-50 to-amber-100',
  'Beginner': 'from-yellow-50 to-yellow-100',
  'Intermediate': 'from-navy-50 to-navy-100',
  'Advanced': 'from-green-50 to-green-100'
};

export default function FrameworkMatrix() {
  const [selectedDimension, setSelectedDimension] = useState('conceptual');
  const [userType, setUserType] = useState<'nonTechnical' | 'technical'>('nonTechnical');

  const dimension = frameworkData.dimensions.find(d => d.id === selectedDimension)!;

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                AI Literacy Framework • Competency Matrix • Skills Assessment
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              RUDI AI Literacy{' '}
              <span className="font-medium text-accent">
                Framework Matrix
              </span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              A comprehensive competency framework for understanding, using, and governing AI systems
              across technical and non-technical roles.
            </p>

            {/* User Type Toggle */}
            <div className="inline-flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
              <button
                onClick={() => setUserType('nonTechnical')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  userType === 'nonTechnical'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                <Users className="inline-block icon-xs mr-2" />
                Non-Technical Users
              </button>
              <button
                onClick={() => setUserType('technical')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  userType === 'technical'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                <Code className="inline-block icon-xs mr-2" />
                Technical Users
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dimension Tabs */}
      <section className="border-t border-b border-subtle bg-white">
        <div className="container-wide py-6">
          <div className="flex space-x-12 overflow-x-auto">
            {frameworkData.dimensions.map(dim => {
              const IconComponent = dim.icon;
              const isActive = selectedDimension === dim.id;

              return (
                <button
                  key={dim.id}
                  onClick={() => setSelectedDimension(dim.id)}
                  className={`flex items-center gap-3 pb-4 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-primary-500 text-primary'
                      : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <IconComponent className="icon-sm" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{dim.name}</div>
                    <div className="text-xs text-tertiary">{dim.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competency Levels */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-title font-light text-primary mb-4">
                {dimension.name}{' '}
                <span className="font-medium text-accent">Competencies</span>
              </h2>
              <p className="text-large text-secondary">
                Progressive skill levels for {userType === 'nonTechnical' ? 'non-technical' : 'technical'} professionals
              </p>
            </div>

            <div className="space-y-4">
              {dimension.levels[userType].map((level, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`px-4 py-2 rounded-full font-semibold text-sm ${levelColors[level.level]}`}>
                        {level.level}
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary leading-relaxed">{level.description}</p>
                      </div>
                      <ChevronRight className="icon-sm text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-6">How to Use This Framework</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Gauge className="icon-md text-primary-600 mb-4" />
                <h4 className="font-semibold text-primary mb-2">Assessment Tool</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Use as a rubric to assess where someone falls in their AI journey
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <FileSearch className="icon-md text-accent-600 mb-4" />
                <h4 className="font-semibold text-primary mb-2">Curriculum Design</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Design a curriculum map where each cell becomes a learning objective
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Sparkles className="icon-md text-green-600 mb-4" />
                <h4 className="font-semibold text-primary mb-2">Progression Path</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Create a progression ladder showing how to move from one level to the next
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-secondary mb-6">Ready to assess your AI literacy level?</p>
              <a
                href="/assessment"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                Take the Assessment
                <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}