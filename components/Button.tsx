import React from 'react';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'function' | 'accent' | 'danger';
  className?: string;
  disabled?: boolean;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'default', 
  className = '',
  disabled = false,
  title
}) => {
  
  const baseStyles = "relative overflow-hidden rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center select-none disabled:opacity-50 disabled:active:scale-100";
  
  const variants = {
    default: "bg-calculator-surface text-calculator-text hover:bg-[#313244] hover:text-white shadow-sm border border-white/5",
    operator: "bg-calculator-surface text-calculator-operator hover:bg-[#313244] hover:text-pink-300 shadow-sm border border-white/5 font-bold text-2xl",
    function: "bg-calculator-surface text-calculator-function hover:bg-[#313244] hover:text-violet-300 text-sm md:text-base font-semibold border border-white/5",
    accent: "bg-calculator-accent text-calculator-bg hover:brightness-110 font-bold shadow-md shadow-calculator-accent/20",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      title={title}
    >
      {label}
    </button>
  );
};

export default Button;