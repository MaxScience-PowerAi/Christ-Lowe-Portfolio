import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    id?: string;
    dark?: boolean;
}

export const Section = ({ children, className, containerClassName, id, dark = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={cn(
                'py-24 px-4 overflow-hidden relative',
                dark ? 'bg-slate-50 dark:bg-zinc-900/50' : 'bg-white dark:bg-transparent',
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn('max-w-7xl mx-auto relative z-10', containerClassName)}
            >
                {children}
            </motion.div>
        </section>
    );
};
