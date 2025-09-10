const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient('https://gql.hashnode.com');

const query = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            id
            title
            slug
            brief
            coverImage {
              url
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

async function testAPI() {
  try {
    const data = await client.request(query, {
      host: 'nischalneupane.hashnode.dev',
      first: 3
    });
    
    console.log('API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Check cover images specifically
    console.log('\nCover Image Analysis:');
    data.publication.posts.edges.forEach(edge => {
      const post = edge.node;
      console.log(`Post: ${post.title}`);
      console.log(`Cover Image: ${post.coverImage ? post.coverImage.url : 'NULL'}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
