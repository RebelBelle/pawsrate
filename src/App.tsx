import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { CreateAccountPage } from './CreateAccountPage';
import { DashboardPage } from './DashboardPage';

export default function App() {
  const [page, setPage] = useState<'login' | 'signup' | 'dashboard'>('login');

  if (page === 'login') {
    return (
      <LoginPage
        onNavigateToSignup={() => setPage('signup')}
        onNavigateToDashboard={() => setPage('dashboard')}
      />
    );
  }

  if (page === 'signup') {
    return <CreateAccountPage onNavigateToLogin={() => setPage('login')} />;
  }

  return <DashboardPage onLogout={() => setPage('login')} />;
}