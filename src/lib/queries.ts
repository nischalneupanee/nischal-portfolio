// GraphQL queries for Hashnode API v2

export const GET_PUBLICATION_POSTS = `
  query GetPublicationPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        totalDocuments
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            slug
            title
            subtitle
            brief
            content {
              markdown
              html
            }
            coverImage {
              url
            }
            publishedAt
            updatedAt
            readTimeInMinutes
            author {
              id
              name
              username
              bio {
                text
              }
              profilePicture
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
              logo
            }
            series {
              id
              name
              slug
            }
            url
            views
            reactionCount
            responseCount
            featured
            preferences {
              disableComments
            }
            seo {
              title
              description
            }
          }
          cursor
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        slug
        title
        subtitle
        brief
        content {
          markdown
          html
        }
        coverImage {
          url
        }
        publishedAt
        updatedAt
        readTimeInMinutes
        author {
          id
          name
          username
          bio {
            text
          }
          profilePicture
          socialMediaLinks {
            website
            github
            twitter
            linkedin
          }
          location
          dateJoined
        }
        publication {
          id
          title
          url
          author {
            name
            username
          }
        }
        tags {
          id
          name
          slug
          logo
        }
        series {
          id
          name
          slug
          description {
            text
          }
          coverImage
          author {
            name
            username
          }
          posts {
            totalDocuments
            edges {
              node {
                id
                slug
                title
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
        url
        canonicalUrl
        views
        reactionCount
        responseCount
        bookmarked
        featured
        preferences {
          disableComments
        }
        seo {
          title
          description
        }
      }
    }
  }
`;

export const GET_PUBLICATION_SERIES = `
  query GetPublicationSeries($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      series(first: $first, after: $after) {
        totalDocuments
        edges {
          node {
            id
            name
            slug
            description {
              text
            }
            coverImage
            createdAt
            author {
              id
              name
              username
              profilePicture
            }
            posts {
              totalDocuments
              edges {
                node {
                  id
                  slug
                  title
                  publishedAt
                  readTimeInMinutes
                  views
                  reactionCount
                  coverImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SERIES_BY_SLUG = `
  query GetSeriesBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      series(slug: $slug) {
        id
        name
        slug
        description {
          text
        }
        coverImage
        createdAt
        author {
          id
          name
          username
          bio {
            text
          }
          profilePicture
          socialMediaLinks {
            website
            github
            twitter
            linkedin
          }
        }
        posts {
          totalDocuments
          edges {
            node {
              id
              slug
              title
              subtitle
              brief
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
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
              views
              reactionCount
              responseCount
              featured
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_POSTS = `
  query SearchPosts($host: String!, $query: String!, $first: Int!, $after: String) {
    searchPostsOfPublication(
      query: $query
      first: $first
      after: $after
      filter: { publicationId: $host }
    ) {
      posts {
        totalDocuments
        edges {
          node {
            id
            slug
            title
            subtitle
            brief
            coverImage {
              url
            }
            publishedAt
            readTimeInMinutes
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
            views
            reactionCount
            responseCount
            featured
          }
        }
      }
    }
  }
`;

export const GET_PUBLICATION_INFO = `
  query GetPublicationInfo($host: String!) {
    publication(host: $host) {
      id
      title
      displayTitle
      descriptionSEO
      url
      author {
        id
        name
        username
        bio {
          text
        }
        profilePicture
        socialMediaLinks {
          website
          github
          twitter
          linkedin
        }
      }
      favicon
      headerColor
      metaTags
      posts {
        totalDocuments
      }
    }
  }
`;

export const GET_POPULAR_TAGS = `
  query GetPopularTags($host: String!) {
    publication(host: $host) {
      posts(first: 50) {
        edges {
          node {
            tags {
              id
              name
              slug
              logo
            }
          }
        }
      }
    }
  }
`;

export const GET_RECENT_POSTS = `
  query GetRecentPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            id
            slug
            title
            brief
            coverImage {
              url
            }
            publishedAt
            readTimeInMinutes
            author {
              name
              username
              profilePicture
            }
            tags {
              name
              slug
            }
            views
            reactionCount
          }
        }
      }
    }
  }
`;

export const GET_FEATURED_POSTS = `
  query GetFeaturedPosts($host: String!) {
    publication(host: $host) {
      posts(first: 10) {
        edges {
          node {
            id
            slug
            title
            subtitle
            brief
            coverImage {
              url
            }
            publishedAt
            readTimeInMinutes
            author {
              name
              username
              profilePicture
            }
            tags {
              name
              slug
            }
            views
            reactionCount
            featured
          }
        }
      }
    }
  }
`;