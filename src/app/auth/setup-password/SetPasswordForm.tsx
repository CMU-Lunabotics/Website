'use client'

import { useState, useTransition } from 'react'
import { setPassword } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface SetPasswordFormProps {
  email: string
}

export function SetPasswordForm({ email }: SetPasswordFormProps) {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    startTransition(async () => {
      const result = await setPassword(password)
      if (result?.error) {
        setError(result.error)
      } else {
        // Password set successfully, redirect to submit update
        router.push('/submit-update')
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Set Up Your Password</h1>
        <p className="text-gray-600 mb-6">
          Welcome! Create a password for <strong>{email}</strong> to complete your account setup.
        </p>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              placeholder="At least 8 characters"
              className="w-full text-gray-900"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Re-enter your password"
              className="w-full text-gray-900"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Setting up...' : 'Set Password & Continue'}
          </Button>
        </form>
      </div>
    </div>
  )
}
