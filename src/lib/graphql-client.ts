import { GraphQLClient } from 'graphql-request';

// Hashnode GraphQL API endpoint
const HASHNODE_API_URL = 'https://gql.hashnode.com';

// Create a GraphQL client instance
export const graphqlClient = new GraphQLClient(HASHNODE_API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// For requests that require authentication (if needed in future)
export const createAuthenticatedClient = (token: string) => {
  return new GraphQLClient(HASHNODE_API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};