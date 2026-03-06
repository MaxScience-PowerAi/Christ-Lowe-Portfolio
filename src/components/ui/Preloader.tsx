import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onLoadingComplete: () => void;
}

export const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate asset loading
        const duration = 2500; // 2.5s simulated loading
        const intervalTime = 20;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const currentProgress = Math.min((currentStep / steps) * 100, 100);

            // Easing out the progress for a more realistic loading feel
            const easedProgress = 1 - Math.pow(1 - currentProgress / 100, 3);
            setProgress(Math.floor(easedProgress * 100));

            if (currentStep >= steps) {
                clearInterval(interval);
                setTimeout(() => {
                    onLoadingComplete();
                }, 400); // Small pause at 100%
            }
        }, intervalTime);

        // Disable scroll while loading
        document.body.style.overflow = 'hidden';

        return () => {
            clearInterval(interval);
            document.body.style.overflow = 'auto'; // Re-enable scroll when unmounted
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030014]"
        >
            <div className="relative flex flex-col items-center">
                {/* Animated Orbs */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 blur-3xl opacity-30">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-32 h-32 bg-brand-cyan rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-32 h-32 bg-brand-violet rounded-full absolute"
                    />
                </div>

                {/* Brand Text */}
                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tighter"
                    >
                        Christ Lowe.
                    </motion.h1>
                </div>

                {/* Progress Display */}
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-brand-cyan font-mono text-xl font-medium tracking-widest tabular-nums"
                    >
                        {progress.toString().padStart(3, '0')}%
                    </motion.div>

                    {/* Progress Bar Line */}
                    <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet"
                            style={{ width: `${progress}%` }}
                            layout
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
