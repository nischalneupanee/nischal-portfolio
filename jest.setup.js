import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => () => {
  const MockedComponent = () => <div>Mocked Component</div>
  MockedComponent.displayName = 'MockedComponent'
  return MockedComponent
})

// Mock environment variables
process.env.HASHNODE_PUBLICATION_HOST = 'test-blog.hashnode.dev'
process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST = 'test-blog.hashnode.dev'
process.env.NEXT_PUBLIC_SITE_URL = 'https://test.example.com'