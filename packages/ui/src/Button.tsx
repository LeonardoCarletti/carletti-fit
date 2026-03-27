import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-8 py-4 font-bold rounded-xl text-lg transition-all flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] shadow-xl hover:scale-105 active:scale-95",
    secondary: "bg-surface-container-highest border border-outline-variant/30 text-white hover:bg-surface-bright",
    ghost: "bg-transparent border-2 border-outline text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
