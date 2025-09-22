import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/hashnode';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nischalneupane.com.np';

export async function GET() {
  try {
    // Fetch all posts for sitemap with proper limit
    const postsData = await getPosts(50); // Hashnode max limit is 50
    
    let posts: any[] = [];
    if (postsData?.publication?.posts?.edges) {
      posts = postsData.publication.posts.edges.map(({ node }) => node);
    } else {
      console.warn('Sitemap: No posts data available, generating sitemap with static pages only');
    }

    // Static pages
    const staticPages = [
      {
        url: `${SITE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/skills-projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/blog/series`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Blog post pages
    const blogPages = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Combine all pages
    const allPages = [...staticPages, ...blogPages];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Return a basic sitemap with static pages only
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/skills-projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
}