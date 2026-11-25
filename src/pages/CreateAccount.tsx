import React from 'react';
import { FormPanel } from '../components/FormPanel';
import { HeroPanel } from '../components/HeroPanel';

export const CreateAccountPage: React.FC = () => {
  const handleSignUp = async () => {
    // TODO: Implement account creation logic here
  };

  return (
    <div className="hero layout-two-column">
      <HeroPanel
        headline="We're glad you're here!"
        text="Brandy finally found a food she doesn't just tolerate — she loves it! PawsRate made it so easy to track what works."
      />
      <div className="hero-content">
        <FormPanel
          mode="signup"
          title="Welcome!"
          subtitle="Join & track your pet's food"
          submitText="Create Account"
          onSubmit={handleSignUp}
          helpText="Already have an account?"
          helpLinkText="Sign in now"
        />
      </div>
    </div>
  );
};
