import { ArrowRight } from 'lucide-react';
import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { FormField } from './FormField';
import { Checkbox } from './Checkbox';

interface FormPanelProps {
  mode?: 'login' | 'signup';
  title?: string;
  subtitle?: string;
  submitText?: string;
  helpText?: string;
  helpLinkText?: string;
  onSubmit?: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
    rememberMe?: boolean;
  }) => void | Promise<void>;
  showRememberMe?: boolean;
  showConfirmPassword?: boolean;
}

/**
 * FormPanel - Reusable auth form component supporting login and signup
 * All styles managed through CSS variables and SCSS classes
 */
export const FormPanel: React.FC<FormPanelProps> = ({
  mode = 'login',
  title = 'Welcome!',
  subtitle = "Sign in to your pup's food diary",
  submitText = 'Sign In',
  onSubmit,
  helpText = mode === 'login'
    ? "Don't have an account?"
    : 'Already have an account?',
  helpLinkText = mode === 'login' ? 'Create one free' : 'Sign in now',
  showRememberMe = mode === 'login',
  showConfirmPassword = mode === 'signup',
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPasswordView, setShowConfirmPasswordView] =
    useState<boolean>(false);
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
        <h1 className="text-gradient">{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
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
            onTogglePassword={() =>
              setShowConfirmPasswordView(!showConfirmPasswordView)
            }
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
              className="link-primary"
              onClick={() => {}}
              aria-label="Forgot password">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText={`${submitText.split(' ')[0]}ing...`}>
          {submitText}
          {mode === 'login' && (
            <ArrowRight className="icon" aria-hidden="true" />
          )}
        </Button>
      </form>

      <p className="form-panel__help-text">
        {helpText}{' '}
        <Link
          className="link-primary"
          to={mode === 'login' ? '/signup' : '/login'}>
          {helpLinkText}
        </Link>
      </p>
    </div>
  );
};

export default FormPanel;
