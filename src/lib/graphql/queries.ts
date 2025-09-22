// GraphQL queries for Hashnode API following the implementation guide

// Query to get posts for blog listing
export const GET_POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      displayTitle
      url
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            subtitle
            slug
            brief
            publishedAt
            updatedAt
            coverImage {
              url
              attribution
            }
            url
            readTimeInMinutes
            reactionCount
            responseCount
            views
            featured
            author {
              id
              name
              username
              profilePicture
              bio {
                text
              }
            }
            tags {
              id
              name
              slug
            }
            series {
              id
              name
              slug
            }
            seo {
              title
              description
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

// Query to get a single post by slug
export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        subtitle
        slug
        brief
        content {
          markdown
          html
        }
        coverImage {
          url
          attribution
        }
        publishedAt
        updatedAt
        url
        readTimeInMinutes
        reactionCount
        responseCount
        views
        featured
        author {
          id
          name
          username
          profilePicture
          bio {
            text
          }
          socialMediaLinks {
            website
            github
            twitter
            linkedin
          }
        }
        tags {
          id
          name
          slug
        }
        series {
          id
          name
          slug
          description {
            text
          }
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
        seo {
          title
          description
        }
        ogMetaData {
          image
        }
        preferences {
          disableComments
        }
      }
    }
  }
`;

// Query to get all series
export const GET_SERIES_QUERY = `
  query GetSeries($host: String!, $first: Int!) {
    publication(host: $host) {
      seriesList(first: $first) {
        edges {
          node {
            id
            name
            slug
            description {
              text
            }
            coverImage {
              url
            }
            createdAt
            author {
              id
              name
              username
            }
            posts(first: 1) {
              totalDocuments
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

// Query to get a specific series with its posts
export const GET_SERIES_BY_SLUG_QUERY = `
  query GetSeriesBySlug($host: String!, $slug: String!, $first: Int!) {
    publication(host: $host) {
      series(slug: $slug) {
        id
        name
        slug
        description {
          text
        }
        coverImage {
          url
        }
        createdAt
        author {
          id
          name
          username
          profilePicture
        }
        posts(first: $first) {
          edges {
            node {
              id
              title
              subtitle
              slug
              brief
              publishedAt
              coverImage {
                url
              }
              readTimeInMinutes
              reactionCount
              responseCount
              views
              author {
                name
                username
              }
              tags {
                id
                name
                slug
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
  }
`;

// Query to search posts
export const SEARCH_POSTS_QUERY = `
  query SearchPosts($host: String!, $first: Int!, $filter: PublicationPostConnectionFilter) {
    publication(host: $host) {
      posts(first: $first, filter: $filter) {
        edges {
          node {
            id
            title
            subtitle
            slug
            brief
            publishedAt
            coverImage {
              url
            }
            readTimeInMinutes
            reactionCount
            responseCount
            views
            author {
              name
              username
              profilePicture
            }
            tags {
              id
              name
              slug
            }
            series {
              name
              slug
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

// Query to get tags
export const GET_TAGS_QUERY = `
  query GetTags($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            tags {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

// Query to get comments for a post
export const GET_COMMENTS_QUERY = `
  query GetComments($postId: ID!, $first: Int!) {
    post(id: $postId) {
      comments(first: $first) {
        edges {
          node {
            id
            content {
              text
            }
            author {
              id
              name
              username
              profilePicture
            }
            dateAdded
            totalReactions
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

// Mutation to add a comment
export const ADD_COMMENT_MUTATION = `
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        content {
          text
        }
        author {
          name
          username
        }
        dateAdded
      }
    }
  }
`;

// Mutation to react to a post
export const REACT_TO_POST_MUTATION = `
  mutation ReactToPost($input: ReactToPostInput!) {
    reactToPost(input: $input) {
      post {
        id
        reactionCount
      }
    }
  }
`;

// Export aliases for hashnode.ts compatibility
export const GET_PUBLICATION_POSTS = GET_POSTS_QUERY;
export const GET_POST_BY_SLUG = GET_POST_BY_SLUG_QUERY;
export const GET_POSTS_BY_TAG = SEARCH_POSTS_QUERY;
export const GET_PUBLICATION_INFO = GET_POSTS_QUERY;