'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Tag, Filter } from 'lucide-react';
import { getBlogPosts, searchBlogPosts, getBlogPostsByTag, type BlogPost } from '@/lib/hashnode';
import BlogSearch from '@/components/BlogSearch';
import TagFilter from '@/components/TagFilter';
import Image from 'next/image';

interface BlogContainerProps {
  initialPosts: BlogPost[];
  availableTags: string[];
}

export default function BlogContainer({ initialPosts, availableTags }: BlogContainerProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [searchActive, setSearchActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const loadMorePosts = async () => {
    if (!hasMore || loadingMore || searchActive || filterActive) return;

    setLoadingMore(true);
    try {
      const response = await getBlogPosts(6, cursor);
      if (response?.publication?.posts) {
        const newPosts = response.publication.posts.edges.map((edge: any) => edge.node);
        const updatedPosts = [...posts, ...newPosts];
        setPosts(updatedPosts);
        setHasMore(response.publication.posts.pageInfo.hasNextPage);
        setCursor(response.publication.posts.pageInfo.endCursor);
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearchResults = (searchResults: BlogPost[]) => {
    setFilteredPosts(searchResults);
    setSearchActive(searchResults.length > 0);
    setFilterActive(false); // Clear tag filter when searching
  };

  const handleTagResults = (tagResults: BlogPost[], tag: string | null) => {
    if (tag === null) {
      // Reset to original posts
      setFilteredPosts([]);
      setFilterActive(false);
    } else {
      setFilteredPosts(tagResults);
      setFilterActive(true);
    }
    setSearchActive(false); // Clear search when filtering by tag
  };

  const clearFilters = () => {
    setFilteredPosts([]);
    setSearchActive(false);
    setFilterActive(false);
    setShowSearch(false);
    setShowFilters(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const postsToShow = searchActive || filterActive ? filteredPosts : posts;

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              showSearch || searchActive
                ? 'bg-terminal-green text-bg-dark border-terminal-green'
                : 'bg-bg-light border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Posts</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              showFilters || filterActive
                ? 'bg-terminal-blue text-bg-dark border-terminal-blue'
                : 'bg-bg-light border-terminal-blue/30 text-terminal-blue hover:bg-terminal-blue/10'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter by Tag</span>
          </button>

          {(searchActive || filterActive) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-terminal-purple/30 text-terminal-purple hover:bg-terminal-purple/10 transition-all duration-200"
            >
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Search Component */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <BlogSearch onResults={handleSearchResults} />
          </motion.div>
        )}

        {/* Tag Filter Component */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <TagFilter onResults={handleTagResults} availableTags={availableTags} />
          </motion.div>
        )}

        {/* Active Filters Display */}
        {(searchActive || filterActive) && (
          <div className="mt-6 text-center">
            <p className="text-text-muted">
              {searchActive && `Showing search results`}
              {filterActive && `Showing posts filtered by tag`}
              {` (${postsToShow.length} post${postsToShow.length !== 1 ? 's' : ''})`}
            </p>
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-terminal-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading posts...</p>
        </div>
      ) : postsToShow.length > 0 ? (
        <>
          <div className="grid gap-8 md:gap-12">
            {postsToShow.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-gradient-to-r from-bg-light to-bg-light hover:from-bg-light hover:to-bg-dark/50 rounded-xl overflow-hidden border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/10"
              >
                <div className="md:flex">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className={`p-6 md:p-8 ${post.coverImage ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-terminal-blue" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-terminal-purple" />
                        <span>{post.readTimeInMinutes} min read</span>
                      </div>
                      {post.views && (
                        <div className="flex items-center space-x-1">
                          <span className="text-terminal-orange">👁️</span>
                          <span>{post.views.toLocaleString()} views</span>
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 group-hover:text-terminal-green transition-colors">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-lg text-terminal-blue mb-4 font-medium">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <p className="text-text-secondary mb-6 line-clamp-3">
                      {post.brief}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-1 bg-terminal-purple/20 text-terminal-purple text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag.name}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-text-muted">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-terminal-green text-bg-dark font-medium rounded-lg hover:bg-terminal-green/80 transition-all duration-300 hover:scale-105"
                      >
                        <span>Read Here</span>
                      </a>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 border-2 border-terminal-blue text-terminal-blue font-medium rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-all duration-300 hover:scale-105"
                      >
                        <span>View on Hashnode</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          {!searchActive && !filterActive && hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMorePosts}
                disabled={loadingMore}
                className="px-8 py-3 bg-terminal-blue text-bg-dark font-semibold rounded-lg hover:bg-terminal-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  'Load More Posts'
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg mb-4">
            {searchActive || filterActive ? 'No posts found matching your criteria.' : 'No blog posts available.'}
          </p>
          {(searchActive || filterActive) && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-terminal-green text-bg-dark rounded-lg hover:bg-terminal-green/80 transition-colors"
            >
              Show All Posts
            </button>
          )}
        </div>
      )}
    </div>
  );
}
