import { careerRoadmaps } from '../data/careerRoadmaps';

export default function CareerDetailModal({ pathId, isOpen, onClose }) {
  if (!isOpen || !pathId) return null;

  const roadmap = careerRoadmaps[pathId];
  if (!roadmap) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              Career Roadmap & Syllabus
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              {roadmap.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{roadmap.overview}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                Typical Starting Compensation
              </span>
              <p className="text-slate-900 font-bold text-base">{roadmap.salaryOutlook}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Target Entry-Level Roles
              </span>
              <p className="text-slate-800 font-medium text-xs leading-relaxed">
                {roadmap.entryRoles.join(' • ')}
              </p>
            </div>
          </div>

          {/* Key Tools & Stack */}
          <div>
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Key Tools & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {roadmap.keyTools.map((tool, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Industry Certifications */}
          <div>
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Recommended Certifications
            </h3>
            <ul className="space-y-2">
              {roadmap.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="text-teal-700 font-bold">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4-Year Progression Timeline */}
          <div>
            <h3 className="font-serif text-base font-bold text-slate-900 mb-3">
              Recommended 4-Year Milestone Plan
            </h3>
            <div className="space-y-4">
              {roadmap.timeline.map((step, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-teal-600 pb-2">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-700 border-2 border-white" />
                  <h4 className="font-serif font-bold text-slate-900 text-sm">{step.year}</h4>
                  <p className="text-xs text-teal-800 font-medium italic mt-0.5">{step.focus}</p>
                  <ul className="mt-2 space-y-1.5">
                    {step.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="btn-primary py-2 px-6 text-sm">
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
