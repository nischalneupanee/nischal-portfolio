import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCardSkeleton from '../PostCardSkeleton';

describe('PostCardSkeleton Component', () => {
  it('renders default variant skeleton correctly', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('glass', 'rounded-xl', 'p-6');
  });

  it('renders featured variant skeleton correctly', () => {
    render(<PostCardSkeleton variant="featured" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('col-span-full', 'lg:col-span-2');
  });

  it('renders compact variant skeleton correctly', () => {
    render(<PostCardSkeleton variant="compact" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('glass', 'rounded-lg', 'p-4');
  });

  it('shows animated loading elements', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const animatedElements = document.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('renders title placeholder', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const titlePlaceholder = screen.getByTestId('skeleton-title');
    expect(titlePlaceholder).toBeInTheDocument();
    expect(titlePlaceholder).toHaveClass('h-6', 'bg-text-muted/20', 'rounded');
  });

  it('renders author placeholder', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const authorPlaceholder = screen.getByTestId('skeleton-author');
    expect(authorPlaceholder).toBeInTheDocument();
    expect(authorPlaceholder).toHaveClass('h-4', 'bg-text-muted/20', 'rounded');
  });

  it('renders date placeholder', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const datePlaceholder = screen.getByTestId('skeleton-date');
    expect(datePlaceholder).toBeInTheDocument();
    expect(datePlaceholder).toHaveClass('h-4', 'bg-text-muted/20', 'rounded');
  });

  it('renders brief placeholder for non-compact variants', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const briefPlaceholder = screen.getByTestId('skeleton-brief');
    expect(briefPlaceholder).toBeInTheDocument();
  });

  it('does not render brief placeholder for compact variant', () => {
    render(<PostCardSkeleton variant="compact" />);
    
    const briefPlaceholder = screen.queryByTestId('skeleton-brief');
    expect(briefPlaceholder).not.toBeInTheDocument();
  });

  it('renders tag placeholders', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const tagPlaceholders = screen.getAllByTestId('skeleton-tag');
    expect(tagPlaceholders).toHaveLength(2); // Assuming 2 tag placeholders
    
    tagPlaceholders.forEach(tag => {
      expect(tag).toHaveClass('h-6', 'w-16', 'bg-text-muted/20', 'rounded-full');
    });
  });

  it('renders engagement placeholder', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const engagementPlaceholder = screen.getByTestId('skeleton-engagement');
    expect(engagementPlaceholder).toBeInTheDocument();
    expect(engagementPlaceholder).toHaveClass('h-4', 'bg-text-muted/20', 'rounded');
  });

  it('renders cover image placeholder for featured variant', () => {
    render(<PostCardSkeleton variant="featured" />);
    
    const imagePlaceholder = screen.getByTestId('skeleton-image');
    expect(imagePlaceholder).toBeInTheDocument();
    expect(imagePlaceholder).toHaveClass('h-48', 'bg-text-muted/20', 'rounded-lg');
  });

  it('maintains consistent layout with actual PostCard', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    
    // Should have similar layout classes as PostCard
    expect(skeleton).toHaveClass('border', 'border-terminal-green/20');
  });

  it('applies correct spacing and padding', () => {
    render(<PostCardSkeleton variant="featured" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toHaveClass('p-6');
  });

  it('renders multiple skeleton cards correctly', () => {
    render(
      <div>
        <PostCardSkeleton variant="default" />
        <PostCardSkeleton variant="default" />
        <PostCardSkeleton variant="compact" />
      </div>
    );
    
    const skeletons = screen.getAllByTestId('post-card-skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('has proper CSS animation classes', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const animatedElements = document.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
    
    // Each animated element should have proper background
    animatedElements.forEach(element => {
      expect(element).toHaveClass('bg-text-muted/20');
    });
  });

  it('renders responsive grid layout for featured variant', () => {
    render(<PostCardSkeleton variant="featured" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toHaveClass('col-span-full', 'lg:col-span-2', 'grid');
  });

  it('maintains accessibility during loading state', () => {
    render(<PostCardSkeleton variant="default" />);
    
    const skeleton = screen.getByTestId('post-card-skeleton');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading post...');
  });
});