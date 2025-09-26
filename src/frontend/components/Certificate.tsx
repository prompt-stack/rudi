'use client';

import { Award, Shield, CheckCircle, Calendar } from 'lucide-react';

interface CertificateProps {
  recipientName?: string;
  credentialType?: 'foundation' | 'practitioner' | 'leader';
  completionDate?: string;
  certificateId?: string;
  instructorName?: string;
}

export default function Certificate({
  recipientName = "Your Name",
  credentialType = "leader",
  completionDate = "January 15, 2025",
  certificateId = "RUD-2025-0142",
  instructorName = "Brandon Z. Hoff"
}: CertificateProps) {

  const credentials = {
    foundation: {
      title: "AI Literacy Certificate",
      subtitle: "Foundation in Responsible AI",
      level: "Level 1",
      hours: "8 Professional Development Hours",
      color: "from-navy-50 to-navy-100",
      borderColor: "border-navy-200"
    },
    practitioner: {
      title: "Applied AI Practitioner",
      subtitle: "Workplace AI Implementation",
      level: "Level 2",
      hours: "12 Professional Development Hours",
      color: "from-navy-50 to-navy-100",
      borderColor: "border-navy-200"
    },
    leader: {
      title: "AI Integration Leader",
      subtitle: "Strategic AI Leadership",
      level: "Level 3",
      hours: "20 Professional Development Hours",
      color: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200"
    }
  };

  const cert = credentials[credentialType];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Certificate Container */}
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Decorative Header */}
        <div className={`h-2 bg-gradient-to-r ${cert.color}`} />

        {/* Certificate Body */}
        <div className="p-12 relative">
          {/* Watermark Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Certificate Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">RUDI</h3>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Responsible Use of Digital Intelligence</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Certificate of Completion
              </div>

              <h1 className="text-4xl font-light text-gray-900 mb-2">
                {cert.title}
              </h1>

              <p className="text-sm text-gray-600">
                {cert.subtitle}
              </p>
            </div>

            {/* Recipient */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">This certifies that</p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 inline-block">
                {recipientName}
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                has successfully completed the RUDI {cert.title} program, demonstrating proficiency
                in responsible AI implementation, governance principles, and practical application
                of generative AI technologies in professional contexts.
              </p>
            </div>

            {/* Achievement Details */}
            <div className="grid grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Credential Level</p>
                <p className="text-sm font-semibold text-gray-900">{cert.level}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-6 h-6 text-navy-800 mx-auto mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Date Completed</p>
                <p className="text-sm font-semibold text-gray-900">{completionDate}</p>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-navy-800 mx-auto mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Credit Hours</p>
                <p className="text-sm font-semibold text-gray-900">{cert.hours}</p>
              </div>
            </div>

            {/* Competencies */}
            <div className="mb-8 max-w-2xl mx-auto">
              <p className="text-xs text-gray-500 uppercase tracking-wide text-center mb-3">Core Competencies Achieved</p>
              <div className="flex flex-wrap justify-center gap-2">
                {credentialType === 'foundation' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">AI Fundamentals</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Prompt Engineering</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Ethics & Safety</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Tool Proficiency</span>
                  </>
                )}
                {credentialType === 'practitioner' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Advanced Prompting</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Workflow Automation</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Performance Metrics</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Department Integration</span>
                  </>
                )}
                {credentialType === 'leader' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Strategic Planning</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Governance Framework</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Risk Management</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Change Leadership</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">ROI Measurement</span>
                  </>
                )}
              </div>
            </div>

            {/* Signature */}
            <div className="max-w-sm mx-auto mt-12">
              <div className="text-center">
                <div className="h-12 mb-2 flex items-end justify-center">
                  <div className="font-serif text-2xl text-gray-800" style={{ fontStyle: 'italic' }}>Brandon Z. Hoff</div>
                </div>
                <div className="border-t-2 border-gray-400 pt-2">
                  <p className="text-xs font-semibold text-gray-700">Brandon Z. Hoff</p>
                  <p className="text-xs text-gray-500">Global Director of Applied AI</p>
                  <p className="text-xs text-gray-400">Responsible Use of Digital Intelligence</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div>
                  Certificate ID: <span className="font-mono font-semibold">{certificateId}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Valid for 3 years from issue date</span>
                  <span>|</span>
                  <span>Verify at rudi.app/verify</span>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="absolute bottom-12 right-12">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-sm" />
                  ))}
                </div>
              </div>
              <p className="text-[8px] text-gray-500 text-center mt-1">Scan to Verify</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Actions */}
      <div className="mt-6 flex justify-center gap-4">
        <button className="btn-primary-sm">
          Download PDF
        </button>
        <button className="btn-secondary-sm">
          Share on LinkedIn
        </button>
        <button className="btn-secondary-sm">
          Print Certificate
        </button>
      </div>
    </div>
  );
}