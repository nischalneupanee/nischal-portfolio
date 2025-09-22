import { Suspense } from 'react';
import { Metadata } from 'next';
import { getPosts, getBlogStats, getPopularTags } from '@/lib/hashnode';
import { 
  PostCard, 
  LoadingSpinner, 
  ErrorState, 
  ReadingProgress
} from '@/components/blog';
import SearchAndFilterClient from '@/components/blog/SearchAndFilterClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Nischal Neupane',
  description: 'Developer insights and tutorials on modern web development',
};

export const revalidate = 3600;

interface BlogPageProps {
  searchParams: {
    page?: string;
    search?: string;
    tags?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

async function BlogContent({ searchParams }: { searchParams: BlogPageProps['searchParams'] }) {
  const searchQuery = searchParams.search || '';
  const selectedTags = searchParams.tags ? searchParams.tags.split(',') : [];
  const dateFrom = searchParams.dateFrom;
  const dateTo = searchParams.dateTo;

  try {
    const [postsData, stats, tagsData] = await Promise.all([
      getPosts(12),
      getBlogStats(),
      getPopularTags()
    ]);

    // Extract posts from the current API structure
    const posts = postsData.publication.posts.edges.map(({ node }) => node);
    const totalResults = posts.length;

    // Filter posts based on search and filters (client-side for now)
    let filteredPosts = posts;
    
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => selectedTags.includes(tag.name))
      );
    }

    if (dateFrom) {
      filteredPosts = filteredPosts.filter(post =>
        new Date(post.publishedAt) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      filteredPosts = filteredPosts.filter(post =>
        new Date(post.publishedAt) <= new Date(dateTo)
      );
    }

    // Transform tags to include count
    const tagsWithCount = tagsData.map(tag => ({
      name: tag.name,
      count: tag.postsCount || 0
    }));

    return (
      <>
        <ReadingProgress />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Developer <span className="text-terminal-green">Blog</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Insights and tutorials on modern web development
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-terminal-green">{stats.totalPosts}</div>
              <div className="text-sm text-text-muted">Articles</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalViews}</div>
              <div className="text-sm text-text-muted">Views</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalReactions}</div>
              <div className="text-sm text-text-muted">Reactions</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalTopics}</div>
              <div className="text-sm text-text-muted">Topics</div>
            </div>
          </div>

          {/* Enhanced Search and Filter */}
          <SearchAndFilterClient 
            availableTags={tagsWithCount}
            totalResults={filteredPosts.length}
            initialValues={{
              search: searchQuery,
              tags: selectedTags,
              dateFrom,
              dateTo
            }}
          />

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 glass rounded-lg">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                No posts found
              </h2>
              <p className="text-text-secondary mb-8">
                Try adjusting your search criteria or browse all posts.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-terminal-green text-black rounded-lg hover:bg-terminal-green/80 transition-colors font-medium"
              >
                View All Posts
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">
                  {searchQuery ? 'Search Results' : 'Latest Posts'}
                </h2>
                <span className="text-sm text-text-muted">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  } catch (error) {
    return (
      <ErrorState 
        title="Failed to Load Blog"
        message="Unable to fetch blog posts. Please try again later."
      />
    );
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner size="large" text="Loading blog posts..." />}>
          <BlogContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}