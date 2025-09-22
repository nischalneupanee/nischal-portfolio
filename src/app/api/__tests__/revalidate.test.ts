import { NextRequest } from 'next/server';
import { POST, GET } from '../revalidate/route';

// Mock Next.js cache functions
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
      ...data,
    })),
  },
}));

const { revalidatePath, revalidateTag } = require('next/cache');
const { NextResponse } = require('next/server');

describe('Revalidate API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.REVALIDATE_SECRET;
  });

  describe('POST /api/revalidate', () => {
    it('revalidates by path successfully', async () => {
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog', 'page');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: ['Revalidated path: /blog (page)'],
        timestamp: expect.any(String),
      });
    });

    it('revalidates by tag successfully', async () => {
      const mockRequest = {
        json: () => Promise.resolve({ tag: 'blog-posts' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidateTag).toHaveBeenCalledWith('blog-posts');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: ['Revalidated tag: blog-posts'],
        timestamp: expect.any(String),
      });
    });

    it('revalidates with custom type', async () => {
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog', type: 'layout' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog', 'layout');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: ['Revalidated path: /blog (layout)'],
        timestamp: expect.any(String),
      });
    });

    it('revalidates common paths when no specific path/tag provided', async () => {
      const mockRequest = {
        json: () => Promise.resolve({}),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog');
      expect(revalidatePath).toHaveBeenCalledWith('/');
      expect(revalidatePath).toHaveBeenCalledWith('/rss.xml');
      expect(revalidatePath).toHaveBeenCalledWith('/sitemap.xml');
      expect(revalidateTag).toHaveBeenCalledWith('blog-posts');
      expect(revalidateTag).toHaveBeenCalledWith('latest-posts');
    });

    it('validates secret token when REVALIDATE_SECRET is set', async () => {
      process.env.REVALIDATE_SECRET = 'test-secret';
      
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog', secret: 'wrong-secret' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Invalid secret' },
        { status: 401 }
      );
      expect(revalidatePath).not.toHaveBeenCalled();
    });

    it('allows revalidation with correct secret', async () => {
      process.env.REVALIDATE_SECRET = 'test-secret';
      
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog', secret: 'test-secret' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog', 'page');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: ['Revalidated path: /blog (page)'],
        timestamp: expect.any(String),
      });
    });

    it('handles both path and tag in same request', async () => {
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog', tag: 'blog-posts' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog', 'page');
      expect(revalidateTag).toHaveBeenCalledWith('blog-posts');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: [
          'Revalidated path: /blog (page)',
          'Revalidated tag: blog-posts'
        ],
        timestamp: expect.any(String),
      });
    });

    it('handles JSON parsing errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const mockRequest = {
        json: () => Promise.reject(new Error('Invalid JSON')),
      } as NextRequest;

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Revalidation failed' },
        { status: 500 }
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error during revalidation:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('handles revalidation function errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (revalidatePath as jest.Mock).mockImplementation(() => {
        throw new Error('Revalidation error');
      });
      
      const mockRequest = {
        json: () => Promise.resolve({ path: '/blog' }),
      } as NextRequest;

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Revalidation failed' },
        { status: 500 }
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error during revalidation:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('GET /api/revalidate', () => {
    it('returns health check response', async () => {
      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith({
        status: 'healthy',
        timestamp: expect.any(String),
        service: 'revalidate-api',
      });
    });

    it('returns current timestamp in health check', async () => {
      const beforeCall = new Date().toISOString();
      await GET();
      const afterCall = new Date().toISOString();

      const call = (NextResponse.json as jest.Mock).mock.calls[0][0];
      expect(call.timestamp).toBeDefined();
      expect(call.timestamp >= beforeCall).toBeTruthy();
      expect(call.timestamp <= afterCall).toBeTruthy();
    });
  });

  describe('Request Validation', () => {
    it('handles empty request body', async () => {
      const mockRequest = {
        json: () => Promise.resolve({}),
      } as NextRequest;

      await POST(mockRequest);

      // Should fall back to common paths revalidation
      expect(revalidatePath).toHaveBeenCalledWith('/blog');
      expect(revalidatePath).toHaveBeenCalledWith('/');
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Revalidation completed',
        })
      );
    });

    it('ignores invalid fields in request', async () => {
      const mockRequest = {
        json: () => Promise.resolve({ 
          path: '/blog',
          invalidField: 'should be ignored',
          anotherInvalid: 123
        }),
      } as NextRequest;

      await POST(mockRequest);

      expect(revalidatePath).toHaveBeenCalledWith('/blog', 'page');
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Revalidation completed',
        results: ['Revalidated path: /blog (page)'],
        timestamp: expect.any(String),
      });
    });
  });
});