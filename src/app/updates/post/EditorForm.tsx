'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getStorageUrl } from '@/lib/supabase'
import { saveUpdate, uploadUpdateImage, type EditorPost } from './actions'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const fieldClass =
  'w-full border border-titanium/40 bg-void/70 px-4 text-starlight outline-none transition-colors placeholder:text-titanium focus:border-supernova/70'

export function EditorForm({ post }: { post?: EditorPost }) {
  const router = useRouter()
  const editing = Boolean(post)
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(editing)
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().slice(0, 10))
  const [summary, setSummary] = useState(post?.summary ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [links, setLinks] = useState(post?.linksText ?? '')
  const [images, setImages] = useState<string[]>(post?.images ?? [])
  const [published, setPublished] = useState(post?.published ?? false)
  const [detailedView, setDetailedView] = useState(post?.detailedView ?? false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  function onTitle(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function onFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    setUploading(true)
    setError('')
    const next = [...images]
    for (const file of Array.from(fileList)) {
      const body = new FormData()
      body.set('file', file)
      const result = await uploadUpdateImage(body)
      if (result.error || !result.path) {
        setError(result.error || 'Upload failed')
        setUploading(false)
        return
      }
      next.push(result.path)
    }
    setImages(next)
    setUploading(false)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSaved(false)
    const body = new FormData()
    if (editing && post) body.set('existingSlug', post.slug)
    body.set('title', title)
    body.set('slug', slug)
    body.set('date', date)
    body.set('summary', summary)
    body.set('content', content)
    body.set('links', links)
    body.set('images', images.join('\n'))
    body.set('published', published ? 'true' : 'false')
    body.set('detailedView', detailedView ? 'true' : 'false')

    startTransition(async () => {
      const result = await saveUpdate(body)
      if (result.error || !result.slug) {
        setError(result.error || 'Could not save')
        return
      }
      setSaved(true)
      if (!editing) {
        router.replace(`/updates/post/${result.slug}`)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="card-cosmic clip-corner-sm space-y-6 p-6 backdrop-blur-md sm:p-8">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-starlight">Title</label>
        <input id="title" required value={title} onChange={(e) => onTitle(e.target.value)} className={`${fieldClass} h-12`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-starlight">Slug</label>
          <input
            id="slug"
            required
            value={slug}
            readOnly={editing}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(slugify(e.target.value))
            }}
            className={`${fieldClass} h-12 ${editing ? 'text-moon-dust' : ''}`}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-starlight">Date</label>
          <input id="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={`${fieldClass} h-12`} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="summary" className="text-sm font-medium text-starlight">Summary</label>
        <textarea id="summary" required rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} className={`${fieldClass} py-3`} />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-starlight">Body</label>
        <p className="text-xs text-titanium">Shown only when detailed view is on.</p>
        <textarea id="content" rows={10} value={content} onChange={(e) => setContent(e.target.value)} className={`${fieldClass} py-3`} />
      </div>

      <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium text-starlight">Images</label>
        <input
          id="images"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          className="block w-full text-sm text-moon-dust file:mr-4 file:border-0 file:bg-tartan file:px-4 file:py-2 file:text-sm file:font-semibold file:text-starlight"
        />
        {uploading && <p className="text-xs text-moon-dust">Uploading…</p>}
        {images.length > 0 && (
          <ul className="flex flex-wrap gap-3 pt-2">
            {images.map((path, index) => (
              <li key={path} className="relative h-20 w-28 overflow-hidden border border-titanium/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getStorageUrl(path)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label={`Remove image ${index + 1}`}
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute right-1 top-1 cursor-pointer bg-void/80 px-1.5 text-xs text-starlight"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="links" className="text-sm font-medium text-starlight">Links</label>
        <p className="text-xs text-titanium">One per line: Label | https://example.com</p>
        <textarea id="links" rows={3} value={links} onChange={(e) => setLinks(e.target.value)} className={`${fieldClass} py-3`} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-starlight">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-[#C41230]"
          />
          Published
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-starlight">
          <input
            type="checkbox"
            checked={detailedView}
            onChange={(e) => setDetailedView(e.target.checked)}
            className="h-4 w-4 accent-[#C41230]"
          />
          Detailed view
        </label>
      </div>
      <p className="text-xs leading-relaxed text-titanium">
        Drafts stay off the public site. Detailed view opens an article when someone clicks the card. Off, the card is only a tile.
      </p>

      {error && (
        <p role="alert" className="border border-supernova/40 bg-tartan/15 px-4 py-3 text-sm text-supernova">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="text-sm text-starlight">Saved.</p>
      )}

      <button
        type="submit"
        disabled={isPending || uploading}
        className="h-12 cursor-pointer bg-tartan px-8 text-sm font-semibold uppercase tracking-wider text-starlight transition-colors hover:bg-supernova disabled:opacity-60"
      >
        {isPending ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}
