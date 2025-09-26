'use client';

import {
  BookOpen,
  GraduationCap,
  Users,
  Lightbulb,
  FileText,
  CheckCircle2,
  ArrowRight,
  Download,
  ExternalLink,
  Brain,
  Target,
  Sparkles,
  MessageSquare,
  ClipboardList,
  Award,
  PlayCircle,
  Library,
  PenTool,
  HelpCircle,
  Zap,
  ChevronDown,
  ChevronRight,
  School,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function EducatorsPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const backgroundResources = [
    {
      id: 'intro-ai',
      title: 'Introduction to AI',
      icon: Brain,
      resources: [
        { name: 'AI Fundamentals for Educators', type: 'PDF', description: 'Comprehensive overview of AI concepts tailored for educational contexts' },
        { name: 'AI in 5 Minutes', type: 'Video', description: 'Quick introduction to AI capabilities and limitations' },
        { name: 'Understanding Machine Learning', type: 'Interactive', description: 'Interactive guide to how AI learns from data' },
        { name: 'Generative AI Basics', type: 'Course', description: '2-hour self-paced course on GenAI fundamentals' }
      ]
    },
    {
      id: 'ai-applications',
      title: 'Applications in Education',
      icon: School,
      resources: [
        { name: 'AI Tools Directory', type: 'Database', description: 'Curated list of AI tools suitable for classroom use' },
        { name: 'Subject-Specific AI Applications', type: 'Guide', description: 'How AI can enhance teaching in different subjects' },
        { name: 'Administrative AI Solutions', type: 'Toolkit', description: 'AI tools for grading, planning, and administration' },
        { name: 'Student Support Systems', type: 'Framework', description: 'Using AI for personalized learning support' }
      ]
    },
    {
      id: 'glossaries',
      title: 'Glossaries & References',
      icon: Library,
      resources: [
        { name: 'Educational AI Glossary', type: 'Reference', description: 'Key terms and concepts in educational AI' },
        { name: 'Technical Terms Explained', type: 'Guide', description: 'Simple explanations of technical AI terminology' },
        { name: 'Acronyms & Abbreviations', type: 'List', description: 'Common AI-related acronyms in education' },
        { name: 'Visual AI Dictionary', type: 'Interactive', description: 'Illustrated guide to AI concepts' }
      ]
    },
    {
      id: 'faqs',
      title: 'FAQs & Common Concerns',
      icon: HelpCircle,
      resources: [
        { name: 'Student Privacy & AI', type: 'FAQ', description: 'Addressing data privacy concerns' },
        { name: 'Academic Integrity', type: 'Guide', description: 'Managing AI use and preventing cheating' },
        { name: 'Parent Communication', type: 'Template', description: 'Explaining AI use to parents and guardians' },
        { name: 'Equity Considerations', type: 'Framework', description: 'Ensuring equitable AI access for all students' }
      ]
    }
  ];

  const classroomResources = [
    {
      id: 'general-guidance',
      title: 'General Guidance',
      icon: Target,
      resources: [
        { name: 'AI Integration Strategies', type: 'Playbook', description: 'Step-by-step guide to introducing AI in your classroom' },
        { name: 'Best Practices Handbook', type: 'PDF', description: 'Evidence-based approaches to AI in education' },
        { name: 'Safety Guidelines', type: 'Checklist', description: 'Ensuring safe and responsible AI use' },
        { name: 'Assessment with AI', type: 'Framework', description: 'Rethinking assessment in the AI era' }
      ]
    },
    {
      id: 'lesson-content',
      title: 'Lesson Plans & Activities',
      icon: PenTool,
      resources: [
        { name: 'AI Literacy Curriculum', type: 'Curriculum', description: '10-week program introducing AI concepts' },
        { name: 'Interactive AI Activities', type: 'Activities', description: 'Hands-on exercises for different grade levels' },
        { name: 'AI Ethics Discussions', type: 'Discussion Guides', description: 'Facilitating conversations about AI ethics' },
        { name: 'Project-Based Learning', type: 'Projects', description: 'AI-enhanced project ideas across subjects' }
      ]
    },
    {
      id: 'prof-development',
      title: 'Professional Development',
      icon: Award,
      resources: [
        { name: 'AI for Educators Certificate', type: 'Course', description: '20-hour professional development program' },
        { name: 'Monthly Webinar Series', type: 'Webinars', description: 'Live sessions on emerging AI topics' },
        { name: 'Peer Learning Networks', type: 'Community', description: 'Connect with other educators using AI' },
        { name: 'Research & Trends', type: 'Newsletter', description: 'Monthly updates on AI in education' }
      ]
    },
    {
      id: 'student-resources',
      title: 'Student-Facing Materials',
      icon: Users,
      resources: [
        { name: 'Student AI Guide', type: 'Handbook', description: 'Age-appropriate introduction to AI' },
        { name: 'AI Career Pathways', type: 'Resource', description: 'Exploring AI-related career opportunities' },
        { name: 'Digital Citizenship & AI', type: 'Curriculum', description: 'Teaching responsible AI use' },
        { name: 'AI Creation Projects', type: 'Tutorials', description: 'Students building their own AI projects' }
      ]
    }
  ];

  const practicalTools = [
    {
      id: 'templates',
      title: 'Templates & Policies',
      icon: FileText,
      resources: [
        { name: 'AI Use Policy Template', type: 'Word', size: '245 KB', description: 'Customizable classroom AI policy' },
        { name: 'Syllabus Language', type: 'Word', size: '125 KB', description: 'Sample text for course syllabi' },
        { name: 'Parent Permission Form', type: 'PDF', size: '180 KB', description: 'AI tool usage consent form' },
        { name: 'Student Agreement', type: 'Word', size: '95 KB', description: 'Responsible AI use agreement' }
      ]
    },
    {
      id: 'assessment-tools',
      title: 'Assessment & Evaluation',
      icon: ClipboardList,
      resources: [
        { name: 'AI Readiness Checklist', type: 'Excel', size: '320 KB', description: 'Assess your classroom&apos;s AI readiness' },
        { name: 'Rubric Generator', type: 'Tool', size: 'Online', description: 'AI-enhanced rubric creation tool' },
        { name: 'Learning Analytics Dashboard', type: 'Template', size: '1.2 MB', description: 'Track student progress with AI' },
        { name: 'Feedback Templates', type: 'Word', size: '210 KB', description: 'AI-assisted feedback frameworks' }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Resources',
      icon: MessageSquare,
      resources: [
        { name: 'Administrator Brief', type: 'PPT', size: '2.4 MB', description: 'Present AI initiatives to leadership' },
        { name: 'Parent Night Presentation', type: 'PPT', size: '3.1 MB', description: 'Explaining AI in education to parents' },
        { name: 'Student Orientation', type: 'PPT', size: '1.8 MB', description: 'Introducing AI tools to students' },
        { name: 'Newsletter Templates', type: 'Word', size: '450 KB', description: 'Share AI updates with stakeholders' }
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation Guides',
      icon: Rocket,
      resources: [
        { name: 'Quick Start Guide', type: 'PDF', size: '890 KB', description: 'Get started with AI in 5 steps' },
        { name: 'Pilot Program Playbook', type: 'PDF', size: '1.5 MB', description: 'Run an AI pilot in your classroom' },
        { name: 'Troubleshooting Guide', type: 'PDF', size: '650 KB', description: 'Common challenges and solutions' },
        { name: 'Success Metrics', type: 'Excel', size: '285 KB', description: 'Measure AI implementation impact' }
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
              <GraduationCap className="icon-xs text-tertiary" />
              <span className="text-sm font-medium text-secondary">
                Educator Resources • Teaching Tools • Professional Development
              </span>
            </div>

            <h1 className="text-display font-light tracking-tight text-primary mb-6">
              AI Resources for{' '}
              <span className="font-medium text-accent">
                Educators
              </span>
            </h1>
            <p className="text-lead mb-10 max-w-3xl">
              Comprehensive tools, templates, and training materials to help educators
              effectively integrate AI into their teaching practice while maintaining
              academic integrity and student safety.
            </p>

            <div className="bg-navy-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-navy-900 leading-relaxed">
                <strong>Note for Educators:</strong> These resources are designed to support
                teachers at all levels of AI familiarity. Start with the Background section
                if you're new to AI, or jump directly to Classroom Resources if you're ready
                to implement.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Grade-level appropriate</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Standards-aligned</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Evidence-based</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="icon-xs text-green-500" />
                <span>Peer-reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 1: Background */}
      <section className="section-padding border-t border-subtle">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-full mb-6">
                <span className="text-sm font-bold text-navy-800">PART 1</span>
              </div>
              <h2 className="text-title font-light text-primary mb-4">
                Background &{' '}
                <span className="font-medium text-accent">Foundation</span>
              </h2>
              <p className="text-large text-secondary">
                Build your understanding of AI fundamentals and educational applications
              </p>
            </div>

            <div className="space-y-4">
              {backgroundResources.map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-navy-50 rounded-xl">
                        <section.icon className="icon-sm text-navy-800" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-primary">
                          {section.title}
                        </h3>
                        <p className="text-sm text-secondary mt-1">
                          {section.resources.length} resources available
                        </p>
                      </div>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="icon-sm text-gray-400" />
                    ) : (
                      <ChevronRight className="icon-sm text-gray-400" />
                    )}
                  </button>

                  {expandedSections.includes(section.id) && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.resources.map((resource, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-primary">{resource.name}</h4>
                              <span className="text-xs font-medium px-2 py-1 bg-navy-100 text-navy-800 rounded-full">
                                {resource.type}
                              </span>
                            </div>
                            <p className="text-sm text-secondary">{resource.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: AI in the Classroom */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
                <span className="text-sm font-bold text-green-600">PART 2</span>
              </div>
              <h2 className="text-title font-light text-primary mb-4">
                AI in the{' '}
                <span className="font-medium text-accent">Classroom</span>
              </h2>
              <p className="text-large text-secondary">
                Practical guidance and ready-to-use materials for classroom implementation
              </p>
            </div>

            <div className="space-y-4">
              {classroomResources.map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <section.icon className="icon-sm text-green-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-primary">
                          {section.title}
                        </h3>
                        <p className="text-sm text-secondary mt-1">
                          {section.resources.length} resources available
                        </p>
                      </div>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="icon-sm text-gray-400" />
                    ) : (
                      <ChevronRight className="icon-sm text-gray-400" />
                    )}
                  </button>

                  {expandedSections.includes(section.id) && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.resources.map((resource, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-primary">{resource.name}</h4>
                              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded-full">
                                {resource.type}
                              </span>
                            </div>
                            <p className="text-sm text-secondary">{resource.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Practical Tools */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-full mb-6">
                <span className="text-sm font-bold text-navy-800">PART 3</span>
              </div>
              <h2 className="text-title font-light text-primary mb-4">
                Practical Templates &{' '}
                <span className="font-medium text-accent">Tools</span>
              </h2>
              <p className="text-large text-secondary">
                Download ready-to-use templates, checklists, and implementation tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {practicalTools.map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6 bg-gradient-to-br from-navy-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <section.icon className="icon-sm text-navy-800" />
                      <h3 className="font-semibold text-primary">{section.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {section.resources.map((tool, j) => (
                      <button key={j} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-navy-800 transition-colors">
                              {tool.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{tool.type}</span>
                              {tool.size && (
                                <>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{tool.size}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <Download className="w-4 h-4 text-gray-400 group-hover:text-navy-800 transition-colors mt-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Pathway */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl mb-6">
                  <Sparkles className="w-8 h-8 text-accent-600" />
                </div>
                <h2 className="text-title font-light text-primary mb-4">
                  Your AI Integration{' '}
                  <span className="font-medium text-accent">Journey</span>
                </h2>
                <p className="text-large text-secondary max-w-2xl mx-auto">
                  Follow this recommended pathway to successfully integrate AI into your teaching practice
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { step: '1', title: 'Learn', desc: 'Build AI literacy', icon: BookOpen, color: 'blue' },
                  { step: '2', title: 'Plan', desc: 'Design integration', icon: Target, color: 'green' },
                  { step: '3', title: 'Pilot', desc: 'Test with students', icon: Zap, color: 'purple' },
                  { step: '4', title: 'Refine', desc: 'Iterate & improve', icon: Sparkles, color: 'amber' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl mb-4`}>
                      <span className={`text-xl font-bold text-${item.color}-600`}>{item.step}</span>
                    </div>
                    <h4 className="font-semibold text-primary mb-1">{item.title}</h4>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-navy-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="icon-sm text-navy-800 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Quick Start Tip</h4>
                    <p className="text-sm text-navy-900">
                      Begin with one low-stakes activity using AI. For example, use an AI tool
                      to generate discussion questions or create a practice quiz. This allows you
                      to familiarize yourself with the technology before full integration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment" className="btn-primary group">
                  Assess Your Readiness
                  <ArrowRight className="inline-block icon-sm ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/workshop" className="btn-secondary">
                  Join Educator Workshop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Community */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-primary mb-8 text-center">
              Additional Support & Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-50 rounded-xl">
                    <Users className="icon-sm text-navy-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-navy-800 transition-colors">
                      Educator Community
                    </h4>
                    <p className="text-sm text-secondary">
                      Connect with peers using AI in education
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <PlayCircle className="icon-sm text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-green-600 transition-colors">
                      Video Tutorials
                    </h4>
                    <p className="text-sm text-secondary">
                      Step-by-step implementation guides
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-50 rounded-xl">
                    <MessageSquare className="icon-sm text-navy-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 group-hover:text-navy-800 transition-colors">
                      Office Hours
                    </h4>
                    <p className="text-sm text-secondary">
                      Weekly Q&A sessions with experts
                    </p>
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
              Ready to Transform Your{' '}
              <span className="font-medium">Teaching?</span>
            </h2>
            <p className="text-lead text-primary-100 mb-10 max-w-2xl mx-auto">
              Join thousands of educators successfully integrating AI into their classrooms.
              Get personalized support and guidance for your specific context.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 group"
              >
                Get Started Today
                <ArrowRight className="icon-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://bzhoff.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
              >
                Subscribe to Newsletter
                <ExternalLink className="icon-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}