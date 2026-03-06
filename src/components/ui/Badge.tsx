import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'cyan' | 'violet' | 'emerald' | 'glass';
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'cyan',
    className,
    ...props
}) => {
    const variants = {
        cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        glass: 'bg-white/5 text-zinc-300 border border-white/10 backdrop-blur-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium transition-colors cursor-default',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
