import React from 'react';
import { FormPanel } from './components/FormPanel';
import { HeroPanel } from './components/HeroPanel';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onNavigateToDashboard: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignup, onNavigateToDashboard }) => {
  const handleSignIn = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    // TODO: Implement your authentication logic here
    onNavigateToDashboard();
  };

  return (
    <div className="hero">
      <HeroPanel
        headline="We're glad you're here!"
        text="Brandy finally found a food she doesn't just tolerate — she loves it! PawsRate made it so easy to track what works."
      />
      <div className="hero-content">
        <FormPanel mode="login" onSubmit={handleSignIn} subtitleAction={onNavigateToSignup} />
      </div>
    </div>
  );
};