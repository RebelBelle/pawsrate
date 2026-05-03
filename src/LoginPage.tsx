import React from 'react';
import { FormPanel } from './components/FormPanel';

interface LoginPageProps {
  onNavigateToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignup }) => {
  const handleSignIn = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    console.log('Sign in attempt:', data);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <FormPanel mode="login" onSubmit={handleSignIn} subtitleAction={onNavigateToSignup} />
    </div>
  );
};