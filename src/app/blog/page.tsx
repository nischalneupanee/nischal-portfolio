'use client';

import { useState, useEffect } from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/lib/hashnode';
import { 
  BlogHeader, 
  FeaturedPost, 
  PostCard, 
  BlogSidebar, 
  LoadingSpinner, 
  ErrorState,
  AdvancedSearch 
} from '@/components/blog';

export default function BlogPage() {
  const { posts, loading, error } = useBlogPosts();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Initialize filtered posts when posts load
  useEffect(() => {
    if (posts.length > 0) {
      setFilteredPosts(posts);
    }
  }, [posts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      <BlogHeader 
        title="Blog" 
        description="Thoughts on technology, development, and beyond" 
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Advanced Search and Filtering */}
            <AdvancedSearch 
              posts={posts} 
              onFilteredPosts={setFilteredPosts} 
            />

            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
                <FeaturedPost post={filteredPosts[0]} />
              </div>
            )}

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Recent Posts {filteredPosts.length !== posts.length && `(${filteredPosts.length} found)`}
              </h2>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>No posts found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.slice(1).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
