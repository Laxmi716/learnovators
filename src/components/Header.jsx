import { Link } from 'react-router-dom';

function GradCapIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
            <GradCapIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-semibold text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
            Learnovators
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3">
          <Link to="/auth" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link to="/auth?tab=signup" className="btn-primary text-sm py-2 px-5">
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
