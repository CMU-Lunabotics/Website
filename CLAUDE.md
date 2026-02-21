# CMU MoonMiners Website

## Important: Server vs Client Side Functions

**CRITICAL:** Always verify whether code is running server-side or client-side before using Supabase clients:

- **Server Components / Server Actions**: Use `createClient()` from `@/lib/supabase-server.ts`
  - Uses `cookies()` from `next/headers`
  - Requires `async/await`
  - Used in: Server Actions, API Routes, Server Components

- **Client Components**: Use `createClient()` from `@/lib/supabase-client.ts`
  - Uses `createBrowserClient()` from `@supabase/ssr`
  - Used in: Client Components (files with `'use client'`)

- **Public Data Fetching**: Use `supabase` from `@/lib/supabase.ts`
  - Anonymous client for public read-only data
  - Used in: Content fetching functions

**Common Error:** Importing `@/lib/supabase-server.ts` in a client component will cause:
```
You're importing a component that needs "next/headers"
```
**Fix:** Use `@/lib/supabase-client.ts` instead or move logic to a Server Action.

## Authentication System

**Two Separate Auth Systems:**

1. **Admin Authentication** (`/admin`)
   - Password-based (env: `ADMIN_PASSWORD`)
   - Cookie session: `admin_session`
   - Manages the `allowed_users` table

2. **User Authentication** (`/login` → `/submit-update`)
   - Supabase Auth with email verification
   - Email must be in `allowed_users` table
   - Magic link for first-time setup
   - Email + password for returning users

### User Login Flow

**First-Time User:**
1. Enter email at `/login`
2. System checks if email in `allowed_users` table
3. If approved: Send magic link email
4. User clicks link → redirected to `/auth/setup-password`
5. User creates password → logged in → `/submit-update`

**Returning User:**
1. Enter email at `/login`
2. System detects existing account → shows password field
3. Enter password → logged in → `/submit-update`

**Forgot Password:**
1. Enter wrong password → "Incorrect password" error
2. Click "Forgot Password? Send Reset Link"
3. Receive reset email → click link
4. Redirected to `/auth/reset-password`
5. Set new password → redirected to `/login`

### Auth Routes

| Route | Purpose |
| --- | --- |
| `/admin` | Admin panel (password auth) |
| `/login` | User login (email verification) |
| `/submit-update` | Submit updates (protected, requires user auth) |
| `/auth/callback` | Handles magic link clicks |
| `/auth/setup-password` | First-time password setup |
| `/auth/reset-password` | Password reset page |

### Auth Actions (`/app/login/actions.ts`)

| Function | Purpose |
| --- | --- |
| `checkUserStatus(email)` | Check if user is new/returning/rejected |
| `loginWithPassword(email, password)` | Login for returning users |
| `sendPasswordReset(email)` | Send password reset email |
| `setPassword(password)` | Set password (first-time setup) |
| `resetPassword(password)` | Reset password (forgot password) |
| `userLogout()` | Logout user |
| `verifyUserSession()` | Check if user is logged in |

## Supabase

**Project ID:** `hypejatlztjwwyyznnwd`
**URL:** https://hypejatlztjwwyyznnwd.supabase.co

### Tables

| Table             | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `subteams`        | Team divisions (Avionics, Mechanical, Software, System)       |
| `members`         | Team member profiles                                          |
| `member_subteams` | Junction table (many-to-many)                                 |
| `mentors`         | Faculty/industry mentors                                      |
| `sponsor_tiers`   | Sponsorship levels (Platinum, Gold, etc.)                     |
| `sponsors`        | Sponsor info + CTA fields (cta_headline, cta_copy, cta_email) |
| `updates`         | News/milestone posts (published=true for public, submitted_by, submitted_at) |
| `team_info`       | Team photo, blurb, pillars                                    |
| `allowed_users`   | Emails authorized to submit updates (managed via `/admin`)    |

### Views

| View                    | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
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

- All tables have public read access
- `updates` table: Filtered by `published = true` for public
- `allowed_users` table: Full CRUD access (public policies)
  - `SELECT`, `INSERT`, `UPDATE`, `DELETE` policies enabled
  - Admin panel is password-protected separately

## Content API

All functions in `src/lib/content.ts`:

| Function          | Source                           |
| ----------------- | -------------------------------- |
| `getSiteConfig()` | `content/site.json` (local file) |
| `getMembers()`    | `members_with_subteams` view     |
| `getMentors()`    | `mentors` table                  |
| `getSponsors()`   | `sponsors` table                 |
| `getTeamInfo()`   | `team_info` table                |
| `getUpdates()`    | `updates` table                  |

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hypejatlztjwwyyznnwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from dashboard>
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production
ADMIN_PASSWORD=<set in Vercel/deployment>
```

**Required for:**
- `NEXT_PUBLIC_SITE_URL`: Magic link redirects (auth callbacks)
- `ADMIN_PASSWORD`: Admin panel authentication

## Key Files

| File                           | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| `src/lib/supabase.ts`          | Public Supabase client + `getStorageUrl()`                |
| `src/lib/supabase-server.ts`   | **Server-side** Supabase client (uses cookies)            |
| `src/lib/supabase-client.ts`   | **Client-side** Supabase client (browser)                 |
| `src/lib/database.types.ts`    | Generated TypeScript types from Supabase                   |
| `src/lib/content.ts`           | Content fetching with Zod validation                       |
| `content/site.json`            | Static site config (team name, social links, hero)         |
| `src/app/login/actions.ts`     | User authentication server actions                         |
| `src/app/admin/actions.ts`     | Admin authentication + CRUD operations                     |
| `src/app/submit-update/actions.ts` | Update submission + image upload (user auth required) |

## Local Files

| Keep                | Delete                                          |
| ------------------- | ----------------------------------------------- |
| `content/site.json` | `content/members.json`                          |
|                     | `content/mentors.json`                          |
|                     | `content/sponsors.json`                         |
|                     | `content/team.json`                             |
|                     | `content/updates.json`                          |
|                     | `archived_images/` (backup of old local images) |

.
