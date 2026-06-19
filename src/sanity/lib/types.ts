import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
};

export type ArticleAuthor = {
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImage;
};

export type ArticleCategory = {
  title: string;
  slug: string;
  description?: string;
  seoDescription?: string;
};

export type ArticleListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: ArticleCategory;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  author?: ArticleAuthor;
  featuredImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
  noIndex?: boolean;
};

export type ArticleDetail = ArticleListItem & {
  body?: PortableTextBlock[];
  relatedArticles?: ArticleListItem[];
};
