import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/20',
      secondary: 'bg-slate-900 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white border border-slate-800 dark:border-white/20',
      glass: 'glass-premium hover:bg-white/60 dark:hover:bg-zinc-800/60 text-slate-900 dark:text-white',
      outline: 'border border-slate-300 dark:border-zinc-700 hover:border-cyan-500 text-slate-600 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-cyan-400',
      ghost: 'hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-400',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        style={{ transition: 'transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease' }}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
