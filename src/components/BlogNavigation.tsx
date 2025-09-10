'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { BlogNavItem } from '@/lib/hashnode';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogNavigationProps {
  navigation: BlogNavItem[];
}

export default function BlogNavigation({ navigation }: BlogNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-bg-light/50 backdrop-blur-sm border-b border-terminal-green/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/blog" className="text-terminal-green font-mono font-bold text-lg hover:text-terminal-green/80 transition-colors">
              <span className="terminal-glow">~/blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-text-secondary hover:text-terminal-green transition-colors font-medium"
            >
              All Posts
            </Link>
            
            {/* Pages Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-text-secondary hover:text-terminal-blue transition-colors font-medium"
              >
                <span>Pages</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-bg-dark border border-terminal-blue/20 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {navigation.filter(item => !['Home', 'All Posts'].includes(item.title)).map((item) => (
                      <div key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-3 text-text-secondary hover:bg-terminal-blue/10 hover:text-terminal-blue transition-all duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-text-secondary hover:bg-terminal-blue/10 hover:text-terminal-blue transition-all duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/about" 
              className="text-text-secondary hover:text-terminal-purple transition-colors font-medium"
            >
              About
            </Link>
            
            <a
              href="https://nischalneupane.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-text-secondary hover:text-terminal-orange transition-colors font-medium"
            >
              <span>Full Blog</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-terminal-green transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-bg-dark/95 backdrop-blur-sm border-t border-terminal-green/20"
            >
              <div className="px-4 py-4 space-y-4">
                <Link 
                  href="/blog" 
                  className="block py-2 text-text-secondary hover:text-terminal-green transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  All Posts
                </Link>
                
                <div className="border-t border-terminal-green/10 pt-4">
                  <h3 className="text-terminal-blue font-semibold mb-3">Pages</h3>
                  {navigation.filter(item => !['Home', 'All Posts'].includes(item.title)).map((item) => (
                    <div key={item.href} className="ml-4">
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between py-2 text-text-secondary hover:text-terminal-blue transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-2 text-text-secondary hover:text-terminal-blue transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
