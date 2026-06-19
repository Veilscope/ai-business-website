import { defineQuery } from "next-sanity";

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readTime,
  seoTitle,
  seoDescription,
  noIndex,
  featuredImage{
    alt,
    asset->{
      _ref,
      url,
      metadata { dimensions }
    }
  },
  category->{
    title,
    "slug": slug.current,
    description,
    seoDescription
  },
  author->{
    name,
    role,
    bio,
    image{
      alt,
      asset->{
        _ref,
        url,
        metadata { dimensions }
      }
    }
  }
`;

export const ARTICLES_QUERY = defineQuery(`
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    ${articleFields}
  }
`);

export const FEATURED_ARTICLE_QUERY = defineQuery(`
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc)[0] {
    ${articleFields}
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[
    _type == "article" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    ${articleFields},
    body,
    "relatedArticles": *[
      _type == "article" &&
      defined(slug.current) &&
      slug.current != ^.slug.current &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      category._ref == ^.category._ref
    ] | order(publishedAt desc)[0...3] {
      ${articleFields}
    }
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] {
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "category" &&
    defined(slug.current)
  ] | order(title asc) {
    title,
    "slug": slug.current,
    description,
    seoDescription
  }
`);

export const CATEGORY_QUERY = defineQuery(`
  *[
    _type == "category" &&
    slug.current == $slug
  ][0] {
    title,
    "slug": slug.current,
    description,
    seoDescription
  }
`);

export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(`
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    category->slug.current == $slug
  ] | order(publishedAt desc) {
    ${articleFields}
  }
`);
