import React from 'react';
import { motion } from 'framer-motion';

import './LoadingWaveIcon.css';

export default function index() {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1
      }
    },
    end: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const loadingCircleVariants = {
    start: {
      y: '0%'
    },
    end: {
      y: '100%'
    }
  };

  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut'
  };

  const LoadingCircle = () => (
    <motion.svg
      className="loading__circle"
      variants={loadingCircleVariants}
      transition={loadingCircleTransition}
    >
      <circle cx="50%" cy="50%" r="50%" fill="white" />
    </motion.svg>
  );

  return (
    <motion.div
      className="loading"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </motion.div>
  );
}
