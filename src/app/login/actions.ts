'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

const SESSION_COOKIE = 'update_session'

// Cookie value is an HMAC derived from the shared password, so a cookie can't
// be forged without knowing the password itself.
function sessionToken(): string | null {
  const pw = process.env.SUBMIT_SHARED_PASSWORD
  if (!pw) return null
  return createHmac('sha256', pw).update('submit-update-session').digest('hex')
}

// Shared-password login: everyone uses the same password (SUBMIT_SHARED_PASSWORD).
export async function loginWithSharedPassword(formData: FormData) {
  const password = (formData.get('password') as string) ?? ''
  const expected = process.env.SUBMIT_SHARED_PASSWORD

  if (!expected) {
    return { error: 'Login is not configured. Set SUBMIT_SHARED_PASSWORD.' }
  }
  if (password !== expected) {
    return { error: 'Incorrect password.' }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, sessionToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  redirect('/submit-update')
}

export async function userLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/login')
}

export async function verifyUserSession(): Promise<{ email: string } | null> {
  const token = sessionToken()
  if (!token) return null

  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (session?.value !== token) return null

  return { email: 'team' }
}
