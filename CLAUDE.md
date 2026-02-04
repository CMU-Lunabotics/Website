# CMU MoonMiners Website - Supabase Integration

## Overview

This project migrated content management from static JSON files to Supabase (PostgreSQL database + Storage CDN).

## Database Schema

**Project ID:** `hypejatlztjwwyyznnwd`
**URL:** https://hypejatlztjwwyyznnwd.supabase.co

### Tables

| Table | Purpose |
|-------|---------|
| `subteams` | Team divisions (Avionics, Mechanical, Software, System) |
| `members` | Team member profiles |
| `member_subteams` | Junction table for members with multiple subteams |
| `mentors` | Faculty/industry mentors |
| `sponsor_tiers` | Sponsorship levels (Platinum, Gold, etc.) |
| `sponsors` | Sponsor information and logos |
| `updates` | News/milestone posts |
| `team_info` | Team photo, blurb, and pillars |

### Views

| View | Purpose |
|------|---------|
| `members_with_subteams` | Joins members with their subteams as comma-separated string |

### Storage

- **Bucket:** `media` (public)
- **Structure:** Mirrors `public/images/` folders (members/, mentors/, sponsors/, team/, hero/, home/, updates/)

## Files Created/Modified

### New Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client + `getStorageUrl()` helper |
| `src/lib/database.types.ts` | Auto-generated TypeScript types from schema |
| `.env.local` | Environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) |
| `scripts/upload-images.mjs` | Script to upload images to Supabase storage |

### Modified Files

| File | Changes |
|------|---------|
| `src/lib/content.ts` | Replaced JSON imports with Supabase queries |

## Content Functions

All functions in `src/lib/content.ts` now query Supabase:

| Function | Data Source |
|----------|-------------|
| `getSiteConfig()` | Still uses `content/site.json` (singleton config) |
| `getMembers()` | `members_with_subteams` view |
| `getMentors()` | `mentors` table |
| `getSponsors()` | `sponsors` table with `sponsor_tiers` join |
| `getTeamInfo()` | `team_info` table |
| `getUpdates()` | `updates` table (where published=true) |

## Image Paths

Images are stored in Supabase Storage. The `getStorageUrl()` function transforms paths:

- Input: `/images/members/john-doe.jpg`
- Output: `https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/members/john-doe.jpg`

## Row Level Security (RLS)

All tables have RLS enabled with public read access:

```sql
CREATE POLICY "Public read access" ON table_name
FOR SELECT USING (true);
```

Storage policies:
- **SELECT:** Public read access for `media` bucket
- **INSERT:** Configurable (currently allows uploads for migration)

## Running the Upload Script

```bash
# Linux/Mac
export $(grep -v '^#' .env.local | xargs) && node scripts/upload-images.mjs

# Or with dotenv
npx dotenv -e .env.local -- node scripts/upload-images.mjs
```

## Known Issues

1. **Large GIFs** - May timeout during upload; use dashboard for files >10MB
2. **site.json images** - Hero image and logo paths in `content/site.json` still reference local files

## HomeSponsors Component

The `desiredOrder` array uses path suffixes (e.g., `sponsors/drkelly.jpg`) that work with both local and Supabase URLs. The `getPathSuffix()` helper strips prefixes from both `/images/` and `/media/` paths for matching.

## Local Images

**Can be deleted** (served from Supabase Storage):
- `/public/images/members/`
- `/public/images/mentors/`
- `/public/images/sponsors/`
- `/public/images/team/`
- `/public/images/updates/`

**Must keep** (still referenced locally):
- `/public/images/hero/` - referenced by `content/site.json`
- `/public/images/logo/` - referenced by `content/site.json`

## JSON Files

- **Keep:** `content/site.json` (singleton config, rarely changes)
- **Deleted:** `members.json`, `mentors.json`, `sponsors.json`, `team.json`, `updates.json`
