'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import crypto from 'crypto'

// Validate environment variable at module load
if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD environment variable is required')
}

// Simple in-memory rate limiter (5 attempts per minute)
const attempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(): boolean {
  const ip = 'admin' // Could use real IP in production
  const now = Date.now()
  const record = attempts.get(ip)

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60000 })
    return true
  }

  if (record.count >= 5) return false
  record.count++
  return true
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Session management with httpOnly cookies
export async function login(password: string) {
  if (!checkRateLimit()) {
    return { error: 'Too many attempts. Try again later.' }
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Invalid password' }
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_session', generateToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  })

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin')
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return !!session?.value // Simple token check for MVP
}

// CRUD operations
export async function addAllowedUser(formData: FormData) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const emailSchema = z.string().email()
  const email = formData.get('email')

  const result = emailSchema.safeParse(email)
  if (!result.success) {
    return { error: 'Invalid email address' }
  }

  const { error } = await supabase
    .from('allowed_users')
    .insert({ email: result.data })

  if (error?.code === '23505') {
    // Postgres unique violation
    console.log('Existing user');
    return { error: 'Email already exists' }
  }
  if (error) {
    console.log(error);
    return { error: 'Failed to add email' }
  }

  return { success: true }
}

export async function removeAllowedUser(id: string) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const { error } = await supabase.from('allowed_users').delete().eq('id', id)

  if (error) {
    return { error: 'Failed to remove email' }
  }

  return { success: true }
}

export async function createUpdate(formData: FormData) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  // Extract form data
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const summary = formData.get('summary') as string
  const category = formData.get('category') as string
  const date = formData.get('date') as string
  const content = formData.get('content') as string
  const tags = formData.get('tags') as string
  const images = formData.get('images') as string
  const links = formData.get('links') as string
  const published = formData.get('published') === 'true'
  const submittedBy = formData.get('submitted_by') as string

  // Validate required fields
  if (!title || !slug || !summary || !category || !date) {
    return { error: 'Missing required fields' }
  }

  // Parse JSON fields
  let tagsArray: string[] = []
  let imagesArray: string[] = []
  let linksArray: { label: string; url: string }[] = []

  try {
    if (tags) tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean)
    if (images) imagesArray = images.split('\n').map((i) => i.trim()).filter(Boolean)
    if (links) {
      linksArray = links
        .split('\n')
        .map((line) => {
          const [label, url] = line.split('|').map((s) => s.trim())
          return label && url ? { label, url } : null
        })
        .filter(Boolean) as { label: string; url: string }[]
    }
  } catch (e) {
    return { error: 'Invalid format for tags, images, or links' }
  }

  const { error } = await supabase.from('updates').insert({
    title,
    slug,
    summary,
    category,
    date,
    content: content || null,
    tags: tagsArray.length > 0 ? tagsArray : null,
    images: imagesArray.length > 0 ? imagesArray : null,
    links: linksArray.length > 0 ? linksArray : null,
    published,
    submitted_by: submittedBy || null,
    submitted_at: new Date().toISOString(),
  })

  if (error?.code === '23505') {
    return { error: 'Slug already exists' }
  }
  if (error) {
    return { error: 'Failed to create update: ' + error.message }
  }

  return { success: true }
}

export async function uploadImage(formData: FormData) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const file = formData.get('file') as File
  const folder = formData.get('folder') as string || 'updates'

  if (!file) {
    return { error: 'No file provided' }
  }

  // Create unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('media')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return { error: 'Failed to upload image: ' + error.message }
  }

  return { success: true, path: filePath }
}

// Approve (publish) an update
export async function approveUpdate(id: string) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('updates')
    .update({ published: true })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to approve update: ' + error.message }
  }

  return { success: true }
}

// Unpublish an update
export async function unpublishUpdate(id: string) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('updates')
    .update({ published: false })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to unpublish update: ' + error.message }
  }

  return { success: true }
}

// Delete an update
export async function deleteUpdate(id: string) {
  if (!(await verifySession())) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('updates')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: 'Failed to delete update: ' + error.message }
  }

  return { success: true }
}
