import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { ResetPasswordForm } from './ResetPasswordForm'

export const metadata = {
  title: 'Reset Password - CMU MoonMiners',
  description: 'Reset your account password',
}

export default async function ResetPasswordPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If not logged in, redirect to login
  if (!user) {
    redirect('/login')
  }

  return <ResetPasswordForm email={user.email || ''} />
}
