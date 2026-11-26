import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { CreateAccountPage } from './pages/CreateAccount';
import { DashboardPage } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

interface AppLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const HomeFooter: React.FC = () => (
  <footer className="text-center py-4 mt-auto">
    <div className="container">
      <p className="text-body-secondary mb-0">
        &copy; 2026 PawsRate. All rights reserved. Made with 🐾 for dog lovers.
      </p>
    </div>
  </footer>
);

const AppLayout: React.FC<AppLayoutProps> = ({ isAuthenticated, onLogout }) => {
  const { pathname } = useLocation();

  return (
    <>
      <SiteHeader isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      {pathname === '/' && <HomeFooter />}
    </>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              isAuthenticated={isAuthenticated}
              onLogout={() => setIsAuthenticated(false)}
            />
          }>
          <Route index element={<Home isAuthenticated={isAuthenticated} />} />
          <Route
            path="login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onSignIn={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <CreateAccountPage />
              )
            }
          />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
