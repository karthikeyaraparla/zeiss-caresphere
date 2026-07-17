import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/shared/AppLayout';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { PageTransition } from '@/components/shared/PageTransition';

// Landing pages
import HomePage from '@/pages/landing/HomePage';
import FeaturesPage from '@/pages/landing/FeaturesPage';
import SolutionsPage from '@/pages/landing/SolutionsPage';
import TechnologyPage from '@/pages/landing/TechnologyPage';
import CustomersLandingPage from '@/pages/landing/CustomersLandingPage';
import AboutPage from '@/pages/landing/AboutPage';
import ContactPage from '@/pages/landing/ContactPage';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';

// App pages - lazy loaded for code splitting
const DashboardPage = lazy(() => import('@/pages/app/DashboardPage'));
const CustomersPage = lazy(() => import('@/pages/app/CustomersPage'));
const AssetsPage = lazy(() => import('@/pages/app/AssetsPage'));
const AIAnalysisPage = lazy(() => import('@/pages/app/AIAnalysisPage'));
const TicketsPage = lazy(() => import('@/pages/app/TicketsPage'));
const ReportsPage = lazy(() => import('@/pages/app/ReportsPage'));
const NotificationsPage = lazy(() => import('@/pages/app/NotificationsPage'));
const KnowledgePage = lazy(() => import('@/pages/app/KnowledgePage'));
const SettingsPage = lazy(() => import('@/pages/app/SettingsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/customers-page" element={<CustomersLandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* App */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
          <Route path="customers" element={<Suspense fallback={<PageLoader />}><CustomersPage /></Suspense>} />
          <Route path="assets" element={<Suspense fallback={<PageLoader />}><AssetsPage /></Suspense>} />
          <Route path="ai-analysis" element={<Suspense fallback={<PageLoader />}><AIAnalysisPage /></Suspense>} />
          <Route path="tickets" element={<Suspense fallback={<PageLoader />}><TicketsPage /></Suspense>} />
          <Route path="reports" element={<Suspense fallback={<PageLoader />}><ReportsPage /></Suspense>} />
          <Route path="notifications" element={<Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense>} />
          <Route path="knowledge" element={<Suspense fallback={<PageLoader />}><KnowledgePage /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <CustomCursor />
          <AnimatedBackground />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
