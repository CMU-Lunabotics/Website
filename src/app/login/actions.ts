'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Check if email is authorized and return status for the client
export async function checkUserStatus(email: string) {
  const emailSchema = z.string().email()
  const result = emailSchema.safeParse(email)

  if (!result.success) {
    return { error: 'Invalid email address' }
  }

  const { data: allowedUser } = await supabase
    .from('allowed_users')
    .select('email')
    .eq('email', result.data)
    .single()

  if (!allowedUser) {
    return { status: 'rejected', error: 'Email not authorized. Contact an admin.' }
  }

  // Authorized — client will send the magic link using the browser Supabase client
  return { status: 'allowed', email: result.data }
}

export async function userLogout() {
  const supabaseServer = await createClient()
  await supabaseServer.auth.signOut()
  redirect('/login')
}

export async function verifyUserSession(): Promise<{ email: string } | null> {
  const supabaseServer = await createClient()

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (!user?.email) {
    return null
  }

  // Verify user is still in allowed_users table
  const { data } = await supabase
    .from('allowed_users')
    .select('email')
    .eq('email', user.email)
    .single()

  if (!data) {
    await supabaseServer.auth.signOut()
    return null
  }

  return { email: user.email }
}
