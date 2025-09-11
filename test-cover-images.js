const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://gql.hashnode.com';
const publication = 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

const GET_POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      title
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            coverImage {
              url
            }
            ogMetaData {
              image
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

async function testCoverImages() {
  try {
    console.log('🔍 Fetching blog posts from Hashnode...\n');
    
    const response = await client.request(GET_POSTS_QUERY, {
      host: publication,
      first: 5
    });
    
    const posts = response.publication.posts.edges.map(edge => edge.node);
    
    console.log('=== COVER IMAGE ANALYSIS ===\n');
    
    posts.forEach((post, index) => {
      console.log(`📝 Post ${index + 1}: "${post.title}"`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Cover Image: ${post.coverImage ? '✅ ' + post.coverImage.url : '❌ None'}`);
      console.log(`   OG Meta Image: ${post.ogMetaData?.image ? '✅ ' + post.ogMetaData.image : '❌ None'}`);
      console.log(`   Tags: ${post.tags?.map(tag => tag.name).join(', ') || 'No tags'}`);
      console.log('   ---');
    });

    // Summary
    const withCover = posts.filter(post => post.coverImage).length;
    const withOGImage = posts.filter(post => post.ogMetaData?.image).length;
    
    console.log('\n📊 SUMMARY:');
    console.log(`Total posts: ${posts.length}`);
    console.log(`Posts with cover image: ${withCover}/${posts.length}`);
    console.log(`Posts with OG meta image: ${withOGImage}/${posts.length}`);
    console.log(`Posts needing fallback: ${posts.length - withCover}/${posts.length}`);
    
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
  }
}

testCoverImages();
