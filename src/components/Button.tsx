import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  size?: 'sm' | 'lg';
}

const BUTTON_VARIANT_CLASSES = [
  'btn-primary',
  'btn-light',
  'btn-link',
  'btn-danger',
];
const BUTTON_SIZE_CLASSES = {
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = 'btn',
  disabled,
  isLoading = false,
  loadingText,
  size,
  type = 'button',
  ...props
}) => {
  const buttonClasses = new Set([
    'btn',
    ...className.split(/\s+/).filter(Boolean),
  ]);
  const hasVariant = BUTTON_VARIANT_CLASSES.some((variant) =>
    buttonClasses.has(variant),
  );

  if (!hasVariant) {
    buttonClasses.add('btn-primary');
  }

  if (size) {
    buttonClasses.add(BUTTON_SIZE_CLASSES[size]);
  }

  const buttonClassName = [...buttonClasses].join(' ');
  const content = isLoading ? (loadingText ?? children) : children;

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClassName}
      {...props}>
      {content}
    </button>
  );
};
