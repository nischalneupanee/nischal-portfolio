import { Calendar, Clock, ExternalLink, BookOpen, Users, TrendingUp } from 'lucide-react';
import { getBlogPosts, getPublicationStats, type BlogPost } from '@/lib/hashnode';
import Image from 'next/image';

// Blog page component with server-side data fetching
export default async function Blog() {
  let posts: BlogPost[] = [];
  let stats = null;
  let error = null;

  try {
    // Fetch blog posts and stats in parallel
    const [postsData, statsData] = await Promise.all([
      getBlogPosts(6),
      getPublicationStats()
    ]);
    
    posts = postsData.publication.posts.edges.map(edge => edge.node);
    stats = statsData;
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

        {/* Blog Stats */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-terminal-green mb-2">
                {error ? '0' : stats?.posts.totalDocuments || posts.length}+
              </div>
              <p className="text-text-secondary">Articles Published</p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-terminal-blue mb-2">
                AI/ML
              </div>
              <p className="text-text-secondary">Primary Focus</p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-terminal-purple mb-2">
                {error ? '0' : posts.reduce((acc: number, post: BlogPost) => acc + post.readTimeInMinutes, 0)}
              </div>
              <p className="text-text-secondary">Minutes of Content</p>
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

        {/* Featured Posts */}
        {!error && posts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow">
              Latest Articles
            </h2>
            <div className="space-y-8">
              {posts.map((post: BlogPost, index: number) => (
              <article key={post.id} className="glass rounded-lg overflow-hidden hover-glow group">
                <div className="md:flex">
                  {/* Cover Image */}
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full relative overflow-hidden">
                      {post.coverImage?.url ? (
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Image
                          src="/project1.jpeg"
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-4 text-text-muted text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTimeInMinutes} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3 group-hover:text-terminal-green transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {post.brief}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: any, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs font-medium"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-terminal-blue hover:text-terminal-green transition-colors font-medium"
                    >
                      <span>Read Full Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        )}

        {/* Empty State */}
        {!error && posts.length === 0 && (
          <section className="mb-16">
            <div className="glass rounded-lg p-8 text-center">
              <div className="text-terminal-blue mb-4">📝</div>
              <h3 className="text-xl font-semibold text-terminal-blue mb-2">No Blog Posts Found</h3>
              <p className="text-text-secondary mb-4">I haven't published any articles yet, but stay tuned!</p>
              <a
                href="https://nischalneupane.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-blue hover:text-terminal-blue/80 underline"
              >
                Visit my blog to see when new content is available
              </a>
            </div>
          </section>
        )}

        {/* Blog Topics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow">
            Topics I Write About
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Machine Learning', count: '5+ posts', color: 'text-terminal-green' },
              { name: 'Data Science', count: '3+ posts', color: 'text-terminal-blue' },
              { name: 'Web Development', count: '2+ posts', color: 'text-terminal-purple' },
              { name: 'Tech Events', count: '4+ posts', color: 'text-terminal-orange' }
            ].map((topic, index) => (
              <div key={index} className="glass rounded-lg p-4 text-center hover-glow">
                <h3 className={`font-semibold mb-2 ${topic.color}`}>
                  {topic.name}
                </h3>
                <p className="text-text-muted text-sm">{topic.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="glass rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-terminal-green mb-4 terminal-glow">
              Stay Updated
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Follow my blog on Hashnode to get notified about new articles on AI/ML, Data Science, 
              and my journey as a CSIT student. Let's learn and grow together!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://nischalneupanee.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-colors"
              >
                Follow on Hashnode
              </a>
              <a
                href="https://hashnode.com/@nischalneupanee"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-colors"
              >
                View Profile
              </a>
            </div>
          </div>
        </section>

        {/* Terminal Command */}
        <section className="text-center">
          <div className="glass rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-4">nischal@blog:~$ echo "writing_motivation"</div>
            <blockquote className="text-xl text-text-primary font-semibold">
              "Sharing knowledge is the best way to multiply it. Every article is a step towards collective learning."
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  );
}
