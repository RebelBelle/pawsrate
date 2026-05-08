import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to PawsRate</h1>
      <p>Track every bowl. Love what works.</p>
      <button onClick={() => navigate('/login')}>Get Started</button>
    </div>
  );
};