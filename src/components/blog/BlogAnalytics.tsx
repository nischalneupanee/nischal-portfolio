'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BlogAnalyticsProps {
  postId?: string;
  postTitle?: string;
  postAuthor?: string;
  postTags?: string[];
}

export default function BlogAnalytics({ 
  postId, 
  postTitle, 
  postAuthor, 
  postTags 
}: BlogAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      // Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_title: postTitle || document.title,
          page_location: window.location.href,
          custom_map: {
            custom_parameter_1: 'blog_post_id',
            custom_parameter_2: 'blog_post_author',
          }
        });

        // Custom event for blog post views
        if (postId) {
          window.gtag('event', 'blog_post_view', {
            blog_post_id: postId,
            blog_post_title: postTitle,
            blog_post_author: postAuthor,
            blog_post_tags: postTags?.join(','),
            value: 1
          });
        }
      }

      // Plausible Analytics (if used)
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('pageview', {
          props: {
            post_id: postId,
            post_title: postTitle,
            post_author: postAuthor,
            post_tags: postTags?.join(','),
          }
        });
      }
    };

    // Track immediately
    trackPageView();

    // Track reading progress for blog posts
    if (postId) {
      const trackReadingProgress = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        // Track reading milestones
        const milestones = [25, 50, 75, 90, 100];
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !sessionStorage.getItem(`read_${postId}_${milestone}`)) {
            sessionStorage.setItem(`read_${postId}_${milestone}`, 'true');
            
            if (window.gtag) {
              window.gtag('event', 'blog_reading_progress', {
                blog_post_id: postId,
                progress_percentage: milestone,
                value: milestone
              });
            }

            if (window.plausible) {
              window.plausible('Reading Progress', {
                props: {
                  post_id: postId,
                  percentage: milestone
                }
              });
            }
          }
        });
      };

      const handleScroll = () => {
        requestAnimationFrame(trackReadingProgress);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname, postId, postTitle, postAuthor, postTags]);

  // Track time spent on page
  useEffect(() => {
    if (!postId) return;

    const startTime = Date.now();

    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (timeSpent > 10 && window.gtag) { // Only track if spent more than 10 seconds
        window.gtag('event', 'blog_time_spent', {
          blog_post_id: postId,
          time_spent_seconds: timeSpent,
          value: timeSpent
        });
      }
    };

    const handleBeforeUnload = trackTimeSpent;
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackTimeSpent();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      trackTimeSpent();
    };
  }, [postId]);

  return null; // This component doesn't render anything
}

// Utility function to track custom blog events
export const trackBlogEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Plausible Analytics
    if (window.plausible) {
      window.plausible(eventName, { props: properties });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Blog Event: ${eventName}`, properties);
    }
  }
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    plausible: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}