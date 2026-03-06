import React from 'react';
import { cn } from '../../utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'glow';
    hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, variant = 'default', hover = true, ...props }, ref) => {

        // Using the custom CSS classes heavily for the premium feel
        const variants = {
            default: 'bg-surface border-border',
            glass: 'glass-card',
            glow: 'glass-card glow-cyan border-border-strong',
        };

        return (
            <motion.div
                ref={ref}
                whileHover={hover ? { y: -5, transition: { duration: 0.2, ease: "easeOut" } } : {}}
                className={cn(
                    'rounded-[2rem] border p-6 md:p-8 relative overflow-hidden transition-all duration-300',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {/* Optional subtle gradient overlay for all cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/2 pointer-events-none" />

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        );
    }
);

Card.displayName = 'Card';

