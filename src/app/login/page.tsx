import { verifyUserSession } from './actions'
import { redirect } from 'next/navigation'
import { UserLoginForm } from './UserLoginForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Login - CMU MoonMiners',
  description: 'Login to submit updates',
}

export default async function LoginPage() {
  const user = await verifyUserSession()

  // If already logged in, redirect to submit page
  if (user) {
    redirect('/submit-update')
  }

  return <UserLoginForm />
}
