const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://gql.hashnode.com';
const publication = 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 5e9a064e-4542-4cf4-9076-f8b26e0a728d`,
  },
});

const SIMPLE_QUERY = `
  query GetSimplePosts($host: String!) {
    publication(host: $host) {
      title
      posts(first: 10) {
        edges {
          node {
            id
            title
            slug
            publishedAt
          }
        }
        totalDocuments
      }
    }
  }
`;

async function testHashnode() {
  try {
    console.log('🔥 Testing final Hashnode integration...');
    
    const data = await client.request(SIMPLE_QUERY, {
      host: publication,
    });
    
    console.log('✅ Connected successfully!');
    console.log(`📖 Publication: ${data.publication.title}`);
    console.log(`📊 Total posts: ${data.publication.posts.totalDocuments}`);
    
    if (data.publication.posts.edges.length > 0) {
      console.log('📝 Sample posts:');
      data.publication.posts.edges.slice(0, 3).forEach((edge, index) => {
        console.log(`  ${index + 1}. ${edge.node.title} (${edge.node.slug})`);
      });
    }
    
    console.log('\n🎉 HASHNODE INTEGRATION FULLY FUNCTIONAL! 🎉');
    return true;
  } catch (error) {
    console.error('❌ Error testing Hashnode:', error.message);
    return false;
  }
}

testHashnode().then(success => {
  process.exit(success ? 0 : 1);
});
