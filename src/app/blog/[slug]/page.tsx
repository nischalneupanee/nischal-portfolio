import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Eye, 
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  Hash,
  BookOpen
} from 'lucide-react';
import { getPostBySlug } from '@/lib/hashnode';
import { 
  LoadingSpinner, 
  ReadingProgress, 
  SocialShare, 
  TableOfContents 
} from '@/components/blog';
import BlogComments from '@/components/blog/BlogComments';
import NewsletterSubscription from '@/components/blog/NewsletterSubscription';

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
      robots: {
        index: true,
        follow: true,
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

    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${slug}`;
    const readingTime = Math.ceil(post.readTimeInMinutes || 5);

    return (
      <div className="min-h-screen bg-background">
        <ReadingProgress target="article" />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-terminal-green hover:text-terminal-green/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
            
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors group"
            >
              <span>View on Hashnode</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <article className="glass rounded-lg border border-terminal-green/20 overflow-hidden">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {post.subtitle && (
                  <p className="text-xl text-text-secondary mb-6 leading-relaxed">
                    {post.subtitle}
                  </p>
                )}

                <div className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {post.brief}
                </div>

                {/* Author and Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary mb-6">
                  <div className="flex items-center space-x-3">
                    {post.author.profilePicture && (
                      <Image
                        src={post.author.profilePicture}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-terminal-green/20"
                      />
                    )}
                    <div>
                      <div className="font-medium text-text-primary">{post.author.name}</div>
                      <div className="text-xs text-text-secondary">@{post.author.username}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-6 text-sm mb-6">
                  <div className="flex items-center space-x-1 text-red-400">
                    <Heart className="w-4 h-4" />
                    <span>{post.reactionCount} reactions</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-blue-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.responseCount} comments</span>
                  </div>

                  {post.featured && (
                    <div className="flex items-center space-x-1 text-terminal-green">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Featured Post</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog?tags=${encodeURIComponent(tag.name)}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800/50 text-terminal-green rounded-full text-sm hover:bg-gray-700/50 transition-colors border border-terminal-green/20"
                      >
                        <Hash className="w-3 h-3" />
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Series Info */}
                {post.series && (
                  <div className="mb-6 p-4 bg-terminal-green/10 border border-terminal-green/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-terminal-green" />
                      <span className="text-sm font-medium text-terminal-green">Part of Series</span>
                    </div>
                    <Link 
                      href={`/blog/series/${post.series.slug}`}
                      className="text-text-primary hover:text-terminal-green transition-colors font-medium"
                    >
                      {post.series.name}
                    </Link>
                  </div>
                )}

                {/* Social Share */}
                <div className="border-t border-gray-800/50 pt-6">
                  <SocialShare 
                    url={currentUrl}
                    title={post.title}
                    description={post.brief}
                    image={post.coverImage?.url}
                    variant="horizontal"
                    showLabels={true}
                  />
                </div>
              </header>

              {/* Table of Contents */}
              <div className="mb-8">
                <TableOfContents 
                  content={post.content.html}
                  variant="inline"
                />
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg prose-invert max-w-none mb-8 prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-terminal-green prose-strong:text-text-primary prose-code:text-terminal-green prose-pre:bg-gray-900 prose-pre:border prose-pre:border-terminal-green/20"
                dangerouslySetInnerHTML={{ __html: post.content.html }}
              />

              {/* Bottom Actions */}
              <div className="border-t border-gray-800/50 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>Like ({post.reactionCount})</span>
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comment ({post.responseCount})</span>
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <SocialShare 
                      url={currentUrl}
                      title={post.title}
                      description={post.brief}
                      image={post.coverImage?.url}
                      variant="horizontal"
                      showLabels={false}
                    />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {!post.preferences.disableComments && (
                <div className="border-t border-gray-800/50 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    Comments ({post.responseCount})
                  </h3>
                  
                  <div className="bg-gray-800/30 border border-terminal-green/20 rounded-lg p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-terminal-green mx-auto mb-3" />
                    <p className="text-text-secondary mb-4">
                      Join the discussion on Hashnode to read and write comments.
                    </p>
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-green text-black rounded-lg hover:bg-terminal-green/80 transition-colors font-medium"
                    >
                      <span>View Comments on Hashnode</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="border-t border-gray-800/50 pt-8 mt-8">
                <div className="flex items-start gap-4">
                  {post.author.profilePicture && (
                    <Image
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="rounded-full border-2 border-terminal-green/20"
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-1">
                      {post.author.name}
                    </h4>
                    <p className="text-sm text-terminal-green mb-2">
                      @{post.author.username}
                    </p>
                    {post.author.bio && (
                      <p className="text-text-secondary mb-3">
                        {post.author.bio.text}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      {post.author.socialMediaLinks?.website && (
                        <Link
                          href={post.author.socialMediaLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terminal-green hover:text-terminal-green/80 transition-colors"
                        >
                          Website
                        </Link>
                      )}
                      {post.author.socialMediaLinks?.twitter && (
                        <Link
                          href={post.author.socialMediaLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terminal-green hover:text-terminal-green/80 transition-colors"
                        >
                          Twitter
                        </Link>
                      )}
                      {post.author.socialMediaLinks?.github && (
                        <Link
                          href={post.author.socialMediaLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-terminal-green hover:text-terminal-green/80 transition-colors"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-12">
              <NewsletterSubscription 
                title="Enjoyed this article?"
                description="Subscribe for more tutorials and insights like this one"
              />
            </div>

            {/* Comments Section */}
            <BlogComments 
              postSlug={post.slug}
              postTitle={post.title}
              hashnodeUrl={`https://nischalneupane.hashnode.dev/${post.slug}`}
              reactionCount={post.reactionCount}
              responseCount={post.responseCount}
            />
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      }>
        <BlogPostContent slug={params.slug} />
      </Suspense>
    </div>
  );
}