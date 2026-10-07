// Animated percentage bar for the Results dashboard interest profile
export default function InterestBar({ label, percentage, color = 'teal' }) {
  const colorMap = {
    teal: 'bg-teal-600',
    sky: 'bg-sky-500',
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  };

  const barColor = colorMap[color] || 'bg-teal-600';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700 capitalize">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
