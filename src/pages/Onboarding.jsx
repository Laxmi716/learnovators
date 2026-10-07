import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProgressBar from '../components/ProgressBar';
import { interestQuestions, CATEGORIES } from '../data/interestQuestions';
import { mindsetQuestions, scoreMindset } from '../data/mindsetQuestions';

// ── Shared UI ─────────────────────────────────────────────────────────────────

function StepShell({ children, step }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200 py-5 px-6">
        <div className="max-w-lg mx-auto">
          <ProgressBar currentStep={step} totalSteps={3} />
        </div>
      </div>
      <div className="flex-1 flex items-start justify-center px-6 pt-12 pb-20">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </div>
  );
}

function OptionButton({ text, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 px-5 py-4 text-sm leading-relaxed transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
        selected
          ? 'border-teal-600 bg-teal-50 text-teal-900 font-medium shadow-sm'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span
        className={`inline-flex w-5 h-5 rounded-full border-2 mr-3 items-center justify-center flex-shrink-0 align-middle transition-colors ${
          selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {text}
    </button>
  );
}

// ── Step 1: Interest Assessment ───────────────────────────────────────────────

function InterestStep({ onComplete }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const q = interestQuestions[qIndex];

  function handleSelect(optionIdx) {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIdx;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (answers[qIndex] === null) return;
    if (qIndex < interestQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      // Score
      const scores = { analytical: 0, creative: 0, social: 0, technical: 0 };
      answers.forEach((optIdx, qi) => {
        const cat = interestQuestions[qi].options[optIdx]?.category;
        if (cat) scores[cat]++;
      });
      onComplete(answers, scores);
    }
  }

  function handleBack() {
    if (qIndex > 0) setQIndex(qIndex - 1);
  }

  const isLast = qIndex === interestQuestions.length - 1;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">
          Question {qIndex + 1} of {interestQuestions.length}
        </p>
        <h2 className="font-serif text-2xl font-semibold text-slate-900 leading-snug">
          {q.scenario}
        </h2>
      </div>

      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            text={opt.text}
            selected={answers[qIndex] === idx}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {qIndex > 0 && (
          <button onClick={handleBack} className="btn-ghost flex-shrink-0">
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={answers[qIndex] === null}
          className="btn-primary flex-1"
        >
          {isLast ? 'See my interest profile →' : 'Next question →'}
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Academic Profile ──────────────────────────────────────────────────

const STREAMS = ['Science', 'Commerce', 'Arts', 'Engineering', 'Other'];

function AcademicStep({ onComplete, onBack }) {
  const [marks, setMarks] = useState('');
  const [stream, setStream] = useState('');
  const [certifications, setCertifications] = useState('');
  const [examScore, setExamScore] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!marks.trim()) return setError('Please enter your current marks or percentage.');
    if (!stream) return setError('Please select your stream.');
    const marksNum = parseFloat(marks);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      return setError('Please enter a valid percentage between 0 and 100.');
    }
    onComplete({ marks: marks.trim(), stream, certifications: certifications.trim(), examScore: examScore.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-slate-900 mb-1">
          Your academic profile
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          This helps us give you relevant, grounded recommendations — not generic advice.
          Be as accurate as you can; there's no judgment here.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="label">
            Current marks / percentage{' '}
            <span className="text-slate-400 font-normal">(out of 100)</span>
          </label>
          <input
            type="number"
            className="input"
            placeholder="e.g. 78"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="label">Stream / field of study</label>
          <select
            className="input"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            required
          >
            <option value="">Select your stream</option>
            {STREAMS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            Certifications or courses completed{' '}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="e.g. Python for Beginners, Google Digital Marketing"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-1">Separate multiple with commas</p>
        </div>

        <div>
          <label className="label">
            Competitive exam score{' '}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="e.g. JEE Mains: 94 percentile, CAT: 82 percentile"
            value={examScore}
            onChange={(e) => setExamScore(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-ghost flex-shrink-0">
          ← Back
        </button>
        <button type="submit" className="btn-primary flex-1">
          Continue to mindset check →
        </button>
      </div>
    </form>
  );
}

// ── Step 3: Mindset Check ─────────────────────────────────────────────────────

function MindsetStep({ onComplete, onBack }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const q = mindsetQuestions[qIndex];

  function handleSelect(optionIdx) {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIdx;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (answers[qIndex] === null) return;
    if (qIndex < mindsetQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      const scores = scoreMindset(answers);
      onComplete(answers, scores);
    }
  }

  function handleBack() {
    if (qIndex > 0) setQIndex(qIndex - 1);
    else onBack();
  }

  const isLast = qIndex === mindsetQuestions.length - 1;

  return (
    <div className="space-y-8">
      {/* Warm intro on first question */}
      {qIndex === 0 && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
          <strong className="block mb-1">A gentle note before we begin.</strong>
          These questions are about how you typically feel and act — not how you think
          you should feel. There are no right answers, and nothing is scored in a way
          that labels you. This is just for you.
        </div>
      )}

      <div>
        <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">
          Question {qIndex + 1} of {mindsetQuestions.length}
        </p>
        <h2 className="font-serif text-2xl font-semibold text-slate-900 leading-snug">
          {q.question}
        </h2>
        {q.note && (
          <p className="mt-2 text-sm text-slate-400 italic">{q.note}</p>
        )}
      </div>

      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            text={opt.text}
            selected={answers[qIndex] === idx}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={handleBack} className="btn-ghost flex-shrink-0">
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={answers[qIndex] === null}
          className="btn-primary flex-1"
        >
          {isLast ? 'See my personalised results →' : 'Next question →'}
        </button>
      </div>
    </div>
  );
}

// ── Onboarding container ──────────────────────────────────────────────────────

export default function Onboarding() {
  const { userDoc, updateUserDoc } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Determine which step to show based on current onboardingStep
  const step = userDoc?.onboardingStep ?? 0;

  async function completeInterest(answers, scores) {
    setSaving(true);
    try {
      await updateUserDoc({
        interestAnswers: answers,
        interestScores: scores,
        onboardingStep: 1,
      });
    } finally {
      setSaving(false);
    }
  }

  async function completeAcademic(profile) {
    setSaving(true);
    try {
      await updateUserDoc({
        academicProfile: profile,
        onboardingStep: 2,
      });
    } finally {
      setSaving(false);
    }
  }

  async function completeMindset(answers, scores) {
    setSaving(true);
    try {
      await updateUserDoc({
        mindsetAnswers: answers,
        mindsetScores: scores,
        onboardingStep: 3,
      });
      navigate('/results');
    } finally {
      setSaving(false);
    }
  }

  if (saving) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-teal-700 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Saving your progress…</p>
        </div>
      </div>
    );
  }

  return (
    <StepShell step={step}>
      {step === 0 && (
        <InterestStep onComplete={completeInterest} />
      )}
      {step === 1 && (
        <AcademicStep
          onComplete={completeAcademic}
          onBack={async () => {
            await updateUserDoc({ onboardingStep: 0 });
          }}
        />
      )}
      {step === 2 && (
        <MindsetStep
          onComplete={completeMindset}
          onBack={async () => {
            await updateUserDoc({ onboardingStep: 1 });
          }}
        />
      )}
    </StepShell>
  );
}
