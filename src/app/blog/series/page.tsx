'use client';

import { useState, useEffect } from 'react';
import { getAllSeries, Series } from '@/lib/hashnode';
import Link from 'next/link';

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const { series: fetchedSeries } = await getAllSeries(50);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
        setError('Failed to load series');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

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

  if (error) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-4">Error Loading Series</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/blog"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">Series</h1>
          <p className="text-lg text-gray-400">
            Organized collections of related posts and tutorials
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {series.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Series Found</h3>
            <p className="text-gray-400">
              No series have been created yet. Check back later for organized content collections.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((singleSeries) => (
              <SeriesCard key={singleSeries.id} series={singleSeries} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SeriesCard({ series }: { series: Series }) {
  return (
    <article className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-green-500 transition-colors group">
      {series.coverImage?.url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={series.coverImage.url}
            alt={series.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
          <Link href={`/blog/series/${series.slug}`}>
            {series.name}
          </Link>
        </h3>
        {series.description?.text && (
          <p className="text-gray-400 mb-4 line-clamp-3">
            {series.description.text}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            {series.posts.totalDocuments} {series.posts.totalDocuments === 1 ? 'post' : 'posts'}
          </span>
          <span className="text-green-400">
            by {series.author.name}
          </span>
        </div>
        <div className="mt-4">
          <Link
            href={`/blog/series/${series.slug}`}
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            View Series
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}