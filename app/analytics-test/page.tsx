'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
    dataLayer: unknown[]
  }
}

export default function AnalyticsTestPage() {
  const [gtagLoaded, setGtagLoaded] = useState(false)
  const [dataLayerEvents, setDataLayerEvents] = useState<unknown[]>([])
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    // Check if gtag is loaded
    const checkGtag = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        setGtagLoaded(true)
        addTestResult('✅ Google Analytics gtag function is loaded')
      } else {
        addTestResult('❌ Google Analytics gtag function not found')
      }
    }

    // Check dataLayer
    const checkDataLayer = () => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        setDataLayerEvents(window.dataLayer || [])
        addTestResult(`✅ DataLayer found with ${window.dataLayer.length} events`)
      } else {
        addTestResult('❌ DataLayer not found')
      }
    }

    // Wait a bit for GA to load
    setTimeout(() => {
      checkGtag()
      checkDataLayer()
    }, 2000)
  }, [])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  const sendTestEvent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'test_event', {
        event_category: 'Analytics Test',
        event_label: 'Manual Test Button',
        custom_parameter: 'test_value',
        value: 1
      })
      addTestResult('📊 Test event sent successfully')
    } else {
      addTestResult('❌ Cannot send test event - gtag not available')
    }
  }

  const sendConversionTest = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead Generation',
        event_label: 'Test Lead Generation',
        value: 2500,
        currency: 'USD',
        lead_type: 'test_lead'
      })
      addTestResult('🎯 Test conversion event sent')
    } else {
      addTestResult('❌ Cannot send conversion test - gtag not available')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Google Analytics 4 Test Page
      </h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-yellow-800">
          <strong>Note:</strong> This is a test page to verify Google Analytics is working correctly. 
          Open your browser&apos;s developer console (F12) to see additional analytics logs.
        </p>
      </div>

      {/* Status Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Status</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Google Analytics Status</h3>
              <p className={`text-sm ${gtagLoaded ? 'text-green-600' : 'text-red-600'}`}>
                {gtagLoaded ? '✅ Loaded and Ready' : '❌ Not Loaded'}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">DataLayer Events</h3>
              <p className="text-sm text-gray-600">
                {dataLayerEvents.length} events captured
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Manual Tests</h2>
        <div className="space-x-4">
          <button
            onClick={sendTestEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Test Event
          </button>
          <button
            onClick={sendConversionTest}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Conversion Test
          </button>
        </div>
      </section>

      {/* Test Results */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          {testResults.length === 0 ? (
            <p className="text-gray-500">Running tests...</p>
          ) : (
            <ul className="space-y-2">
              {testResults.map((result, index) => (
                <li key={index} className="text-sm font-mono">
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* DataLayer Contents */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">DataLayer Contents</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="text-xs text-gray-700">
            {JSON.stringify(dataLayerEvents, null, 2)}
          </pre>
        </div>
      </section>

      {/* Analytics Configuration */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Measurement ID:</strong><br />
              <code className="text-green-600">
                {typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID : 'Loading...'}
              </code>
            </div>
            <div>
              <strong>Environment:</strong><br />
              <code className="text-blue-600">
                {typeof window !== 'undefined' ? process.env.NODE_ENV : 'Loading...'}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* How to Verify */}
      <section className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Verify Analytics</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Open Google Analytics 4 dashboard</li>
          <li>Go to Reports → Real-time</li>
          <li>Visit this page and click the test buttons</li>
          <li>Check for real-time events in GA4</li>
          <li>Look for &apos;test_event&apos; and &apos;generate_lead&apos; events</li>
        </ol>
        <div className="mt-4 p-3 bg-blue-100 rounded">
          <p className="text-sm text-blue-700">
            <strong>Pro Tip:</strong> You can also use Google Analytics DebugView to see events in real-time 
            during development.
          </p>
        </div>
      </section>
    </div>
  )
}