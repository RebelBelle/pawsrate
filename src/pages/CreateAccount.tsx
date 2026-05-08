import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormPanel } from '../components/FormPanel';
import { HeroPanel } from '../components/HeroPanel';

export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = async (data: { email: string; password: string; confirmPassword?: string }) => {
    // TODO: Implement account creation logic here
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
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
          subtitleAction={handleNavigateToLogin}
        />
      </div>
    </div>
  );
};