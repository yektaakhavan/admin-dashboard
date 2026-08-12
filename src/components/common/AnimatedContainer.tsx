import { motion } from 'motion/react';

interface AnimatedContainerProps {
  children: React.ReactNode;
}

export default function AnimatedContainer({
  children,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      {children}
    </motion.div>
  );
}
