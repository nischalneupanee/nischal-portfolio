'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const scrollTop = window.scrollY;
      const docHeight = article.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);

      setProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
    };

    const throttledUpdateProgress = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', throttledUpdateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', throttledUpdateProgress);
  }, []);

  return (
    <>
      {/* Fixed Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-bg-dark/50">
        <div 
          className="h-full bg-gradient-to-r from-terminal-blue to-terminal-green transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-terminal-blue/20"
            />
            {/* Progress Circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="text-terminal-blue transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Progress Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-terminal-blue">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <div className="bg-bg-dark/80 backdrop-blur-sm border border-terminal-blue/20 rounded-full px-3 py-2">
          <span className="text-xs font-medium text-terminal-blue">
            {progress}% read
          </span>
        </div>
      </div>
    </>
  );
}
