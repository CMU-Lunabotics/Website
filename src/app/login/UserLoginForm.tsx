'use client'

import { useState, useTransition } from 'react'
import { checkUserStatus } from './actions'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormState = 'initial' | 'rejected' | 'code_sent'

export function UserLoginForm() {
  const [error, setError] = useState('')
  const [formState, setFormState] = useState<FormState>('initial')
  const [userEmail, setUserEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleEmailSubmit(formData: FormData) {
    const email = formData.get('email') as string
    setError('')

    startTransition(async () => {
      const result = await checkUserStatus(email)

      if (result?.status === 'rejected') {
        setError(result.error || 'Email not authorized. Contact an admin.')
        setFormState('rejected')
        return
      }

      if (result?.error) {
        setError(result.error)
        return
      }

      if (result?.status === 'allowed') {
        const supabase = createClient()
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: result.email!,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        })
        if (otpError) {
          setError(otpError.message.includes('rate') ? 'Too many attempts. Please wait a few minutes and try again.' : 'Failed to send code. Try again.')
          return
        }
        setUserEmail(result.email!)
        setFormState('code_sent')
      }
    })
  }

  async function handleCodeSubmit(formData: FormData) {
    const token = (formData.get('token') as string).trim()
    setError('')

    startTransition(async () => {
      const supabase = createClient()
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: userEmail,
        token,
        type: 'email',
      })
      if (verifyError) {
        setError('Invalid or expired code. Check your email and try again.')
        return
      }
      router.push('/submit-update')
    })
  }

  if (formState === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Button onClick={() => { setFormState('initial'); setError('') }} variant="outline" className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (formState === 'code_sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We sent a 6-digit code to <strong>{userEmail}</strong>. Enter it below.
          </p>

          <form action={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                Login Code
              </label>
              <Input
                type="text"
                name="token"
                id="token"
                required
                placeholder="Enter your code"
                maxLength={12}
                className="w-full text-center text-2xl tracking-widest"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Verifying...' : 'Verify Code'}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={() => { setFormState('initial'); setError('') }}
            >
              Use a different email
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit an Update</h1>
        <p className="text-gray-600 mb-6">
          Enter your email and we&apos;ll send you a login code.
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
            {isPending ? 'Sending...' : 'Send Login Code'}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Only authorized team members can submit updates. Contact an admin if you need access.
          </p>
        </form>
      </div>
    </div>
  )
}
