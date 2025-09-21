import { GraphQLClient } from 'graphql-request';
import { unstable_cache } from 'next/cache';

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_END || 'https://gql.hashnode.com';
const publication = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION || 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.HASHNODE_PAT ? `Bearer ${process.env.HASHNODE_PAT}` : '',
  },
});

// Cache configuration
const CACHE_REVALIDATE_TIME = 3600; // 1 hour default
const CACHE_REVALIDATE_SHORT = 300; // 5 minutes for frequently updated content

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: {
    url: string;
  };
  brief: string;
  content: {
    markdown: string;
    html: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    id: string;
    name: string;
    username: string;
    profilePicture?: string;
    bio?: {
      text: string;
    };
    socialMediaLinks?: {
      website?: string;
      github?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  url: string;
  readTimeInMinutes: number;
  reactionCount: number;
  responseCount: number;
  views: number;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
  ogMetaData?: {
    image?: string;
  };
  preferences?: {
    disableComments: boolean;
  };
  series?: {
    id: string;
    name: string;
    slug: string;
    description?: {
      text: string;
    };
    coverImage?: string;
    posts?: {
      totalDocuments: number;
    };
  };
}

export interface Series {
  id: string;
  name: string;
  slug: string;
  description: {
    text: string;
  };
  coverImage: {
    url: string;
  };
  createdAt: string;
  posts: {
    edges: Array<{
      node: BlogPost;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    totalDocuments: number;
  };
  author: {
    id: string;
    name: string;
    username: string;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
}

export interface SearchResult {
  posts: BlogPost[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

export interface BlogResponse {
  publication: {
    title?: string;
    displayTitle?: string;
    url?: string;
    posts: {
      edges: {
        node: BlogPost;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      totalDocuments?: number;
    };
  };
}

const GET_POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      title
      displayTitle
      url
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            subtitle
            brief
            slug
            publishedAt
            updatedAt
            coverImage {
              url
            }
            url
            readTimeInMinutes
            reactionCount
            responseCount
            views
            featured
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
            preferences {
              disableComments
            }
            series {
              id
              name
              slug
              description {
                text
              }
              coverImage
              posts(first: 10) {
                totalDocuments
              }
            }
            tags {
              id
              name
              slug
            }
            author {
              id
              name
              username
              profilePicture
              bio {
                text
              }
              socialMediaLinks {
                website
                github
                twitter
                linkedin
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalDocuments
      }
    }
  }
`;

const GET_SERIES_QUERY = `
  query GetSeries($host: String!, $first: Int) {
    publication(host: $host) {
      series(first: $first) {
        edges {
          node {
            id
            name
            slug
            description {
              text
            }
            coverImage {
              url
            }
            createdAt
            posts(first: 1) {
              totalDocuments
            }
            author {
              id
              name
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalDocuments
      }
    }
  }
`;

const GET_SERIES_BY_SLUG_QUERY = `
  query GetSeriesBySlug($host: String!, $slug: String!, $first: Int) {
    publication(host: $host) {
      series(slug: $slug) {
        id
        name
        slug
        description {
          text
        }
        coverImage {
          url
        }
        createdAt
        posts(first: $first) {
          edges {
            node {
              id
              title
              subtitle
              brief
              slug
              publishedAt
              updatedAt
              coverImage {
                url
              }
              url
              readTimeInMinutes
              reactionCount
              responseCount
              views
              featured
              tags {
                id
                name
                slug
              }
              author {
                id
                name
                username
                profilePicture
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalDocuments
        }
        author {
          id
          name
          username
        }
      }
    }
  }
`;

// Enhanced cached blog posts function with ISR and tags
export const getBlogPosts = unstable_cache(
  async (first: number = 6, after?: string): Promise<BlogResponse> => {
    try {
      const data = await client.request<BlogResponse>(GET_POSTS_QUERY, {
        host: publication,
        first,
        after,
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },
  ['blog-posts'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['blog-posts', 'hashnode-data']
  }
);

// Enhanced latest posts with better caching
export const getLatestPosts = unstable_cache(
  async (count: number = 3): Promise<BlogPost[]> => {
    try {
      const data = await getBlogPosts(count);
      return data.publication.posts.edges.map(edge => edge.node);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      return [];
    }
  },
  ['latest-posts'],
  {
    revalidate: CACHE_REVALIDATE_SHORT,
    tags: ['latest-posts', 'blog-posts', 'hashnode-data']
  }
);

export async function getBlogPostsOriginal(
  first: number = 6,
  after?: string
): Promise<BlogResponse> {
  try {
    const data = await client.request<BlogResponse>(GET_POSTS_QUERY, {
      host: publication,
      first,
      after,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getLatestPostsOriginal(count: number = 3): Promise<BlogPost[]> {
  try {
    const data = await getBlogPostsOriginal(count);
    return data.publication.posts.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

// Get publication statistics
export interface PublicationStats {
  title: string;
  posts: {
    totalDocuments: number;
  };
}

const GET_PUBLICATION_STATS_QUERY = `
  query GetPublicationStats($host: String!) {
    publication(host: $host) {
      title
      posts(first: 1) {
        totalDocuments
      }
    }
  }
`;

// Enhanced publication stats with caching
export const getPublicationStats = unstable_cache(
  async (): Promise<PublicationStats | null> => {
    try {
      const data = await client.request<{ publication: PublicationStats }>(
        GET_PUBLICATION_STATS_QUERY,
        { host: publication }
      );
      return data.publication;
    } catch (error) {
      console.error('Error fetching publication stats:', error);
      return null;
    }
  },
  ['publication-stats'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['publication-stats', 'hashnode-data']
  }
);

// Sitemap Generation
const SITEMAP_QUERY = `
  query Sitemap($host: String!, $postsCount: Int!, $postsAfter: String, $staticPagesCount: Int!) {
    publication(host: $host) {
      id
      url
      staticPages(first: $staticPagesCount) {
        edges {
          node {
            slug
          }
        }
      }
      posts(first: $postsCount, after: $postsAfter) {
        edges {
          node {
            id
            url
            slug
            publishedAt
            updatedAt
            tags {
              id
              name
              slug
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const MORE_SITEMAP_POSTS_QUERY = `
  query MoreSitemapPosts($host: String!, $postsCount: Int!, $postsAfter: String) {
    publication(host: $host) {
      id
      posts(first: $postsCount, after: $postsAfter) {
        edges {
          node {
            id
            url
            slug
            publishedAt
            updatedAt
            tags {
              id
              name
              slug
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export async function getSitemapData(maxPosts: number = 1000) {
  try {
    const initialData: any = await client.request(SITEMAP_QUERY, {
      host: publication,
      postsCount: 20,
      staticPagesCount: 50,
      postsAfter: null,
    });

    if (!initialData.publication) {
      throw new Error('Publication not found');
    }

    const publication_data = initialData.publication;
    const posts = publication_data.posts.edges.map((edge: any) => edge.node);
    const staticPages = publication_data.staticPages.edges.map((edge: any) => edge.node);

    // Fetch more posts if available
    const fetchMorePosts = async (after: string | null) => {
      if (!after || posts.length >= maxPosts) return;

      const moreData: any = await client.request(MORE_SITEMAP_POSTS_QUERY, {
        host: publication,
        postsCount: 20,
        postsAfter: after,
      });

      if (moreData.publication) {
        const morePosts = moreData.publication.posts.edges.map((edge: any) => edge.node);
        posts.push(...morePosts);

        if (moreData.publication.posts.pageInfo.hasNextPage && posts.length < maxPosts) {
          await fetchMorePosts(moreData.publication.posts.pageInfo.endCursor);
        }
      }
    };

    if (publication_data.posts.pageInfo.hasNextPage) {
      await fetchMorePosts(publication_data.posts.pageInfo.endCursor);
    }

    return {
      url: publication_data.url,
      posts,
      staticPages,
    };
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    throw error;
  }
}

// Search functionality
const SEARCH_POSTS_QUERY = `
  query SearchPostsOfPublication($host: String!, $first: Int!, $after: String, $query: String!) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after, filter: { query: $query }) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            readTimeInMinutes
            url
            coverImage {
              url
            }
            tags {
              name
              slug
            }
            author {
              name
              profilePicture
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Enhanced search with caching
export const searchBlogPosts = unstable_cache(
  async (
    query: string,
    first: number = 10,
    after?: string
  ): Promise<{ posts: BlogPost[]; hasNextPage: boolean; endCursor?: string }> => {
    try {
      const data: any = await client.request(SEARCH_POSTS_QUERY, {
        host: publication,
        first,
        after,
        query,
      });

      const posts = data.publication.posts.edges.map((edge: any) => edge.node);
      const { hasNextPage, endCursor } = data.publication.posts.pageInfo;

      return { posts, hasNextPage, endCursor };
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return { posts: [], hasNextPage: false };
    }
  },
  ['search-posts'],
  {
    revalidate: CACHE_REVALIDATE_SHORT,
    tags: ['search-results', 'blog-posts']
  }
);

// Tag-based filtering
const POSTS_BY_TAG_QUERY = `
  query PostsByTag($host: String!, $first: Int!, $after: String, $tagSlugs: [String!]!) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after, filter: { tagSlugs: $tagSlugs }) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            readTimeInMinutes
            url
            coverImage {
              url
            }
            tags {
              name
              slug
            }
            author {
              name
              profilePicture
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalDocuments
      }
    }
  }
`;

// Enhanced tag-based filtering with caching
export const getBlogPostsByTag = unstable_cache(
  async (
    tagSlugs: string[],
    first: number = 10,
    after?: string
  ): Promise<{ posts: BlogPost[]; hasNextPage: boolean; endCursor?: string; totalDocuments: number }> => {
    try {
      const data: any = await client.request(POSTS_BY_TAG_QUERY, {
        host: publication,
        first,
        after,
        tagSlugs,
      });

      const posts = data.publication.posts.edges.map((edge: any) => edge.node);
      const { hasNextPage, endCursor, totalDocuments } = data.publication.posts.pageInfo;

      return { posts, hasNextPage, endCursor, totalDocuments };
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      return { posts: [], hasNextPage: false, totalDocuments: 0 };
    }
  },
  ['posts-by-tag'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['tag-posts', 'blog-posts']
  }
);

// Enhanced tags fetching with caching
export const getAllTags = unstable_cache(
  async (): Promise<Tag[]> => {
    try {
      // Get posts first to extract tags from them
      const response = await getBlogPostsOriginal(50); // Get more posts to find all tags
      
      if (!response?.publication?.posts?.edges) {
        return [];
      }

      const posts = response.publication.posts.edges.map((edge: any) => edge.node);
      const tagMap = new Map<string, Tag>();

      // Extract unique tags from all posts
      posts.forEach((post: any) => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag: any) => {
            if (!tagMap.has(tag.slug)) {
              tagMap.set(tag.slug, {
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                postsCount: 1,
              });
            } else {
              const existingTag = tagMap.get(tag.slug)!;
              existingTag.postsCount += 1;
            }
          });
        }
      });

      return Array.from(tagMap.values());
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },
  ['all-tags'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['tags', 'blog-posts']
  }
);

// Enhanced single post fetching with caching
export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const GET_POST_BY_SLUG_QUERY = `
      query GetBlogPostBySlug($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            id
            title
            subtitle
            slug
            publishedAt
            updatedAt
            coverImage {
              url
            }
            brief
            content {
              markdown
              html
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
            preferences {
              disableComments
            }
            series {
              id
              name
              slug
              description {
                text
              }
              coverImage
              posts(first: 10) {
                totalDocuments
              }
            }
            tags {
              id
              name
              slug
            }
            author {
              id
              name
              username
              profilePicture
              bio {
                text
              }
              socialMediaLinks {
                website
                github
                twitter
                linkedin
              }
            }
            url
            readTimeInMinutes
            reactionCount
            responseCount
            views
            featured
          }
        }
      }
    `;

    try {
      const variables = { host: publication, slug };
      const data: any = await client.request(GET_POST_BY_SLUG_QUERY, variables);
      
      return data.publication?.post || null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
  },
  ['post-by-slug'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['single-post', 'blog-posts']
  }
);

// Newsletter subscription functionality
export interface NewsletterSubscription {
  email: string;
  status: 'PENDING' | 'CONFIRMED' | 'UNSUBSCRIBED';
}

const SUBSCRIBE_TO_NEWSLETTER_MUTATION = `
  mutation SubscribeToNewsletter($publicationId: ObjectId!, $email: String!) {
    subscribeToNewsletter(input: { publicationId: $publicationId, email: $email }) {
      status
    }
  }
`;

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // First get the publication ID
    const pubStats = await getPublicationStats();
    if (!pubStats) {
      throw new Error('Publication not found');
    }

    const result = await client.request(SUBSCRIBE_TO_NEWSLETTER_MUTATION, {
      publicationId: pubStats.title, // This might need adjustment based on actual schema
      email,
    });

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.'
    };
  }
}

// Analytics and engagement
export interface PostAnalytics {
  views: number;
  reactions: number;
  comments: number;
  shares: number;
}

// Featured posts functionality
export const getFeaturedPosts = unstable_cache(
  async (limit: number = 5): Promise<BlogPost[]> => {
    try {
      const response = await getBlogPostsOriginal(20); // Get more posts to find featured ones
      
      if (!response?.publication?.posts?.edges) {
        return [];
      }

      const allPosts = response.publication.posts.edges.map(edge => edge.node);
      const featuredPosts = allPosts.filter(post => post.featured).slice(0, limit);
      
      return featuredPosts;
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }
  },
  ['featured-posts'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['featured-posts', 'blog-posts']
  }
);

// Related posts functionality
export const getRelatedPosts = unstable_cache(
  async (postSlug: string, limit: number = 4): Promise<BlogPost[]> => {
    try {
      // Get the current post to find its tags
      const currentPost = await getBlogPostBySlug(postSlug);
      if (!currentPost || !currentPost.tags.length) {
        return [];
      }

      const tagSlugs = currentPost.tags.map(tag => tag.slug);
      const response = await getBlogPostsByTag(tagSlugs, limit + 5); // Get extra in case current post is included
      
      // Filter out the current post and limit results
      const relatedPosts = response.posts
        .filter(post => post.slug !== postSlug)
        .slice(0, limit);
      
      return relatedPosts;
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  },
  ['related-posts'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['related-posts', 'blog-posts']
  }
);

// Popular posts (based on views and reactions)
export const getPopularPosts = unstable_cache(
  async (limit: number = 5): Promise<BlogPost[]> => {
    try {
      const response = await getBlogPostsOriginal(30); // Get more posts to sort by popularity
      
      if (!response?.publication?.posts?.edges) {
        return [];
      }

      const allPosts = response.publication.posts.edges.map(edge => edge.node);
      
      // Sort by a combination of views, reactions, and comments
      const popularPosts = allPosts
        .sort((a, b) => {
          const scoreA = (a.views || 0) + (a.reactionCount || 0) * 2 + (a.responseCount || 0) * 3;
          const scoreB = (b.views || 0) + (b.reactionCount || 0) * 2 + (b.responseCount || 0) * 3;
          return scoreB - scoreA;
        })
        .slice(0, limit);
      
      return popularPosts;
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  },
  ['popular-posts'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['popular-posts', 'blog-posts']
  }
);

// Enhanced sitemap with better caching
export const getSitemapDataCached = unstable_cache(
  getSitemapData,
  ['sitemap-data'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['sitemap', 'blog-posts']
  }
);

// Comment functionality (if enabled)
export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    profilePicture?: string;
  };
  dateAdded: string;
  totalReactions: number;
}

const GET_POST_COMMENTS_QUERY = `
  query GetPostComments($postId: String!, $first: Int!) {
    post(id: $postId) {
      comments(first: $first) {
        edges {
          node {
            id
            content {
              text
            }
            author {
              name
              profilePicture
            }
            dateAdded
            totalReactions
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export async function getPostComments(postId: string, first: number = 10): Promise<Comment[]> {
  try {
    const data: any = await client.request(GET_POST_COMMENTS_QUERY, {
      postId,
      first,
    });

    if (!data?.post?.comments?.edges) {
      return [];
    }

    return data.post.comments.edges.map((edge: any) => ({
      id: edge.node.id,
      content: edge.node.content.text,
      author: {
        name: edge.node.author.name,
        profilePicture: edge.node.author.profilePicture,
      },
      dateAdded: edge.node.dateAdded,
      totalReactions: edge.node.totalReactions,
    }));
  } catch (error) {
    console.error('Error fetching post comments:', error);
    return [];
  }
}

// RSS Feed enhancement
export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
  categories: string[];
  author: string;
  enclosure?: {
    url: string;
    type: string;
  };
}

export const getRSSFeedData = unstable_cache(
  async (): Promise<{
    title: string;
    description: string;
    link: string;
    language: string;
    items: RSSItem[];
  }> => {
    try {
      const response = await getBlogPostsOriginal(50);
      
      if (!response?.publication?.posts?.edges) {
        throw new Error('No posts found');
      }

      const posts = response.publication.posts.edges.map(edge => edge.node);
      
      const items: RSSItem[] = posts.map(post => ({
        title: post.title,
        description: post.brief,
        link: post.url,
        pubDate: new Date(post.publishedAt).toUTCString(),
        guid: post.id,
        categories: post.tags.map(tag => tag.name),
        author: post.author.name,
        enclosure: post.coverImage ? {
          url: post.coverImage.url,
          type: 'image/jpeg',
        } : undefined,
      }));

      return {
        title: response.publication.title || 'Blog',
        description: `Latest posts from ${response.publication.title || 'Blog'}`,
        link: response.publication.url || '',
        language: 'en-US',
        items,
      };
    } catch (error) {
      console.error('Error generating RSS feed data:', error);
      throw error;
    }
  },
  ['rss-feed'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['rss', 'blog-posts']
  }
);

// Utility functions for revalidation
export async function revalidateAllBlogData() {
  // This function can be called to manually revalidate all blog data
  // It would typically be used in conjunction with webhooks
  try {
    // Trigger revalidation of all cached functions by making fresh requests
    await Promise.all([
      getBlogPostsOriginal(6),
      getLatestPostsOriginal(3),
      getPublicationStats(),
      getAllTags(),
    ]);
    
    console.log('Successfully revalidated all blog data');
  } catch (error) {
    console.error('Error revalidating blog data:', error);
  }
}

// Static Pages functionality for navigation
export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: {
    html: string;
    markdown: string;
  };
}

const STATIC_PAGES_QUERY = `
  query StaticPages($host: String!) {
    publication(host: $host) {
      id
      staticPages(first: 10) {
        edges {
          node {
            id
            title
            slug
            content {
              html
              markdown
            }
          }
        }
      }
    }
  }
`;

export const getStaticPages = unstable_cache(
  async (): Promise<StaticPage[]> => {
    try {
      const data: any = await client.request(STATIC_PAGES_QUERY, {
        host: publication,
      });

      if (!data.publication?.staticPages) {
        return [];
      }

      return data.publication.staticPages.edges.map((edge: any) => edge.node);
    } catch (error) {
      console.error('Error fetching static pages:', error);
      return [];
    }
  },
  ['static-pages'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['static-pages'],
  }
);

// Series functions
export const getAllSeries = unstable_cache(
  async (first: number = 20, after?: string): Promise<{ series: Series[]; hasNextPage: boolean; endCursor?: string }> => {
    try {
      const data: any = await client.request(GET_SERIES_QUERY, {
        host: publication,
        first,
        after,
      });

      if (!data.publication?.series) {
        return { series: [], hasNextPage: false };
      }

      const series = data.publication.series.edges.map((edge: any) => edge.node);
      const { hasNextPage, endCursor } = data.publication.series.pageInfo;

      return { series, hasNextPage, endCursor };
    } catch (error) {
      console.error('Error fetching series:', error);
      return { series: [], hasNextPage: false };
    }
  },
  ['series'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['series'],
  }
);

export const getSeriesBySlug = unstable_cache(
  async (slug: string, first: number = 20, after?: string): Promise<Series | null> => {
    try {
      const data: any = await client.request(GET_SERIES_BY_SLUG_QUERY, {
        host: publication,
        slug,
        first,
        after,
      });

      if (!data.publication?.series) {
        return null;
      }

      return data.publication.series;
    } catch (error) {
      console.error('Error fetching series by slug:', error);
      return null;
    }
  },
  ['series-by-slug'],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['series'],
  }
);

// Blog Navigation Items
export interface BlogNavItem {
  title: string;
  href: string;
  external?: boolean;
}

export const getBlogNavigation = async (): Promise<BlogNavItem[]> => {
  const staticPages = await getStaticPages();
  const { series } = await getAllSeries(10); // Get first 10 series for navigation
  
  const navigation: BlogNavItem[] = [
    { title: 'Home', href: '/blog' },
    { title: 'All Posts', href: '/blog' },
  ];

  // Add series navigation if any exist
  if (series.length > 0) {
    navigation.push({ title: 'Series', href: '/blog/series' });
  }

  // Add static pages to navigation
  staticPages.forEach(page => {
    navigation.push({
      title: page.title,
      href: `/blog/page/${page.slug}`,
    });
  });

  // Add common blog sections
  navigation.push(
    { title: 'About Author', href: '/about' },
    { title: 'Full Blog', href: 'https://nischalneupane.hashnode.dev', external: true },
    { title: 'RSS Feed', href: '/rss.xml', external: true }
  );

  return navigation;
};

// Export additional utility functions for better integration
export { client as hashnodeClient, publication as publicationHost };
