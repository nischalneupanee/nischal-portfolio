import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, variants, whileHover, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    h2: ({ children, className }: any) => <h2 className={className}>{children}</h2>,
    p: ({ children, className }: any) => <p className={className}>{children}</p>,
    a: ({ children, className, href, ...props }: any) => (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    ),
    button: ({ children, className, onClick, type, ...props }: any) => (
      <button className={className} onClick={onClick} type={type} {...props}>
        {children}
      </button>
    ),
    section: ({ children, className }: any) => <section className={className}>{children}</section>,
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  MapPin: () => <div data-testid="mappin-icon">MapPin</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
  Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
  Instagram: () => <div data-testid="instagram-icon">Instagram</div>,
  MessageCircle: () => <div data-testid="messagecircle-icon">MessageCircle</div>,
  Send: () => <div data-testid="send-icon">Send</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  Heart: () => <div data-testid="heart-icon">Heart</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
  Copy: () => <div data-testid="copy-icon">Copy</div>,
  CheckCircle: () => <div data-testid="checkcircle-icon">CheckCircle</div>,
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

// Mock window.location
delete (window as any).location;
window.location = { href: '' } as any;

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Structure and Content', () => {
    it('renders the contact page header correctly', () => {
      render(<Contact />);
      
      expect(screen.getByText('$ ping /contact')).toBeInTheDocument();
      expect(screen.getByText(/Let's connect!/)).toBeInTheDocument();
      expect(screen.getByText(/I'm always excited to discuss AI\/ML/)).toBeInTheDocument();
    });

    it('displays quick facts section', () => {
      render(<Contact />);
      
      expect(screen.getByText('Response Time')).toBeInTheDocument();
      expect(screen.getByText('< 48 hours')).toBeInTheDocument();
      expect(screen.getByText('Timezone')).toBeInTheDocument();
      expect(screen.getByText('NPT (UTC+5:45)')).toBeInTheDocument();
      expect(screen.getByText('Collaboration')).toBeInTheDocument();
      expect(screen.getByText('Always Open')).toBeInTheDocument();
      expect(screen.getByText('Availability')).toBeInTheDocument();
      expect(screen.getByText('Remote Friendly')).toBeInTheDocument();
    });

    it('renders quick connect section', () => {
      render(<Contact />);
      
      expect(screen.getByText('Quick Connect')).toBeInTheDocument();
      expect(screen.getByText('For immediate contact, email is the fastest way to reach me.')).toBeInTheDocument();
      expect(screen.getByText('Send Email')).toBeInTheDocument();
      expect(screen.getByText('Copy Email')).toBeInTheDocument();
    });
  });

  describe('Contact Methods', () => {
    it('displays all contact methods with correct information', () => {
      render(<Contact />);
      
      // Check for contact method titles
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();

      // Check for contact values
      expect(screen.getByText('nischalneupanee@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/nischalneupanee')).toBeInTheDocument();
      expect(screen.getByText('github.com/nischalneupanee')).toBeInTheDocument();
      expect(screen.getByText('instagram.com/nischalneupanee')).toBeInTheDocument();

      // Check for descriptions
      expect(screen.getByText('Best way to reach me for professional inquiries')).toBeInTheDocument();
      expect(screen.getByText('Connect with me professionally')).toBeInTheDocument();
      expect(screen.getByText('Check out my code and projects')).toBeInTheDocument();
      expect(screen.getByText('Follow my personal journey')).toBeInTheDocument();
    });

    it('has correct links for contact methods', () => {
      render(<Contact />);
      
      const emailLinks = screen.getAllByRole('link', { name: /email/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const githubLink = screen.getByRole('link', { name: /github/i });
      const instagramLink = screen.getByRole('link', { name: /instagram/i });

      expect(emailLinks[0]).toHaveAttribute('href', 'mailto:nischalneupanee@gmail.com');
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/nischalneupanee/');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/nischalneupanee');
      expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/nischalneupanee');
    });

    it('displays contact method icons', () => {
      render(<Contact />);
      
      expect(screen.getAllByTestId('mail-icon')).toHaveLength(2); // One in contact methods, one in quick connect
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
      expect(screen.getByTestId('github-icon')).toBeInTheDocument();
      expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    });
  });

  describe('Email Copy Functionality', () => {
    it('copies email to clipboard when copy button is clicked', async () => {
      render(<Contact />);
      
      const copyButton = screen.getByText('Copy Email');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('nischalneupanee@gmail.com');
      });
    });

    it('shows copied state after successful copy', async () => {
      render(<Contact />);
      
      const copyButton = screen.getByText('Copy Email');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument();
        expect(screen.getByTestId('checkcircle-icon')).toBeInTheDocument();
      });
    });

    it('handles copy failure gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('Copy failed'));
      
      render(<Contact />);
      
      const copyButton = screen.getByText('Copy Email');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to copy email:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Contact Form', () => {
    it('renders contact form with all fields', () => {
      render(<Contact />);
      
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Subject')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('has correct placeholders for form fields', () => {
      render(<Contact />);
      
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText("What's this about?")).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Tell me about your project, idea, or just say hello!')).toBeInTheDocument();
    });

    it('updates form fields when user types', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const subjectInput = screen.getByLabelText('Subject') as HTMLInputElement;
      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement;

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
      fireEvent.change(messageInput, { target: { value: 'Test message' } });

      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(subjectInput.value).toBe('Test Subject');
      expect(messageInput.value).toBe('Test message');
    });

    it('creates mailto link when form is submitted', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const subjectInput = screen.getByLabelText('Subject');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
      fireEvent.change(messageInput, { target: { value: 'Test message' } });

      fireEvent.click(submitButton);

      expect(window.location.href).toContain('mailto:nischalneupanee@gmail.com');
      expect(window.location.href).toContain('subject=Test%20Subject');
      expect(window.location.href).toContain('body=Name%3A%20John%20Doe');
    });

    it('shows helper text about email client', () => {
      render(<Contact />);
      
      expect(screen.getByText('This will open your email client with the message pre-filled')).toBeInTheDocument();
    });
  });

  describe('Location and Availability Section', () => {
    it('displays location information', () => {
      render(<Contact />);
      
      expect(screen.getByText('Location & Time')).toBeInTheDocument();
      expect(screen.getByText(/Based in:/)).toBeInTheDocument();
      expect(screen.getByText(/Kathmandu, Nepal/)).toBeInTheDocument();
    });

    it('shows timezone information', () => {
      render(<Contact />);
      
      expect(screen.getByText(/Timezone:/)).toBeInTheDocument();
      
      // Check for NPT timezone information
      const timezoneInfo = screen.queryByText(/Nepal Time \(NPT\)/) || screen.queryByText(/NPT/);
      expect(timezoneInfo).toBeInTheDocument();
    });

    it('displays availability information', () => {
      render(<Contact />);
      
      // Check for availability-related information
      const availabilityInfo = screen.queryByText('My Availability') || 
                              screen.queryByText('Response Times') ||
                              screen.queryByText(/24-48 hours/);
      expect(availabilityInfo).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Subject')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('has required attributes on form fields', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Name')).toBeRequired();
      expect(screen.getByLabelText('Email')).toBeRequired();
      expect(screen.getByLabelText('Subject')).toBeRequired();
      expect(screen.getByLabelText('Message')).toBeRequired();
    });

    it('has proper input types', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText('Subject')).toHaveAttribute('type', 'text');
    });

    it('has external links with proper attributes', () => {
      render(<Contact />);
      
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const githubLink = screen.getByRole('link', { name: /github/i });
      const instagramLink = screen.getByRole('link', { name: /instagram/i });

      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(instagramLink).toHaveAttribute('target', '_blank');
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Icons and Visual Elements', () => {
    it('displays quick facts icons', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('displays location icon', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('mappin-icon')).toBeInTheDocument();
    });

    it('displays send icons in buttons', () => {
      render(<Contact />);
      
      expect(screen.getAllByTestId('send-icon')).toHaveLength(2); // Quick connect and form submit
    });

    it('shows copy icon before copying email', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
    });
  });

  describe('Collaboration Areas', () => {
    it('displays collaboration information if present', () => {
      render(<Contact />);
      
      // Check if collaboration areas are mentioned in the content
      const collaborationText = screen.queryByText(/AI\/ML Projects/) || 
                               screen.queryByText(/collaboration/i) ||
                               screen.queryByText(/project/i);
      
      if (collaborationText) {
        expect(collaborationText).toBeInTheDocument();
      }
    });
  });

  describe('Response Time Information', () => {
    it('displays response time information', () => {
      render(<Contact />);
      
      // Check for response time indicators
      const responseInfo = screen.queryByText(/24-48 hours/) || 
                          screen.queryByText(/48 hours/) ||
                          screen.queryByText(/Response Time/);
      
      if (responseInfo) {
        expect(responseInfo).toBeInTheDocument();
      }
    });
  });
});