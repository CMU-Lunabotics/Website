import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if user has set a password
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // If this is their first login (via magic link), redirect to setup password
      // We can detect this by checking if they have user_metadata.password_set
      if (user && !user.user_metadata?.password_set) {
        return NextResponse.redirect(new URL('/auth/setup-password', request.url))
      }

      // Otherwise redirect to submit update
      return NextResponse.redirect(new URL('/submit-update', request.url))
    }
  }

  // If there's an error or no code, redirect to login
  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
}
