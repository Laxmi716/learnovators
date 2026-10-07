// Onboarding progress bar — shows current step out of total
export default function ProgressBar({ currentStep, totalSteps = 3 }) {
  const steps = [
    { label: 'Interests', icon: '💡' },
    { label: 'Academics', icon: '📘' },
    { label: 'Mindset', icon: '🌱' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step labels */}
      <div className="flex justify-between mb-3">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              idx < currentStep
                ? 'text-teal-700'
                : idx === currentStep
                ? 'text-slate-800'
                : 'text-slate-400'
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all ${
                idx < currentStep
                  ? 'bg-teal-700 border-teal-700 text-white'
                  : idx === currentStep
                  ? 'border-teal-700 bg-white'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {idx < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.icon
              )}
            </span>
            <span>{step.label}</span>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-700 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <p className="text-right text-xs text-slate-400 mt-1.5">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
}
