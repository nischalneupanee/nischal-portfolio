'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  variant?: 'sidebar' | 'floating' | 'inline';
}

export default function TableOfContents({
  content,
  className = '',
  variant = 'sidebar'
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from content
  useEffect(() => {
    const extractHeadings = () => {
      // Create a temporary div to parse HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || '';
        
        // Create or get existing ID
        let id = heading.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          
          // Ensure uniqueness
          if (tocItems.some(item => item.id === id)) {
            id = `${id}-${index}`;
          }
        }

        tocItems.push({ id, text, level });
      });

      setToc(tocItems);
    };

    extractHeadings();
  }, [content]);

  // Update heading IDs in the actual DOM
  useEffect(() => {
    toc.forEach(item => {
      const heading = document.querySelector(`h1, h2, h3, h4, h5, h6`)?.closest(`*:contains("${item.text}")`);
      if (heading && !heading.id) {
        heading.id = item.id;
      }
    });
  }, [toc]);

  // Track which heading is currently in view
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -80% 0%'
      }
    );

    toc.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    if (variant === 'floating') {
      setIsOpen(false);
    }
  };

  if (toc.length === 0) return null;

  // Floating variant
  if (variant === 'floating') {
    return (
      <div className={`fixed right-6 top-32 z-40 ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <List className="h-4 w-4" />
          <span className="text-sm font-medium">Contents</span>
          <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        {isOpen && (
          <div className="mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto animate-in slide-in-from-right-2 duration-200">
            <nav className="p-4">
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                        activeId === item.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }

  // Sidebar and inline variants
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          <List className="h-5 w-5" />
          Table of Contents
        </h3>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeId === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
              >
                <span className="flex items-center gap-2">
                  {item.level > 2 && (
                    <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  )}
                  {item.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}