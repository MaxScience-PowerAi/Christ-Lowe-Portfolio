import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient';
    hover?: boolean;
}

export const Card = ({ children, className, variant = 'default', hover = true }: CardProps) => {
    const variants = {
        default: 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800',
        glass: 'glass-premium',
        gradient: 'bg-gradient-to-br from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-slate-200 dark:border-zinc-800',
    };

    return (
        <motion.div
            whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
            className={cn(
                'rounded-[2rem] border p-6 md:p-8 relative overflow-hidden transition-all duration-300',
                variants[variant],
                className
            )}
        >
            {children}
        </motion.div>
    );
};
