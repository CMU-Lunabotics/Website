export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-28 pb-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supernova mx-auto mb-4"></div>
        <p className="text-moon-dust">Loading admin panel...</p>
      </div>
    </div>
  )
}
