import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage.tsx';
import DashboardPage from '../features/dashboard/pages/DashboardPage.tsx';
import ProfilePage from '../features/profile/pages/ProfilePage.tsx';
import TransactionPage from '../features/transactions/pages/TransactionPage.tsx';
import AccountPage from '../features/accounts/pages/AccountPage.tsx';
import SignUpPage from '../features/auth/pages/SignUpPage.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import DashboardLayout from '../layouts/DashboardLayout.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../shared/components/ErrorFallback.tsx';
import TransactionDetailsPage from '../features/transactions/pages/TransactionDetailsPage.tsx';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage.tsx';
import RoleProtectedRoutes from './RoleProtectedRoutes.tsx';
import AccessDeniedPage from '../shared/components/AccessDeniedPage.tsx';
import AuditPage from '../features/audit/pages/AuditPage.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/access-denied" element={<AccessDeniedPage />} />
         <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/transactions" element={<ErrorBoundary FallbackComponent={ErrorFallback}><TransactionPage /></ErrorBoundary>} />
      <Route path="/transactions/:id" element={<ErrorBoundary FallbackComponent={ErrorFallback}><TransactionDetailsPage /></ErrorBoundary>} />
      <Route path="/analytics/" element={
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RoleProtectedRoutes allowedRoles={["admin"]}>
        <AnalyticsPage />
        </RoleProtectedRoutes>
        </ErrorBoundary>} />
              <Route path="/audit" element={<ErrorBoundary FallbackComponent={ErrorFallback}><AuditPage /></ErrorBoundary>} />

        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;