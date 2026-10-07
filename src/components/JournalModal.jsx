import { useState } from 'react';

export default function JournalModal({ isOpen, onClose, pastEntries = [], onSaveEntry }) {
  const [entryText, setEntryText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!entryText.trim()) return;

    if (onSaveEntry) {
      onSaveEntry(entryText.trim());
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setEntryText('');
      onClose();
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-xl">
            📓
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">One-Sentence Daily Reflection</h3>
            <p className="text-xs text-slate-500">Notice one small win or insight from today.</p>
          </div>
        </div>

        {isSaved ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-3">
              ✓
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">Reflection Saved!</h4>
            <p className="text-sm text-emerald-700 font-semibold mt-1">+5 coins added to your balance</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                What went well today, or what did you learn about yourself?
              </label>
              <textarea
                rows="3"
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="e.g. I finally understood recursion in class, or I took an honest 20-minute break without feeling guilty."
                className="input resize-none w-full"
                maxLength="240"
                required
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-slate-400">Keep it short & honest</span>
                <span className="text-xs text-slate-400">{entryText.length}/240</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-ghost flex-1">
                Cancel
              </button>
              <button type="submit" disabled={!entryText.trim()} className="btn-primary flex-1">
                Save & Earn +5 Coins
              </button>
            </div>
          </form>
        )}

        {/* Past entries if any */}
        {pastEntries.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Previous Reflections</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {pastEntries.slice(0, 4).map((entry, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs text-slate-700">
                  <span className="text-slate-400 font-mono text-[10px] block mb-1">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  "{entry.text}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
