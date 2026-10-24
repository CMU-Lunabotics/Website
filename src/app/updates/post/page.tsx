import Link from 'next/link'
import { formatUpdateDate, seasonLabel, seasonKey } from '@/lib/seasons'
import { listEditorPosts, logoutUpdates, verifyUpdatesSession } from './actions'
import { PostGate } from './PostGate'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Post an update',
  robots: { index: false, follow: false },
}

export default async function UpdatesPostIndex() {
  const allowed = await verifyUpdatesSession()
  if (!allowed) return <PostGate />

  const posts = await listEditorPosts()

  return (
    <div className="min-h-screen px-5 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Mission Log
            </p>
            <h1 className="text-3xl font-semibold text-starlight">Posts</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/updates/post/new"
              className="inline-flex h-11 cursor-pointer items-center bg-tartan px-5 text-xs font-bold uppercase tracking-[0.16em] text-starlight hover:bg-supernova"
            >
              New post
            </Link>
            <form action={logoutUpdates}>
              <button
                type="submit"
                className="inline-flex h-11 cursor-pointer items-center border border-titanium/50 px-5 text-xs font-bold uppercase tracking-[0.16em] text-starlight hover:border-supernova/70"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {'error' in posts ? (
          <p role="alert" className="text-sm text-supernova">{posts.error}</p>
        ) : posts.length === 0 ? (
          <p className="text-moon-dust">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-titanium/25 border-y border-titanium/25">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/updates/post/${post.slug}`}
                  className="flex cursor-pointer flex-col gap-2 py-4 transition-colors hover:text-supernova sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="block text-lg font-semibold text-starlight">{post.title}</span>
                    <span className="text-sm text-moon-dust">
                      {formatUpdateDate(post.date)} · {seasonLabel(seasonKey(post.date))}
                    </span>
                  </span>
                  <span className="flex gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
                    <span className={post.published ? 'text-starlight' : 'text-moon-dust'}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-titanium">/</span>
                    <span className="text-moon-dust">{post.detailedView ? 'Article' : 'Tile'}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
