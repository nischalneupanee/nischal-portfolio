// Core types for Hashnode API v2 integration

export interface User {
  id: string;
  name: string;
  username: string;
  bio?: {
    text: string;
  };
  profilePicture?: string;
  socialMediaLinks?: {
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  location?: string;
  dateJoined: string;
}

export interface Publication {
  id: string;
  title: string;
  displayTitle?: string;
  descriptionSEO?: string;
  url: string;
  author: User;
  favicon?: string;
  headerColor?: string;
  metaTags?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  postsCount?: number;
}

export interface Series {
  id: string;
  name: string;
  slug: string;
  description?: {
    text: string;
  };
  coverImage?: string;
  createdAt: string;
  author: User;
  posts: {
    totalDocuments: number;
    edges: Array<{
      node: BlogPost;
    }>;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  brief: string;
  content: {
    markdown: string;
    html: string;
  };
  coverImage?: {
    url: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTimeInMinutes: number;
  author: User;
  publication?: Publication;
  tags: Tag[];
  series?: Series;
  url: string;
  canonicalUrl?: string;
  views: number;
  reactionCount: number;
  responseCount: number;
  bookmarked: boolean;
  featured: boolean;
  preferences: {
    disableComments: boolean;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Comment {
  id: string;
  content: {
    markdown: string;
    html: string;
  };
  author: User;
  dateAdded: string;
  totalReactions: number;
  post: {
    id: string;
    slug: string;
  };
  replies?: {
    edges: Array<{
      node: Comment;
    }>;
  };
}

export interface PostsResponse {
  publication: {
    posts: {
      totalDocuments: number;
      pageInfo: {
        hasNextPage: boolean;
        endCursor?: string;
      };
      edges: Array<{
        node: BlogPost;
        cursor: string;
      }>;
    };
  };
}

export interface PostResponse {
  publication: {
    post: BlogPost | null;
  };
}

export interface SeriesResponse {
  publication: {
    series: {
      totalDocuments: number;
      edges: Array<{
        node: Series;
      }>;
    };
  };
}

export interface SeriesBySlugResponse {
  publication: {
    series: Series | null;
  };
}

export interface SearchPostsResponse {
  searchPostsOfPublication: {
    posts: {
      totalDocuments: number;
      edges: Array<{
        node: BlogPost;
      }>;
    };
  };
}

// GraphQL query variables types
export interface GetPostsVariables {
  host: string;
  first: number;
  after?: string;
  [key: string]: any;
}

export interface GetPostVariables {
  host: string;
  slug: string;
  [key: string]: any;
}

export interface GetSeriesVariables {
  host: string;
  first: number;
  after?: string;
  [key: string]: any;
}

export interface GetSeriesBySlugVariables {
  host: string;
  slug: string;
  [key: string]: any;
}

export interface SearchPostsVariables {
  host: string;
  query: string;
  first: number;
  after?: string;
  [key: string]: any;
}

// Utility types for components
export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalReactions: number;
  totalTopics: number;
}

export interface BlogSearchFilters {
  query: string;
  tags: string[];
  sortBy: 'publishedAt' | 'title' | 'views' | 'readTimeInMinutes';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationInfo {
  hasNextPage: boolean;
  endCursor?: string;
  totalCount: number;
}