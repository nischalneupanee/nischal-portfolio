'use client';

import { useState } from 'react';
import { ExternalLink, Heart, MessageCircle, Share2, Copy } from 'lucide-react';

interface BlogPostEngagementProps {
  post: {
    id: string;
    title: string;
    url: string;
    reactionCount: number;
    responseCount: number;
    views?: number;
    updatedAt?: string;
    publishedAt: string;
  };
  formatDate: (date: string) => string;
}

export default function BlogPostEngagement({ post, formatDate }: BlogPostEngagementProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
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
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.url)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-bg-dark/60 to-bg-light/60 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-8">
        {/* Reactions and Stats */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Reaction Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.open(post.url, '_blank')}
                className="group flex items-center gap-2 px-4 py-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                <span className="text-sm text-terminal-blue font-medium">
                  {post.reactionCount > 0 ? post.reactionCount : 'Like'}
                </span>
              </button>
              <button 
                onClick={() => window.open(post.url, '_blank')}
                className="group flex items-center gap-2 px-4 py-2 bg-terminal-purple/10 hover:bg-terminal-purple/20 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                <span className="text-sm text-terminal-purple font-medium">Love</span>
              </button>
              <button 
                onClick={() => window.open(post.url, '_blank')}
                className="group flex items-center gap-2 px-4 py-2 bg-terminal-green/10 hover:bg-terminal-green/20 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🔥</span>
                <span className="text-sm text-terminal-green font-medium">Fire</span>
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary mr-2">Share:</span>
              <button 
                onClick={handleShare}
                className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                title="Share post"
              >
                <ExternalLink size={16} className="text-terminal-blue" />
              </button>
              <button
                onClick={shareOnTwitter}
                className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                title="Share on Twitter"
              >
                <span className="text-terminal-blue">🐦</span>
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                title="Share on LinkedIn"
              >
                <span className="text-terminal-blue">💼</span>
              </button>
            </div>
          </div>

          {/* Post Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
            {post.views && (
              <span className="flex items-center gap-2">
                <span className="text-terminal-green">👁️</span>
                {post.views.toLocaleString()} views
              </span>
            )}
            {post.responseCount > 0 && (
              <span className="flex items-center gap-2">
                <span className="text-terminal-purple">💬</span>
                {post.responseCount} responses
              </span>
            )}
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span className="flex items-center gap-2">
                <span className="text-terminal-orange">✏️</span>
                Updated {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-terminal-blue/20 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-text-primary">
              Discussion ({post.responseCount || 0})
            </h3>
            <button
              onClick={() => window.open(`${post.url}#comments`, '_blank')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-green/20 text-terminal-green rounded-lg hover:bg-terminal-green/30 transition-all duration-300"
            >
              <span>💬</span>
              Join Discussion on Hashnode
            </button>
          </div>
          
          <div className="bg-bg-dark/50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">💭</div>
            <h4 className="text-lg font-semibold text-text-primary mb-3">
              Join the conversation on Hashnode
            </h4>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Comments and discussions happen on Hashnode where you can engage with other developers, 
              ask questions, and share your thoughts about this article.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open(`${post.url}#comments`, '_blank')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-blue text-bg-dark font-semibold rounded-lg hover:bg-terminal-blue/80 transition-all duration-300 hover:scale-105"
              >
                <span>💬</span>
                View Comments
              </button>
              <button
                onClick={() => window.open(post.url, '_blank')}
                className="px-6 py-3 border-2 border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green hover:text-bg-dark transition-all duration-300 hover:scale-105"
              >
                Read on Hashnode
              </button>
            </div>
          </div>
        </div>

        {/* Copy Notification */}
        {copied && (
          <div className="fixed bottom-4 right-4 px-4 py-2 bg-terminal-green text-bg-dark rounded-lg shadow-lg animate-in slide-in-from-bottom-2">
            URL copied to clipboard!
          </div>
        )}
      </div>
    </section>
  );
}
