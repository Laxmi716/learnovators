import { useState, useEffect } from 'react';

const PHASES = [
  { name: 'Inhale', instruction: 'Breathe in slowly through your nose...', duration: 4 },
  { name: 'Hold', instruction: 'Hold your breath gently...', duration: 4 },
  { name: 'Exhale', instruction: 'Release your breath smoothly...', duration: 4 },
  { name: 'Hold', instruction: 'Rest and pause in calm silence...', duration: 4 },
];

export default function BreathingModal({ isOpen, onClose, onComplete }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const targetCycles = 3; // 3 cycles = ~48 seconds

  useEffect(() => {
    if (!isOpen || isFinished) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Advance phase
          setPhaseIndex((currPhase) => {
            const nextPhase = (currPhase + 1) % PHASES.length;
            if (nextPhase === 0) {
              setCyclesCompleted((c) => {
                const nextC = c + 1;
                if (nextC >= targetCycles) {
                  setIsFinished(true);
                  if (onComplete) onComplete();
                }
                return nextC;
              });
            }
            return nextPhase;
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isFinished, onComplete]);

  if (!isOpen) return null;

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isFinished ? (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full mb-6">
              <span>Box Breathing Exercise</span>
              <span>•</span>
              <span>Cycle {Math.min(cyclesCompleted + 1, targetCycles)} of {targetCycles}</span>
            </div>

            {/* Animated breathing circle */}
            <div className="relative w-48 h-48 flex items-center justify-center my-6">
              <div
                className={`absolute inset-0 rounded-full bg-teal-100/60 transition-transform duration-1000 ease-in-out ${
                  currentPhase.name === 'Inhale'
                    ? 'scale-110'
                    : currentPhase.name === 'Exhale'
                    ? 'scale-75'
                    : 'scale-100'
                }`}
              />
              <div
                className={`w-36 h-36 rounded-full bg-teal-700 text-white flex flex-col items-center justify-center shadow-lg transition-all duration-1000 ${
                  currentPhase.name === 'Hold' ? 'ring-4 ring-teal-400' : ''
                }`}
              >
                <span className="font-serif text-xl font-bold">{currentPhase.name}</span>
                <span className="text-3xl font-mono font-bold mt-1">{secondsRemaining}s</span>
              </div>
            </div>

            <p className="text-slate-700 font-medium text-base mb-2">{currentPhase.instruction}</p>
            <p className="text-xs text-slate-400 max-w-xs">
              Take this moment away from academic stress. Slow breathing triggers your parasympathetic calming response.
            </p>
          </>
        ) : (
          <div className="py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
              ✓
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Feeling Refreshed?</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-xs mx-auto">
              You completed your box breathing break! Your nervous system is recalibrated and ready to focus.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold px-4 py-2.5 rounded-xl mb-6 inline-flex items-center gap-2">
              <span>+5 coins awarded to your balance!</span>
            </div>
            <div>
              <button onClick={onClose} className="btn-primary w-full">
                Back to Student Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
