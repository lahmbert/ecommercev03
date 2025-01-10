import React from 'react';

const Button = ({
  label,
  onClick,
  color = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  // Set up class names based on the props
  const colorClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    default: 'bg-green-500 hover:bg-green-600 text-white',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'sm:px-6 sm:py-3 px-4 py-2 sm:text-base text-sm',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${className} transition duration-300 ease-in-out`}
    >
      {label}
    </button>
  );
};

export default Button;
