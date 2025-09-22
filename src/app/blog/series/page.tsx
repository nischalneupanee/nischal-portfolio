import { Suspense } from 'react';
import { Metadata } from 'next';
import { getSeries } from '@/lib/hashnode';
import { LoadingSpinner, ErrorState } from '@/components/blog';
import SeriesCard from '@/components/blog/SeriesCard';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog Series | Nischal Neupane',
  description: 'Explore curated blog series covering various topics in web development and programming',
};

export const revalidate = 3600;

async function SeriesContent() {
  // Series functionality temporarily disabled due to API compatibility
  // This will be re-enabled once the correct Hashnode API schema is determined
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-terminal-green hover:text-terminal-green/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Blog <span className="text-terminal-green">Series</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Comprehensive tutorial series covering web development topics
        </p>
      </div>

      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">Series Coming Soon</h3>
        <p className="text-text-secondary mb-6">
          We&apos;re working on comprehensive tutorial series. Check back soon!
        </p>
        <Link
          href="/blog"
          className="bg-terminal-green text-background px-6 py-3 rounded-lg hover:bg-terminal-green/90 transition-colors font-medium"
        >
          Browse Posts
        </Link>
      </div>
    </div>
  );
}

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner size="large" text="Loading series..." />}>
          <SeriesContent />
        </Suspense>
      </div>
    </div>
  );
}