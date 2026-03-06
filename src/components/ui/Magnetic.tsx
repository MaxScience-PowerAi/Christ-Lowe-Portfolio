import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export const Magnetic = ({ children, strength = 0.5, className = "" }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Apply strength factor
        setPosition({ x: x * strength, y: y * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};
