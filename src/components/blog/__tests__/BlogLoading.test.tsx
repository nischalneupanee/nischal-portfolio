import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogLoading from '../BlogLoading';

describe('BlogLoading Component', () => {
  it('renders blog loading skeleton correctly', () => {
    render(<BlogLoading />);
    
    const loadingContainer = screen.getByTestId('blog-loading');
    expect(loadingContainer).toBeInTheDocument();
  });

  it('shows search skeleton', () => {
    render(<BlogLoading />);
    
    const searchSkeleton = screen.getByTestId('search-skeleton');
    expect(searchSkeleton).toBeInTheDocument();
    expect(searchSkeleton).toHaveClass('h-12', 'bg-text-muted/20', 'rounded-lg', 'animate-pulse');
  });

  it('renders featured post skeleton', () => {
    render(<BlogLoading />);
    
    const featuredSkeleton = screen.getByTestId('featured-post-skeleton');
    expect(featuredSkeleton).toBeInTheDocument();
    expect(featuredSkeleton).toHaveClass('col-span-full', 'lg:col-span-2');
  });

  it('renders multiple regular post skeletons', () => {
    render(<BlogLoading />);
    
    const postSkeletons = screen.getAllByTestId('post-skeleton');
    expect(postSkeletons).toHaveLength(6); // Assuming 6 regular post skeletons
  });

  it('shows newsletter subscription skeleton', () => {
    render(<BlogLoading />);
    
    const newsletterSkeleton = screen.getByTestId('newsletter-skeleton');
    expect(newsletterSkeleton).toBeInTheDocument();
    expect(newsletterSkeleton).toHaveClass('glass', 'rounded-xl', 'p-6');
  });

  it('maintains proper grid layout', () => {
    render(<BlogLoading />);
    
    const postsGrid = screen.getByTestId('posts-grid-skeleton');
    expect(postsGrid).toBeInTheDocument();
    expect(postsGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
  });

  it('shows animated pulse effects', () => {
    render(<BlogLoading />);
    
    const animatedElements = document.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('renders section headers skeleton', () => {
    render(<BlogLoading />);
    
    const headerSkeleton = screen.getByTestId('section-header-skeleton');
    expect(headerSkeleton).toBeInTheDocument();
    expect(headerSkeleton).toHaveClass('h-8', 'w-48', 'bg-text-muted/20', 'rounded');
  });

  it('shows filter section skeleton', () => {
    render(<BlogLoading />);
    
    const filterSkeleton = screen.getByTestId('filter-skeleton');
    expect(filterSkeleton).toBeInTheDocument();
    expect(filterSkeleton).toHaveClass('h-10', 'w-32', 'bg-text-muted/20', 'rounded');
  });

  it('renders tag filter skeletons', () => {
    render(<BlogLoading />);
    
    const tagSkeletons = screen.getAllByTestId('tag-filter-skeleton');
    expect(tagSkeletons.length).toBeGreaterThan(0);
    
    tagSkeletons.forEach(tag => {
      expect(tag).toHaveClass('h-8', 'w-20', 'bg-text-muted/20', 'rounded-full');
    });
  });

  it('shows pagination skeleton', () => {
    render(<BlogLoading />);
    
    const paginationSkeleton = screen.getByTestId('pagination-skeleton');
    expect(paginationSkeleton).toBeInTheDocument();
    expect(paginationSkeleton).toHaveClass('h-10', 'bg-text-muted/20', 'rounded');
  });

  it('maintains responsive design', () => {
    render(<BlogLoading />);
    
    const container = screen.getByTestId('blog-loading');
    expect(container).toHaveClass('space-y-8');
    
    // Check responsive grid
    const grid = screen.getByTestId('posts-grid-skeleton');
    expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('shows correct loading text', () => {
    render(<BlogLoading />);
    
    expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<BlogLoading />);
    
    const loadingContainer = screen.getByTestId('blog-loading');
    expect(loadingContainer).toHaveAttribute('role', 'status');
    expect(loadingContainer).toHaveAttribute('aria-label', 'Loading blog content');
  });

  it('renders consistent with actual blog layout', () => {
    render(<BlogLoading />);
    
    // Should match the actual blog page structure
    expect(screen.getByTestId('search-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('featured-post-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('posts-grid-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-skeleton')).toBeInTheDocument();
  });

  it('shows loading state for all major sections', () => {
    render(<BlogLoading />);
    
    // Search section
    expect(screen.getByTestId('search-skeleton')).toBeInTheDocument();
    
    // Featured post section
    expect(screen.getByTestId('featured-post-skeleton')).toBeInTheDocument();
    
    // Regular posts section
    expect(screen.getByTestId('posts-grid-skeleton')).toBeInTheDocument();
    
    // Newsletter section
    expect(screen.getByTestId('newsletter-skeleton')).toBeInTheDocument();
    
    // Pagination
    expect(screen.getByTestId('pagination-skeleton')).toBeInTheDocument();
  });

  it('applies consistent styling across all skeletons', () => {
    render(<BlogLoading />);
    
    const skeletonElements = document.querySelectorAll('[data-testid*="skeleton"]');
    
    skeletonElements.forEach(element => {
      // All skeleton elements should have the loading background
      expect(element.classList.toString()).toMatch(/bg-text-muted\/20|animate-pulse/);
    });
  });

  it('renders proper spacing between sections', () => {
    render(<BlogLoading />);
    
    const container = screen.getByTestId('blog-loading');
    expect(container).toHaveClass('space-y-8');
  });

  it('shows author skeleton in featured post', () => {
    render(<BlogLoading />);
    
    const authorSkeleton = screen.getByTestId('featured-author-skeleton');
    expect(authorSkeleton).toBeInTheDocument();
    expect(authorSkeleton).toHaveClass('h-4', 'w-24', 'bg-text-muted/20', 'rounded');
  });

  it('renders engagement metrics skeleton', () => {
    render(<BlogLoading />);
    
    const engagementSkeleton = screen.getByTestId('engagement-skeleton');
    expect(engagementSkeleton).toBeInTheDocument();
    expect(engagementSkeleton).toHaveClass('h-4', 'w-16', 'bg-text-muted/20', 'rounded');
  });
});