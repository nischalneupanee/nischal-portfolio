import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ParticleBackground from '../ParticleBackground'

// Mock the particles.js library
const mockParticlesJS = jest.fn()
Object.defineProperty(window, 'particlesJS', {
  writable: true,
  value: mockParticlesJS
})

describe('ParticleBackground', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock script loading
    const originalCreateElement = document.createElement
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'script') {
        const script = originalCreateElement.call(document, tagName) as HTMLScriptElement
        // Simulate successful script loading
        setTimeout(() => {
          if (script.onload) {
            script.onload({} as Event)
          }
        }, 0)
        return script
      }
      return originalCreateElement.call(document, tagName)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders particles container', () => {
    const { container } = render(<ParticleBackground />)
    const particlesContainer = container.querySelector('#particles-js')
    expect(particlesContainer).toBeInTheDocument()
  })

  it('has correct CSS classes and styles', () => {
    const { container } = render(<ParticleBackground />)
    const particlesContainer = container.querySelector('#particles-js')
    
    expect(particlesContainer).toHaveClass('fixed', 'top-0', 'left-0', 'w-full', 'h-full', '-z-10')
  })

  it('loads particles.js script dynamically', async () => {
    render(<ParticleBackground />)
    
    // Check if createElement was called to create script
    expect(document.createElement).toHaveBeenCalledWith('script')
  })

  it('initializes particles when script loads', async () => {
    render(<ParticleBackground />)
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10))
    
    // Check if particlesJS was called with correct parameters
    expect(mockParticlesJS).toHaveBeenCalledWith('particles-js', expect.any(Object))
  })

  it('renders without crashing when particles.js is not available', () => {
    // Test graceful degradation
    Object.defineProperty(window, 'particlesJS', {
      writable: true,
      value: undefined
    })
    
    expect(() => render(<ParticleBackground />)).not.toThrow()
  })
})