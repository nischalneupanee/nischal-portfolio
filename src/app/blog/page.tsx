import { Calendar, Clock, ExternalLink, BookOpen, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { getBlogPosts, getPublicationStats, getAllTags, getFeaturedPosts, getPopularPosts, getBlogNavigation, type BlogPost } from '@/lib/hashnode';
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
export default async function Blog() {
  let posts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let popularPosts: BlogPost[] = [];
  let stats = null;
  let availableTags: string[] = [];
  let navigation: any[] = [];
  let error = null;

  try {
    // Fetch blog data in parallel for better performance
    const [postsData, statsData, tagsData, featuredData, popularData, navData] = await Promise.all([
      getBlogPosts(6),
      getPublicationStats(),
      getAllTags(),
      getFeaturedPosts(3),
      getPopularPosts(3),
      getBlogNavigation()
    ]);
    
    posts = postsData.publication.posts.edges.map(edge => edge.node);
    stats = statsData;
    availableTags = tagsData.map(tag => tag.name);
    featuredPosts = featuredData;
    popularPosts = popularData;
    navigation = navData;
  } catch (err) {
    console.error('Failed to fetch blog data:', err);
    error = 'Failed to load blog posts. Please try again later.';
  }
  return (
    <>
      {/* Blog Navigation */}
      <BlogNavigation navigation={navigation} />
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
              {/* Hero Section with Terminal-style Header */}
      <div className="mb-16 text-center bg-gradient-to-r from-terminal-purple/10 via-terminal-blue/10 to-terminal-green/10 rounded-2xl p-12 border border-terminal-blue/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-text-primary mb-6 font-mono">
            <span className="text-terminal-green">{'>'}</span>
            <span className="animate-pulse">_</span> 
            <span className="text-terminal-blue">Blog</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
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
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-terminal-purple/30 to-terminal-blue/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">💎</div>
                            <div className="text-terminal-blue font-mono text-sm font-semibold">
                              {post.tags?.[0]?.name || 'Featured'}
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
              <h2 className="text-3xl font-bold text-terminal-green mb-8 text-center terminal-glow">
                All Posts
              </h2>
              <BlogContainer initialPosts={posts} availableTags={availableTags} />
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
          <div className="bg-gradient-to-r from-terminal-green/5 to-terminal-blue/5 border border-terminal-green/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-terminal-green mb-4 terminal-glow">
              Join My Journey
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Follow my blog on Hashnode to get notified about new articles on AI/ML, Data Science, 
              and my journey as a CSIT student. Join a community of developers sharing knowledge and growing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://nischalneupanee.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Follow on Hashnode
              </a>
              <a
                href="https://hashnode.com/@nischalneupanee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-all duration-300 hover:scale-105"
              >
                <Users className="w-5 h-5" />
                View Profile
              </a>
            </div>
          </div>
        </section>

        {/* Terminal Command */}
        <section className="text-center">
          <div className="glass rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-4">nischal@blog:~$ echo &quot;writing_motivation&quot;</div>
            <blockquote className="text-xl text-text-primary font-semibold">
              &quot;Sharing knowledge is the best way to multiply it. Every article is a step towards collective learning.&quot;
            </blockquote>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}
