import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function GradCapIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const steps = [
  {
    number: '01',
    title: 'Know your interests',
    description:
      'Six scenario-based questions reveal whether you lean analytical, creative, social, or technical — giving you honest self-knowledge, not just a category.',
    icon: '💡',
  },
  {
    number: '02',
    title: 'Add your academics',
    description:
      'Your marks, stream, certifications, and exam scores are added to your profile so every recommendation reflects where you actually stand today.',
    icon: '📘',
  },
  {
    number: '03',
    title: 'A personalised mindset check',
    description:
      'Six gentle questions — framed like a conversation, not a clinical test — uncover how you handle pressure, decisions, and change. Shown back to you as supportive insights, never raw scores.',
    icon: '🌱',
  },
];

const stats = [
  { value: '40,000+', label: 'Students guided' },
  { value: '120+', label: 'Career paths mapped' },
  { value: '94%', label: 'Report more clarity' },
];

const sampleScenario = {
  question: 'Your student club is launching a major campus initiative. Which role instinctively energizes you most?',
  options: [
    { text: 'Analyzing campus survey trends and projecting attendance figures', category: 'Analytical', badgeColor: 'bg-teal-100 text-teal-800' },
    { text: 'Crafting the visual identity, brand voice, and video trailers', category: 'Creative', badgeColor: 'bg-violet-100 text-violet-800' },
    { text: 'Managing team dynamics, conflict resolution, and speaker outreach', category: 'Social', badgeColor: 'bg-sky-100 text-sky-800' },
    { text: 'Developing the online registration portal and automation workflows', category: 'Technical', badgeColor: 'bg-amber-100 text-amber-800' },
  ],
};

const faqs = [
  {
    q: 'How is Learnovators different from typical psychometric tests?',
    a: 'Most online career tests use artificial trait questions that students try to "game" or guess. Learnovators uses contextual, scenario-based dilemmas, blends them with your actual academic marks and certifications, and adds a gentle, supportive mindset check. The result is a grounded 4-year roadmap rather than a generic personality score.',
  },
  {
    q: 'What is the "Mindset Check" and is it clinical?',
    a: 'Not at all clinical! We evaluate three gentle behavioral dimensions: Resilience (how you bounce back from setbacks), Confidence (how you trust your judgement), and Focus (how you direct attention). It is presented as constructive soft reflections (Growing, Steady, Strong) designed to nurture self-awareness, never to diagnose.',
  },
  {
    q: 'How does the Coin Reward System work?',
    a: 'Students earn coins by completing short weekly career focus quizzes (+10 coins) and supportive wellbeing micro-habits like breathing breaks and journaling (+5 coins each). Coins can be redeemed for tangible academic benefits including library date extensions, textbook discount vouchers, and alumni mentorship bookings.',
  },
  {
    q: 'Can students from high school or college both use this?',
    a: 'Yes. Whether you are in Grade 11–12 deciding on university streams or in your 2nd year of college searching for internship roadmaps, the curriculum pathways adapt dynamically to your educational standing.',
  },
  {
    q: 'Is it completely free to get started?',
    a: 'Yes, full onboarding, the interest assessment, the mindset report, career roadmaps, and the student portal with weekly challenges are completely free for students.',
  },
];

export default function Landing() {
  const [selectedSampleOption, setSelectedSampleOption] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block bg-teal-50 text-teal-800 text-xs font-semibold px-4 py-1.5 rounded-full border border-teal-200 mb-6 shadow-sm">
          Personalised career & education planning for students
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight max-w-3xl mx-auto">
          Career guidance built from your interests, your marks, and your mindset.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Learnovators combines a scenario-based interest assessment, your academic
          profile, and a gentle mindset check into one personalised plan — so the
          advice you receive is actually about <em>you</em>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/auth?tab=signup" className="btn-primary text-base px-8 py-3.5 shadow-md">
            Get started — it's free
          </Link>
          <Link to="/auth" className="btn-outline text-base px-8 py-3.5">
            Log in
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-14 pt-10 border-t border-slate-100 flex flex-wrap gap-8 justify-center">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive Sample Scenario Preview ─────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="card border-teal-200 bg-teal-50/30 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Interactive Preview • Try One Question
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
            {sampleScenario.question}
          </h2>

          <div className="space-y-2.5">
            {sampleScenario.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSampleOption(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${
                  selectedSampleOption === idx
                    ? 'border-teal-700 bg-white ring-2 ring-teal-600 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-slate-800 font-medium">{opt.text}</span>
                {selectedSampleOption === idx && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${opt.badgeColor}`}>
                    {opt.category} Profile
                  </span>
                )}
              </button>
            ))}
          </div>

          {selectedSampleOption !== null && (
            <div className="mt-5 p-4 bg-white rounded-xl border border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <p className="text-xs text-slate-600">
                You chose a <strong className="text-teal-800">{sampleScenario.options[selectedSampleOption].category}</strong> response. In the full assessment, 6 detailed scenarios map your multifaceted strengths.
              </p>
              <Link
                to="/auth?tab=signup"
                className="btn-primary text-xs py-2 px-4 whitespace-nowrap self-stretch sm:self-auto"
              >
                Start Full Assessment →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              How it works
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Three steps that take about 15 minutes — and produce a plan that
              stays relevant as you grow.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl mx-auto sm:mx-0">
                  {step.icon}
                </div>

                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    Step {step.number}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Testimonial ──────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <blockquote className="font-serif text-xl sm:text-2xl text-slate-700 italic leading-relaxed">
          "I always thought I'd do generic engineering just because everyone around me was.
          Learnovators helped me realise I'm drawn to design and logic — and now
          I'm studying UX and software with total confidence."
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-serif font-bold text-teal-800">
            P
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-800">Priya S.</p>
            <p className="text-xs text-slate-500">Design & Technology Student</p>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Everything you need to know about the methodology and student portal.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="card p-0 overflow-hidden border border-slate-200">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-slate-900 text-base hover:bg-slate-50/70 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl text-teal-700 font-sans leading-none flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Ready to find your direction?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Start in under a minute. No credit card, no jargon, no judgment.
          </p>
          <Link to="/auth?tab=signup" className="btn-primary text-base px-8 py-3.5 bg-teal-600 hover:bg-teal-500 shadow-lg">
            Begin your assessment
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GradCapIcon className="w-5 h-5 text-teal-700" />
            <span className="font-serif font-bold text-slate-800">Learnovators</span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Learnovators. Built with care for students everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
