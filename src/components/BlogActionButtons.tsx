'use client';

import { useState } from 'react';
import { Heart, Share2, Bookmark, MessageCircle, ExternalLink, Copy } from 'lucide-react';

interface BlogActionButtonsProps {
  postUrl: string;
  postTitle: string;
  hashnodeUrl: string;
}

export default function BlogActionButtons({ postUrl, postTitle, hashnodeUrl }: BlogActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy URL
      handleCopyUrl();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying URL:', error);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:block">
      <div className="flex flex-col items-center gap-3">
        {/* Action Buttons */}
        {isOpen && (
          <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-2">
            {/* Like Button */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-blue/20 rounded-full hover:border-terminal-blue/40 hover:bg-terminal-blue/10 transition-all duration-300"
              title="Like this post"
              onClick={() => window.open(hashnodeUrl, '_blank')}
            >
              <Heart size={20} className="text-terminal-blue group-hover:scale-110 transition-transform" />
            </button>

            {/* Bookmark Button */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-purple/20 rounded-full hover:border-terminal-purple/40 hover:bg-terminal-purple/10 transition-all duration-300"
              title="Bookmark this post"
              onClick={() => window.open(hashnodeUrl, '_blank')}
            >
              <Bookmark size={20} className="text-terminal-purple group-hover:scale-110 transition-transform" />
            </button>

            {/* Comment Button */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-green/20 rounded-full hover:border-terminal-green/40 hover:bg-terminal-green/10 transition-all duration-300"
              title="View comments"
              onClick={() => window.open(`${hashnodeUrl}#comments`, '_blank')}
            >
              <MessageCircle size={20} className="text-terminal-green group-hover:scale-110 transition-transform" />
            </button>

            {/* Copy URL Button */}
            <button
              className={`group p-3 bg-bg-dark/80 backdrop-blur-sm border rounded-full transition-all duration-300 ${
                copied 
                  ? 'border-terminal-green/40 bg-terminal-green/10' 
                  : 'border-terminal-orange/20 hover:border-terminal-orange/40 hover:bg-terminal-orange/10'
              }`}
              title={copied ? 'Copied!' : 'Copy URL'}
              onClick={handleCopyUrl}
            >
              <Copy size={20} className={`transition-all ${
                copied ? 'text-terminal-green' : 'text-terminal-orange group-hover:scale-110'
              }`} />
            </button>

            {/* Twitter Share */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-blue/20 rounded-full hover:border-terminal-blue/40 hover:bg-terminal-blue/10 transition-all duration-300"
              title="Share on Twitter"
              onClick={shareOnTwitter}
            >
              <span className="text-terminal-blue text-lg group-hover:scale-110 transition-transform">🐦</span>
            </button>

            {/* LinkedIn Share */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-blue/20 rounded-full hover:border-terminal-blue/40 hover:bg-terminal-blue/10 transition-all duration-300"
              title="Share on LinkedIn"
              onClick={shareOnLinkedIn}
            >
              <span className="text-terminal-blue text-lg group-hover:scale-110 transition-transform">💼</span>
            </button>

            {/* View on Hashnode */}
            <button
              className="group p-3 bg-bg-dark/80 backdrop-blur-sm border border-terminal-green/20 rounded-full hover:border-terminal-green/40 hover:bg-terminal-green/10 transition-all duration-300"
              title="View on Hashnode"
              onClick={() => window.open(hashnodeUrl, '_blank')}
            >
              <ExternalLink size={20} className="text-terminal-green group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* Main Share Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 bg-gradient-to-r from-terminal-blue to-terminal-green text-bg-dark rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen ? 'rotate-45' : ''
          }`}
          title="Share options"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Copied Notification */}
      {copied && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-terminal-green text-bg-dark text-sm rounded-full whitespace-nowrap animate-in slide-in-from-bottom-2">
          URL copied!
        </div>
      )}
    </div>
  );
}
