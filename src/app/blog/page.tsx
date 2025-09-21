import { Calendar, Clock, ExternalLink, BookOpen, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { getBlogPosts, getPublicationStats, getAllTags, getFeaturedPosts, getPopularPosts, type BlogPost } from '@/lib/hashnode';
import Image from 'next/image';
import Link from 'next/link';
import BlogContainer from '@/components/BlogContainer';
import BlogNavigation from '@/components/BlogNavigation';

// Enable ISR for the blog page
export const revalidate = 1800; // 30 minutes

// Helper function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Blog page component with server-side data fetching
export default async function Blog({
  searchParams
}: {
  searchParams: { page?: string; tag?: string; search?: string; }
}) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 6;
  const selectedTag = searchParams.tag;
  const searchQuery = searchParams.search;

  let posts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let popularPosts: BlogPost[] = [];
  let stats = null;
  let availableTags: string[] = [];
  let totalPosts = 0;
  let hasNextPage = false;
  let error = null;

  try {
    // Fetch blog data in parallel for better performance
    const [postsData, statsData, tagsData, featuredData, popularData] = await Promise.all([
      getBlogPosts(postsPerPage * currentPage), // Fetch enough posts for current page
      getPublicationStats(),
      getAllTags(),
      getFeaturedPosts(3),
      getPopularPosts(3)
    ]);
    
    posts = postsData.publication.posts.edges.map((edge: any) => edge.node);
    stats = statsData;
    availableTags = tagsData.map((tag: any) => tag.name);
    featuredPosts = featuredData;
    popularPosts = popularData;
    totalPosts = stats?.posts?.totalDocuments || posts.length;
    hasNextPage = postsData.publication.posts.pageInfo.hasNextPage;

    // Apply filters
    if (selectedTag) {
      posts = posts.filter(post => 
        post.tags.some(tag => tag.name.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    if (searchQuery) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.brief.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    posts = posts.slice(startIndex, endIndex);

  } catch (err) {
    console.error('Failed to fetch blog data:', err);
    error = 'Failed to load blog posts. Please try again later.';
  }
  return (
    <>
        {/* Blog Navigation */}
        <BlogNavigation />      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
              {/* Hero Section with Terminal-style Header */}
      <div className="mb-16 text-center bg-gradient-to-r from-terminal-purple/10 via-terminal-blue/10 to-terminal-green/10 rounded-2xl p-12 border border-terminal-blue/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 font-mono">
            <span className="text-terminal-green">{'>'}</span>
            <span className="animate-pulse">_</span> 
            <span className="text-terminal-blue">Blog</span>
            <span className="text-terminal-purple">.dev</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
            Exploring technology, development insights, and digital innovation through my coding journey
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
              Latest Articles
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-blue rounded-full"></span>
              {posts.length} Posts Available
            </span>
          </div>
        </div>
      </div>

        {/* Enhanced Blog Stats */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass rounded-lg p-6 text-center hover-glow transition-all duration-300">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-terminal-green mb-2">
                {error ? '0' : stats?.posts.totalDocuments || posts.length}
              </div>
              <p className="text-text-secondary">Articles Published</p>
            </div>
            <div className="glass rounded-lg p-6 text-center hover-glow transition-all duration-300">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-2xl font-bold text-terminal-blue mb-2">
                AI/ML
              </div>
              <p className="text-text-secondary">Primary Focus</p>
            </div>
            <div className="glass rounded-lg p-6 text-center hover-glow transition-all duration-300">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-terminal-purple mb-2">
                {error ? '0' : posts.reduce((acc: number, post: BlogPost) => acc + post.readTimeInMinutes, 0)}
              </div>
              <p className="text-text-secondary">Minutes of Content</p>
            </div>
            <div className="glass rounded-lg p-6 text-center hover-glow transition-all duration-300">
              <div className="text-3xl mb-2">🏷️</div>
              <div className="text-2xl font-bold text-terminal-orange mb-2">
                {error ? '0' : availableTags.length}
              </div>
              <p className="text-text-secondary">Topics Covered</p>
            </div>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <section className="mb-16">
            <div className="glass rounded-lg p-8 text-center">
              <div className="text-terminal-orange mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-terminal-orange mb-2">Unable to Load Blog Posts</h3>
              <p className="text-text-secondary mb-4">{error}</p>
              <p className="text-sm text-text-muted">
                You can visit my blog directly at{' '}
                <a
                  href="https://nischalneupane.hashnode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-blue hover:text-terminal-blue/80 underline"
                >
                  nischalneupane.hashnode.dev
                </a>
              </p>
            </div>
          </section>
        )}

        {/* Blog Posts with Search and Filter */}
        {!error && (
          <>
            {/* Featured Posts Section */}
            {featuredPosts && featuredPosts.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <h2 className="text-3xl font-bold text-text-primary font-mono">Featured Articles</h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-terminal-blue to-transparent flex-1"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group relative bg-gradient-to-br from-bg-dark/60 to-bg-light/60 backdrop-blur-sm border border-terminal-blue/30 rounded-2xl overflow-hidden hover:border-terminal-blue/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-terminal-blue/10"
                    >
                      {/* Highlight badge for first featured post */}
                      {index === 0 && (
                        <div className="absolute top-4 left-4 z-10 bg-terminal-blue text-bg-dark px-3 py-1 rounded-full text-xs font-semibold">
                          Latest Featured
                        </div>
                      )}
                      
                      {post.coverImage ? (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={post.coverImage.url}
                            alt={post.title}
                            width={600}
                            height={337}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`aspect-video bg-gradient-to-br ${
                          post.tags?.[0]?.name === 'Data Science' ? 'from-blue-500/20 via-purple-500/20 to-green-500/20' :
                          post.tags?.[0]?.name === 'Machine Learning' ? 'from-purple-500/20 via-pink-500/20 to-blue-500/20' :
                          post.tags?.[0]?.name === 'AI' ? 'from-green-500/20 via-blue-500/20 to-purple-500/20' :
                          'from-terminal-purple/30 to-terminal-blue/30'
                        } flex items-center justify-center relative overflow-hidden`}>
                          {/* Animated elements */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-4 w-3 h-3 bg-terminal-green rounded-full animate-ping"></div>
                            <div className="absolute top-8 right-6 w-2 h-2 bg-terminal-blue rounded-full animate-pulse delay-700"></div>
                            <div className="absolute bottom-8 left-8 w-2 h-2 bg-terminal-purple rounded-full animate-pulse delay-300"></div>
                            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-terminal-orange rounded-full animate-ping delay-1000"></div>
                          </div>
                          
                          <div className="text-center z-10">
                            <div className="text-6xl mb-4 animate-bounce">
                              {post.tags?.[0]?.name === 'Data Science' ? '📊' :
                               post.tags?.[0]?.name === 'Machine Learning' ? '🤖' :
                               post.tags?.[0]?.name === 'AI' ? '🧠' :
                               post.tags?.[0]?.name === 'Web Development' ? '�' :
                               '✨'}
                            </div>
                            <div className="text-terminal-blue font-mono text-lg font-semibold mb-2">
                              {post.tags?.[0]?.name || 'Featured'}
                            </div>
                            <div className="text-xs text-text-muted font-mono">
                              {post.readTimeInMinutes} min read • {formatDate(post.publishedAt)}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="px-3 py-1 bg-terminal-blue/20 text-terminal-blue rounded-full text-xs font-medium"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-text-primary group-hover:text-terminal-blue transition-colors mb-4 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-text-secondary line-clamp-3 mb-6 leading-relaxed">
                          {post.brief}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-2">
                              <Calendar size={14} />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock size={14} />
                              {post.readTimeInMinutes} min
                            </span>
                          </div>
                          <ArrowRight 
                            size={16} 
                            className="text-terminal-blue group-hover:translate-x-1 transition-transform duration-300" 
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-terminal-green terminal-glow">
                  All Posts
                </h2>
                <div className="text-text-secondary font-mono text-sm">
                  {totalPosts > 0 && (
                    <span>
                      Showing {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, posts.length + ((currentPage - 1) * postsPerPage))} of {totalPosts}
                    </span>
                  )}
                </div>
              </div>
              
              <BlogContainer initialPosts={posts} availableTags={availableTags} />
              
              {/* Pagination Controls */}
              {totalPosts > postsPerPage && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <div className="flex items-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?page=${currentPage - 1}${selectedTag ? `&tag=${selectedTag}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                        className="px-4 py-2 bg-terminal-blue/20 text-terminal-blue border border-terminal-blue/30 rounded-lg hover:bg-terminal-blue/30 transition-colors font-mono"
                      >
                        Previous
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, Math.ceil(totalPosts / postsPerPage)) }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === currentPage;
                        
                        return (
                          <Link
                            key={pageNum}
                            href={`/blog?page=${pageNum}${selectedTag ? `&tag=${selectedTag}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                            className={`px-3 py-2 rounded-lg font-mono transition-colors ${
                              isActive
                                ? 'bg-terminal-green text-bg-dark font-bold'
                                : 'text-terminal-green hover:bg-terminal-green/20'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      })}
                    </div>
                    
                    {hasNextPage && currentPage < Math.ceil(totalPosts / postsPerPage) && (
                      <Link
                        href={`/blog?page=${currentPage + 1}${selectedTag ? `&tag=${selectedTag}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                        className="px-4 py-2 bg-terminal-blue/20 text-terminal-blue border border-terminal-blue/30 rounded-lg hover:bg-terminal-blue/30 transition-colors font-mono"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* Dynamic Blog Topics */}
        {!error && availableTags.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow">
              Topics I Write About
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableTags.slice(0, 8).map((tag, index) => {
                const colors = ['text-terminal-green', 'text-terminal-blue', 'text-terminal-purple', 'text-terminal-orange'];
                const color = colors[index % colors.length];
                const postCount = posts.filter(post => 
                  post.tags?.some(postTag => postTag.name.toLowerCase() === tag.toLowerCase())
                ).length;
                
                return (
                  <div key={tag} className="glass rounded-lg p-4 text-center hover-glow cursor-pointer transition-all duration-300 hover:scale-105">
                    <h3 className={`font-semibold mb-2 ${color}`}>
                      {tag}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {postCount} post{postCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
            {availableTags.length > 8 && (
              <div className="text-center mt-8">
                <p className="text-text-secondary">
                  And {availableTags.length - 8} more topics...
                </p>
              </div>
            )}
          </section>
        )}

        {/* Enhanced Follow Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-terminal-green/10 via-terminal-blue/10 to-terminal-purple/10 border border-terminal-green/30 rounded-xl p-8 text-center backdrop-blur-sm">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl md:text-3xl font-bold text-terminal-green mb-4 terminal-glow">
              Join My Developer Journey
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Follow my blog on Hashnode to get notified about new articles on AI/ML, Data Science, 
              Web Development, and my journey as a CSIT student. Join a community of developers sharing knowledge and growing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://nischalneupanee.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-terminal-green/25"
              >
                <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Follow on Hashnode
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://hashnode.com/@nischalneupanee"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-terminal-blue/25"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Profile
              </a>
            </div>
          </div>
        </section>

        {/* Terminal Command */}
        <section className="text-center">
          <div className="glass rounded-xl p-8 font-mono border border-terminal-green/20">
            <div className="text-terminal-green mb-4 text-lg">
              <span className="text-terminal-blue">nischal</span>
              <span className="text-text-muted">@</span>
              <span className="text-terminal-purple">blog</span>
              <span className="text-text-muted">:~$</span>
              {' '}echo &quot;writing_motivation&quot;
            </div>
            <div className="border-l-4 border-terminal-green pl-6">
              <blockquote className="text-xl md:text-2xl text-text-primary font-semibold italic">
                &quot;Sharing knowledge is the best way to multiply it. Every article is a step towards collective learning.&quot;
              </blockquote>
              <footer className="text-terminal-blue mt-4 text-lg">— Nischal Neupane</footer>
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}
