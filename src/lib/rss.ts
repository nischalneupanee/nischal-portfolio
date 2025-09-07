import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_END || 'https://gql.hashnode.com';
const publication = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION || 'nischalneupane.hashnode.dev';

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

const RSS_FEED_QUERY = `
  query RSSFeed($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      displayTitle
      url
      metaTags
      favicon
      isTeam
      followersCount
      descriptionSEO
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            url
            slug
            brief
            publishedAt
            content {
              html
            }
            tags {
              id
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
          endCursor
          hasNextPage
        }
      }
      author {
        name
        username
        profilePicture
        followersCount
      }
    }
  }
`;

export async function generateRSSFeed(): Promise<string> {
  try {
    const data: any = await client.request(RSS_FEED_QUERY, {
      host: publication,
      first: 20,
      after: null,
    });
    
    if (!data.publication) {
      throw new Error('No publication data found');
    }

    const posts = data.publication.posts.edges.map((edge: any) => edge.node);
    const baseUrl = 'https://nischalneupane.vercel.app';
    
    return constructRSSFeed(data.publication, posts, baseUrl);
  } catch (error) {
    console.error('Error fetching RSS feed data:', error);
    throw error;
  }
}

export function constructRSSFeed(publication: any, posts: any[], baseUrl: string) {
  const { title, descriptionSEO, url, author } = publication;
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>${title}</title>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <link>${url}</link>
    <description>${descriptionSEO || `${author.name}'s blog`}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Hashnode Blog Starter Kit</generator>`;

  posts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const categories = post.tags?.map((tag: any) => `<category>${tag.name}</category>`).join('') || '';
    
    rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <comments>${postUrl}#comments</comments>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${categories}
      <guid isPermaLink="false">${post.id}</guid>
      <description><![CDATA[${post.brief}]]></description>
      <content:encoded><![CDATA[${post.content?.html || post.brief}]]></content:encoded>
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
}
