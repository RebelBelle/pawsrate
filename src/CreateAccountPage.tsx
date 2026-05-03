import React from 'react';
import { FormPanel } from './components/FormPanel';

interface CreateAccountPageProps {
  onNavigateToLogin: () => void;
}

export const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onNavigateToLogin }) => {
  const handleSignUp = async (data: { email: string; password: string; confirmPassword?: string }) => {
    console.log('Create account attempt:', data);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <FormPanel
        mode="signup"
        title="Create Account"
        subtitle="Already have an account? Sign in →"
        submitText="Create Account →"
        onSubmit={handleSignUp}
        subtitleAction={onNavigateToLogin}
      />
    </div>
  );
}