'use client'

import { Button } from '@/components/ui/button'

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-28 pb-16">
      <div className="max-w-md w-full card-cosmic clip-corner-sm backdrop-blur-md p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-moon-dust mb-6">An error occurred while loading the admin panel.</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
