import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface SiteHeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  isAuthenticated,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand bg-white"
        aria-label="Main navigation">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            aria-label="PawsRate Home">
            PawsRate
          </Link>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm me-2" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm me-2" to="/settings">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Button
                    className="btn-light"
                    size="sm"
                    onClick={handleLogout}>
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm me-2" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm" to="/signup">
                    Create Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
