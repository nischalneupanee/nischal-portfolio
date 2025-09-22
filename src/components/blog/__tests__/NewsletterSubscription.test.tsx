import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NewsletterSubscription from '../NewsletterSubscription';

// Mock fetch
global.fetch = jest.fn();

describe('NewsletterSubscription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('renders newsletter subscription form', () => {
    render(<NewsletterSubscription />);
    
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText('Subscribe to get the latest posts and tutorials directly in your inbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('has required validation on email input', () => {
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('validates email format using browser validation', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    
    await user.type(emailInput, 'invalid-email');
    
    // Browser should show validation state
    expect(emailInput).toHaveValue('invalid-email');
    expect(emailInput).toBeInvalid();
  });

  it('submits form with valid email', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    expect(fetch).toHaveBeenCalledWith('/api/newsletter/subscribe', 
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"email":"test@example.com"')
      })
    );
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    expect(screen.getByText('Subscribing...')).toBeInTheDocument();
    expect(subscribeButton).toBeDisabled();
  });

  it('shows success message on successful subscription', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('🎉 Thanks for subscribing! Check your email for confirmation.')).toBeInTheDocument();
    });
  });

  it('shows error message on failed subscription', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows error message on server error response', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('resets form after successful subscription', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('🎉 Thanks for subscribing! Check your email for confirmation.')).toBeInTheDocument();
    });
    
    // Email input should be cleared
    expect(emailInput).toHaveValue('');
  });

  it('allows retry after error', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    // First attempt - should fail
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
    
    // Second attempt - should succeed
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('🎉 Thanks for subscribing! Check your email for confirmation.')).toBeInTheDocument();
    });
  });

  it('handles already subscribed email', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ message: 'Email already subscribed' })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'existing@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email already subscribed')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(subscribeButton).toHaveAttribute('type', 'submit');
  });

  it('shows correct icon in default state', () => {
    render(<NewsletterSubscription />);
    
    const mailIcon = document.querySelector('.lucide-mail');
    expect(mailIcon).toBeInTheDocument();
  });

  it('shows check icon in success state', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      const checkIcon = document.querySelector('.lucide-check');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it('shows alert icon in error state', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<NewsletterSubscription />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(subscribeButton);
    
    await waitFor(() => {
      const alertIcon = document.querySelector('.lucide-circle-alert');
      expect(alertIcon).toBeInTheDocument();
    });
  });

  it('maintains responsive design with proper CSS classes', () => {
    render(<NewsletterSubscription />);
    
    const container = screen.getByText('Stay Updated').closest('div');
    expect(container?.parentElement).toHaveClass('glass', 'rounded-xl', 'p-6', 'border', 'border-terminal-green/20');
  });

  it('has white text on subscribe button for visibility', () => {
    render(<NewsletterSubscription />);
    
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    expect(subscribeButton).toHaveClass('text-white'); // Fixed color issue
  });
});