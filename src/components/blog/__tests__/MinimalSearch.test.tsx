import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MinimalSearch from '../MinimalSearch';

const mockTags = [
  { name: 'React', count: 10 },
  { name: 'TypeScript', count: 8 },
  { name: 'Next.js', count: 6 },
  { name: 'JavaScript', count: 12 }
];

const mockProps = {
  onSearchChange: jest.fn(),
  onFilterChange: jest.fn(),
  availableTags: mockTags,
  isLoading: false,
  totalResults: 25,
  className: ''
};

describe('MinimalSearch Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders search input with proper placeholder', () => {
    render(<MinimalSearch {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('pl-14'); // Check for fixed padding
  });

  it('calls onSearchChange when typing in search input with debounce', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    await user.type(searchInput, 'react');
    
    // Fast-forward time to trigger debounce and wrap in act
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('react');
    expect(mockProps.onFilterChange).toHaveBeenCalledWith({
      search: 'react',
      tags: [],
      sortBy: 'newest'
    });
  });

  it('shows loading spinner when isLoading is true', () => {
    const loadingProps = { ...mockProps, isLoading: true };
    render(<MinimalSearch {...loadingProps} />);
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders filter toggle button', () => {
    render(<MinimalSearch {...mockProps} />);
    
    const filterButton = screen.getByRole('button');
    expect(filterButton).toBeInTheDocument();
    
    // Check for filter icon
    const filterIcon = document.querySelector('.lucide-sliders-horizontal');
    expect(filterIcon).toBeInTheDocument();
  });

  it('shows filters when filter button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...mockProps} />);
    
    // Find the filter button by its text content
    const filterButton = screen.getByRole('button', { name: /filters/i });
    await user.click(filterButton);
    
    // Should show tag filters
    await waitFor(() => {
      expect(screen.getByText('Topics')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('renders all available tags with counts', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...mockProps} />);
    
    // Open filters first
    const filterButton = screen.getByRole('button', { name: /filters/i });
    await user.click(filterButton);
    
    await waitFor(() => {
      mockTags.forEach(tag => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
        expect(screen.getByText(`(${tag.count})`)).toBeInTheDocument();
      });
    }, { timeout: 1000 });
  });

  it('handles tag selection correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...mockProps} />);
    
    // Open filters first
    const filterButton = screen.getByRole('button', { name: /filters/i });
    await user.click(filterButton);
    
    await waitFor(async () => {
      const reactTag = screen.getByText('React').closest('button');
      await user.click(reactTag!);
      
      expect(mockProps.onFilterChange).toHaveBeenCalledWith({
        search: '',
        tags: ['React'],
        sortBy: 'newest'
      });
    }, { timeout: 1000 });
  });

  it('shows correct icons', () => {
    render(<MinimalSearch {...mockProps} />);
    
    // Check for search icon
    const searchIcon = document.querySelector('.lucide-search');
    expect(searchIcon).toBeInTheDocument();
    
    // Check for filter icon
    const filterIcon = document.querySelector('.lucide-sliders-horizontal');
    expect(filterIcon).toBeInTheDocument();
  });

  it('maintains responsive design with proper CSS classes', () => {
    render(<MinimalSearch {...mockProps} />);
    
    const container = screen.getByPlaceholderText('Search articles...').closest('div');
    expect(container).toHaveClass('relative', 'flex-1');
  });

  it('handles empty tags array gracefully', async () => {
    const propsWithNoTags = {
      ...mockProps,
      availableTags: []
    };
    
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...propsWithNoTags} />);
    
    // Open filters
    const filterButton = screen.getByRole('button', { name: /filters/i });
    await user.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText('Topics')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('handles keyboard navigation and escape key', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MinimalSearch {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    
    // Test Tab navigation
    await user.tab();
    expect(searchInput).toHaveFocus();
    
    // Test Escape key functionality
    await user.type(searchInput, 'test');
    await user.keyboard('{Escape}');
    
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('');
  });
});