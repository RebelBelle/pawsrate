import React from 'react';

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
    <article className="card card-overview">
      <header className="card-header">
        <div>
          <p className="card-eyebrow">Performance</p>
          <h2 className="card-title">Today’s overview</h2>
        </div>
        <p className="card-date">May 3</p>
      </header>

      <section className="card-status">
        <span className="card-status-label">Status</span>
        <strong className="card-status-value">On track</strong>
      </section>

      <dl className="card-metrics" aria-label="Key metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="card-metric">
            <dt className="card-metric-label">{metric.label}</dt>
            <dd className="card-metric-value">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <section className="card-footer">
        <p className="card-footer-heading">Quick reminders</p>
        <ul className="card-reminders">
          {reminders.map((reminder) => (
            <li key={reminder} className="card-reminder">
              {reminder}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
