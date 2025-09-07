import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_END || 'https://gql.hashnode.com';
const publication = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION || 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage?: {
    url: string;
  };
  publishedAt: string;
  url: string;
  readTimeInMinutes: number;
  tags: {
    name: string;
    slug: string;
  }[];
}

export interface BlogResponse {
  publication: {
    posts: {
      edges: {
        node: BlogPost;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

const GET_POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            brief
            slug
            coverImage {
              url
            }
            publishedAt
            url
            readTimeInMinutes
            tags {
              name
              slug
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

export async function getBlogPosts(
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

export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const data = await getBlogPosts(count);
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

export async function getPublicationStats(): Promise<PublicationStats | null> {
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
}
