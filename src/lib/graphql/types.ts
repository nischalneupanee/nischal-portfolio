// TypeScript interfaces for Hashnode API data structures

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  brief: string;
  content: {
    markdown: string;
    html: string;
  };
  coverImage?: {
    url: string;
    attribution?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  url: string;
  readTimeInMinutes: number;
  reactionCount: number;
  responseCount: number;
  views: number;
  featured: boolean;
  author: Author;
  tags: Tag[];
  series?: Series;
  seo?: {
    title?: string;
    description?: string;
  };
  ogMetaData?: {
    image?: string;
  };
  preferences?: {
    disableComments: boolean;
  };
}

export interface Author {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
  bio?: {
    text: string;
  };
  socialMediaLinks?: {
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  posts?: {
    totalDocuments: number;
  };
  postsCount?: number; // For easier access to post count
}

export interface Series {
  id: string;
  name: string;
  slug: string;
  description?: {
    text: string;
  };
  coverImage?: {
    url: string;
  };
  createdAt: string;
  author: Author;
  posts: {
    edges: Array<{
      node: Post;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
    totalDocuments: number;
  };
}

export interface Comment {
  id: string;
  content: {
    text: string;
  };
  author: {
    id: string;
    name: string;
    username: string;
    profilePicture?: string;
  };
  dateAdded: string;
  totalReactions: number;
}

export interface Publication {
  id: string;
  title: string;
  displayTitle?: string;
  url: string;
  posts: {
    edges: Array<{
      node: Post;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
    totalDocuments: number;
  };
}

export interface BlogResponse {
  publication: Publication;
}

export interface PostResponse {
  publication: {
    post: Post;
  };
}

export interface SeriesResponse {
  publication: {
    series: Series;
  };
}

export interface TagsResponse {
  publication: {
    id: string;
    posts: {
      edges: Array<{
        node: {
          tags: Tag[];
        };
      }>;
    };
  };
}

// Additional response types for hashnode.ts compatibility
export interface PublicationResponse {
  publication: Publication;
}

export interface PostsByTagResponse {
  publication: {
    posts: {
      edges: Array<{
        node: Post;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor?: string;
      };
      totalDocuments: number;
    };
  };
}

export interface PublicationInfoResponse {
  publication: {
    id: string;
    title: string;
    displayTitle?: string;
    url: string;
  };
}