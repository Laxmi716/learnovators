import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import {
  PublicRoute,
  OnboardingRoute,
  SmartRoute,
} from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Results from './pages/Results';
import Portal from './pages/Portal';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* Onboarding — redirects away once complete */}
          <Route
            path="/onboarding"
            element={
              <OnboardingRoute>
                <Onboarding />
              </OnboardingRoute>
            }
          />

          {/* Results — onboarding complete but not enrolled */}
          <Route
            path="/results"
            element={
              <SmartRoute requireEnrolled={false}>
                <Results />
              </SmartRoute>
            }
          />

          {/* Portal — enrolled students only */}
          <Route
            path="/portal"
            element={
              <SmartRoute requireEnrolled={true}>
                <Portal />
              </SmartRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
