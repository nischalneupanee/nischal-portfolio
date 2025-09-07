import { notFound } from 'next/navigation';
import { Calendar, Clock, ExternalLink, Tag, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/hashnode';
import Image from 'next/image';
import Link from 'next/link';

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
  
  try {
    [post, relatedPosts] = await Promise.all([
      getBlogPostBySlug(params.slug),
      getRelatedPosts(params.slug, 4)
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

        {/* Article Content */}
                {/* Article Content */}
        <article className="mb-16">
          <div 
            className="prose prose-invert prose-lg max-w-none
                     prose-headings:text-text-primary prose-headings:font-bold
                     prose-p:text-text-secondary prose-p:leading-relaxed
                     prose-a:text-terminal-blue prose-a:no-underline hover:prose-a:underline
                     prose-code:text-terminal-green prose-code:bg-bg-dark prose-code:px-1 prose-code:rounded
                     prose-pre:bg-bg-dark prose-pre:border prose-pre:border-terminal-blue/20
                     prose-blockquote:border-l-4 prose-blockquote:border-terminal-blue prose-blockquote:bg-bg-dark/50
                     prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>

        {/* Post Stats and Actions */}
        <section className="mb-16 bg-bg-dark/50 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
              {post.views && (
                <span className="flex items-center gap-2">
                  <span>👁️</span>
                  {post.views.toLocaleString()} views
                </span>
              )}
              {post.reactionCount > 0 && (
                <span className="flex items-center gap-2">
                  <span>👍</span>
                  {post.reactionCount} reactions
                </span>
              )}
              {post.responseCount > 0 && (
                <span className="flex items-center gap-2">
                  <span>💬</span>
                  {post.responseCount} responses
                </span>
              )}
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="flex items-center gap-2">
                  <span>✏️</span>
                  Updated {formatDate(post.updatedAt)}
                </span>
              )}
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
                  className="group bg-bg-dark/50 backdrop-blur-sm border border-terminal-blue/20 rounded-xl p-6 hover:border-terminal-blue/40 transition-all duration-300"
                >
                  {relatedPost.coverImage && (
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={relatedPost.coverImage.url}
                        alt={relatedPost.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-terminal-blue/10 to-terminal-green/10 border border-terminal-blue/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Follow me on Hashnode for more articles about AI, Machine Learning, and Software Development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-colors"
            >
              <ExternalLink size={18} />
              Follow on Hashnode
            </a>
            <Link
              href="/blog"
              className="px-6 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-terminal-green/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              {post.author.profilePicture && (
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-text-primary">{post.author.name}</p>
                <p className="text-sm text-text-muted">@{post.author.username}</p>
              </div>
            </div>

            {/* External Link */}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-terminal-blue text-bg-dark font-medium rounded-lg hover:bg-terminal-blue/80 transition-colors"
            >
              <span>View on Hashnode</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </footer>

        {/* Call to Action */}
        <section className="mt-16">
          <div className="bg-bg-light rounded-lg p-8 text-center border border-terminal-green/20">
            <h3 className="text-2xl font-bold text-terminal-green mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-text-secondary mb-6">
              Follow me on Hashnode for more articles on AI/ML, Data Science, and tech insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://nischalneupane.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-colors"
              >
                Follow on Hashnode
              </a>
              <Link
                href="/blog"
                className="px-6 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-lg hover:bg-terminal-blue hover:text-bg-dark transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
