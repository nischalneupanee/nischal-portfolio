import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SkillsProjects from '../page'

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

describe('Skills & Projects Page', () => {
  it('renders the main heading', () => {
    render(<SkillsProjects />)
    expect(screen.getByText('Skills & Projects')).toBeInTheDocument()
  })

  it('displays skills section', () => {
    render(<SkillsProjects />)
    
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
    expect(screen.getByText('Programming Languages')).toBeInTheDocument()
    expect(screen.getByText('AI/ML & Data Science')).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Database & Tools')).toBeInTheDocument()
  })

  it('shows programming languages skills', () => {
    render(<SkillsProjects />)
    
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('C++')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('HTML/CSS')).toBeInTheDocument()
  })

  it('displays AI/ML and Data Science skills', () => {
    render(<SkillsProjects />)
    
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
    expect(screen.getByText('NumPy')).toBeInTheDocument()
    expect(screen.getByText('Pandas')).toBeInTheDocument()
    expect(screen.getByText('Matplotlib')).toBeInTheDocument()
  })

  it('shows web development skills', () => {
    render(<SkillsProjects />)
    
    expect(screen.getByText('Django')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
  })

  it('displays projects section', () => {
    render(<SkillsProjects />)
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
  })

  it('shows project filter functionality', () => {
    render(<SkillsProjects />)
    
    // Check for filter buttons
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('AI/ML')).toBeInTheDocument()
    expect(screen.getByText('Web Dev')).toBeInTheDocument()
    expect(screen.getByText('Data Science')).toBeInTheDocument()
  })

  it('displays featured projects', () => {
    render(<SkillsProjects />)
    
    // Check for some expected project titles
    expect(screen.getByText(/ChatBot AI/)).toBeInTheDocument()
    expect(screen.getByText(/Data Analysis/)).toBeInTheDocument()
    expect(screen.getByText(/Portfolio Website/)).toBeInTheDocument()
  })

  it('allows filtering projects by category', () => {
    render(<SkillsProjects />)
    
    // Click on AI/ML filter
    const aiMlFilter = screen.getByText('AI/ML')
    fireEvent.click(aiMlFilter)
    
    // Check that filter is applied (button should be active)
    expect(aiMlFilter).toHaveClass('bg-terminal-green')
  })

  it('shows project links and external links', () => {
    render(<SkillsProjects />)
    
    // Check for GitHub and live demo links
    const githubLinks = screen.getAllByRole('link', { name: /github/i })
    const liveDemoLinks = screen.getAllByRole('link', { name: /live demo/i })
    
    expect(githubLinks.length).toBeGreaterThan(0)
    expect(liveDemoLinks.length).toBeGreaterThan(0)
  })

  it('displays project technologies', () => {
    render(<SkillsProjects />)
    
    // Check for technology tags in projects
    expect(screen.getByText(/React/)).toBeInTheDocument()
    expect(screen.getByText(/Python/)).toBeInTheDocument()
    expect(screen.getByText(/Django/)).toBeInTheDocument()
  })

  it('shows skill progress bars', () => {
    render(<SkillsProjects />)
    
    // Check for skill level indicators
    const { container } = render(<SkillsProjects />)
    const progressBars = container.querySelectorAll('[class*="w-"]')
    expect(progressBars.length).toBeGreaterThan(0)
  })
})