import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { EditorForm } from '../EditorForm'
import { listEditorPosts, verifyUpdatesSession } from '../actions'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit post',
  robots: { index: false, follow: false },
}

export default async function EditUpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const allowed = await verifyUpdatesSession()
  if (!allowed) redirect('/updates/post')

  const { slug } = await params
  const posts = await listEditorPosts()
  if ('error' in posts) {
    return (
      <div className="min-h-screen px-5 pb-20 pt-28">
        <p role="alert" className="mx-auto max-w-3xl text-sm text-supernova">{posts.error}</p>
      </div>
    )
  }

  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen px-5 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link href="/updates/post" className="mb-6 inline-block text-sm text-moon-dust hover:text-starlight">
          All posts
        </Link>
        <h1 className="mb-6 text-3xl font-semibold text-starlight">Edit post</h1>
        <EditorForm post={post} />
      </div>
    </div>
  )
}
