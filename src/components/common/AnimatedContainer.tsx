import { motion, useReducedMotion } from 'motion/react';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Subtle fade/slide-in. Skipped for people who prefer reduced motion.
export default function AnimatedContainer({
  children,
  className,
}: AnimatedContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
