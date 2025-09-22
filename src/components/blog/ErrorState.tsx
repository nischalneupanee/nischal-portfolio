'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  message, 
  title = "Oops! Something went wrong", 
  onRetry 
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center space-y-4 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center"
        >
          <AlertCircle className="w-8 h-8 text-red-500" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-text-primary"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary"
        >
          {message}
        </motion.p>
        
        {onRetry && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-terminal-green text-background rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}