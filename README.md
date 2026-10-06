# Md Tanvir Mannan · Portfolio

My personal portfolio site: **ICT Support & Systems Professional | Building AI and Automation Tools**.

It brings together my enterprise IT experience (Microsoft 365, Intune, Windows Autopilot, Entra ID) and the automation, AI and web projects I build in my own time. The design and implementation were created with AI assistance; I own the content and have reviewed it for accuracy.

## Stack

- Next.js (App Router) with static HTML export (`output: 'export'`)
- React, TypeScript, Tailwind CSS and a small custom design system
- No backend, database, analytics or AI inference in the site itself

## Run locally

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev        # local dev server
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
```

`next start` does not serve a static export. To preview a build, serve `out/` with any static server, for example `npx serve out`.

`scripts/check-demos.mjs` tests the browser demo logic in `lib/demo.ts`. It imports a `.ts` file, so run it with Node 24+ or `npx tsx scripts/check-demos.mjs`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin of the deployed site, without a trailing slash (e.g. `https://your-portfolio.vercel.app`). Used for canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml`. |

If `NEXT_PUBLIC_SITE_URL` is not set, URLs stay relative: no canonical tags are emitted and the sitemap is empty. Copy `.env.example` to `.env.local` for local builds, or set the variable in your hosting provider. Changing it requires a rebuild.

The site is built to be served from the root of a domain. Hosting it under a sub-path (such as a GitHub Pages project site at `/portfolio`) would also need `basePath` set in `next.config.ts`.

## Where the content lives

- `content/profile.ts`: name, headline, email, LinkedIn, GitHub username, navigation and skill groups
- `content/projects.ts`: project case studies and filter categories
- `content/editorial.ts`: blog notes, experience, education and certifications
- `content/github.ts`: titles, categories and featured flags for GitHub repositories
- `content/github-snapshot.json`: saved snapshot of public repositories, used before (or instead of) the live GitHub API
- `public/`: résumé (PDF and TXT), screenshots and favicon

Run `node scripts/sync-github.mjs` before a build to refresh the GitHub snapshot.

## GitHub dashboard

`/github/` and `/projects/` list every public repository on my GitHub. The page renders from the saved snapshot, then refreshes from the public GitHub API in the browser (no token, so public rate limits apply). If GitHub is unavailable, the last snapshot stays on screen with a notice.

## Deploy on Vercel

1. Import this repository in Vercel as a Next.js project.
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (no trailing slash).
3. Vercel runs `npm run build`; `vercel.json` sets the output directory to `out/` and adds basic security headers.
4. After the first deploy, check canonical URLs and `/sitemap.xml`.

## Honesty notes

- Project descriptions are based on each repository's public README. No production usage, accuracy or business outcomes are claimed unless stated.
- `m365-user-lifecycle` is a lab project tested with `-WhatIf` and Pester against fictional users. It has not been used in production.
- The browser demos at `/demos/` are simplified previews, not the hosted Python/OpenAI applications.
