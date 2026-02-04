# CMU MoonMiners Website

## Supabase

**Project ID:** `hypejatlztjwwyyznnwd`
**URL:** https://hypejatlztjwwyyznnwd.supabase.co

### Tables

| Table | Purpose |
|-------|---------|
| `subteams` | Team divisions (Avionics, Mechanical, Software, System) |
| `members` | Team member profiles |
| `member_subteams` | Junction table (many-to-many) |
| `mentors` | Faculty/industry mentors |
| `sponsor_tiers` | Sponsorship levels (Platinum, Gold, etc.) |
| `sponsors` | Sponsor info + CTA fields (cta_headline, cta_copy, cta_email) |
| `updates` | News/milestone posts (published=true for public) |
| `team_info` | Team photo, blurb, pillars |

### Views

| View | Purpose |
|------|---------|
| `members_with_subteams` | Members with subteams as comma-separated string |

### Storage

**Bucket:** `media` (public read)

```
media/
├── members/
├── mentors/
├── sponsors/
├── team/
├── hero/
├── home/
├── updates/
└── logo/
```

### Image Paths

All image paths are stored as relative paths (e.g., `sponsors/drkelly.jpg`).

Use `getStorageUrl()` from `src/lib/supabase.ts` to build full URLs:
- Input: `hero/rover-360.gif`
- Output: `https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/hero/rover-360.gif`

### RLS

All tables have public read access. `updates` filtered by `published = true`.

## Content API

All functions in `src/lib/content.ts`:

| Function | Source |
|----------|--------|
| `getSiteConfig()` | `content/site.json` (local file) |
| `getMembers()` | `members_with_subteams` view |
| `getMentors()` | `mentors` table |
| `getSponsors()` | `sponsors` table |
| `getTeamInfo()` | `team_info` table |
| `getUpdates()` | `updates` table |

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://hypejatlztjwwyyznnwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from dashboard>
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client + `getStorageUrl()` |
| `src/lib/database.types.ts` | Generated TypeScript types |
| `src/lib/content.ts` | Content fetching with Zod validation |
| `content/site.json` | Static site config (team name, social links, hero) |

## Local Files

| Keep | Delete |
|------|--------|
| `content/site.json` | `content/members.json` |
| | `content/mentors.json` |
| | `content/sponsors.json` |
| | `content/team.json` |
| | `content/updates.json` |
| | `archived_images/` (backup of old local images) |
