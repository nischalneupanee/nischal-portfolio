import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://gql.hashnode.com';

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
      host: 'nischalneupanee.hashnode.dev', // Replace with your actual Hashnode subdomain
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
