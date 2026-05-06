import React from 'react';
import './Card.scss';

export const Card: React.FC = () => {
  const metrics = [
    { label: 'Completed jobs', value: '18' },
    { label: 'Response rate', value: '98%' },
    { label: 'Customer rating', value: '4.9/5' },
  ];

  const reminders = [
    '2 appointments today',
    '1 message from Spencer',
    'Review latest pet sitter request',
  ];

  return (
    <article className="dashboard-card">
      <header className="dashboard-card__header">
        <div>
          <p className="dashboard-card__eyebrow">Performance</p>
          <h2 className="dashboard-card__title">Today’s overview</h2>
        </div>
        <p className="dashboard-card__date">May 3</p>
      </header>

      <section className="dashboard-card__status">
        <span className="dashboard-card__status-label">Status</span>
        <strong className="dashboard-card__status-value">On track</strong>
      </section>

      <dl className="dashboard-card__metrics" aria-label="Key metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="dashboard-card__metric">
            <dt className="dashboard-card__metric-label">{metric.label}</dt>
            <dd className="dashboard-card__metric-value">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <section className="dashboard-card__footer">
        <p className="dashboard-card__footer-heading">Quick reminders</p>
        <ul className="dashboard-card__reminders">
          {reminders.map((reminder) => (
            <li key={reminder} className="dashboard-card__reminder">
              {reminder}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
