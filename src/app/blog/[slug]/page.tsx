import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Clock, User, Heart, Eye } from 'lucide-react';
import { getPostBySlug } from '@/lib/hashnode';
import { 
  LoadingSpinner, 
  ReadingProgress, 
  SocialShare, 
  TableOfContents 
} from '@/components/blog';
import { format } from 'date-fns';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return { title: 'Post Not Found' };
    }

    return {
      title: `${post.title} | Nischal Neupane`,
      description: post.brief,
      openGraph: {
        title: post.title,
        description: post.brief,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        images: post.coverImage ? [{ url: post.coverImage.url }] : [],
        url: `/blog/${params.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.brief,
        images: post.coverImage ? [post.coverImage.url] : [],
      },
    };
  } catch (error) {
    return { title: 'Post Not Found' };
  }
}

async function BlogPostContent({ slug }: { slug: string }) {
  try {
    const post = await getPostBySlug(slug);
    
    if (!post) {
      notFound();
    }

    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nischalneupane.com.np'}/blog/${slug}`;
    const readingTime = Math.ceil(post.readTimeInMinutes || 5);

    return (
      <>
        <ReadingProgress target="article" />
        
        {/* Floating Social Share */}
        <SocialShare 
          url={currentUrl}
          title={post.title}
          description={post.brief}
          image={post.coverImage?.url}
          variant="floating"
        />

        {/* Floating Table of Contents */}
        <TableOfContents 
          content={post.content.html}
          variant="floating"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-terminal-green hover:text-terminal-green/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
              
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors"
              >
                <span>View on Hashnode</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={post.coverImage.url} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-text-secondary mb-6">{post.brief}</p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
                {post.views && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                )}
                {post.reactionCount && (
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{post.reactionCount} reactions</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tags=${encodeURIComponent(tag.name)}`}
                      className="px-3 py-1 bg-gray-800 text-terminal-green rounded-full text-sm hover:bg-gray-700 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Social Share - Horizontal */}
            <div className="mb-8">
              <SocialShare 
                url={currentUrl}
                title={post.title}
                description={post.brief}
                image={post.coverImage?.url}
                variant="horizontal"
                showLabels={true}
              />
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            />

            {/* Series Navigation */}
            {post.series && (
              <div className="mb-8 p-6 glass rounded-lg border border-terminal-green/20">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Part of the &ldquo;{post.series.name}&rdquo; series
                </h3>
                <Link 
                  href={`/blog/series/${post.series.slug}`}
                  className="text-terminal-green hover:text-terminal-green/80 transition-colors"
                >
                  View all posts in this series →
                </Link>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="glass rounded-xl p-8 border border-terminal-green/20">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Enjoyed this article?
                </h3>
                <p className="text-text-secondary mb-6">
                  Share it with others and let me know your thoughts!
                </p>
              </div>

              {/* Social Share - Bottom */}
              <div className="mb-6">
                <SocialShare 
                  url={currentUrl}
                  title={post.title}
                  description={post.brief}
                  image={post.coverImage?.url}
                  variant="horizontal"
                  showLabels={true}
                  className="justify-center"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-terminal-green text-background px-6 py-3 rounded-lg hover:bg-terminal-green/90 transition-colors font-medium text-center"
                >
                  View on Hashnode
                </Link>
                <Link
                  href="/blog"
                  className="border border-terminal-green/30 text-terminal-green px-6 py-3 rounded-lg hover:bg-terminal-green/10 transition-colors font-medium text-center"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <TableOfContents 
                content={post.content.html}
                variant="sidebar"
                className="hidden lg:block"
              />

              {/* Author Info */}
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  {post.author.profilePicture && (
                    <img 
                      src={post.author.profilePicture} 
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium text-text-primary">{post.author.name}</div>
                    <div className="text-sm text-text-muted">Developer & Writer</div>
                  </div>
                </div>
                {post.author.bio && (
                  <p className="text-text-secondary text-sm">
                    {typeof post.author.bio === 'string' ? post.author.bio : post.author.bio.text}
                  </p>
                )}
              </div>

              {/* Related Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="glass rounded-lg p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Related Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog?tags=${encodeURIComponent(tag.name)}`}
                        className="px-3 py-1 bg-gray-800 text-terminal-green rounded-full text-sm hover:bg-gray-700 transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner size="large" text="Loading article..." />}>
          <BlogPostContent slug={params.slug} />
        </Suspense>
      </div>
    </div>
  );
}