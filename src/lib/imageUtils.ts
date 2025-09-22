/**
 * Utility functions for blog images and fallbacks
 */

export interface ImageFallbackConfig {
  tag?: string;
  title?: string;
  readTime?: number;
  publishedAt?: string;
}

export interface BlogPost {
  coverImage?: { url: string };
  ogMetaData?: { image?: string };
  title: string;
  tags?: { name: string }[];
  readTimeInMinutes: number;
}

/**
 * Get the best available cover image for a blog post
 */
export function getBlogCoverImage(post: BlogPost) {
  // Priority order:
  // 1. Actual cover image
  // 2. OG meta data image
  // 3. Generated default based on content

  if (post.coverImage?.url) {
    return {
      type: 'cover' as const,
      url: post.coverImage.url,
      alt: post.title
    };
  }

  if (post.ogMetaData?.image) {
    return {
      type: 'og' as const,
      url: post.ogMetaData.image,
      alt: post.title
    };
  }

  return {
    type: 'default' as const,
    url: null,
    alt: post.title
  };
}

/**
 * Get publication information for default covers
 */
export function getPublicationInfo() {
  return {
    name: "Nischal's Blog",
    logo: "💻",
    domain: "nischalneupane.hashnode.dev",
    defaultTagline: "Tech insights and learning journey"
  };
}

/**
 * Generate a gradient class based on blog post tag
 */
export function getTagGradient(tag?: string): string {
  if (!tag) return 'from-terminal-purple/30 via-terminal-blue/30 to-terminal-green/30';
  
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('data science')) {
    return 'from-blue-500/20 via-purple-500/20 to-green-500/20';
  }
  if (tagLower.includes('machine learning') || tagLower.includes('ml')) {
    return 'from-purple-500/20 via-pink-500/20 to-blue-500/20';
  }
  if (tagLower.includes('ai') || tagLower.includes('artificial intelligence')) {
    return 'from-green-500/20 via-blue-500/20 to-purple-500/20';
  }
  if (tagLower.includes('web') || tagLower.includes('frontend') || tagLower.includes('backend')) {
    return 'from-cyan-500/20 via-blue-500/20 to-purple-500/20';
  }
  if (tagLower.includes('programming') || tagLower.includes('coding')) {
    return 'from-yellow-500/20 via-orange-500/20 to-red-500/20';
  }
  if (tagLower.includes('javascript') || tagLower.includes('js')) {
    return 'from-yellow-400/20 via-yellow-500/20 to-yellow-600/20';
  }
  if (tagLower.includes('python')) {
    return 'from-blue-400/20 via-yellow-400/20 to-blue-600/20';
  }
  if (tagLower.includes('react') || tagLower.includes('nextjs')) {
    return 'from-cyan-400/20 via-blue-400/20 to-blue-600/20';
  }
  
  // Default gradient
  return 'from-terminal-green/20 via-terminal-blue/20 to-terminal-purple/20';
}

/**
 * Get an appropriate emoji icon for the blog post tag
 */
export function getTagIcon(tag?: string, size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  if (!tag) return '📝';
  
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('data science')) return '📊';
  if (tagLower.includes('machine learning') || tagLower.includes('ml')) return '🤖';
  if (tagLower.includes('ai') || tagLower.includes('artificial intelligence')) return '🧠';
  if (tagLower.includes('web') || tagLower.includes('frontend') || tagLower.includes('backend')) return '💻';
  if (tagLower.includes('programming') || tagLower.includes('coding')) return '⚡';
  if (tagLower.includes('javascript') || tagLower.includes('js')) return '🟨';
  if (tagLower.includes('python')) return '🐍';
  if (tagLower.includes('react')) return '⚛️';
  if (tagLower.includes('nextjs') || tagLower.includes('next.js')) return '▲';
  if (tagLower.includes('database') || tagLower.includes('sql')) return '🗄️';
  if (tagLower.includes('api') || tagLower.includes('rest') || tagLower.includes('graphql')) return '🔌';
  if (tagLower.includes('security') || tagLower.includes('auth')) return '🔒';
  if (tagLower.includes('deployment') || tagLower.includes('devops')) return '🚀';
  if (tagLower.includes('tutorial') || tagLower.includes('guide')) return '📚';
  if (tagLower.includes('tips') || tagLower.includes('tricks')) return '💡';
  if (tagLower.includes('news') || tagLower.includes('update')) return '📰';
  if (tagLower.includes('review')) return '⭐';
  
  // Default icon
  return '📝';
}

/**
 * Generate a placeholder image URL using a service like Unsplash or Picsum
 * This could be used as a fallback when no cover image is available
 */
export function generatePlaceholderImage(config: ImageFallbackConfig): string {
  const { tag, title } = config;
  
  // Use Unsplash with relevant keywords based on tag
  let keywords = 'technology,programming,code';
  
  if (tag) {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('data science')) keywords = 'data,analytics,charts,graphs';
    if (tagLower.includes('machine learning') || tagLower.includes('ai')) keywords = 'artificial,intelligence,robot,future';
    if (tagLower.includes('web')) keywords = 'web,development,computer,screen';
    if (tagLower.includes('mobile')) keywords = 'mobile,phone,app,development';
  }
  
  // Return Unsplash URL with specific dimensions and keywords
  return `https://source.unsplash.com/800x450/?${keywords.replace(/,/g, ',')}`;
}

/**
 * Check if an image URL is accessible
 */
export async function checkImageAccessibility(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get color scheme for a tag
 */
export function getTagColorScheme(tag?: string) {
  if (!tag) return {
    primary: 'terminal-green',
    secondary: 'terminal-blue',
    accent: 'terminal-purple'
  };
  
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('data science')) {
    return {
      primary: 'blue-500',
      secondary: 'purple-500',
      accent: 'green-500'
    };
  }
  if (tagLower.includes('machine learning') || tagLower.includes('ai')) {
    return {
      primary: 'purple-500',
      secondary: 'pink-500',
      accent: 'blue-500'
    };
  }
  if (tagLower.includes('web')) {
    return {
      primary: 'cyan-500',
      secondary: 'blue-500',
      accent: 'purple-500'
    };
  }
  
  return {
    primary: 'terminal-green',
    secondary: 'terminal-blue',
    accent: 'terminal-purple'
  };
}

/**
 * Format reading time with appropriate icon
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read ⚡';
  if (minutes < 5) return `${minutes} min read 📖`;
  if (minutes < 10) return `${minutes} min read 📚`;
  if (minutes < 20) return `${minutes} min read 📖📖`;
  return `${minutes} min read 📚📚`;
}

/**
 * Generate a text-based image placeholder using Canvas or SVG
 * This creates a colorful placeholder with the first letter of the title
 */
export function generateTextPlaceholder(title: string, tag?: string): string {
  const firstLetter = title.charAt(0).toUpperCase();
  const colors = getTagColorScheme(tag);
  
  // Create SVG data URL
  const svg = `
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(99,102,241);stop-opacity:0.2" />
          <stop offset="50%" style="stop-color:rgb(139,92,246);stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:rgb(34,197,94);stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="400" cy="225" r="80" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <text x="400" y="245" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="rgba(255,255,255,0.8)">${firstLetter}</text>
      <text x="400" y="300" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.6)">${tag || 'Article'}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
