import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/hashnode';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, BookOpen } from 'lucide-react';

// Enable ISR for this page
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';
export const dynamicParams = true;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const response = await getBlogPosts(50);
    
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
      getRelatedPosts(params.slug, 6),
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
    <div className="min-h-screen bg-black text-green-500">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-500 transition-colors font-medium"
              >
                View on Hashnode
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Post Header */}
        <header className="mb-8">
          {/* Series Banner */}
          {post.series && (
            <div className="mb-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">Part of series:</span>
                <Link
                  href={`/blog/series/${post.series.slug}`}
                  className="text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  {post.series.name}
                </Link>
                <span className="text-gray-500">
                  ({post.series.posts?.totalDocuments || 0} posts)
                </span>
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-gray-400 mb-6">
              {post.subtitle}
            </p>
          )}

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <img
                src={post.author.profilePicture || '/default-avatar.png'}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-green-400">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-800 text-green-400 text-sm rounded-full border border-gray-700"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Engagement Actions */}
          <div className="flex items-center justify-between py-4 border-y border-gray-800 mb-8">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{post.reactionCount}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.responseCount}</span>
              </button>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Post Content */}
        <article className="prose prose-invert prose-green max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800">
          {/* Author Bio */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <img
                src={post.author.profilePicture || '/default-avatar.png'}
                alt={post.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  {post.author.name}
                </h3>
                {post.author.bio?.text && (
                  <p className="text-gray-400 mb-3">
                    {post.author.bio.text}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  {post.author.socialMediaLinks?.website && (
                    <a
                      href={post.author.socialMediaLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {post.author.socialMediaLinks?.twitter && (
                    <a
                      href={post.author.socialMediaLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {post.author.socialMediaLinks?.github && (
                    <a
                      href={post.author.socialMediaLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: any }) {
  return (
    <article className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-green-500 transition-colors group">
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold mb-2 text-sm group-hover:text-green-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {post.brief}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          <span>{post.readTimeInMinutes} min</span>
        </div>
      </div>
    </article>
  );
}