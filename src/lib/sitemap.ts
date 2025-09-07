import { getBlogPosts } from './hashnode';

export interface SitemapPost {
  id: string;
  url: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string | null;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }> | null;
}

export interface SitemapPage {
  slug: string;
}

export interface SitemapData {
  url: string;
  posts: SitemapPost[];
  staticPages: SitemapPage[];
}

export async function generateSitemapData(baseUrl: string): Promise<string> {
  try {
    // Fetch blog posts
    const response = await getBlogPosts(50); // Get more posts for sitemap
    const posts = response?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];
    
    // Define static pages
    const staticPages = [
      { slug: '/' },
      { slug: '/about' },
      { slug: '/skills' },
      { slug: '/blog' },
      { slug: '/contact' },
    ];

    const sitemapData: SitemapData = {
      url: baseUrl,
      posts: posts.map((post: any) => ({
        id: post.id,
        url: post.url,
        slug: post.slug,
        publishedAt: post.publishedAt,
        tags: post.tags,
      })),
      staticPages,
    };

    return generateSitemap(sitemapData);
  } catch (error) {
    console.error('Error generating sitemap data:', error);
    // Return basic sitemap on error
    return generateSitemap({
      url: baseUrl,
      posts: [],
      staticPages: [
        { slug: '/' },
        { slug: '/about' },
        { slug: '/skills' },
        { slug: '/blog' },
        { slug: '/contact' },
      ],
    });
  }
}

export function generateSitemap(data: SitemapData): string {
  const { url: domain, posts, staticPages } = data;
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Homepage
  xml += `
  <url>
    <loc>${domain}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>`;
  
  if (posts.length > 0) {
    xml += `
    <lastmod>${posts[0].publishedAt}</lastmod>`;
  }
  xml += `
  </url>`;

  // Blog homepage
  xml += `
  <url>
    <loc>${domain}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>`;
  
  if (posts.length > 0) {
    xml += `
    <lastmod>${posts[0].publishedAt}</lastmod>`;
  }
  xml += `
  </url>`;

  // About, Contact, Skills pages
  const staticSitePages = ['about', 'contact', 'skills-projects'];
  staticSitePages.forEach((page) => {
    xml += `
  <url>
    <loc>${domain}/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Blog posts
  posts.forEach((post) => {
    xml += `
  <url>
    <loc>${domain}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;
    
    if (post.updatedAt) {
      xml += `
    <lastmod>${post.updatedAt}</lastmod>`;
    } else {
      xml += `
    <lastmod>${post.publishedAt}</lastmod>`;
    }
    xml += `
  </url>`;
  });

  // Static pages from Hashnode
  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${domain}/page/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // Tag pages
  const uniqueTags = new Set<string>();
  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        uniqueTags.add(tag.slug);
      });
    }
  });

  uniqueTags.forEach((tagSlug) => {
    xml += `
  <url>
    <loc>${domain}/blog/tag/${tagSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}
