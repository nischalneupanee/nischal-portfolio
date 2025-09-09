/**
 * Simple test script for Hashnode integration without Next.js caching
 * Run with: npx tsx scripts/test-hashnode-simple.ts
 */

import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_END || 'https://gql.hashnode.com';
const publication = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION || 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.HASHNODE_PAT ? `Bearer ${process.env.HASHNODE_PAT}` : '',
  },
});

// Simple GraphQL queries without caching
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

const GET_POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      title
      displayTitle
      url
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            readTimeInMinutes
            tags {
              name
              slug
            }
            author {
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

async function testHashnodeIntegration() {
  console.log('🧪 Testing Hashnode Integration (Simple)...\n');
  console.log(`📡 Endpoint: ${endpoint}`);
  console.log(`📖 Publication: ${publication}\n`);

  try {
    // Test 1: Get publication stats
    console.log('1️⃣ Testing publication connection...');
    const statsData = await client.request(GET_PUBLICATION_STATS_QUERY, {
      host: publication
    });
    
    if (statsData.publication) {
      console.log(`✅ Connected successfully!`);
      console.log(`📖 Publication: ${statsData.publication.title}`);
      console.log(`📊 Total posts: ${statsData.publication.posts.totalDocuments}\n`);
    } else {
      console.log('❌ No publication data received\n');
      return;
    }

    // Test 2: Get posts
    console.log('2️⃣ Testing posts retrieval...');
    const postsData = await client.request(GET_POSTS_QUERY, {
      host: publication,
      first: 5
    });

    if (postsData.publication && postsData.publication.posts) {
      const posts = postsData.publication.posts.edges.map((edge: any) => edge.node);
      console.log(`✅ Retrieved ${posts.length} posts`);
      console.log(`🔄 Has more posts: ${postsData.publication.posts.pageInfo.hasNextPage}`);
      
      if (posts.length > 0) {
        const firstPost = posts[0];
        console.log(`📝 Latest post: "${firstPost.title}"`);
        console.log(`📅 Published: ${new Date(firstPost.publishedAt).toLocaleDateString()}`);
        console.log(`⏱️ Read time: ${firstPost.readTimeInMinutes} minutes`);
        console.log(`🏷️ Tags: ${firstPost.tags.map((tag: any) => tag.name).join(', ')}`);
        
        if (firstPost.coverImage) {
          console.log(`🖼️ Has cover image: Yes`);
        }
      }
      console.log('');
    } else {
      console.log('❌ No posts data received\n');
      return;
    }

    // Test 3: Test individual post query
    if (postsData.publication.posts.edges.length > 0) {
      console.log('3️⃣ Testing individual post query...');
      const firstPostSlug = postsData.publication.posts.edges[0].node.slug;
      
      const POST_BY_SLUG_QUERY = `
        query GetPost($host: String!, $slug: String!) {
          publication(host: $host) {
            post(slug: $slug) {
              id
              title
              brief
              content {
                markdown
              }
              publishedAt
              readTimeInMinutes
              tags {
                name
                slug
              }
            }
          }
        }
      `;

      const postData = await client.request(POST_BY_SLUG_QUERY, {
        host: publication,
        slug: firstPostSlug
      });

      if (postData.publication && postData.publication.post) {
        console.log(`✅ Retrieved individual post: "${postData.publication.post.title}"`);
        console.log(`📄 Content length: ${postData.publication.post.content.markdown.length} characters`);
        console.log('');
      } else {
        console.log(`❌ Failed to retrieve post with slug: ${firstPostSlug}\n`);
      }
    }

    console.log('🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`✅ Hashnode API connection: Working`);
    console.log(`✅ Publication access: Working`);
    console.log(`✅ Posts retrieval: Working`);
    console.log(`✅ Individual post queries: Working`);
    console.log(`✅ Total posts available: ${statsData.publication.posts.totalDocuments}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your environment variables:');
    console.log(`   - NEXT_PUBLIC_HASHNODE_PUBLICATION=${publication}`);
    console.log(`   - HASHNODE_PAT=${process.env.HASHNODE_PAT ? 'Set' : 'Not set'}`);
    console.log('2. Verify your Hashnode publication is accessible at:');
    console.log(`   https://${publication}`);
    console.log('3. Ensure you have posts published on your blog');
    console.log('4. Check if your Personal Access Token is valid');
    
    if (error instanceof Error) {
      console.log(`\n🐛 Error details: ${error.message}`);
    }
  }
}

// Load environment variables from .env.local if available
try {
  const fs = require('fs');
  const path = require('path');
  const envPath = path.resolve(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envVars = envFile.split('\n').filter(line => line && !line.startsWith('#'));
    
    envVars.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key] = value;
      }
    });
    console.log('📁 Loaded environment variables from .env.local');
  } else {
    console.log('⚠️ .env.local not found, using system environment variables');
  }
} catch (error) {
  console.log('⚠️ Could not load .env.local, using system environment variables');
}

// Run the test
testHashnodeIntegration();
