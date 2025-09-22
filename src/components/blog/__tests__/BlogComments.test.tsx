import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BlogComments from '../BlogComments';

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn()
});

const mockProps = {
  postSlug: 'test-blog-post',
  postTitle: 'Test Blog Post',
  hashnodeUrl: 'https://test-blog.hashnode.dev/test-blog-post',
  reactionCount: 10,
  responseCount: 5
};

describe('BlogComments Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders discussion section with correct title', () => {
    render(<BlogComments {...mockProps} />);
    
    expect(screen.getByText('Discussion')).toBeInTheDocument();
  });

  it('displays engagement stats in detailed view', () => {
    render(<BlogComments {...mockProps} />);
    
    expect(screen.getByText('10 reactions')).toBeInTheDocument();
    expect(screen.getByText('5 responses')).toBeInTheDocument();
  });

  it('handles zero engagement gracefully', () => {
    const propsWithZeroEngagement = {
      ...mockProps,
      reactionCount: 0,
      responseCount: 0
    };

    render(<BlogComments {...propsWithZeroEngagement} />);
    
    expect(screen.getByText('0 reactions')).toBeInTheDocument();
    expect(screen.getByText('0 responses')).toBeInTheDocument();
  });

  it('opens hashnode URL when view comments button is clicked', async () => {
    const user = userEvent.setup();
    render(<BlogComments {...mockProps} />);
    
    const viewCommentsButton = screen.getByRole('button', { name: /view on hashnode/i });
    await user.click(viewCommentsButton);
    
    expect(window.open).toHaveBeenCalledWith(
      mockProps.hashnodeUrl,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('shows embed iframe when embed comments button is clicked', async () => {
    const user = userEvent.setup();
    render(<BlogComments {...mockProps} />);
    
    const embedButton = screen.getByRole('button', { name: /embed comments/i });
    await user.click(embedButton);
    
    // Should show iframe
    const iframe = screen.getByTitle(`Comments for ${mockProps.postTitle}`);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', `${mockProps.hashnodeUrl}?embed=comments`);
  });

  it('applies correct CSS classes for styling', () => {
    render(<BlogComments {...mockProps} />);
    
    const discussionSection = screen.getByText('Discussion').closest('div');
    expect(discussionSection?.parentElement).toHaveClass('mt-12', 'border-t', 'border-terminal-green/20', 'pt-8');
  });

  it('handles very large engagement numbers', () => {
    const propsWithLargeNumbers = {
      ...mockProps,
      reactionCount: 50000,
      responseCount: 2500
    };

    render(<BlogComments {...propsWithLargeNumbers} />);
    
    expect(screen.getByText('50000 reactions')).toBeInTheDocument();
    expect(screen.getByText('2500 responses')).toBeInTheDocument();
  });

  it('has proper accessibility for buttons', () => {
    render(<BlogComments {...mockProps} />);
    
    const viewButton = screen.getByRole('button', { name: /view on hashnode/i });
    const embedButton = screen.getByRole('button', { name: /embed comments/i });
    
    expect(viewButton).toBeInTheDocument();
    expect(embedButton).toBeInTheDocument();
  });

  it('maintains responsive design with proper icon usage', () => {
    render(<BlogComments {...mockProps} />);
    
    // Check for icons (MessageCircle, Heart, etc.)
    const messageIcon = document.querySelector('.lucide-message-circle');
    const heartIcon = document.querySelector('.lucide-heart');
    
    expect(messageIcon).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument();
  });

  it('handles iframe loading and display correctly', async () => {
    const user = userEvent.setup();
    render(<BlogComments {...mockProps} />);
    
    // Initially iframe should not be visible
    expect(screen.queryByTitle(`Comments for ${mockProps.postTitle}`)).not.toBeInTheDocument();
    
    // Click embed comments button
    const embedButton = screen.getByRole('button', { name: /embed comments/i });
    await user.click(embedButton);
    
    // Now iframe should be visible
    expect(screen.getByTitle(`Comments for ${mockProps.postTitle}`)).toBeInTheDocument();
  });

  it('constructs correct hashnode embed URL', async () => {
    const user = userEvent.setup();
    render(<BlogComments {...mockProps} />);
    
    const embedButton = screen.getByRole('button', { name: /embed comments/i });
    await user.click(embedButton);
    
    const iframe = screen.getByTitle(`Comments for ${mockProps.postTitle}`) as HTMLIFrameElement;
    expect(iframe.src).toBe(`${mockProps.hashnodeUrl}?embed=comments`);
  });

  it('shows join discussion message and hashnode link', () => {
    render(<BlogComments {...mockProps} />);
    
    expect(screen.getByText('Join the Discussion')).toBeInTheDocument();
    expect(screen.getByText(/Share your thoughts and engage with other readers/)).toBeInTheDocument();
    
    const hashnodeLink = screen.getByRole('link', { name: /hashnode/i });
    expect(hashnodeLink).toHaveAttribute('href', 'https://hashnode.com/@nischalneupane');
    expect(hashnodeLink).toHaveAttribute('target', '_blank');
  });

  it('shows view full discussion link in embedded mode', async () => {
    const user = userEvent.setup();
    render(<BlogComments {...mockProps} />);
    
    // Click embed comments button
    const embedButton = screen.getByRole('button', { name: /embed comments/i });
    await user.click(embedButton);
    
    // Should show "View Full Discussion" button
    const fullDiscussionButton = screen.getByRole('button', { name: /view full discussion/i });
    expect(fullDiscussionButton).toBeInTheDocument();
    
    // Click it to test window.open
    await user.click(fullDiscussionButton);
    expect(window.open).toHaveBeenCalledWith(
      mockProps.hashnodeUrl,
      '_blank',
      'noopener,noreferrer'
    );
  });
});