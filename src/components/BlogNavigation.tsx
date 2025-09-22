'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-bg-light/50 backdrop-blur-sm border-b border-terminal-green/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="text-text-muted">|</div>
            <Link href="/blog" className="text-terminal-green font-mono font-bold text-lg hover:text-terminal-green/80 transition-colors">
              <span className="terminal-glow">Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/blog" 
              className="text-text-secondary hover:text-terminal-green transition-colors font-medium"
            >
              All Posts
            </Link>
            
            <Link 
              href="/about" 
              className="text-text-secondary hover:text-terminal-purple transition-colors font-medium"
            >
              About
            </Link>
            
            <a
              href="https://nischalneupanee.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-2 bg-terminal-green/10 text-terminal-green border border-terminal-green/30 rounded-lg hover:bg-terminal-green/20 transition-all duration-200"
            >
              <span>Hashnode</span>
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
              <div className="px-4 py-4 space-y-3">
                <Link 
                  href="/" 
                  className="block py-2 text-text-secondary hover:text-terminal-green transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className="block py-2 text-text-secondary hover:text-terminal-green transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  All Posts
                </Link>
                <Link 
                  href="/about" 
                  className="block py-2 text-text-secondary hover:text-terminal-purple transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
                <a
                  href="https://nischalneupanee.hashnode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 py-2 text-terminal-green hover:text-terminal-green/80 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <span>Visit Hashnode</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
