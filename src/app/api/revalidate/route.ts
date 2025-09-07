import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

interface RevalidateRequest {
  path?: string;
  tag?: string;
  type?: 'page' | 'layout';
  secret?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RevalidateRequest = await request.json();
    const { path, tag, type = 'page', secret } = body;

    // Verify secret token for security
    if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    const results: string[] = [];

    // Revalidate by path
    if (path) {
      revalidatePath(path, type);
      results.push(`Revalidated path: ${path} (${type})`);
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag);
      results.push(`Revalidated tag: ${tag}`);
    }

    // If no specific path/tag provided, revalidate common blog paths
    if (!path && !tag) {
      const commonPaths = ['/blog', '/', '/rss.xml', '/sitemap.xml'];
      const commonTags = ['blog-posts', 'latest-posts'];
      
      commonPaths.forEach(p => {
        revalidatePath(p);
        results.push(`Revalidated path: ${p}`);
      });
      
      commonTags.forEach(t => {
        revalidateTag(t);
        results.push(`Revalidated tag: ${t}`);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Revalidation completed',
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'revalidate-api'
  });
}
