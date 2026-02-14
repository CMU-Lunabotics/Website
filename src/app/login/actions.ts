'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Verify email is in allowed_users table
async function isAllowedUser(email: string): Promise<boolean> {
  const { data } = await supabase
    .from('allowed_users')
    .select('email')
    .eq('email', email)
    .single()

  return !!data
}

// Check user status and determine next step
export async function checkUserStatus(email: string) {
  // Validate email format
  const emailSchema = z.string().email()
  const result = emailSchema.safeParse(email)

  if (!result.success) {
    return { error: 'Invalid email address' }
  }

  // Check if user is in allowed_users table
  const isAllowed = await isAllowedUser(result.data)
  if (!isAllowed) {
    return { status: 'rejected', error: 'Email not authorized. Contact an admin.' }
  }

  const supabaseServer = await createClient()

  // Try signing in with a dummy password to check if user exists
  const { error: signInError } = await supabaseServer.auth.signInWithPassword({
    email: result.data,
    password: '__CHECK_USER_EXISTS__', // Dummy password
  })

  if (signInError) {
    if (
      signInError.message.includes('Invalid login credentials') ||
      signInError.message.includes('Email not confirmed')
    ) {
      // User exists - show password field
      return { status: 'returning_user', email: result.data }
    }

    // User doesn't exist yet - send magic link
    const { error: otpError } = await supabaseServer.auth.signInWithOtp({
      email: result.data,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (otpError) {
      return { error: 'Failed to send verification email. Try again.' }
    }

    return {
      status: 'new_user',
      message: 'Welcome! We sent you a verification link to set up your account. Check your email.'
    }
  }

  // Shouldn't reach here, but if we do, treat as returning user
  return { status: 'returning_user', email: result.data }
}

// Login with password for returning users
export async function loginWithPassword(email: string, password: string) {
  // Validate email format
  const emailSchema = z.string().email()
  const result = emailSchema.safeParse(email)

  if (!result.success) {
    return { error: 'Invalid email address' }
  }

  // Check if user is in allowed_users table
  const isAllowed = await isAllowedUser(result.data)
  if (!isAllowed) {
    return { error: 'Email not authorized. Contact an admin.' }
  }

  const supabaseServer = await createClient()

  const { error } = await supabaseServer.auth.signInWithPassword({
    email: result.data,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return {
        error: 'Incorrect password',
        wrongPassword: true,
      }
    }
    return { error: 'Login failed. Please try again.' }
  }

  redirect('/submit-update')
}

// Send password reset link
export async function sendPasswordReset(email: string) {
  const supabaseServer = await createClient()

  const { error } = await supabaseServer.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
  })

  if (error) {
    return { error: 'Failed to send password reset email. Try again.' }
  }

  return { success: true, message: 'Password reset link sent! Check your email.' }
}

// Set password after clicking magic link (first-time users)
export async function setPassword(password: string) {
  const supabaseServer = await createClient()

  const { error } = await supabaseServer.auth.updateUser({
    password,
    data: {
      password_set: true,
    },
  })

  if (error) {
    return { error: 'Failed to set password. Try again.' }
  }

  redirect('/submit-update')
}

// Reset password (for forgot password flow)
export async function resetPassword(password: string) {
  const supabaseServer = await createClient()

  const { error } = await supabaseServer.auth.updateUser({
    password,
  })

  if (error) {
    return { error: 'Failed to reset password. Try again.' }
  }

  redirect('/login')
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
  const isAllowed = await isAllowedUser(user.email)
  if (!isAllowed) {
    // User was removed from allowlist, sign them out
    await supabaseServer.auth.signOut()
    return null
  }

  return { email: user.email }
}
