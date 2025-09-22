import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/hashnode';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nischalneupane.com.np';

export async function GET() {
  try {
    // Fetch the latest posts for RSS feed
    const postsData = await getPosts(50); // Get latest 50 posts with proper limit
    
    if (!postsData?.publication?.posts?.edges) {
      console.warn('RSS: No posts data available, returning empty feed');
      // Return empty RSS feed instead of throwing error
      const emptyRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nischal Neupane - Blog</title>
    <description>Personal blog about web development, programming, and technology</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>contact@nischalneupane.com.np (Nischal Neupane)</managingEditor>
    <webMaster>contact@nischalneupane.com.np (Nischal Neupane)</webMaster>
    <ttl>60</ttl>
  </channel>
</rss>`;
      
      return new NextResponse(emptyRss, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }
    
    const posts = postsData.publication.posts.edges.map(({ node }) => node);

    const rssItems = posts
      .map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const pubDate = new Date(post.publishedAt).toUTCString();
        
        // Clean up HTML content for RSS
        const cleanContent = post.content.html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
          .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
          .trim();

        return `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.brief}]]></description>
            <content:encoded><![CDATA[${cleanContent}]]></content:encoded>
            <link>${postUrl}</link>
            <guid isPermaLink="true">${postUrl}</guid>
            <pubDate>${pubDate}</pubDate>
            <author>nischal@nischalneupane.com.np (Nischal Neupane)</author>
            ${post.tags?.map(tag => `<category><![CDATA[${tag.name}]]></category>`).join('') || ''}
            ${post.coverImage ? `<enclosure url="${post.coverImage.url}" type="image/jpeg" />` : ''}
          </item>
        `;
      })
      .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title><![CDATA[Nischal Neupane - Developer Blog]]></title>
    <description><![CDATA[Insights and tutorials on modern web development, programming, and technology.]]></description>
    <link>${SITE_URL}/blog</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Next.js Blog RSS Generator</generator>
    <managingEditor>nischal@nischalneupane.com.np (Nischal Neupane)</managingEditor>
    <webMaster>nischal@nischalneupane.com.np (Nischal Neupane)</webMaster>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favicon.png</url>
      <title>Nischal Neupane - Developer Blog</title>
      <link>${SITE_URL}/blog</link>
      <description>Developer insights and tutorials</description>
      <width>144</width>
      <height>144</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}