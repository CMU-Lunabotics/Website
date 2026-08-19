import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service role key — bypasses RLS.
 * NEVER import this from a client component; the key must stay on the server.
 * Returns null if SUPABASE_SERVICE_ROLE_KEY is not configured.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
