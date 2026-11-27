import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const flyerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Sign In', to: '/login' },
];

export const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="not-found py-5" aria-labelledby="not-found-title">
      <div className="row align-items-center justify-content-center g-5">
        <div className="col-lg-6">
          <h1 id="not-found-title" className="mb-3">
            We can't find that page
          </h1>
          <p className="lead mb-4">
            It may have moved, or the address has a typo.
          </p>
          <Link className="btn btn-primary" to="/">
            Take Me Home
          </Link>
        </div>
        <div className="col-sm-8 col-md-6 col-lg-5 order-first order-lg-last">
          <aside className="flyer text-center" aria-label="Lost page poster">
            <p className="flyer-title mb-0">Lost Page</p>
            <div className="flyer-photo my-3" aria-hidden="true">
              🐕‍🦺
            </div>
            <p className="flyer-text mb-1">
              Last seen at <strong className="text-break">{pathname}</strong>
            </p>
            <p className="flyer-text mb-0">Answers to “404”</p>
            <nav className="flyer-tabs" aria-label="Suggested pages">
              {flyerLinks.map((link) => (
                <Link key={link.to} className="flyer-tab" to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
};
