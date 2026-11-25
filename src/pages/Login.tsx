import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormPanel } from '../components/FormPanel';
import { HeroPanel } from '../components/HeroPanel';

interface LoginPageProps {
  onSignIn: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSignIn }) => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // TODO: Implement your authentication logic here
    onSignIn();
    navigate('/dashboard');
  };

  return (
    <div className="hero layout-two-column">
      <HeroPanel
        headline="We're glad you're here!"
        text="Brandy finally found a food she doesn't just tolerate — she loves it! PawsRate made it so easy to track what works."
      />
      <div className="hero-content">
        <FormPanel mode="login" onSubmit={handleSignIn} />
      </div>
    </div>
  );
};
