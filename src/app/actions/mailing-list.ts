'use server'

import { z } from 'zod'
import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { createAdminClient } from '@/lib/supabase-admin'

// Saves the email into the Supabase `mailing_list` table.
// Run scripts/mailing-list.sql once in the Supabase SQL editor to create it.
export async function subscribeToMailingList(formData: FormData) {
  const email = ((formData.get('email') as string) ?? '').trim().toLowerCase()
  const parsed = z.string().email().safeParse(email)
  if (!parsed.success) {
    return { error: 'Enter a valid email address.' }
  }

  // Prefer the service client (bypasses RLS); fall back to the public client,
  // which works if the anon insert policy from scripts/mailing-list.sql exists.
  // Cast: mailing_list is created by scripts/mailing-list.sql and is not in the
  // generated database.types.ts yet.
  const client = (createAdminClient() ?? supabase) as unknown as SupabaseClient
  let { error } = await client.from('mailing_list').insert({
    email: parsed.data,
    source: 'website-footer',
  })

  // Retry without the optional `source` column in case the table predates it.
  if (error?.code === 'PGRST204') {
    ;({ error } = await client.from('mailing_list').insert({ email: parsed.data }))
  }

  if (error) {
    if (error.code === '23505') {
      // Unique violation — already subscribed; treat as success.
      return { success: true }
    }
    if (error.code === '42P01' || error.code === 'PGRST205') {
      return { error: 'Mailing list is not set up yet (missing mailing_list table).' }
    }
    if (error.code === '42501') {
      // RLS blocks anon inserts and no service key is configured.
      return { error: 'Mailing list is not fully set up yet — run scripts/mailing-list.sql or add SUPABASE_SERVICE_ROLE_KEY.' }
    }
    return { error: 'Could not save your email. Please try again later.' }
  }

  return { success: true }
}
