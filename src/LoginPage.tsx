import React from 'react';
import { FormPanel } from './components/FormPanel';

export const LoginPage: React.FC = () => {
  const handleSignIn = async (email: string, password: string, rememberMe: boolean) => {
    console.log('Sign in attempt:', { email, rememberMe });
    // TODO: Implement your authentication logic here
    // Example: call your API, handle success/error, redirect, etc.
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    // TODO: Implement navigation to sign up page
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <FormPanel onSignIn={handleSignIn} onSignUp={handleSignUp} />
    </div>
  );
};

export default LoginPage;