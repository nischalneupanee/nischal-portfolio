'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
}

export default function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;
      
      // Add ID to heading if it doesn't have one
      heading.id = id;
      
      items.push({ id, text, level });
    });

    setTocItems(items);

    // Update the actual DOM headings with IDs
    const realHeadings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
    realHeadings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -80% 0%' }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full p-4 bg-bg-dark/50 border border-terminal-blue/20 rounded-lg text-text-primary hover:border-terminal-blue/40 transition-all duration-300"
        >
          <List size={20} />
          <span className="font-medium">Table of Contents</span>
          <ChevronRight 
            size={16} 
            className={`ml-auto transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div className="mt-4 p-4 bg-bg-dark/50 border border-terminal-blue/20 rounded-lg">
            <nav>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 16}px` }}>
                    <button
                      onClick={() => {
                        scrollToHeading(item.id);
                        setIsOpen(false);
                      }}
                      className={`text-left text-sm transition-colors duration-200 hover:text-terminal-blue ${
                        activeId === item.id ? 'text-terminal-blue font-medium' : 'text-text-secondary'
                      }`}
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

      {/* Desktop TOC Sidebar */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 w-64 max-h-96 overflow-y-auto">
        <div className="bg-bg-dark/60 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <List size={18} className="text-terminal-blue" />
            <h3 className="font-semibold text-text-primary">Table of Contents</h3>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 12}px` }}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`text-left text-sm transition-all duration-200 hover:text-terminal-blue block w-full ${
                      activeId === item.id 
                        ? 'text-terminal-blue font-medium border-l-2 border-terminal-blue pl-3' 
                        : 'text-text-secondary hover:pl-2'
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
