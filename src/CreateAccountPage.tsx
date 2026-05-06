import React from 'react';
import { FormPanel } from './components/FormPanel';
import { HeroPanel } from './components/HeroPanel';

interface CreateAccountPageProps {
  onNavigateToLogin: () => void;
}

export const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onNavigateToLogin }) => {
  const handleSignUp = async (data: { email: string; password: string; confirmPassword?: string }) => {
    // TODO: Implement account creation logic here
  };

  return (
    <div className="hero">
      <HeroPanel
        headline="Track every bowl. Love what works."
        text=""
      />
      <div className="hero-content">
        <FormPanel
          mode="signup"
          title="Create Account"
          subtitle="Already have an account? Sign in →"
          submitText="Create Account →"
          onSubmit={handleSignUp}
          subtitleAction={onNavigateToLogin}
        />
      </div>
    </div>
  );
}