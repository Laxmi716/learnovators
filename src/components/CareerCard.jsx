// Career recommendation card on the Results dashboard
export default function CareerCard({ path, whyText, isTop, onViewRoadmap }) {
  return (
    <div
      className={`card relative flex flex-col justify-between gap-3 ${
        isTop ? 'border-teal-300 ring-1 ring-teal-200' : ''
      }`}
    >
      <div>
        {isTop && (
          <span className="absolute -top-3 left-4 bg-teal-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
            Best match for your profile
          </span>
        )}

        <div className="flex items-start gap-3 mt-1">
          <span className="text-3xl leading-none mt-0.5">{path.icon}</span>
          <div>
            <h3 className="font-serif font-semibold text-slate-900 text-lg leading-snug">
              {path.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {path.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mt-3">{path.description}</p>

        {whyText && (
          <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-3 mt-3">
            <p className="text-[11px] font-bold text-teal-800 uppercase tracking-wider mb-1">
              Why this fits you
            </p>
            <p className="text-sm text-teal-900 leading-relaxed">{whyText}</p>
          </div>
        )}
      </div>

      {onViewRoadmap && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onViewRoadmap(path.id)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 hover:underline"
          >
            <span>Explore 4-Year Roadmap & Syllabus</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
