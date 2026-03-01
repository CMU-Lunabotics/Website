# CMU MoonMiners Website

A modern, accessible, and performant website for CMU MoonMiners (NASA Lunabotics) built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Run dev server (http://localhost:3000)
npm run dev

# 3) Type-check / lint / test
npm run build    # includes type-check + lint
npm test         # Playwright smoke tests
```

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui (Radix primitives)
- next/image for optimized images
- next-themes for dark mode (class strategy)
- Zod for content schema validation
- Playwright for smoke tests
- Vercel for hosting + CI (optional GitHub Actions)

## Project Structure

```
src/
  app/                 # Next.js App Router pages
    layout.sx        # Root layout (ThemeProvider, NavBar, Footer)
    page.tsx          # Home
    team/page.tsx     # Team
    sponsors/page.tsx # Sponsors
    api/og/route.tsx  # Dynamic OG image (Edge Runtime)
  components/         # Reusable UI components
  lib/content.ts      # Content loaders + Zod schemas
content/              # JSON content (editable by non-devs)
public/               # Static assets (images, PDFs)
```

## Editing Content (No Code)
All editable site copy and data live in `content/*.json`.
- `content/site.json`: Global site config (team name, social links, hero, logo path)
- `content/team.json`: Team page texts (blurb, pillars, team photo path)
- `content/members.json`: Members list (name, role, subteam(s), year, bio, links)
- `content/mentors.json`: Mentors list
- `content/sponsors.json`: Sponsors list (flat grid)

Changes are validated at build time by Zod schemas in `src/lib/content.ts`. If a field is missing/invalid, the build will fail with a helpful error.

### Dual Subteams
Members can belong to more than one subteam by using a comma-separated string:
```json
"subteam": "System, Mechanical"
```
The Team page filters will recognize any of the listed subteams.

## Images
- Place images in `public/images/**`
- Reference them in JSON using the public path, e.g. `/images/members/jerry-chen.jpg`
- Use reasonable sizes; Next.js will optimize delivery, but large source files still affect repo size
- Logos: prefer SVG when possible (`public/images/logo/*.svg`), or PNG as fallback

## Theming / Branding
- Colors defined via CSS variables in `src/app/globals.css` (CMU Red/Gold, OKLCH)
- Dark mode via `next-themes` (class strategy)
- Header logo path is configurable in `content/site.json` (`"logo": "/images/logo/...."`)

## Development Notes
- Most components are Server Components; add `'use client'` only where needed (state/handlers)
- Use `next/image` for all images with appropriate `sizes` for responsive loading
- Keep accessibility in mind (alt text, semantic headings, focus states)

## Testing
- Playwright smoke tests in `tests/smoke.spec.ts`
- Run locally with `npm test`
- Tests verify: page loads, navigation, basic UI, sponsors, theme toggle

## Deployment
### Vercel (recommended)
1) Push to GitHub → Vercel auto-deploys (ensure the project is connected to the correct repo)
2) Manual deploy: Vercel Dashboard → Deployments → Create Deployment (or `npx vercel --prod`)

### Custom Domain (GoDaddy example)
1) In Vercel: Project → Settings → Domains → add `cmu-moon-miners.com` (+ `www`)
2) In GoDaddy DNS, add records Vercel shows you:
   - CNAME `@` → `cname.vercel-dns.com` (or A `@` → `76.76.21.21` if CNAME not allowed)
   - CNAME `www` → `cname.vercel-dns.com`
3) Wait 15–30 minutes; SSL is automatic

See `DOMAIN_SETUP.md` and `DEPLOYMENT.md` for step-by-step details.

## Common Tasks
- Add a new member: edit `content/members.json`, commit, push
- Change team photo: update `content/team.json` → `teamPhoto`
- Update logo: replace file in `public/images/logo/` and update `content/site.json` → `logo`
- Add sponsor: edit `content/sponsors.json` (name, logo path, url)

## Troubleshooting
- Build fails with Zod error: check your `content/*.json` matches required schema
- Images not showing: confirm the path starts with `/images/...` and the file exists in `public/images`
- Vercel error “Function Runtimes…”: ensure `vercel.json` does not set function runtimes; runtime is declared in route files
- Tests fail: run `npm run dev` locally and review `tests/smoke.spec.ts` selectors

## Contributing
- Keep components small and composable
- Prefer accessibility over pure visuals
- Don’t add comments for obvious code; document non-obvious rationale
- Follow existing naming and formatting conventions

## License
MIT (or team-internal) — update as needed.
