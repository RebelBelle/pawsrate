import React from 'react';

export const Card: React.FC = () => {
  return (
    <article className="card">
      <header className="card-header">Card header</header>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some supporting text.</p>
      </div>
    </article>
  );
};
