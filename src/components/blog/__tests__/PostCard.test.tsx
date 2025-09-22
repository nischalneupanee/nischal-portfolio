import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostCard from '../PostCard'
import { BlogPost } from '@/lib/types'

const mockPost: BlogPost = {
  id: '1',
  title: 'Test Blog Post',
  brief: 'This is a test blog post for unit testing',
  slug: 'test-blog-post',
  publishedAt: '2024-01-01T00:00:00Z',
  url: 'https://test-blog.hashnode.dev/test-blog-post',
  readTimeInMinutes: 5,
  content: {
    markdown: 'Test content',
    html: '<p>Test content</p>'
  },
  coverImage: {
    url: 'https://example.com/cover.jpg'
  },
  tags: [
    {
      id: '1',
      name: 'React',
      slug: 'react'
    },
    {
      id: '2',
      name: 'TypeScript',
      slug: 'typescript'
    }
  ],
  author: {
    id: '1',
    name: 'Test Author',
    username: 'testauthor',
    profilePicture: 'https://example.com/author.jpg',
    bio: {
      text: 'Test author bio'
    },
    socialMediaLinks: {},
    dateJoined: '2024-01-01T00:00:00Z'
  },
  views: 100,
  reactionCount: 10,
  responseCount: 5,
  bookmarked: false,
  featured: false,
  preferences: {
    disableComments: false
  }
}

describe('PostCard', () => {
  it('renders post title correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('renders post brief correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('This is a test blog post for unit testing')).toBeInTheDocument()
  })

  it('renders read time correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders tags correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders author name correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })

  it('renders view count correctly', () => {
    render(<PostCard post={mockPost} variant="default" />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders internal blog link', () => {
    render(<PostCard post={mockPost} variant="default" />)
    const linkElement = screen.getByRole('link', { name: /test blog post/i })
    expect(linkElement).toHaveAttribute('href', '/blog/test-blog-post')
  })

  it('handles missing cover image gracefully', () => {
    const postWithoutCover = { ...mockPost, coverImage: undefined }
    render(<PostCard post={postWithoutCover} variant="default" />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('handles empty tags array', () => {
    const postWithoutTags = { ...mockPost, tags: [] }
    render(<PostCard post={postWithoutTags} variant="default" />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })
})