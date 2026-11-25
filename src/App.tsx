import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
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

const AppLayout: React.FC<AppLayoutProps> = ({ isAuthenticated, onLogout }) => (
  <>
    <SiteHeader isAuthenticated={isAuthenticated} onLogout={onLogout} />
    <Outlet />
  </>
);

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
