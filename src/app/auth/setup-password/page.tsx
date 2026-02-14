import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { SetPasswordForm } from './SetPasswordForm'

export const metadata = {
  title: 'Setup Password - CMU MoonMiners',
  description: 'Set up your account password',
}

export default async function SetupPasswordPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If not logged in, redirect to login
  if (!user) {
    redirect('/login')
  }

  // If already set up password, redirect to submit update
  if (user.user_metadata?.password_set) {
    redirect('/submit-update')
  }

  return <SetPasswordForm email={user.email || ''} />
}
