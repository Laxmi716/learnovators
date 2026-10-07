import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Full-page loading spinner
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-teal-700 rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading your profile…</p>
      </div>
    </div>
  );
}

// Requires user to be authenticated
export function AuthRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  return children;
}

// Smart redirect based on user state
export function SmartRoute({ children, requireEnrolled = false }) {
  const { currentUser, userDoc, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  if (!userDoc) return <LoadingSpinner />;

  const { onboardingStep, enrolled } = userDoc;

  // Not done onboarding → onboarding flow
  if (onboardingStep < 3) return <Navigate to="/onboarding" replace />;

  // Trying to access portal without enrollment → results page
  if (requireEnrolled && !enrolled) return <Navigate to="/results" replace />;

  // Enrolled students have full access to both /results and /portal
  return children;
}

// Onboarding route — redirect away if already complete
export function OnboardingRoute({ children }) {
  const { currentUser, userDoc, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  if (!userDoc) return <LoadingSpinner />;

  if (userDoc.onboardingStep >= 3) {
    if (userDoc.enrolled) return <Navigate to="/portal" replace />;
    return <Navigate to="/results" replace />;
  }

  return children;
}

// Public route — redirect logged-in users based on state
export function PublicRoute({ children }) {
  const { currentUser, userDoc, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (currentUser && userDoc) {
    if (userDoc.onboardingStep < 3) return <Navigate to="/onboarding" replace />;
    if (userDoc.enrolled) return <Navigate to="/portal" replace />;
    return <Navigate to="/results" replace />;
  }

  return children;
}
