'use client'

import { useState, useTransition } from 'react'
import { addAllowedUser, removeAllowedUser, logout, approveUpdate, unpublishUpdate, deleteUpdate, setFeaturedUpdate } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AllowedUser {
  id: string
  email: string
  added_at: string | null
}

interface UpdateItem {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  date: string
  submitted_by: string | null
  submitted_at: string | null
  published: boolean | null
  featured: boolean
}

interface AdminPanelProps {
  initialUsers: AllowedUser[]
  initialUpdates: UpdateItem[]
}

export function AdminPanel({ initialUsers, initialUpdates }: AdminPanelProps) {
  const [users, setUsers] = useState(initialUsers)
  const [updates, setUpdates] = useState(initialUpdates)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleAdd(formData: FormData) {
    startTransition(async () => {
      const result = await addAllowedUser(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setError('')
        window.location.reload()
      }
    })
  }

  async function handleRemove(id: string) {
    if (!confirm('Are you sure you want to remove this user?')) return

    startTransition(async () => {
      const result = await removeAllowedUser(id)
      if (result?.error) {
        setError(result.error)
      } else {
        setUsers(users.filter((u) => u.id !== id))
        setError('')
      }
    })
  }

  async function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  async function handlePublish(id: string) {
    if (!confirm('Publish this update?')) return
    startTransition(async () => {
      const result = await approveUpdate(id)
      if (result?.error) {
        setError(result.error)
      } else {
        setUpdates(updates.map((u) => u.id === id ? { ...u, published: true } : u))
        setError('')
      }
    })
  }

  async function handleUnpublish(id: string) {
    if (!confirm('Confirm that you want to unpublish this update.')) return

    startTransition(async () => {
      const result = await unpublishUpdate(id)
      if (result?.error) {
        setError(result.error)
      } else {
        setUpdates(updates.map((u) => u.id === id ? { ...u, published: false } : u))
        setError('')
      }
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this update? This cannot be undone.')) return

    startTransition(async () => {
      const result = await deleteUpdate(id)
      if (result?.error) {
        setError(result.error)
      } else {
        setUpdates(updates.filter((u) => u.id !== id))
        setError('')
      }
    })
  }

  const currentFeaturedId = updates.find((u) => u.featured)?.id || ''

  async function handleFeaturedChange(id: string) {
    startTransition(async () => {
      const result = await setFeaturedUpdate(id)
      if (result?.error) {
        setError(result.error)
      } else {
        setUpdates(updates.map((u) => ({ ...u, featured: u.id === id })))
        setError('')
      }
    })
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline" className="text-white" disabled={isPending}>
            Logout
          </Button>
        </div>

        {error && <p className="text-destructive mb-4 text-sm">{error}</p>}

        {/* Featured Update Selector */}
        <section className="bg-card border border-border rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Featured Update</h2>
          <p className="text-muted-foreground mb-4">This update is displayed prominently at the top of the Updates page.</p>
          <select
            value={currentFeaturedId}
            onChange={(e) => handleFeaturedChange(e.target.value)}
            disabled={isPending || updates.length === 0}
            className="w-full border border-input rounded-md px-3 py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>Select a featured update...</option>
            {updates.filter((u) => u.published).map((update) => (
              <option key={update.id} value={update.id}>
                {update.title} ({new Date(update.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </section>

        {/* All Updates Section */}
        <section className="bg-card border border-border rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Manage Updates</h2>
          <p className="text-muted-foreground mb-6">View, publish, unpublish, or delete updates.</p>

          {updates.length === 0 ? (
            <p className="text-muted-foreground text-sm">No updates</p>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className={`border rounded-lg p-4 ${update.featured ? 'bg-accent border-brand-blue/30' : 'bg-muted/50 border-border'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-foreground">{update.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          update.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {update.published ? 'Published' : 'Unpublished'}
                        </span>
                        {update.featured && (
                          <span className="px-2 py-1 text-xs font-medium rounded bg-brand-blue/10 text-brand-blue">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{update.summary}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span><strong>Category:</strong> {update.category}</span>
                        <span><strong>Date:</strong> {new Date(update.date).toLocaleDateString()}</span>
                        <span><strong>Submitted by:</strong> {update.submitted_by || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {update.published ? (
                        <Button
                          onClick={() => handleUnpublish(update.id)}
                          size="sm"
                          disabled={isPending}
                          className="bg-yellow-300 hover:bg-yellow-200 text-yellow-900"
                        >
                          Unpublish
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handlePublish(update.id)}
                          size="sm"
                          disabled={isPending}
                          className="bg-green-300 hover:bg-green-200 text-green-900"
                        >
                          Publish
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(update.id)}
                        size="sm"
                        disabled={isPending}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Allowed Users Section */}
        <section className="bg-card border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Manage Allowed Users</h2>
          <p className="text-muted-foreground mb-6">Add or remove users who can submit updates to the site.</p>

          <form action={handleAdd} className="flex gap-2 mb-6">
            <Input
              type="email"
              name="email"
              placeholder="email@andrew.cmu.edu"
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add User'}
            </Button>
          </form>

          <div className="border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-3">Current Users ({users.length}):</p>
            {users.length === 0 ? (
              <p className="text-muted-foreground text-sm">No users added yet</p>
            ) : (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li key={user.id} className="flex justify-between items-center py-2">
                    <span className="text-foreground">{user.email}</span>
                    <Button
                      onClick={() => handleRemove(user.id)}
                      size="sm"
                      disabled={isPending}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
