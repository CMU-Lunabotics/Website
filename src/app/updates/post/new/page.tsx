import Link from 'next/link'
import { redirect } from 'next/navigation'
import { EditorForm } from '../EditorForm'
import { verifyUpdatesSession } from '../actions'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'New post',
  robots: { index: false, follow: false },
}

export default async function NewUpdatePage() {
  const allowed = await verifyUpdatesSession()
  if (!allowed) redirect('/updates/post')

  return (
    <div className="min-h-screen px-5 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link href="/updates/post" className="mb-6 inline-block text-sm text-moon-dust hover:text-starlight">
          All posts
        </Link>
        <h1 className="mb-6 text-3xl font-semibold text-starlight">New post</h1>
        <EditorForm />
      </div>
    </div>
  )
}
