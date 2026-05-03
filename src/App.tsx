import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { CreateAccountPage } from './CreateAccountPage';

export default function App() {
  const [page, setPage] = useState<'login' | 'signup'>('login');

  return page === 'login'
    ? <LoginPage onNavigateToSignup={() => setPage('signup')} />
    : <CreateAccountPage onNavigateToLogin={() => setPage('login')} />;
}