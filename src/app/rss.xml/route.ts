import { NextResponse } from 'next/server';
import { generateRSSFeed } from '@/lib/rss';

export async function GET() {
  try {
    const rssXml = await generateRSSFeed();
    
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return minimal RSS feed on error
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Nischal Neupane - Blog</title>
    <description>AI/ML and Data Science Blog</description>
    <link>https://nischalneupane.vercel.app</link>
    <item>
      <title>RSS Feed Temporarily Unavailable</title>
      <description>Unable to generate RSS feed. Please try again later.</description>
      <link>https://nischalneupane.vercel.app/blog</link>
    </item>
  </channel>
</rss>`;

    return new NextResponse(errorRss, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
