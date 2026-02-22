'use client'

import { useState, useTransition } from 'react'
import { createUpdate, uploadImage } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function UpdateForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    category: '',
    date: '',
    content: '',
    tags: '',
    links: '',
  })

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      setError(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Only JPG, PNG, GIF, WebP, and SVG images are allowed.`)
      e.target.value = '' // Reset input
      return
    }

    setUploading(true)
    setError('')

    const newPaths: string[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'updates')

      const result = await uploadImage(formData)
      if (result?.error) {
        setError(result.error)
        setUploading(false)
        return
      }
      if (result?.path) {
        newPaths.push(result.path)
      }
    }

    setUploadedImages([...uploadedImages, ...newPaths])
    setUploading(false)
  }

  function removeImage(index: number) {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const submitData = new FormData()
    submitData.set('title', formData.title)
    submitData.set('slug', formData.slug)
    submitData.set('summary', formData.summary)
    submitData.set('category', formData.category)
    submitData.set('date', formData.date)
    submitData.set('content', formData.content)
    submitData.set('tags', formData.tags)
    submitData.set('links', formData.links)
    submitData.set('published', 'false') // Always unpublished, requires admin approval
    submitData.set('images', uploadedImages.join('\n'))

    startTransition(async () => {
      const result = await createUpdate(submitData)
      if (result?.error) {
        setError(result.error)
        setSuccess(false)
      } else {
        setError('')
        setSuccess(true)
        // Only reset on success
        setUploadedImages([])
        setFormData({
          title: '',
          slug: '',
          summary: '',
          category: '',
          date: '',
          content: '',
          tags: '',
          links: '',
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            type="text"
            name="title"
            id="title"
            required
            placeholder="PDR 2025 Success"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug * (URL-friendly)</Label>
          <Input
            type="text"
            name="slug"
            id="slug"
            required
            placeholder="pdr-2025"
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          name="summary"
          id="summary"
          required
          placeholder="A brief summary of the update..."
          rows={2}
          value={formData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            type="text"
            name="category"
            id="category"
            required
            placeholder="Competition, Outreach, etc."
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            type="date"
            name="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          name="content"
          id="content"
          placeholder="Full content in markdown format..."
          rows={6}
          value={formData.content}
          onChange={(e) => updateField('content', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          type="text"
          name="tags"
          id="tags"
          placeholder="engineering, robotics, competition"
          value={formData.tags}
          onChange={(e) => updateField('tags', e.target.value)}
        />
        <p className="text-xs text-gray-500">Example: tag1, tag2, tag3</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Images</Label>
        <Input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading || isPending}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">
          {uploading ? 'Uploading...' : 'Upload multiple images (JPG, PNG, GIF)'}
        </p>

        {uploadedImages.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium">Uploaded Images ({uploadedImages.length}):</p>
            <ul className="space-y-1">
              {uploadedImages.map((path, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                  <span className="text-gray-700 truncate">{path}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 hover:text-red-800 ml-2 px-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="links">Links (format: Label | URL, one per line)</Label>
        <Textarea
          name="links"
          id="links"
          placeholder="Read More | https://example.com&#10;Video | https://youtube.com/..."
          rows={3}
          value={formData.links}
          onChange={(e) => updateField('links', e.target.value)}
        />
        <p className="text-xs text-gray-500">Example: Label | https://url.com</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
        <p className="text-sm">
          <strong>Note:</strong> Your update will be submitted for admin approval before appearing on the website.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          Update created successfully!
        </div>
      )}

      <Button type="submit" disabled={isPending || uploading} className="w-full">
        {isPending ? 'Creating...' : uploading ? 'Uploading images...' : 'Create Update'}
      </Button>
    </form>
  )
}
