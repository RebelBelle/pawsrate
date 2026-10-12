import React from 'react';
import { FormPanel } from '../components/FormPanel';
import { HeroPanel } from '../components/HeroPanel';

export const CreateAccountPage: React.FC = () => {
  const handleSignUp = async () => {
    // TODO: Implement account creation logic here
  };

  return (
    <div className="hero">
      <HeroPanel headline="Track every bowl. Love what works." text="" />
      <div className="hero-content">
        <FormPanel
          mode="signup"
          title="Welcome!"
          subtitle="Join & track your pup's food"
          submitText="Create Account"
          onSubmit={handleSignUp}
          helpText="Already have an account?"
          helpLinkText="Sign in now"
        />
      </div>
    </div>
  );
};
