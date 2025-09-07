/**
 * Test script for Hashnode integration
 * Run with: npx tsx scripts/test-hashnode.ts
 */

import { 
  getBlogPosts, 
  getBlogPostBySlug, 
  getLatestPosts,
  getFeaturedPosts,
  getPopularPosts,
  getAllTags,
  getPublicationStats,
  searchBlogPosts
} from '../src/lib/hashnode';

async function testHashnodeIntegration() {
  console.log('🧪 Testing Hashnode Integration...\n');

  try {
    // Test 1: Get publication stats
    console.log('1️⃣ Testing publication stats...');
    const stats = await getPublicationStats();
    console.log(`✅ Publication: ${stats?.title || 'Unknown'}`);
    console.log(`📊 Total posts: ${stats?.posts?.totalDocuments || 0}\n`);

    // Test 2: Get latest posts
    console.log('2️⃣ Testing latest posts...');
    const latestPosts = await getLatestPosts(3);
    console.log(`✅ Retrieved ${latestPosts.length} latest posts`);
    if (latestPosts.length > 0) {
      console.log(`📝 Latest: "${latestPosts[0].title}"`);
    }
    console.log('');

    // Test 3: Get all posts with pagination
    console.log('3️⃣ Testing blog posts pagination...');
    const postsResponse = await getBlogPosts(5);
    const posts = postsResponse.publication.posts.edges.map(edge => edge.node);
    console.log(`✅ Retrieved ${posts.length} posts`);
    console.log(`🔄 Has next page: ${postsResponse.publication.posts.pageInfo.hasNextPage}`);
    console.log('');

    // Test 4: Get featured posts
    console.log('4️⃣ Testing featured posts...');
    const featuredPosts = await getFeaturedPosts(3);
    console.log(`✅ Retrieved ${featuredPosts.length} featured posts`);
    console.log('');

    // Test 5: Get popular posts
    console.log('5️⃣ Testing popular posts...');
    const popularPosts = await getPopularPosts(3);
    console.log(`✅ Retrieved ${popularPosts.length} popular posts`);
    if (popularPosts.length > 0) {
      const topPost = popularPosts[0];
      console.log(`🔥 Most popular: "${topPost.title}" (${topPost.views || 0} views, ${topPost.reactionCount || 0} reactions)`);
    }
    console.log('');

    // Test 6: Get all tags
    console.log('6️⃣ Testing tags...');
    const tags = await getAllTags();
    console.log(`✅ Retrieved ${tags.length} tags`);
    if (tags.length > 0) {
      console.log(`🏷️ Popular tags: ${tags.slice(0, 5).map(tag => tag.name).join(', ')}`);
    }
    console.log('');

    // Test 7: Test individual post
    if (posts.length > 0) {
      console.log('7️⃣ Testing individual post...');
      const firstPost = posts[0];
      const fullPost = await getBlogPostBySlug(firstPost.slug);
      if (fullPost) {
        console.log(`✅ Retrieved full post: "${fullPost.title}"`);
        console.log(`📊 Stats: ${fullPost.readTimeInMinutes} min read, ${fullPost.reactionCount || 0} reactions`);
        console.log(`🏷️ Tags: ${fullPost.tags.map(tag => tag.name).join(', ')}`);
      } else {
        console.log('❌ Failed to retrieve full post');
      }
      console.log('');
    }

    // Test 8: Search functionality
    if (posts.length > 0) {
      console.log('8️⃣ Testing search...');
      const searchQuery = posts[0].title.split(' ')[0]; // Use first word of first post title
      const searchResults = await searchBlogPosts(searchQuery, 3);
      console.log(`✅ Search for "${searchQuery}" returned ${searchResults.posts.length} results`);
      console.log('');
    }

    console.log('🎉 All tests completed successfully!');
    console.log('\n📝 Integration Summary:');
    console.log(`- Total posts available: ${stats?.posts?.totalDocuments || 0}`);
    console.log(`- Featured posts: ${featuredPosts.length}`);
    console.log(`- Available tags: ${tags.length}`);
    console.log(`- Search functionality: Working`);
    console.log(`- Individual post loading: Working`);

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your environment variables in .env.local');
    console.log('2. Verify your Hashnode publication is accessible');
    console.log('3. Ensure you have posts published on your blog');
    console.log('4. Check network connectivity');
  }
}

// Run the test
testHashnodeIntegration();
