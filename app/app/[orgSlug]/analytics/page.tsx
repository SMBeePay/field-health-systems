import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface AnalyticsPageProps {
  params: Promise<{ orgSlug: string }>
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    select: { id: true, name: true }
  })

  if (!organization) {
    redirect('/auth/unauthorized')
  }

  // Get field stats
  const fields = await prisma.field.findMany({
    where: { organizationId: organization.id },
    include: {
      testingData: {
        orderBy: { testingDate: 'desc' },
        take: 5
      }
    }
  })

  const totalFields = fields.length
  const criticalFields = fields.filter(f => f.status === 'CRITICAL' || f.status === 'OUT_OF_SERVICE').length
  const excellentFields = fields.filter(f => f.status === 'EXCELLENT').length

  // Calculate average GMAX across all recent tests
  const recentTests = fields.flatMap(f => f.testingData)
  const avgGmax = recentTests.length > 0
    ? recentTests.reduce((sum, t) => sum + t.gmaxAverage, 0) / recentTests.length
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500">Performance metrics and insights for your fields</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Fields</p>
              <p className="text-3xl font-bold text-gray-900">{totalFields}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Excellent Status</p>
              <p className="text-3xl font-bold text-green-600">{excellentFields}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Fields</p>
              <p className="text-3xl font-bold text-red-600">{criticalFields}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg GMAX</p>
              <p className="text-3xl font-bold text-gray-900">{avgGmax.toFixed(1)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">GMAX Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Status Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h3>
        {recentTests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No test data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">GMAX</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shear</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Infill</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTests.slice(0, 10).map((test) => (
                  <tr key={test.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {test.testingDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">{test.gmaxAverage.toFixed(1)}</td>
                    <td className="px-4 py-2 text-sm">{test.shearAverage.toFixed(1)}</td>
                    <td className="px-4 py-2 text-sm">{test.infillDepthAverage.toFixed(1)}mm</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        test.overallStatus === 'PASSED' ? 'bg-green-100 text-green-700' :
                        test.overallStatus === 'MONITOR' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {test.overallStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
