'use client';

import { useState } from 'react';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link, 
  Mail,
  MessageCircle,
  Check,
  Copy
} from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'floating';
  showLabels?: boolean;
}

export default function SocialShare({
  url,
  title,
  description = '',
  image = '',
  className = '',
  variant = 'horizontal',
  showLabels = false
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-blue-400 hover:text-white',
      bgColor: 'bg-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'bg-green-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'bg-gray-600'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Handle native Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.error('Native share failed:', err);
      }
    }
  };

  // Floating variant
  if (variant === 'floating') {
    return (
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Share options"
          >
            <Share2 className="h-5 w-5" />
          </button>
          
          {isOpen && (
            <div className="flex flex-col gap-2 animate-in slide-in-from-right-2 duration-200">
              {shareLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleShare(link.url)}
                  className={`p-2 ${link.bgColor} text-white rounded-full shadow-lg hover:scale-110 transition-all duration-200`}
                  aria-label={`Share on ${link.name}`}
                >
                  <link.icon className="h-4 w-4" />
                </button>
              ))}
              
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-500 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-200"
                aria-label="Copy link"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal and vertical variants
  const containerClass = variant === 'vertical' 
    ? 'flex flex-col space-y-2' 
    : 'flex flex-wrap items-center gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Share2 className="h-4 w-4" />
        <span>Share:</span>
      </div>

      {/* Native share button for mobile */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          {showLabels && 'Share'}
        </button>
      )}

      {/* Social platform buttons */}
      {shareLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => handleShare(link.url)}
          className={`inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors ${link.color}`}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="h-4 w-4" />
          {showLabels && link.name}
        </button>
      ))}

      {/* Copy link button */}
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
        {showLabels && (copied ? 'Copied!' : 'Copy Link')}
      </button>
    </div>
  );
}