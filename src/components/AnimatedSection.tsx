'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  id?: string;
}

const AnimatedSection = ({ children, delay = 0, id }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 