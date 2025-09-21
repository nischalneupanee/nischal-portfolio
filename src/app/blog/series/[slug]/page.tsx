'use client';

import { useState, useEffect } from 'react';
import { getSeriesBySlug, Series, BlogPost } from '@/lib/hashnode';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SeriesDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchSeries = async () => {
      try {
        setLoading(true);
        const fetchedSeries = await getSeriesBySlug(slug);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
        setError('Failed to load series');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-lg">Loading series...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-4">Series Not Found</h2>
            <p className="mb-4">{error || 'The requested series could not be found.'}</p>
            <Link
              href="/blog/series"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to All Series
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/blog/series"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              ← Back to Series
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{series.name}</h1>
              {series.description?.text && (
                <p className="text-lg text-gray-400 mb-6">
                  {series.description.text}
                </p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  {series.posts.totalDocuments} {series.posts.totalDocuments === 1 ? 'post' : 'posts'}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  by {series.author.name}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(series.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {series.coverImage?.url && (
              <div className="lg:col-span-1">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={series.coverImage.url}
                    alt={series.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts in Series */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Posts in this Series</h2>
          
          {series.posts.edges.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No posts found in this series.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {series.posts.edges.map((edge, index) => (
                <SeriesPostCard 
                  key={edge.node.id} 
                  post={edge.node} 
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SeriesPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center font-bold text-sm">
            {index}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 hover:text-green-400 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          {post.subtitle && (
            <p className="text-gray-300 mb-2 font-medium">
              {post.subtitle}
            </p>
          )}
          
          <p className="text-gray-400 mb-4 line-clamp-2">
            {post.brief}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
              <span>{post.readTimeInMinutes} min read</span>
              {post.featured && (
                <span className="px-2 py-1 bg-yellow-600 text-yellow-200 text-xs rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {post.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {post.reactionCount}
              </span>
            </div>
          </div>
          
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.coverImage && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ml-4">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </article>
  );
}