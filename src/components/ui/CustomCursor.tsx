import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Smooth springs for cursor movement
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeaveWindow = () => setIsVisible(false);
        const handleMouseEnterWindow = () => setIsVisible(true);

        const handleMouseOver = (e: MouseEvent) => {
            // Check if hovering over clickable elements
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('clickable-feature');

            setIsHovered(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeaveWindow);
        window.addEventListener('mouseenter', handleMouseEnterWindow);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeaveWindow);
            window.removeEventListener('mouseenter', handleMouseEnterWindow);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render cursor on touch devices where hover isn't natural
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-brand-cyan rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-brand-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center bg-transparent"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                    borderWidth: isHovered ? '2px' : '1px'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
        </>
    );
};
