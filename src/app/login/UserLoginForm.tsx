'use client'

import { useState, useTransition } from 'react'
import { loginWithSharedPassword } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function UserLoginForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError('')
    startTransition(async () => {
      const result = await loginWithSharedPassword(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-28 pb-16">
      <div className="max-w-md w-full card-cosmic clip-corner-sm backdrop-blur-md p-8">
        <h1 className="text-2xl font-bold text-starlight mb-2">Submit an Update</h1>
        <p className="text-moon-dust mb-6">
          Enter the team password to continue.
        </p>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-starlight/90 mb-2">
              Team Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              className="w-full"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-tartan/15 border border-supernova/40 text-supernova px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-xs text-titanium text-center mt-4">
            Ask a team lead for the password if you don&apos;t have it.
          </p>
        </form>
      </div>
    </div>
  )
}
