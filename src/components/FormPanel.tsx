/**
 * FormPanel.scss-version.tsx
 * FormPanel component using SCSS classes instead of inline styles
 * Much cleaner JSX markup, all styling in FormPanel.scss
 * 
 * Setup:
 * 1. Import the SCSS file: import './FormPanel.scss'
 * 2. Make sure Vite is configured for SCSS (see vite.config.ts)
 * 3. Use this component the same way as FormPanel.tsx
 */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import '../../styles/FormPanel.scss';

interface FormPanelProps {
  onSignIn?: (email: string, password: string, rememberMe: boolean) => void;
  onSignUp?: () => void;
}

/**
 * FormPanel - Sign-in form component with custom SCSS styling
 * All styles managed through CSS variables and SCSS classes
 * Zero inline styles - clean, maintainable JSX
 */
export const FormPanel: React.FC<FormPanelProps> = ({ onSignIn, onSignUp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSignIn) {
        await onSignIn(email, password, rememberMe);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp();
    }
  };

  return (
    <div className="form-panel">
      {/* Header */}
      <div className="form-panel__header">
        <h1 className="form-panel__title">Welcome! Sign In.</h1>
        <button
          className="form-panel__subtitle"
          onClick={handleSignUpClick}
          aria-label="Create an account"
        >
          Don't have an account? Create one free →
        </button>
      </div>

      {/* Form */}
      <form className="form-panel__form" onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="form-panel__field">
          <label htmlFor="email" className="form-panel__label">
            Email address
          </label>
          <div className="form-panel__input-wrapper">
            <Mail size={18} strokeWidth={2} />
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={handleEmailChange}
              required
              aria-label="Email address"
              className="form-panel__input"
            />
          </div>
        </div>

        {/* Password Wrap */}
        <div className="form-panel__password-wrap">
          <div className="form-panel__field">
            <label htmlFor="password" className="form-panel__label">
              Password
            </label>
            <div className="form-panel__input-wrapper">
              <Lock size={18} strokeWidth={2} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
                aria-label="Password"
                className="form-panel__input"
              />
            </div>
          </div>

          {/* Password Visibility Toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="form-panel__toggle-button"
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={2} />
            ) : (
              <Eye size={16} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Remember Row */}
        <div className="form-panel__remember-row">
          <div className="form-panel__remember-left">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="form-panel__checkbox"
              aria-label="Remember me"
              aria-pressed={rememberMe}
            >
              {rememberMe && <Check size={12} color="white" strokeWidth={3} />}
            </button>
            <label className="form-panel__remember-label" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="form-panel__forgot-button"
            onClick={() => console.log('Navigate to forgot password')}
            aria-label="Forgot password"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="form-panel__submit-button"
          disabled={isSubmitting || !email || !password}
          aria-label="Sign in to your account"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In →'}
        </button>
      </form>

      {/* Paw Divider */}
      <div className="form-panel__paw-divider">
        <PawIcon className="form-panel__paw-icon" />
        <span className="form-panel__tagline">Trusted by 2,400+ dog parents worldwide</span>
        <PawIcon className="form-panel__paw-icon" />
      </div>
    </div>
  );
};

/**
 * Decorative Paw Icon Component
 */
const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Top pad */}
    <circle cx="7" cy="2" r="1.5" fill="currentColor" />
    {/* Left pads */}
    <circle cx="3" cy="6" r="1.5" fill="currentColor" />
    {/* Right pads */}
    <circle cx="11" cy="6" r="1.5" fill="currentColor" />
    {/* Bottom pad */}
    <circle cx="7" cy="10" r="2" fill="currentColor" />
  </svg>
);

export default FormPanel;
