import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import About from '../page'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}))

describe('About Page', () => {
  it('renders the main about heading', () => {
    render(<About />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('displays personal information', () => {
    render(<About />)
    
    expect(screen.getByText(/Nischal Neupane/)).toBeInTheDocument()
    expect(screen.getByText(/Kathmandu, Nepal/)).toBeInTheDocument()
  })

  it('shows educational timeline', () => {
    render(<About />)
    
    expect(screen.getByText('My Journey')).toBeInTheDocument()
    expect(screen.getByText('+2 Science')).toBeInTheDocument()
    expect(screen.getByText('Kathmandu Model College')).toBeInTheDocument()
    expect(screen.getByText('BSc. CSIT')).toBeInTheDocument()
    expect(screen.getByText('Vedas College')).toBeInTheDocument()
  })

  it('displays events attended section', () => {
    render(<About />)
    
    expect(screen.getByText('Events & Conferences')).toBeInTheDocument()
    expect(screen.getByText('Google DevFest 2024')).toBeInTheDocument()
    expect(screen.getByText('UbuCon Asia 2025')).toBeInTheDocument()
    expect(screen.getByText('MBMC IDEAX 2025')).toBeInTheDocument()
  })

  it('shows skills and interests', () => {
    render(<About />)
    
    expect(screen.getByText('Skills & Interests')).toBeInTheDocument()
    expect(screen.getByText(/Programming Languages/)).toBeInTheDocument()
    expect(screen.getByText(/Machine Learning/)).toBeInTheDocument()
  })

  it('displays personal interests', () => {
    render(<About />)
    
    expect(screen.getByText('Personal Interests')).toBeInTheDocument()
  })

  it('has contact section with social links', () => {
    render(<About />)
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
    
    // Check for social media links
    const githubLink = screen.getByRole('link', { name: /github/i })
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/nischalneupanee')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/nischalneupanee/')
  })

  it('renders profile image', () => {
    render(<About />)
    const profileImage = screen.getByAltText('Nischal Neupane')
    expect(profileImage).toBeInTheDocument()
  })

  it('displays timeline years correctly', () => {
    render(<About />)
    
    expect(screen.getByText('2020-2022')).toBeInTheDocument()
    expect(screen.getByText('2023-2027')).toBeInTheDocument()
  })

  it('shows current education status', () => {
    render(<About />)
    
    expect(screen.getByText(/Currently pursuing/)).toBeInTheDocument()
    expect(screen.getByText(/specializing in AI\/ML/)).toBeInTheDocument()
  })
})