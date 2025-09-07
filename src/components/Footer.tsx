'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, MapPin, Calendar } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://github.com/nischalneupanee',
    icon: Github,
    label: 'GitHub',
    color: 'hover:text-terminal-green'
  },
  {
    href: 'https://www.linkedin.com/in/nischalneupanee/',
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'hover:text-terminal-blue'
  },
  {
    href: 'https://www.instagram.com/nischalneupanee',
    icon: Instagram,
    label: 'Instagram',
    color: 'hover:text-terminal-purple'
  },
  {
    href: 'mailto:nischalneupanee@gmail.com',
    icon: Mail,
    label: 'Email',
    color: 'hover:text-terminal-orange'
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-darker border-t border-terminal-green/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-terminal-green font-mono font-bold text-lg terminal-glow">
              Nischal Neupane
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              CSIT Student passionate about AI/ML, Data Science, and Open Source. 
              Building the future with code, one algorithm at a time.
            </p>
            <div className="flex items-center space-x-2 text-text-muted text-sm">
              <MapPin className="w-4 h-4" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-terminal-blue font-mono font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                href="/about" 
                className="block text-text-secondary hover:text-terminal-green transition-colors text-sm"
              >
                About Me
              </Link>
              <Link 
                href="/skills-projects" 
                className="block text-text-secondary hover:text-terminal-green transition-colors text-sm"
              >
                Projects
              </Link>
              <Link 
                href="/blog" 
                className="block text-text-secondary hover:text-terminal-green transition-colors text-sm"
              >
                Blog
              </Link>
              <Link 
                href="/Nischal Resume.pdf" 
                target="_blank"
                className="block text-text-secondary hover:text-terminal-green transition-colors text-sm"
              >
                Resume
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-terminal-purple font-mono font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text-muted ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-terminal-green/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-text-muted text-sm">
            <Calendar className="w-4 h-4" />
            <span>© {currentYear} Nischal Neupane. All rights reserved.</span>
          </div>
          
          <div className="mt-4 md:mt-0 text-text-muted text-sm">
            <span>Built with </span>
            <span className="text-terminal-green">Next.js</span>
            <span> & </span>
            <span className="text-terminal-blue">TailwindCSS</span>
          </div>
        </div>

        {/* Terminal-style signature */}
        <div className="mt-6 text-center">
          <p className="text-terminal-green font-mono text-xs">
            <span className="opacity-60">~/nischal-portfolio $</span> echo "Thank you for visiting!" 
            <span className="animate-blink">|</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
