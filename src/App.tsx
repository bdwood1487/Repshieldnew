import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ContractorDashboard from './pages/ContractorDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import { FTCCompliancePage, GoogleCompliancePage, ReputationManagementPage } from './pages/SEOPages';
import AuditSandbox from './pages/AuditSandbox';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ContractorDashboard />} />
            <Route path="/feedback/:contractorId" element={<CustomerDashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/audit-sandbox" element={<AuditSandbox />} />
            <Route path="/legal/ftc-compliance" element={<FTCCompliancePage />} />
            <Route path="/legal/google-compliance" element={<GoogleCompliancePage />} />
            <Route path="/legal/reputation-management" element={<ReputationManagementPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
