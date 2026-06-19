# Denver AI Enablement Website

Next.js App Router website with a Sanity-powered Insights/Blog section and an embedded Sanity Studio at `/studio`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sanity Setup

Create a Sanity project, then copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-01
SANITY_REVALIDATE_SECRET=replace-with-a-random-secret
```

The public site falls back to sample article content when Sanity env vars are missing. Once the project ID and dataset are set, `/insights`, article pages, category archives, and the sitemap read from Sanity.

## Content Editing

Open `/studio` to create and edit:

- Articles
- Categories
- Authors

Articles support rich text, headings, lists, links, quotes, images, callouts, SEO title/description, and no-index control.

## Revalidation Webhook

Create a Sanity webhook that sends `POST` requests to:

```text
https://your-domain.com/api/revalidate/sanity
```

Use the same value for the webhook secret and `SANITY_REVALIDATE_SECRET`.

Recommended webhook projection:

```json
{
  "_type": _type,
  "slug": slug.current,
  "categorySlug": category->slug.current
}
```

Trigger it for article and category create/update/delete events. The route revalidates article lists, article detail pages, category pages, and the sitemap.

## Verification

```bash
npm run lint
npm run build
```
