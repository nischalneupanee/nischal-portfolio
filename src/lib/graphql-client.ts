import { GraphQLClient } from 'graphql-request';

// Hashnode GraphQL API endpoint
const HASHNODE_API_URL = 'https://gql.hashnode.com';

// Custom fetch function with timeout and retry logic
const fetchWithRetry = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const fetchWithTimeout = async (url: RequestInfo | URL, options?: RequestInit, timeout = 10000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };
  
  // Retry logic - try up to 3 times
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetchWithTimeout(url, init, 10000); // 10 second timeout per attempt
    } catch (error) {
      lastError = error;
      console.warn(`GraphQL request attempt ${attempt} failed:`, error);
      
      if (attempt < 3) {
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s delays
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

// Create a GraphQL client instance with improved error handling
export const graphqlClient = new GraphQLClient(HASHNODE_API_URL, {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Nischal-Portfolio/2.0.1',
  },
  fetch: fetchWithRetry,
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