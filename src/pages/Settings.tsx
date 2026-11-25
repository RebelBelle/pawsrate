import React from 'react';
import { Link } from 'react-router-dom';

export const Settings: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Settings</h1>
      <p>Manage your account and your furry family</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};
