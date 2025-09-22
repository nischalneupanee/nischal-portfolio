import { graphqlClient } from './graphql-client';
import {
  GET_PUBLICATION_POSTS,
  GET_POST_BY_SLUG,
  GET_PUBLICATION_SERIES,
  GET_SERIES_BY_SLUG,
  SEARCH_POSTS,
  GET_PUBLICATION_INFO,
  GET_POPULAR_TAGS,
  GET_RECENT_POSTS,
  GET_FEATURED_POSTS,
} from './queries';
import type {
  PostsResponse,
  PostResponse,
  SeriesResponse,
  SeriesBySlugResponse,
  SearchPostsResponse,
  GetPostsVariables,
  GetPostVariables,
  GetSeriesVariables,
  GetSeriesBySlugVariables,
  SearchPostsVariables,
  BlogPost,
  Series,
  Tag,
  BlogStats,
  Publication,
} from './types';

// Hashnode publication host (replace with your actual Hashnode domain)
const PUBLICATION_HOST = 'blog.nischalneupane.com.np';

/**
 * Fetch all posts from the publication with pagination
 */
export async function getPosts(first: number = 20, after?: string): Promise<PostsResponse> {
  try {
    const variables: GetPostsVariables = {
      host: PUBLICATION_HOST,
      first,
      after,
    };

    const data = await graphqlClient.request<PostsResponse>(GET_PUBLICATION_POSTS, variables);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const variables: GetPostVariables = {
      host: PUBLICATION_HOST,
      slug,
    };

    const data = await graphqlClient.request<PostResponse>(GET_POST_BY_SLUG, variables);
    return data.publication.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(`Failed to fetch post: ${slug}`);
  }
}

/**
 * Get blog statistics
 */
export async function getBlogStats(): Promise<BlogStats> {
  try {
    const postsData = await getPosts(50);
    const posts = postsData.publication.posts.edges.map(({ node }) => node);
    
    const uniqueTags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => uniqueTags.add(tag.id));
    });

    return {
      totalPosts: postsData.publication.posts.totalDocuments,
      totalViews: posts.reduce((sum, post) => sum + post.views, 0),
      totalReactions: posts.reduce((sum, post) => sum + post.reactionCount, 0),
      totalTopics: uniqueTags.size,
    };
  } catch (error) {
    console.error('Error calculating blog stats:', error);
    return {
      totalPosts: 0,
      totalViews: 0,
      totalReactions: 0,
      totalTopics: 0,
    };
  }
}

/**
 * Fetch all series from the publication
 */
export async function getSeries(first: number = 20, after?: string): Promise<SeriesResponse> {
  try {
    const variables: GetSeriesVariables = {
      host: PUBLICATION_HOST,
      first,
      after,
    };

    const data = await graphqlClient.request<SeriesResponse>(GET_PUBLICATION_SERIES, variables);
    return data;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw new Error('Failed to fetch series');
  }
}

/**
 * Fetch a single series by slug
 */
export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    const variables: GetSeriesBySlugVariables = {
      host: PUBLICATION_HOST,
      slug,
    };

    const data = await graphqlClient.request<SeriesBySlugResponse>(GET_SERIES_BY_SLUG, variables);
    return data.publication.series;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw new Error(`Failed to fetch series: ${slug}`);
  }
}

/**
 * Get popular tags from all posts
 */
export async function getPopularTags(): Promise<Tag[]> {
  try {
    const data = await graphqlClient.request<{
      publication: { posts: { edges: Array<{ node: { tags: Tag[] } }> } };
    }>(GET_POPULAR_TAGS, { host: PUBLICATION_HOST });

    // Extract and count unique tags
    const tagMap = new Map<string, Tag & { count: number }>();
    
    data.publication.posts.edges.forEach(({ node }) => {
      node.tags.forEach((tag) => {
        if (tagMap.has(tag.id)) {
          tagMap.get(tag.id)!.count += 1;
        } else {
          tagMap.set(tag.id, { ...tag, count: 1 });
        }
      });
    });

    // Sort by count and return top tags
    return Array.from(tagMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)
      .map(({ count, ...tag }) => tag);
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    throw new Error('Failed to fetch popular tags');
  }
}

/**
 * Get recent posts for sidebar
 */
export async function getRecentPosts(first: number = 5): Promise<BlogPost[]> {
  try {
    const data = await graphqlClient.request<{
      publication: { posts: { edges: Array<{ node: BlogPost }> } };
    }>(GET_RECENT_POSTS, { host: PUBLICATION_HOST, first });

    return data.publication.posts.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    throw new Error('Failed to fetch recent posts');
  }
}