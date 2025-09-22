import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, variants, whileHover, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    h2: ({ children, className }: any) => <h2 className={className}>{children}</h2>,
    p: ({ children, className }: any) => <p className={className}>{children}</p>,
    span: ({ children, className }: any) => <span className={className}>{children}</span>,
  },
}));

describe('Home Page', () => {
  it('renders the home page without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
  });

  it('displays the main heading with name', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 2, name: 'Nischal Neupane' })).toBeInTheDocument();
  });

  it('shows the professional tagline', () => {
    render(<Home />);
    expect(screen.getByText('AI/ML Enthusiast | Data Science Explorer | CSIT Student')).toBeInTheDocument();
  });

  it('displays hero description', () => {
    render(<Home />);
    expect(screen.getByText(/CSIT student from Nepal, passionate about/)).toBeInTheDocument();
  });

  it('displays key technologies mentioned', () => {
    render(<Home />);
    
    // Check for technologies mentioned in the description
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data Science')).toBeInTheDocument();
  });

  it('shows personal information in terminal format', () => {
    render(<Home />);
    
    expect(screen.getByText('nischal@portfolio:~$ cat about.txt')).toBeInTheDocument();
    expect(screen.getAllByText('Nischal Neupane')).toHaveLength(2); // Header and terminal output
    expect(screen.getByText('Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('BSc. CSIT at Vedas College (2023-2027)')).toBeInTheDocument();
    expect(screen.getByText('Learning & Building')).toBeInTheDocument();
  });

  it('displays profile image with correct alt text', () => {
    render(<Home />);
    expect(screen.getByAltText('Nischal Neupane')).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    render(<Home />);
    
    // Check for main content elements
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getAllByText('Nischal Neupane')).toHaveLength(2);
    expect(screen.getByText('AI/ML Enthusiast | Data Science Explorer | CSIT Student')).toBeInTheDocument();
    expect(screen.getByText('nischal@portfolio:~$ cat about.txt')).toBeInTheDocument();
  });

  it('displays building the future tagline', () => {
    render(<Home />);
    expect(screen.getByText(/Building the future with code, one algorithm at a time/)).toBeInTheDocument();
  });

  it('contains terminal-styled elements', () => {
    render(<Home />);
    expect(screen.getByText('~/')).toBeInTheDocument();
    expect(screen.getByText('nischal@portfolio:~$ cat about.txt')).toBeInTheDocument();
  });

  it('displays education information', () => {
    render(<Home />);
    expect(screen.getByText(/BSc\. CSIT at Vedas College/)).toBeInTheDocument();
  });

  it('shows location information', () => {
    render(<Home />);
    expect(screen.getByText(/Kathmandu, Nepal/)).toBeInTheDocument();
  });

  it('displays current status', () => {
    render(<Home />);
    expect(screen.getByText('Learning & Building')).toBeInTheDocument();
  });
});