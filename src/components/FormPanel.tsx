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
import { Button } from './Button';
import { FormField } from './FormField';
import { Checkbox } from './Checkbox';
import '../styles/FormPanel.scss';

interface FormPanelProps {
  mode?: 'login' | 'signup';
  title?: string;
  subtitle?: string;
  subtitleAction?: () => void;
  submitText?: string;
  onSubmit?: (data: { email: string; password: string; confirmPassword?: string; rememberMe?: boolean }) => void | Promise<void>;
  onToggleAuth?: () => void;
  showRememberMe?: boolean;
  showConfirmPassword?: boolean;
}

/**
 * FormPanel - Reusable auth form component supporting login and signup
 * All styles managed through CSS variables and SCSS classes
 */
export const FormPanel: React.FC<FormPanelProps> = ({
  mode = 'login',
  title = 'Welcome! Sign In.',
  subtitle = "Don't have an account? Create one free →",
  subtitleAction,
  submitText = 'Sign In →',
  onSubmit,
  onToggleAuth,
  showRememberMe = mode === 'login',
  showConfirmPassword = mode === 'signup',
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPasswordView, setShowConfirmPasswordView] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          email,
          password,
          confirmPassword: showConfirmPassword ? confirmPassword : undefined,
          rememberMe: showRememberMe ? rememberMe : undefined,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-panel">
      {/* Header */}
      <div className="form-panel__header">
        <h1 className="form-panel__title">{title}</h1>
        {subtitle && (
          <button
            className="form-panel__subtitle"
            onClick={subtitleAction || onToggleAuth}
            aria-label={subtitle}
            type="button"
          >
            {subtitle}
          </button>
        )}
      </div>

      {/* Form */}
      <form className="form-panel__form" onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
        />

        {/* Password Field */}
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
          isPasswordVisible={showPassword}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        {/* Confirm Password Field */}
        {showConfirmPassword && (
          <FormField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label="Confirm Password"
            isPasswordVisible={showConfirmPasswordView}
            showPasswordToggle={true}
            onTogglePassword={() => setShowConfirmPasswordView(!showConfirmPasswordView)}
          />
        )}

        {/* Remember Row (Login Only) */}
        {showRememberMe && (
          <div className="form-panel__remember-row">
            <div className="form-panel__remember-left">
              <Checkbox
                id="remember-me"
                label="Remember me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <button
              type="button"
              className="form-panel__forgot-button"
              onClick={() => {}}
              aria-label="Forgot password"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} loadingText={`${submitText.split(' ')[0]}ing...`}>
          {submitText}
        </Button>
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
