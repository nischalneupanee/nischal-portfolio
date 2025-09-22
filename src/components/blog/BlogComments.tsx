'use client';

import { useState } from 'react';
import { MessageCircle, ExternalLink, Heart, Users } from 'lucide-react';

interface BlogCommentsProps {
  postSlug: string;
  postTitle: string;
  hashnodeUrl: string;
  reactionCount: number;
  responseCount: number;
}

export default function BlogComments({ 
  postSlug, 
  postTitle, 
  hashnodeUrl, 
  reactionCount,
  responseCount 
}: BlogCommentsProps) {
  const [showIframe, setShowIframe] = useState(false);

  const handleViewComments = () => {
    // Open Hashnode post in new tab for full commenting experience
    window.open(hashnodeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShowEmbed = () => {
    setShowIframe(true);
  };

  return (
    <div className="mt-12 border-t border-terminal-green/20 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-terminal-green" />
          <h3 className="text-xl font-bold text-text-primary">
            Discussion
          </h3>
        </div>
        
        {/* Engagement stats */}
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{reactionCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{responseCount}</span>
          </div>
        </div>
      </div>
      
      <div className="glass rounded-lg border border-terminal-green/20 overflow-hidden">
        {!showIframe ? (
          <div className="p-8 text-center">
            <div className="mb-6">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-terminal-green opacity-70" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Join the Discussion
              </h4>
              <p className="text-text-secondary">
                Share your thoughts and engage with other readers on Hashnode
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleViewComments}
                className="flex items-center justify-center gap-2 bg-terminal-green text-background px-6 py-3 rounded-lg hover:bg-terminal-green/90 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View on Hashnode
              </button>
              
              <button
                onClick={handleShowEmbed}
                className="flex items-center justify-center gap-2 bg-transparent text-terminal-green border border-terminal-green px-6 py-3 rounded-lg hover:bg-terminal-green/10 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Embed Comments
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-text-muted">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span>{reactionCount} reactions</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span>{responseCount} responses</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="border-b border-terminal-green/20 p-4 bg-background/50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-text-primary">Comments</h4>
                <button
                  onClick={handleViewComments}
                  className="text-terminal-green hover:text-terminal-green/80 transition-colors text-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Full Discussion
                </button>
              </div>
            </div>
            
            {/* Embedded Hashnode Comments */}
            <iframe
              src={`${hashnodeUrl}?embed=comments`}
              width="100%"
              height="500"
              frameBorder="0"
              title={`Comments for ${postTitle}`}
              className="w-full min-h-[500px]"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}
      </div>

      {/* Additional engagement options */}
      <div className="mt-4 text-center text-sm text-text-muted">
        <p>
          💡 Join the conversation and connect with other developers on{' '}
          <a
            href="https://hashnode.com/@nischalneupane"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:text-terminal-green/80 transition-colors"
          >
            Hashnode
          </a>
        </p>
      </div>
    </div>
  );
}