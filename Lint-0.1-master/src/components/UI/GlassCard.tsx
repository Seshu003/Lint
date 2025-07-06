import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 
        border border-white/30 dark:border-gray-700/30 
        rounded-2xl shadow-xl hover:shadow-2xl 
        transition-all duration-300 z-10
        ${gradient ? 'bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-900/95 dark:to-gray-900/85' : ''}
        ${className}
      `}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};