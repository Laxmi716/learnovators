import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InterestBar from '../components/InterestBar';
import CareerCard from '../components/CareerCard';
import CareerDetailModal from '../components/CareerDetailModal';
import { getCareerPaths, getTopCategory } from '../data/careerPaths';
import { toSoftLabel } from '../data/mindsetQuestions';

const CATEGORY_COLORS = {
  analytical: 'teal',
  creative: 'violet',
  social: 'sky',
  technical: 'amber',
};

const CATEGORY_LABELS = {
  analytical: 'Analytical',
  creative: 'Creative',
  social: 'Social',
  technical: 'Technical',
};

const MINDSET_DIMENSION_LABELS = {
  resilience: { label: 'Resilience', desc: 'How you handle setbacks and pressure' },
  confidence: { label: 'Confidence', desc: 'How you trust your own judgement' },
  focus: { label: 'Focus', desc: 'How you direct your energy and attention' },
};

const SOFT_LABEL_STYLES = {
  Growing: 'bg-sky-50 text-sky-700 border-sky-200',
  Steady: 'bg-amber-50 text-amber-700 border-amber-200',
  Strong: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function Results() {
  const { userDoc, updateUserDoc } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

  if (!userDoc) return null;

  const { interestScores, academicProfile, mindsetScores, enrolled } = userDoc;

  // Interest percentages (each score is out of 6 total questions)
  const totalAnswers = Object.values(interestScores || {}).reduce((a, b) => a + b, 0) || 6;
  const interestPercentages = Object.fromEntries(
    Object.entries(interestScores || {}).map(([k, v]) => [k, (v / totalAnswers) * 100])
  );

  const topCategory = interestScores ? getTopCategory(interestScores) : 'technical';
  const paths = getCareerPaths(topCategory);

  async function handleEnroll() {
    if (enrolled) {
      navigate('/portal');
      return;
    }
    setEnrolling(true);
    try {
      await updateUserDoc({ enrolled: true });
      navigate('/portal');
    } finally {
      setEnrolling(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to={enrolled ? '/portal' : '/'} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="font-serif font-semibold text-xl text-slate-900">Learnovators</span>
            </Link>

            {enrolled && (
              <nav className="hidden sm:flex items-center gap-2 text-xs font-semibold">
                <Link to="/portal" className="text-slate-600 hover:text-teal-700 px-2 py-1">
                  ← Back to Portal
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-teal-800 font-bold px-2 py-1 bg-teal-50 rounded-lg">
                  Career Blueprint
                </span>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Print button */}
            <button
              onClick={handlePrint}
              className="btn-ghost text-xs py-2 px-3 border border-slate-200 inline-flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="btn-primary text-xs sm:text-sm py-2 px-4 sm:px-5"
            >
              {enrolling ? 'Setting up…' : enrolled ? 'Go to Student Portal →' : 'Request enrollment →'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome banner */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2 block">
              Personalised Student Blueprint • Learnovators
            </span>
            <h1 className="font-serif text-3xl font-bold leading-snug mb-2">
              Career & Education Blueprint for {userDoc.name || 'Student'}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Synthesized from your 6 interest scenarios, academic benchmark ({academicProfile?.marks || '75'}% in {academicProfile?.stream || 'studies'}), and your gentle mindset check.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: Interest + Academic + Mindset */}
          <div className="lg:col-span-1 space-y-6">
            {/* Interest Profile Card */}
            <div className="card">
              <h2 className="font-serif text-lg font-semibold text-slate-900 mb-4">
                Your Interest Profile
              </h2>
              <div className="space-y-4">
                {Object.entries(interestPercentages)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, pct]) => (
                    <InterestBar
                      key={cat}
                      label={CATEGORY_LABELS[cat]}
                      percentage={pct}
                      color={CATEGORY_COLORS[cat]}
                    />
                  ))}
              </div>
              <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                Dominant orientation:{' '}
                <span className="text-teal-700 font-bold capitalize">{topCategory}</span>. Your career matches are weighted by this strength.
              </p>
            </div>

            {/* Academic Snapshot Card */}
            <div className="card">
              <h2 className="font-serif text-lg font-semibold text-slate-900 mb-4">
                Academic Snapshot
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Marks / %</dt>
                  <dd className="text-slate-900 font-bold">
                    {academicProfile?.marks || '—'}
                    {academicProfile?.marks && '%'}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Stream</dt>
                  <dd className="text-slate-900 font-semibold">{academicProfile?.stream || '—'}</dd>
                </div>
                {academicProfile?.certifications && (
                  <div className="py-1 border-b border-slate-100">
                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Certifications</dt>
                    <dd className="text-slate-700 text-xs font-medium">{academicProfile.certifications}</dd>
                  </div>
                )}
                {academicProfile?.examScore && (
                  <div className="py-1">
                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Exam Score</dt>
                    <dd className="text-slate-700 text-xs font-medium">{academicProfile.examScore}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Mindset Summary Card */}
            <div className="card">
              <h2 className="font-serif text-lg font-semibold text-slate-900 mb-1">
                Mindset Summary
              </h2>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Behavioral patterns identified under pressure and decision-making. Shown as non-numeric soft reflections.
              </p>
              <div className="space-y-3.5">
                {Object.entries(MINDSET_DIMENSION_LABELS).map(([dim, { label, desc }]) => {
                  const score = mindsetScores?.[dim] ?? 0;
                  const softLabel = toSoftLabel(score);
                  return (
                    <div key={dim} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{label}</p>
                        <p className="text-[11px] text-slate-400 leading-snug">{desc}</p>
                      </div>
                      <span
                        className={`flex-shrink-0 text-xs font-bold border px-3 py-1 rounded-full ${SOFT_LABEL_STYLES[softLabel]}`}
                      >
                        {softLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: Career paths */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                Recommended Paths for You
              </h2>
              <p className="text-sm text-slate-500">
                Tailored for your <span className="capitalize font-semibold text-slate-800">{topCategory}</span> cognitive style, your {academicProfile?.stream} background, and your mindset profile.
              </p>
            </div>

            {paths.map((path, idx) => (
              <CareerCard
                key={path.id}
                path={path}
                whyText={path.why(academicProfile || {})}
                isTop={idx === 0}
                onViewRoadmap={(id) => setSelectedRoadmapId(id)}
              />
            ))}

            {/* Enroll CTA */}
            {!enrolled && (
              <div className="card bg-teal-700 border-teal-700 text-white print:hidden">
                <h3 className="font-serif text-xl font-bold mb-2">
                  Take the Next Step: Enroll in the Student Portal
                </h3>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Unlock your full authenticated portal — weekly focus quizzes, interactive wellbeing exercises, an AI Career Counselor, and a live coin reward store.
                </p>
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="bg-white text-teal-800 font-bold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-md disabled:opacity-60"
                >
                  {enrolling ? 'Setting up your portal…' : 'Request enrollment & go to portal →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Career Detail Roadmap Modal */}
      <CareerDetailModal
        pathId={selectedRoadmapId}
        isOpen={Boolean(selectedRoadmapId)}
        onClose={() => setSelectedRoadmapId(null)}
      />
    </div>
  );
}
