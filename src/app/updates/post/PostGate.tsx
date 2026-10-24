'use client'

import { useState, useTransition } from 'react'
import { loginWithUpdatesPassword } from './actions'

export function PostGate() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    setError('')
    startTransition(async () => {
      const result = await loginWithUpdatesPassword(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 pb-16 pt-28">
      <div className="card-cosmic clip-corner-sm w-full max-w-md p-8 backdrop-blur-md">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
          Mission Log
        </p>
        <h1 className="mb-2 text-2xl font-semibold text-starlight">Post an update</h1>
        <p className="mb-6 text-moon-dust">Enter the updates password to continue.</p>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-starlight/90">
              Updates password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              autoFocus
              className="h-12 w-full border border-titanium/40 bg-void/70 px-4 text-starlight outline-none transition-colors focus:border-supernova/70"
            />
          </div>
          {error && (
            <p role="alert" className="border border-supernova/40 bg-tartan/15 px-4 py-3 text-sm text-supernova">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="h-12 w-full cursor-pointer bg-tartan text-sm font-semibold uppercase tracking-wider text-starlight transition-colors hover:bg-supernova disabled:opacity-60"
          >
            {isPending ? 'Checking…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
