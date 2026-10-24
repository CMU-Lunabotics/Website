'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'
import { createAdminClient } from '@/lib/supabase-admin'

const SESSION_COOKIE = 'updates_editor_session'
const CATEGORY = 'log'

function sessionToken(): string | null {
  const pw = process.env.UPDATES_PASSWORD
  if (!pw) return null
  return createHmac('sha256', pw).update('updates-editor-session').digest('hex')
}

function tokensMatch(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export async function verifyUpdatesSession(): Promise<boolean> {
  const token = sessionToken()
  if (!token) return false
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  if (!session) return false
  return tokensMatch(session, token)
}

export async function loginWithUpdatesPassword(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const expected = process.env.UPDATES_PASSWORD
  if (!expected) {
    return { error: 'Posting is not configured. Set UPDATES_PASSWORD.' }
  }
  if (password !== expected) {
    return { error: 'Incorrect password.' }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, sessionToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  redirect('/updates/post')
}

export async function logoutUpdates() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/updates/post')
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'update'
}

function parseLinks(raw: string): { label: string; url: string }[] {
  return raw
    .split('\n')
    .map((line) => {
      const [label, url] = line.split('|').map((part) => part.trim())
      return label && url ? { label, url } : null
    })
    .filter((link): link is { label: string; url: string } => Boolean(link))
}

export async function saveUpdate(formData: FormData) {
  const allowed = await verifyUpdatesSession()
  if (!allowed) return { error: 'Unauthorized' }

  const existingSlug = String(formData.get('existingSlug') ?? '').trim()
  const title = String(formData.get('title') ?? '').trim()
  const requestedSlug = String(formData.get('slug') ?? '').trim()
  const summary = String(formData.get('summary') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const imagesRaw = String(formData.get('images') ?? '')
  const linksRaw = String(formData.get('links') ?? '')
  const published = formData.get('published') === 'true'
  const detailedView = formData.get('detailedView') === 'true'

  if (!title || !summary || !date) {
    return { error: 'Title, date, and summary are required.' }
  }

  const slug = existingSlug || slugify(requestedSlug || title)
  const images = imagesRaw.split('\n').map((line) => line.trim()).filter(Boolean)
  const links = parseLinks(linksRaw)

  const supabase = createAdminClient()
  if (!supabase) {
    return { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' }
  }

  const payload = {
    title,
    slug,
    summary,
    date,
    content: content || null,
    images: images.length > 0 ? images : null,
    links: links.length > 0 ? links : null,
    published,
    detailed_view: detailedView,
    category: CATEGORY,
    tags: null,
    team: null,
    featured: false,
  }

  if (existingSlug) {
    const { error } = await supabase.from('updates').update(payload).eq('slug', existingSlug)
    if (error) {
      if (error.message.includes('detailed_view')) {
        return { error: 'The updates table is missing detailed_view. Apply supabase/migrations/003_updates_detailed_view.sql.' }
      }
      return { error: 'Failed to save: ' + error.message }
    }
  } else {
    const { error } = await supabase.from('updates').insert({
      ...payload,
      submitted_by: 'editor',
      submitted_at: new Date().toISOString(),
    })
    if (error?.code === '23505') return { error: 'A post with this slug already exists.' }
    if (error) {
      if (error.message.includes('detailed_view')) {
        return { error: 'The updates table is missing detailed_view. Apply supabase/migrations/003_updates_detailed_view.sql.' }
      }
      return { error: 'Failed to save: ' + error.message }
    }
  }

  revalidatePath('/updates')
  revalidatePath(`/updates/${slug}`)
  revalidatePath('/')
  revalidatePath('/updates/post')

  return { success: true, slug }
}

export async function uploadUpdateImage(formData: FormData) {
  const allowed = await verifyUpdatesSession()
  if (!allowed) return { error: 'Unauthorized' }

  const file = formData.get('file') as File | null
  if (!file) return { error: 'No file provided' }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Only JPG, PNG, GIF, WebP, and SVG images are allowed.' }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File too large. Maximum size is 5MB.' }
  }

  const supabase = createAdminClient()
  if (!supabase) return { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' }

  const ext = file.name.split('.').pop() || 'jpg'
  const filePath = `updates/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage.from('media').upload(filePath, buffer, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  })
  if (error) return { error: `Failed to upload image: ${error.message}` }
  return { path: filePath }
}

export type EditorPost = {
  title: string
  slug: string
  date: string
  summary: string
  content: string
  images: string[]
  linksText: string
  published: boolean
  detailedView: boolean
}

export async function listEditorPosts(): Promise<EditorPost[] | { error: string }> {
  const allowed = await verifyUpdatesSession()
  if (!allowed) return { error: 'Unauthorized' }
  const supabase = createAdminClient()
  if (!supabase) return { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' }

  const { data, error } = await supabase
    .from('updates')
    .select('title, slug, date, summary, content, images, links, published, detailed_view')
    .order('date', { ascending: false })

  if (error) {
    if (error.message.includes('detailed_view')) {
      return { error: 'The updates table is missing detailed_view. Apply supabase/migrations/003_updates_detailed_view.sql.' }
    }
    return { error: error.message }
  }

  return (data || []).map((row) => {
    const links = (row.links as Array<{ label: string; url: string }> | null) || []
    return {
      title: row.title,
      slug: row.slug,
      date: String(row.date).slice(0, 10),
      summary: row.summary,
      content: row.content || '',
      images: (row.images as string[] | null) || [],
      linksText: links.map((link) => `${link.label} | ${link.url}`).join('\n'),
      published: Boolean(row.published),
      detailedView: Boolean((row as { detailed_view?: boolean }).detailed_view),
    }
  })
}
