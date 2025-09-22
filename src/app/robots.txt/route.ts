import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nischalneupane.com.np';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Block access to private directories
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow access to blog and main pages
Allow: /blog/
Allow: /about
Allow: /skills-projects
Allow: /contact

# Crawl delay (optional)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}