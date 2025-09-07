import { NextResponse } from 'next/server';
import { generateSitemapData } from '@/lib/sitemap';

export async function GET() {
  try {
    const sitemapXml = await generateSitemapData('https://nischalneupane.vercel.app');
    
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nischalneupane.vercel.app</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nischalneupane.vercel.app/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new NextResponse(errorSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
