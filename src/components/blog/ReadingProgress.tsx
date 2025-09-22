'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ReadingProgressProps {
  target?: string; // CSS selector for the content container
  showScrollToTop?: boolean;
  className?: string;
}

export default function ReadingProgress({ 
  target = 'main', 
  showScrollToTop = true,
  className = ''
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const documentHeight = targetElement.scrollHeight;
      
      // Calculate how much of the content has been scrolled past
      const scrolled = Math.max(0, -rect.top);
      const totalScrollable = Math.max(0, documentHeight - windowHeight);
      
      if (totalScrollable > 0) {
        const newProgress = Math.min(100, (scrolled / totalScrollable) * 100);
        setProgress(newProgress);
        setIsVisible(newProgress > 5); // Show when 5% scrolled
      } else {
        setProgress(0);
        setIsVisible(false);
      }
    };

    // Initial calculation
    calculateProgress();

    // Listen for scroll events
    const handleScroll = () => {
      calculateProgress();
    };

    // Listen for resize events
    const handleResize = () => {
      calculateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [target]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
        <div 
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            opacity: isVisible ? 1 : 0
          }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}