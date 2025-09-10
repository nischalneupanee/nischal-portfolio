import { notFound } from 'next/navigation';
import { Calendar, Clock, ExternalLink, Tag, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts, getBlogNavigation } from '@/lib/hashnode';
import Image from 'next/image';
import Link from 'next/link';
import BlogNavigation from '@/components/BlogNavigation';
import BlogTableOfContents from '@/components/BlogTableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import BlogActionButtons from '@/components/BlogActionButtons';
import BlogPostEngagement from '@/components/BlogPostEngagement';

// Enable ISR for this page
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';
export const dynamicParams = true;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for better performance with larger dataset
export async function generateStaticParams() {
  try {
    const response = await getBlogPosts(50); // Get posts for static generation (max 50)
    
    if (!response?.publication?.posts?.edges) {
      return [];
    }

    return response.publication.posts.edges.map((edge: any) => ({
      slug: edge.node.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${post.title} | Nischal Neupane`,
      description: post.brief,
      openGraph: {
        title: post.title,
        description: post.brief,
        images: post.coverImage?.url ? [post.coverImage.url] : [],
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.brief,
        images: post.coverImage?.url ? [post.coverImage.url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Nischal Neupane',
      description: 'Read the latest blog post from Nischal Neupane.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  let relatedPosts;
  let navigation;
  
  try {
    [post, relatedPosts, navigation] = await Promise.all([
      getBlogPostBySlug(params.slug),
      getRelatedPosts(params.slug, 4),
      getBlogNavigation()
    ]);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />
      
      {/* Blog Action Buttons */}
      <BlogActionButtons 
        postUrl={post.url}
        postTitle={post.title}
        hashnodeUrl={post.url}
      />
      
      {/* Blog Navigation */}
      <BlogNavigation navigation={navigation || []} />
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center space-x-2 text-terminal-green hover:text-terminal-green/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title and Subtitle */}
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-terminal-blue mb-6 font-medium">
              {post.subtitle}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-text-muted mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>By {post.author.name}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 bg-terminal-purple/20 text-terminal-purple text-sm rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Brief/Excerpt */}
          {post.brief && (
            <div className="bg-bg-light rounded-lg p-6 mb-8 border border-terminal-green/20">
              <p className="text-text-secondary text-lg leading-relaxed">
                {post.brief}
              </p>
            </div>
          )}
        </header>

        {/* Table of Contents */}
        <BlogTableOfContents content={post.content.html} />

        {/* Article Content */}
        <article className="mb-16">
          <div 
            className="prose prose-invert prose-lg max-w-none
                     prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
                     prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                     prose-a:text-terminal-blue prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:text-terminal-blue/80
                     prose-code:text-terminal-green prose-code:bg-bg-dark/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-terminal-green/20
                     prose-pre:bg-bg-dark/90 prose-pre:border prose-pre:border-terminal-blue/20 prose-pre:rounded-lg prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-lg
                     prose-blockquote:border-l-4 prose-blockquote:border-terminal-blue prose-blockquote:bg-gradient-to-r prose-blockquote:from-bg-dark/50 prose-blockquote:to-transparent prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic
                     prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-terminal-blue/20 prose-img:my-8
                     prose-ul:text-text-secondary prose-ol:text-text-secondary prose-ul:my-6 prose-ol:my-6
                     prose-li:my-2 prose-li:leading-relaxed prose-li:marker:text-terminal-blue
                     prose-strong:text-text-primary prose-strong:font-semibold
                     prose-em:text-terminal-purple prose-em:font-medium
                     prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:text-terminal-green
                     prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-terminal-blue prose-h2:border-b prose-h2:border-terminal-blue/20 prose-h2:pb-3
                     prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-terminal-purple
                     prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-terminal-orange
                     prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-4
                     prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4
                     prose-table:border prose-table:border-terminal-blue/20 prose-table:rounded-lg prose-table:overflow-hidden
                     prose-th:bg-terminal-blue/10 prose-th:text-terminal-blue prose-th:font-semibold prose-th:p-3
                     prose-td:p-3 prose-td:border-t prose-td:border-terminal-blue/10
                     prose-hr:border-terminal-blue/20 prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>

        {/* Post Engagement Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-bg-dark/60 to-bg-light/60 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-8">
            {/* Reactions and Stats */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap items-center gap-6">
                {/* Reaction Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                    <span className="text-sm text-terminal-blue font-medium">
                      {post.reactionCount > 0 ? post.reactionCount : 'Like'}
                    </span>
                  </a>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-terminal-purple/10 hover:bg-terminal-purple/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                    <span className="text-sm text-terminal-purple font-medium">Love</span>
                  </a>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-terminal-green/10 hover:bg-terminal-green/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">🔥</span>
                    <span className="text-sm text-terminal-green font-medium">Fire</span>
                  </a>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary mr-2">Share:</span>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                    title="Share post"
                  >
                    <ExternalLink size={16} className="text-terminal-blue" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                    title="Share on Twitter"
                  >
                    <span className="text-terminal-blue">🐦</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                    title="Share on LinkedIn"
                  >
                    <span className="text-terminal-blue">💼</span>
                  </a>
                </div>
              </div>

              {/* Post Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                {post.views && (
                  <span className="flex items-center gap-2">
                    <span className="text-terminal-green">�️</span>
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
                <a
                  href={`${post.url}#comments`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-green/20 text-terminal-green rounded-lg hover:bg-terminal-green/30 transition-all duration-300"
                >
                  <span>💬</span>
                  Join Discussion on Hashnode
                </a>
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
                  <a
                    href={`${post.url}#comments`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-blue text-bg-dark font-semibold rounded-lg hover:bg-terminal-blue/80 transition-all duration-300 hover:scale-105"
                  >
                    <span>💬</span>
                    View Comments
                  </a>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green hover:text-bg-dark transition-all duration-300 hover:scale-105"
                  >
                    Read on Hashnode
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-gradient-to-br from-bg-dark/50 to-bg-light/50 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-6 hover:border-terminal-blue/40 transition-all duration-300 hover:scale-105"
                >
                  {relatedPost.coverImage ? (
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={relatedPost.coverImage.url}
                        alt={relatedPost.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-terminal-purple/20 to-terminal-blue/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl mb-1">📖</div>
                        <div className="text-terminal-blue font-mono text-xs">
                          {relatedPost.tags?.[0]?.name || 'Article'}
                        </div>
                      </div>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-terminal-blue transition-colors mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                    {relatedPost.brief}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(relatedPost.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {relatedPost.readTimeInMinutes} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}



        {/* Enhanced Author Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-terminal-blue/5 via-bg-dark/60 to-terminal-green/5 border border-terminal-green/20 rounded-xl p-8">
            {/* Author Card */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="flex-shrink-0 relative">
                {post.author.profilePicture && (
                  <div className="relative">
                    <Image
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      width={100}
                      height={100}
                      className="rounded-full border-3 border-terminal-green/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-terminal-green rounded-full border-2 border-bg-dark flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-text-primary">
                    {post.author.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-terminal-blue/20 text-terminal-blue rounded-full text-sm font-medium">
                      @{post.author.username}
                    </span>
                    <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm font-medium">
                      Author
                    </span>
                  </div>
                </div>
                
                {post.author.bio && (
                  <p className="text-text-secondary leading-relaxed mb-4 max-w-2xl">
                    {typeof post.author.bio === 'string' ? post.author.bio : post.author.bio.text}
                  </p>
                )}

                {/* Social Links */}
                {post.author.socialMediaLinks && (
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    {post.author.socialMediaLinks.website && (
                      <a
                        href={post.author.socialMediaLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                        title="Website"
                      >
                        <span className="text-terminal-blue">🌐</span>
                      </a>
                    )}
                    {post.author.socialMediaLinks.github && (
                      <a
                        href={post.author.socialMediaLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                        title="GitHub"
                      >
                        <span className="text-terminal-blue">🐙</span>
                      </a>
                    )}
                    {post.author.socialMediaLinks.twitter && (
                      <a
                        href={post.author.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                        title="Twitter"
                      >
                        <span className="text-terminal-blue">🐦</span>
                      </a>
                    )}
                    {post.author.socialMediaLinks.linkedin && (
                      <a
                        href={post.author.socialMediaLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-terminal-blue/10 hover:bg-terminal-blue/20 rounded-lg transition-all duration-300 hover:scale-105"
                        title="LinkedIn"
                      >
                        <span className="text-terminal-blue">💼</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center border-t border-terminal-green/20 pt-8">
              <h4 className="text-2xl font-bold text-terminal-green mb-4 terminal-glow">
                📚 More from {post.author.name}
              </h4>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Discover more articles on AI/ML, Data Science, and cutting-edge technology. 
                Follow for regular insights and join our growing developer community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://nischalneupane.hashnode.dev`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-all duration-300 hover:scale-105"
                >
                  <span>🔔</span>
                  Follow on Hashnode
                </a>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink size={18} />
                  View Original
                </a>
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-terminal-purple/20 text-terminal-purple font-semibold rounded-lg hover:bg-terminal-purple/30 transition-all duration-300 hover:scale-105"
                >
                  📖 Browse All Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}
