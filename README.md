# AI Training Denver Website

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

## Contact Email Setup

The contact form sends messages to `brody@aitrainingdenver.com` through Nodemailer. Set these server-only environment variables in `.env.local` and in production:

```bash
CONTACT_SMTP_HOST=smtp.example.com
CONTACT_SMTP_PORT=587
CONTACT_SMTP_USER=your-smtp-username
CONTACT_SMTP_PASS=your-smtp-password
CONTACT_SMTP_FROM="AI Training Denver <no-reply@aitrainingdenver.com>"
CONTACT_SMTP_SECURE=false
CONTACT_TO_EMAIL=brody@aitrainingdenver.com
```

Use `CONTACT_SMTP_SECURE=true` for SMTP port `465`. `CONTACT_SMTP_FROM` is optional and defaults to `AI Training Denver <CONTACT_SMTP_USER>`. The API also accepts the existing shorter aliases in `.env.local`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`, `FROM_EMAIL`, `FROM_NAME`, and `SUPPORT_TO`.

## Quiz Email Setup

The `/quiz` readiness assessment sends the internal lead notification through Resend after the user submits an email address. Set these server-only environment variables in `.env.local` and in production:

```bash
RESEND_API_KEY=re_your_api_key
QUIZ_FROM_EMAIL="AI Training Denver <quiz@mail.aitrainingdenver.com>"
QUIZ_NOTIFICATION_EMAILS=owner@example.com,partner@example.com
QUIZ_REPLY_TO_EMAIL=
QUIZ_CTA_URL=/contact
SITE_URL=https://aitrainingdenver.com
```

`QUIZ_NOTIFICATION_EMAILS` accepts multiple recipients separated by commas. `QUIZ_FROM_EMAIL` must use a Resend-verified sending domain or subdomain in production. If only `mail.aitrainingdenver.com` is verified in Resend, use an address ending in `@mail.aitrainingdenver.com`. By default, the quiz uses the lead's email as the reply-to address for the internal notification; set `QUIZ_REPLY_TO_EMAIL` only if you need to override that behavior.

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
