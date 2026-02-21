import { verifyUserSession, userLogout } from '../login/actions'
import { redirect } from 'next/navigation'
import { UpdateForm } from './UpdateForm'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Submit Update - CMU MoonMiners',
  description: 'Submit a new update to the Moon Miners site',
}

export default async function SubmitUpdatePage() {
  const user = await verifyUserSession()

  // If not logged in, redirect to login page
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Submit Update</h1>
            <p className="text-gray-600 mt-1">Logged in as: {user.email}</p>
          </div>
          <form action={userLogout}>
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </div>

        {/* Form */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <UpdateForm userEmail={user.email} />
        </section>
      </div>
    </div>
  )
}
