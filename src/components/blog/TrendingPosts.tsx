'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  TrendingUp, 
  Flame, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  brief: string;
  coverImage?: { url: string };
  publishedAt: string;
  readTimeInMinutes: number;
  views: number;
  reactionCount: number;
  responseCount: number;
  author: {
    name: string;
    profilePicture: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

interface TrendingPostsProps {
  posts: TrendingPost[];
  title?: string;
  className?: string;
  showAll?: boolean;
}

export default function TrendingPosts({ 
  posts, 
  title = "Trending Posts",
  className = "",
  showAll = false 
}: TrendingPostsProps) {
  const [displayPosts, setDisplayPosts] = useState<TrendingPost[]>([]);

  useEffect(() => {
    // Sort by engagement score (views + reactions + responses)
    const sortedPosts = posts
      .map(post => ({
        ...post,
        engagementScore: post.views + (post.reactionCount * 10) + (post.responseCount * 5)
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, showAll ? 10 : 5);

    setDisplayPosts(sortedPosts);
  }, [posts, showAll]);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        </div>
        {!showAll && posts.length > 5 && (
          <Link
            href="/blog?sort=trending"
            className="flex items-center gap-1 text-terminal-green hover:text-terminal-green/80 transition-colors text-sm"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {displayPosts.map((post, index) => (
          <div
            key={post.id}
            className="glass rounded-lg p-4 border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300 group"
          >
            <div className="flex gap-4">
              {/* Trending Rank */}
              <div className="flex-shrink-0">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${index === 0 
                    ? 'bg-yellow-500 text-black' 
                    : index === 1 
                    ? 'bg-gray-400 text-black'
                    : index === 2
                    ? 'bg-orange-600 text-white'
                    : 'bg-terminal-green/20 text-terminal-green'
                  }
                `}>
                  {index + 1}
                </div>
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <h3 className="font-semibold text-text-primary group-hover:text-terminal-green transition-colors line-clamp-2 text-sm mb-1">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-secondary text-xs line-clamp-2 mb-2">
                    {post.brief}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      <span>{post.reactionCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-blue-400" />
                      <span>{post.responseCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTimeInMinutes} min</span>
                    </div>
                  </div>

                  {/* Top Tag */}
                  {post.tags[0] && (
                    <div className="mt-2">
                      <span className="bg-terminal-green/20 text-terminal-green text-xs px-2 py-1 rounded-full">
                        {post.tags[0].name}
                      </span>
                    </div>
                  )}
                </Link>
              </div>

              {/* Trending Indicator */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                {index < 3 && (
                  <div className="flex items-center gap-1 text-xs">
                    {index === 0 && <Star className="w-3 h-3 text-yellow-500" />}
                    <TrendingUp className={`w-3 h-3 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' : 
                      'text-orange-600'
                    }`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {showAll && posts.length > 10 && (
        <div className="text-center pt-4">
          <button className="text-terminal-green hover:text-terminal-green/80 transition-colors text-sm">
            Load More Trending Posts
          </button>
        </div>
      )}
    </div>
  );
}