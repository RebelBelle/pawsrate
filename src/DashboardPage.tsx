import React from 'react';
import { Card } from './components/Card';

interface DashboardPageProps {
  onLogout?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard__eyebrow">Dashboard</p>
          <h1 className="dashboard__title">Peso's Dash</h1>
        </div>
        {onLogout && (
          <button type="button" className="dashboard__logout" onClick={onLogout}>
            Log out
          </button>
        )}
      </header>

      <section className="dashboard-metrics">
        <div className="dashboard__main">
          <section className="dashboard__panel dashboard__panel--summary">
            <h2>Summary</h2>
          </section>

          <section className="dashboard__panel dashboard__panel--activity">
            <h2>Activity</h2>
          </section>
        </div>

        <aside className="dashboard__sidebar">
          <section className="dashboard__panel dashboard__panel--details">
            <h2>Details</h2>
          </section>

          <section className="dashboard__panel dashboard__panel--quick-actions">
            <h2>Quick actions</h2>
          </section>
        </aside>
      </section>
      <section className="dashboard-body">
        <Card />
      </section>
    </div>
  );
};
