import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#F7FAFC' }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-red-600">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don&apos;t have permission to access this page.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ background: '#4CAF50' }}
              >
                Go to Dashboard
              </Link>
            </div>
            <div>
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:underline"
                style={{ color: '#1F8A8A' }}
              >
                Sign in with a different account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
