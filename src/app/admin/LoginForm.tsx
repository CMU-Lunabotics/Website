'use client'

import { useState, useTransition } from 'react'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await login(formData.get('password') as string)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center text-foreground mb-6">Admin Login</h1>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              className="w-full"
              placeholder="Enter admin password"
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}
