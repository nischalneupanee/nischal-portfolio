import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />)
    expect(screen.getByText('Nischal Neupane')).toBeInTheDocument()
  })

  it('displays the current year in copyright', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('renders all social media links', () => {
    render(<Footer />)
    
    // Check for social media links
    const githubLink = screen.getByRole('link', { name: /github/i })
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    const instagramLink = screen.getByRole('link', { name: /instagram/i })
    const emailLink = screen.getByRole('link', { name: /email/i })

    expect(githubLink).toHaveAttribute('href', 'https://github.com/nischalneupanee')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/nischalneupanee/')
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/nischalneupanee')
    expect(emailLink).toHaveAttribute('href', 'mailto:nischalneupanee@gmail.com')
  })

  it('displays bio information', () => {
    render(<Footer />)
    expect(screen.getByText(/CSIT Student passionate about AI\/ML/)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByRole('link', { name: /about me/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/skills-projects')
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/Nischal Resume.pdf')
  })

  it('opens external links in new tab', () => {
    render(<Footer />)
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays location information', () => {
    render(<Footer />)
    expect(screen.getByText(/Kathmandu, Nepal/)).toBeInTheDocument()
  })
})