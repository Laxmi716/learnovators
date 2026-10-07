import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STREAMS = ['Science', 'Commerce', 'Arts', 'Engineering', 'Other'];

export default function ProfileModal({ isOpen, onClose, userDoc, onUpdateProfile, onRetakeAssessment }) {
  const navigate = useNavigate();
  const [marks, setMarks] = useState(userDoc?.academicProfile?.marks || '');
  const [stream, setStream] = useState(userDoc?.academicProfile?.stream || 'Science');
  const [certifications, setCertifications] = useState(userDoc?.academicProfile?.certifications || '');
  const [examScore, setExamScore] = useState(userDoc?.academicProfile?.examScore || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  async function handleSave(e) {
    e.preventDefault();
    if (onUpdateProfile) {
      await onUpdateProfile({
        'academicProfile.marks': marks,
        'academicProfile.stream': stream,
        'academicProfile.certifications': certifications,
        'academicProfile.examScore': examScore,
      });
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1200);
    }
  }

  function handleRetake() {
    if (window.confirm('Would you like to retake your interest & mindset assessment? Your existing results will be updated.')) {
      onRetakeAssessment();
      onClose();
      navigate('/onboarding');
    }
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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-bold text-lg">
            ⚙️
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Student Profile & Settings</h3>
            <p className="text-xs text-slate-500">{userDoc?.name} • {userDoc?.email}</p>
          </div>
        </div>

        {isSaved ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-2">
              ✓
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">Profile Updated!</h4>
            <p className="text-xs text-slate-500">Your career recommendations will reflect your changes.</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 text-sm">
            <div>
              <label className="label">Current Marks / Percentage (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Field / Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="input"
                required
              >
                {STREAMS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Certifications / Completed Courses</label>
              <input
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                placeholder="e.g. Python, Digital Marketing"
                className="input"
              />
            </div>

            <div>
              <label className="label">Competitive Exam Score (optional)</label>
              <input
                type="text"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                placeholder="e.g. JEE 92 percentile, CAT 85"
                className="input"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button type="button" onClick={onClose} className="btn-ghost flex-1">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Retake section */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-xs">Want to reassess your mindset or interests?</p>
            <p className="text-[11px] text-slate-400">Recalibrate your recommendations with a fresh test.</p>
          </div>
          <button
            type="button"
            onClick={handleRetake}
            className="text-xs text-teal-700 hover:text-teal-900 font-semibold border border-teal-200 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
