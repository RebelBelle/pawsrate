import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Settings</h1>
      <p>Manage your account and your furry family</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};