import { Calendar, Clock, ExternalLink, BookOpen, Users, TrendingUp } from 'lucide-react';
import { getBlogPosts, getPublicationStats, getAllTags, getFeaturedPosts, getPopularPosts, type BlogPost } from '@/lib/hashnode';
import Image from 'next/image';
import BlogContainer from '@/components/BlogContainer';

// Enable ISR for the blog page
export const revalidate = 1800; // 30 minutes

// Blog page component with server-side data fetching
export default async function Blog() {
  let posts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let popularPosts: BlogPost[] = [];
  let stats = null;
  let availableTags: string[] = [];
  let error = null;

  try {
    // Fetch blog data in parallel for better performance
    const [postsData, statsData, tagsData, featuredData, popularData] = await Promise.all([
      getBlogPosts(6),
      getPublicationStats(),
      getAllTags(),
      getFeaturedPosts(3),
      getPopularPosts(3)
    ]);
    
    posts = postsData.publication.posts.edges.map(edge => edge.node);
    stats = statsData;
    availableTags = tagsData.map(tag => tag.name);
    featuredPosts = featuredData;
    popularPosts = popularData;
  } catch (err) {
    console.error('Failed to fetch blog data:', err);
    error = 'Failed to load blog posts. Please try again later.';
  }
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-terminal-green terminal-glow">$ cat /blog/</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Thoughts, tutorials, and insights on AI/ML, Data Science, and my journey as a CSIT student.
          </p>
          <div className="flex justify-center">
            <a
              href="https://nischalneupanee.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-terminal-blue text-bg-dark font-semibold rounded-lg hover:bg-terminal-blue/80 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Visit Full Blog</span>
              <ExternalLink className="w-4 h-4" />
            </a>
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
          <BlogContainer initialPosts={posts} availableTags={availableTags} />
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
  );
}
