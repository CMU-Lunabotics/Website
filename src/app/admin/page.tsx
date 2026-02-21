import { verifySession } from './actions'
import { supabase } from '@/lib/supabase'
import { AdminPanel } from './AdminPanel'
import { LoginForm } from './LoginForm'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Panel - CMU MoonMiners',
  description: 'Manage allowed users and updates',
}

type AllowedUser = Database['public']['Tables']['allowed_users']['Row']
type Update = Database['public']['Tables']['updates']['Row']

export default async function AdminPage() {
  const isAuthenticated = await verifySession()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Fetch allowed users
  const { data: users } = await supabase
    .from('allowed_users')
    .select('id, email, added_at')
    .order('added_at', { ascending: false })
    .returns<AllowedUser[]>()

  // Fetch ALL updates (both published and unpublished)
  const { data: allUpdates } = await supabase
    .from('updates')
    .select('id, title, slug, summary, category, date, submitted_by, submitted_at, published')
    .order('submitted_at', { ascending: false })
    .returns<Update[]>()

  return <AdminPanel initialUsers={users || []} initialUpdates={allUpdates || []} />
}
