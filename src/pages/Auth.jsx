import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function GradCapIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const EDUCATION_LEVELS = [
  'High School (Grade 9–10)',
  'Senior Secondary (Grade 11–12)',
  'Undergraduate (UG)',
  'Postgraduate (PG)',
  'Diploma / Polytechnic',
  'Other',
];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'signup' ? 'signup' : 'login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupEduLevel, setSignupEduLevel] = useState('');
  const [signupCollege, setSignupCollege] = useState('');

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [tab]);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // Navigation handled by PublicRoute once user doc loads
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    if (!signupName.trim()) return setError('Please enter your name.');
    if (!signupEduLevel) return setError('Please select your education level.');
    if (signupPassword.length < 8) return setError('Password must be at least 8 characters.');
    setLoading(true);
    try {
      await signup(signupEmail, signupPassword, signupName, signupEduLevel, signupCollege);
      navigate('/onboarding');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      // Will redirect via PublicRoute
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(friendlyError(err.code));
      }
    } finally {
      setLoading(false);
    }
  }

  function friendlyError(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email or password is incorrect. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Try logging in instead.';
      case 'auth/weak-password':
        return 'Please choose a stronger password (at least 8 characters).';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (dark) ──────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-900 flex-col justify-between p-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center">
            <GradCapIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-semibold text-xl text-white">Learnovators</span>
        </Link>

        {/* Pitch copy */}
        <div className="space-y-6">
          <h2 className="font-serif text-4xl font-semibold text-white leading-[1.2]">
            Your plan, built around who you actually are.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Most career advice tells everyone the same thing. Learnovators starts
            with your interests, your academic profile, and your mindset — and
            gives you guidance that fits.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mt-4">
            {[
              'Scenario-based interest assessment',
              'Academic profile personalisation',
              'Gentle, supportive mindset check',
              'Coin rewards for staying engaged',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-teal-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm italic">
            "The mindset check was nothing like I expected — it felt like talking
            to someone who actually cared."
          </p>
          <p className="text-slate-500 text-xs mt-2">— Arjun M., Engineering student</p>
        </div>
      </div>

      {/* ── Right panel (white) ────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
              <GradCapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-semibold text-xl text-slate-900">Learnovators</span>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  tab === t
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 rounded-lg py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors mb-6 disabled:opacity-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {/* ── Login form ─────────────────────────────────── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                {loading ? 'Logging in…' : 'Log in'}
              </button>
              <p className="text-center text-sm text-slate-500 mt-2">
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('signup')} className="text-teal-700 font-medium hover:underline">
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* ── Signup form ────────────────────────────────── */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="label">Full name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="At least 8 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
              <div>
                <label className="label">Education level</label>
                <select
                  className="input"
                  value={signupEduLevel}
                  onChange={(e) => setSignupEduLevel(e.target.value)}
                  required
                >
                  <option value="">Select your current level</option>
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  College / Institution{' '}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Where you study"
                  value={signupCollege}
                  onChange={(e) => setSignupCollege(e.target.value)}
                  autoComplete="organization"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                {loading ? 'Creating account…' : 'Create account'}
              </button>
              <p className="text-center text-sm text-slate-500 mt-2">
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} className="text-teal-700 font-medium hover:underline">
                  Log in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
