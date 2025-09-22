'use client';

import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

interface HashnodeCommentsProps {
  postId: string;
  postUrl: string;
  postTitle: string;
}

export default function HashnodeComments({ postId, postUrl, postTitle }: HashnodeCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hashnode Comments Widget Configuration
    const script = document.createElement('script');
    script.src = 'https://hashnode.com/widgets/comments.js';
    script.async = true;
    script.defer = true;
    
    // Configuration for Hashnode comments
    script.onload = () => {
      if (window.hashnodeComments && commentsRef.current) {
        window.hashnodeComments.init({
          postId: postId,
          postUrl: postUrl,
          postTitle: postTitle,
          container: commentsRef.current,
          theme: 'dark', // Match our terminal theme
          accentColor: '#00ff41', // Terminal green
        });
      }
    };

    // Append script to document
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [postId, postUrl, postTitle]);

  return (
    <div className="mt-12 border-t border-terminal-green/20 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-terminal-green" />
        <h3 className="text-xl font-bold text-text-primary">
          Discussion
        </h3>
      </div>
      
      <div className="glass rounded-lg p-6 border border-terminal-green/20">
        {/* Hashnode comments will be loaded here */}
        <div ref={commentsRef} id="hashnode-comments" />
        
        {/* Fallback while comments load */}
        <div className="text-center py-8 text-text-muted">
          <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Loading comments...</p>
          <p className="text-sm mt-2">
            Join the discussion on{' '}
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-green/80 transition-colors"
            >
              Hashnode
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    hashnodeComments?: {
      init: (config: {
        postId: string;
        postUrl: string;
        postTitle: string;
        container: HTMLElement;
        theme?: string;
        accentColor?: string;
      }) => void;
    };
  }
}