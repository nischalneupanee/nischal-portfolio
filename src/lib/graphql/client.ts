import { GraphQLClient } from 'graphql-request';

// GraphQL client configuration for Hashnode API
const HASHNODE_GRAPHQL_ENDPOINT = process.env.HASHNODE_GRAPHQL_ENDPOINT || 'https://gql.hashnode.com';

// Create GraphQL client
export const graphqlClient = new GraphQLClient(HASHNODE_GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
    // Add authorization header if API key is provided
    ...(process.env.HASHNODE_API_KEY && {
      'Authorization': `Bearer ${process.env.HASHNODE_API_KEY}`
    })
  }
});

// Publication host from environment
export const PUBLICATION_HOST = process.env.HASHNODE_PUBLICATION_HOST || process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

if (!PUBLICATION_HOST) {
  throw new Error('HASHNODE_PUBLICATION_HOST environment variable is required');
}

// Request with automatic error handling
export async function makeGraphQLRequest<T>(
  query: string, 
  variables?: Record<string, any>
): Promise<T> {
  try {
    const data = await graphqlClient.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}