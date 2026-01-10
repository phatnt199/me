import { useEffect } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const Spotlight = () => {
  const { theme } = useTheme();
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic background gradient based on theme
  // Dark mode: Slight white/primary glow to illuminate the dark bg
  // Light mode: Slight primary color glow
  const spotlightColor = theme === 'dark' 
    ? 'rgba(175, 95, 95, 0.15)' // Red-ish glow in dark mode
    : 'rgba(159, 58, 58, 0.12)'; // Subtle red in light mode

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            ${spotlightColor},
            transparent 80%
          )
        `,
      }}
    />
  );
};
