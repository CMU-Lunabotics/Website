'use client'

import { useState, useTransition } from 'react'
import { checkUserStatus, loginWithPassword } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

type UserStatus = 'initial' | 'rejected' | 'new_user' | 'returning_user'

export function UserLoginForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()
  const [userStatus, setUserStatus] = useState<UserStatus>('initial')
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  async function handleEmailSubmit(formData: FormData) {
    const email = formData.get('email') as string

    setError('')
    setSuccess('')
    setUserEmail(email)

    startTransition(async () => {
      const result = await checkUserStatus(email)

      if (result?.error) {
        setError(result.error)
      }

      if (result?.status === 'rejected') {
        setUserStatus('rejected')
      } else if (result?.status === 'new_user') {
        setUserStatus('new_user')
        setSuccess(result.message || 'Check your email!')
        // Redirect back to login after 3 seconds
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else if (result?.status === 'returning_user') {
        setUserStatus('returning_user')
        setUserEmail(result.email || email)
      }
    })
  }

  const [showForgotPassword, setShowForgotPassword] = useState(false)

  async function handlePasswordSubmit(formData: FormData) {
    const password = formData.get('password') as string

    setError('')
    setSuccess('')
    setShowForgotPassword(false)

    startTransition(async () => {
      const result = await loginWithPassword(userEmail, password)
      if (result?.error) {
        setError(result.error)
        if (result?.wrongPassword) {
          setShowForgotPassword(true)
        }
      }
    })
  }

  async function handleForgotPassword() {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const { sendPasswordReset } = await import('./actions')
      const result = await sendPasswordReset(userEmail)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(result.message || 'Password reset link sent!')
      }
    })
  }

  // Initial state - ask for email
  if (userStatus === 'initial') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit an Update</h1>
          <p className="text-gray-600 mb-6">
            Enter your email to login and submit updates to the Moon Miners site.
          </p>

          <form action={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                placeholder="your.email@andrew.cmu.edu"
                className="w-full"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Checking...' : 'Continue'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Only authorized team members can submit updates. Contact an admin if you need access.
            </p>
          </form>
        </div>
      </div>
    )
  }

  // Rejected - not in allowlist
  if (userStatus === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error || 'Email not authorized. Contact an admin for access.'}
          </div>
          <Button onClick={() => setUserStatus('initial')} variant="outline" className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // New user - magic link sent
  if (userStatus === 'new_user') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
            {success || 'We sent you a verification link!'}
          </div>
          <p className="text-gray-600 mb-4">
            Click the link in your email to verify your account and set up your password.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login page...
          </p>
        </div>
      </div>
    )
  }

  // Returning user - show password field
  if (userStatus === 'returning_user') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">
            Enter your password for <strong>{userEmail}</strong>
          </p>

          <form action={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                className="w-full text-gray-900"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded text-sm">
                {success}
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            {showForgotPassword && (
              <Button
                type="button"
                onClick={handleForgotPassword}
                variant="outline"
                disabled={isPending}
                className="w-full"
              >
                Forgot Password? Send Reset Link
              </Button>
            )}

            <Button
              type="button"
              onClick={() => setUserStatus('initial')}
              variant="ghost"
              className="w-full text-sm"
            >
              Use different email
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return null
}
