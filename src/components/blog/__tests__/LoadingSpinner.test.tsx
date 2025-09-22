import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders without errors', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Loading posts..." />)
    expect(screen.getByText('Loading posts...')).toBeInTheDocument()
  })

  it('does not render text when not provided', () => {
    render(<LoadingSpinner />)
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  it('renders with correct size classes', () => {
    const { container: smallContainer } = render(<LoadingSpinner size="small" />)
    expect(smallContainer.querySelector('.w-4')).toBeInTheDocument()

    const { container: largeContainer } = render(<LoadingSpinner size="large" />)
    expect(largeContainer.querySelector('.w-12')).toBeInTheDocument()
  })
})