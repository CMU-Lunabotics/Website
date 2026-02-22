'use server'

import { createClient } from '@/lib/supabase-server'
import { verifyUserSession } from '../login/actions'

export async function createUpdate(formData: FormData) {
  const user = await verifyUserSession()
  if (!user) return { error: 'Unauthorized' }

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
  } catch {
    return { error: 'Invalid format for tags, images, or links' }
  }

  const supabase = await createClient()
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
    submitted_by: user.email,
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
  const user = await verifyUserSession()
  if (!user) return { error: 'Unauthorized' }

  const file = formData.get('file') as File
  const folder = formData.get('folder') as string || 'updates'

  if (!file) {
    return { error: 'No file provided' }
  }

  // Validate file size (limit to 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { error: 'File too large. Maximum size is 5MB.' }
  }

  // Create unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  // Upload to Supabase Storage using authenticated client
  const supabase = await createClient()

  // Verify user session in supabase
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
  if (authError || !authUser) {
    console.error('Auth error:', authError)
    return { error: 'Authentication failed. Please log in again.' }
  }

  try {
    // Read file as buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const { error } = await supabase.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: `Failed to upload image: ${error.message}` }
    }

    return { success: true, path: filePath }
  } catch (err) {
    console.error('File processing error:', err)
    return { error: 'Failed to process file. Please try again.' }
  }
}
