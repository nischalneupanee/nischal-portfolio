import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getSeriesBySlug } from '@/lib/hashnode';
import { LoadingSpinner, PostCard } from '@/components/blog';

interface SeriesPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  try {
    const series = await getSeriesBySlug(params.slug);
    
    if (!series) {
      return { title: 'Series Not Found' };
    }

    return {
      title: `${series.name} | Nischal Neupane`,
      description: series.description?.text || `${series.name} tutorial series`,
    };
  } catch (error) {
    return { title: 'Series Not Found' };
  }
}

async function SeriesContent({ slug }: { slug: string }) {
  // Series functionality temporarily disabled due to API compatibility
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/blog/series"
          className="flex items-center space-x-2 text-terminal-green hover:text-terminal-green/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Series</span>
        </Link>
      </div>

      <div className="glass rounded-xl p-8 border border-terminal-green/20 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Series Coming Soon
        </h1>
        
        <p className="text-xl text-text-secondary mb-6">
          Series functionality is being prepared and will be available soon.
        </p>

        <div className="text-sm text-text-muted">
          Check back for updates!
        </div>
      </div>
    </div>
  );
}

export default function SeriesDetailPage({ params }: SeriesPageProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<LoadingSpinner size="large" text="Loading series..." />}>
          <SeriesContent slug={params.slug} />
        </Suspense>
      </div>
    </div>
  );
}