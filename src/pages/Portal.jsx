import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PortalHeader from '../components/PortalHeader';
import BreathingModal from '../components/BreathingModal';
import JournalModal from '../components/JournalModal';
import PerksWallet from '../components/PerksWallet';
import AIAdvisorChat from '../components/AIAdvisorChat';
import { weeklyQuiz, wellbeingTasks, storeItems } from '../data/portalData';

// ── Coin toast notification ───────────────────────────────────────────────────

function CoinToast({ amount, onDone }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-5 py-3.5 rounded-xl shadow-xl animate-bounce"
      onAnimationEnd={onDone}
    >
      <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-semibold">+{amount} coins earned!</span>
    </div>
  );
}

// ── Weekly Quiz section ───────────────────────────────────────────────────────

function QuizSection({ completed, onComplete }) {
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(weeklyQuiz.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (completed) {
    return (
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-slate-900">Quiz complete for this week</h3>
            <p className="text-sm text-slate-500 mt-1">
              You've already earned your +{weeklyQuiz.coinReward} coins. Check back next week for a fresh quiz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="card">
        <div className="text-center py-4">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="font-serif text-xl font-semibold text-slate-900 mb-1">
            Quiz done! You scored {score}/{weeklyQuiz.questions.length}
          </h3>
          <p className="text-sm text-slate-500">
            +{weeklyQuiz.coinReward} coins have been added to your balance.
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="card">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-serif text-lg font-semibold text-slate-900">{weeklyQuiz.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{weeklyQuiz.subtitle}</p>
          </div>
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-200 flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            +{weeklyQuiz.coinReward} coins
          </span>
        </div>
        <button onClick={() => setStarted(true)} className="btn-primary mt-5 w-full sm:w-auto">
          Start quiz →
        </button>
      </div>
    );
  }

  const q = weeklyQuiz.questions[qIndex];
  const isLast = qIndex === weeklyQuiz.questions.length - 1;

  function handleSelect(idx) {
    const newAnswers = [...answers];
    newAnswers[qIndex] = idx;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (answers[qIndex] === null) return;
    if (!isLast) {
      setQIndex(qIndex + 1);
    } else {
      let correct = 0;
      weeklyQuiz.questions.forEach((qu, i) => {
        if (answers[i] === qu.answer) correct++;
      });
      setScore(correct);
      setSubmitted(true);
      onComplete();
    }
  }

  return (
    <div className="card space-y-6">
      <div>
        <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">
          Question {qIndex + 1} of {weeklyQuiz.questions.length}
        </p>
        <h3 className="font-serif text-lg font-semibold text-slate-900 leading-snug">
          {q.question}
        </h3>
      </div>

      <div className="space-y-2.5">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all ${
              answers[qIndex] === idx
                ? 'border-teal-600 bg-teal-50 text-teal-900 font-medium'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={answers[qIndex] === null}
        className="btn-primary w-full"
      >
        {isLast ? 'Submit quiz →' : 'Next question →'}
      </button>
    </div>
  );
}

// ── Wellbeing Tasks section ───────────────────────────────────────────────────

function WellbeingSection({ completedTasks, onTriggerAction, onDirectComplete }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-lg font-semibold text-slate-900">
          Small tasks for your wellbeing
        </h3>
        <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
          Mindset Calibrations
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-5">
        Gentle nudges designed for student balance. Complete activities to earn coins.
      </p>
      <div className="space-y-3">
        {wellbeingTasks.map((task) => {
          const done = completedTasks?.[task.id] === true;
          return (
            <div
              key={task.id}
              className={`flex items-start gap-4 rounded-xl border-2 px-4 py-4 transition-all ${
                done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => {
                  if (done) return;
                  if (task.id === 'task1' || task.id === 'task2') {
                    onTriggerAction(task.id);
                  } else {
                    onDirectComplete(task.id, task.coinReward);
                  }
                }}
                disabled={done}
                className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                  done
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-slate-300 hover:border-teal-500 hover:bg-teal-50'
                }`}
                aria-label={done ? 'Task completed' : `Complete: ${task.title}`}
              >
                {done && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{task.icon}</span>
                    <p className={`text-sm font-semibold ${done ? 'text-emerald-800 line-through opacity-70' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    +{task.coinReward} coins
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {task.description}
                </p>

                {!done && (
                  <div className="mt-2.5">
                    {task.id === 'task1' && (
                      <button
                        onClick={() => onTriggerAction('task1')}
                        className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Start 1-Min Box Breathing Visualizer →
                      </button>
                    )}
                    {task.id === 'task2' && (
                      <button
                        onClick={() => onTriggerAction('task2')}
                        className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Open Reflection Journal →
                      </button>
                    )}
                    {task.id === 'task3' && (
                      <button
                        onClick={() => onDirectComplete('task3', task.coinReward)}
                        className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Mark 10-Min Break Complete ✓
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Coin Store section ────────────────────────────────────────────────────────

function StoreSection({ coins, redemptions, onRedeem }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-slate-900">Coin store</h3>
          <p className="text-sm text-slate-500 mt-0.5">Redeem your coins for real academic perks.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-semibold text-sm px-3 py-1.5 rounded-full border border-emerald-200">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {coins} coins available
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {storeItems.map((item) => {
          const redeemed = redemptions?.[item.redemptionKey] === true;
          const canAfford = coins >= item.cost;

          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 p-4 flex flex-col justify-between gap-3 ${
                redeemed
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-semibold text-slate-900 text-sm leading-snug">{item.title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-100">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  redeemed
                    ? 'bg-emerald-100 text-emerald-700'
                    : canAfford
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {redeemed ? 'Redeemed ✓' : `${item.cost} coins`}
                </span>
                <button
                  onClick={() => !redeemed && canAfford && onRedeem(item)}
                  disabled={redeemed || !canAfford}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    redeemed
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : canAfford
                      ? 'bg-teal-700 text-white hover:bg-teal-800'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {redeemed ? 'In Wallet' : !canAfford ? 'Need coins' : item.ctaLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Portal page ───────────────────────────────────────────────────────────────

export default function Portal() {
  const { userDoc, updateUserDoc } = useAuth();
  const [toast, setToast] = useState(null); // { amount }
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  if (!userDoc) return null;

  const { coins, weeklyQuizCompleted, wellbeingTasks: tasks, redemptions, journalEntries = [] } = userDoc;

  function showToast(amount) {
    setToast({ amount });
    setTimeout(() => setToast(null), 2500);
  }

  async function handleQuizComplete() {
    await updateUserDoc({
      weeklyQuizCompleted: true,
      coins: (coins || 0) + weeklyQuiz.coinReward,
    });
    showToast(weeklyQuiz.coinReward);
  }

  async function handleTaskComplete(taskId, reward) {
    await updateUserDoc({
      [`wellbeingTasks.${taskId}`]: true,
      coins: (coins || 0) + reward,
    });
    showToast(reward);
  }

  async function handleSaveJournal(entryText) {
    const newEntry = {
      text: entryText,
      date: new Date().toISOString(),
    };
    const updatedEntries = [newEntry, ...journalEntries];
    await updateUserDoc({
      journalEntries: updatedEntries,
      'wellbeingTasks.task2': true,
      coins: (coins || 0) + 5,
    });
    showToast(5);
  }

  async function handleRedeem(item) {
    if ((coins || 0) < item.cost) return;
    await updateUserDoc({
      [`redemptions.${item.redemptionKey}`]: true,
      coins: (coins || 0) - item.cost,
    });
  }

  const name = userDoc?.name || 'Student';
  const firstName = name.split(' ')[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <PortalHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Welcome message & Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <span className="text-teal-700 text-xs font-bold uppercase tracking-wider block mb-1">
              Active Student Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Welcome back, {firstName}.
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Keep momentum high with your weekly challenges, AI career advising, and wellbeing tasks.
            </p>
          </div>
          <Link
            to="/results"
            className="btn-outline text-xs sm:text-sm py-2 px-4 whitespace-nowrap self-start sm:self-auto"
          >
            View Career Blueprint →
          </Link>
        </div>

        {/* Coin summary bar */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-emerald-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Balance</p>
            <p className="font-serif text-3xl font-bold text-emerald-700">{coins || 0} coins</p>
          </div>
          <p className="text-xs text-slate-500 max-w-[200px] text-right hidden sm:block leading-relaxed">
            Earn coins by completing quizzes and reflections. Redeem in the store below.
          </p>
        </div>

        {/* AI Career Advisor Chatbot */}
        <AIAdvisorChat userDoc={userDoc} />

        {/* Quiz */}
        <QuizSection
          completed={weeklyQuizCompleted}
          onComplete={handleQuizComplete}
        />

        {/* Wellbeing tasks */}
        <WellbeingSection
          completedTasks={tasks}
          onTriggerAction={(actionId) => {
            if (actionId === 'task1') setIsBreathingOpen(true);
            if (actionId === 'task2') setIsJournalOpen(true);
          }}
          onDirectComplete={handleTaskComplete}
        />

        {/* Coin store */}
        <StoreSection
          coins={coins || 0}
          redemptions={redemptions}
          onRedeem={handleRedeem}
        />

        {/* Perks Wallet (Active redeemed vouchers) */}
        <PerksWallet redemptions={redemptions} />
      </main>

      {/* Interactive Wellbeing Modals */}
      <BreathingModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
        onComplete={() => handleTaskComplete('task1', 5)}
      />

      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        pastEntries={journalEntries}
        onSaveEntry={handleSaveJournal}
      />

      {/* Coin toast notification */}
      {toast && <CoinToast amount={toast.amount} onDone={() => setToast(null)} />}
    </div>
  );
}
