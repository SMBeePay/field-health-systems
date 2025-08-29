'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { designTokens } from '@/lib/design-tokens'
import { 
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Key,
  Download,
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'system' | 'appearance' | 'integrations'>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  
  // Mock user profile data
  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    role: 'Field Manager',
    department: 'Athletics',
    timezone: 'America/New_York',
    language: 'English (US)',
    avatar: '/api/placeholder/80/80'
  }

  // Mock system settings
  const systemSettings = {
    dataRetention: 365,
    backupFrequency: 'daily',
    maintenanceWindow: '02:00-04:00',
    apiRateLimit: 1000,
    sessionTimeout: 30
  }

  const integrations = [
    {
      id: 1,
      name: 'Google Calendar',
      description: 'Sync maintenance schedules with Google Calendar',
      status: 'connected',
      lastSync: '2025-01-28 09:30'
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Send alerts and notifications to Slack channels',
      status: 'connected',
      lastSync: '2025-01-28 10:15'
    },
    {
      id: 3,
      name: 'Microsoft Teams',
      description: 'Share reports and collaborate via Teams',
      status: 'disconnected',
      lastSync: null
    },
    {
      id: 4,
      name: 'Zapier',
      description: 'Automate workflows with thousands of apps',
      status: 'disconnected',
      lastSync: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={designTokens.typography.heading.h1}>Settings</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Manage your account, system preferences, and integrations
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Export Settings</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <div className={`${designTokens.components.card} p-4`}>
                  <nav className="space-y-2">
                    {[
                      { id: 'profile', label: 'Profile', icon: User },
                      { id: 'notifications', label: 'Notifications', icon: Bell },
                      { id: 'security', label: 'Security', icon: Shield },
                      { id: 'system', label: 'System', icon: Database },
                      { id: 'appearance', label: 'Appearance', icon: Palette },
                      { id: 'integrations', label: 'Integrations', icon: Globe }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id as 'profile' | 'notifications' | 'security' | 'system' | 'appearance' | 'integrations')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                          activeTab === id
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* Settings Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className={`${designTokens.components.card} p-6`}>
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                        
                        {/* Avatar Section */}
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-600" />
                          </div>
                          <div>
                            <button className={designTokens.components.button.outline + ' mr-3'}>
                              Change Photo
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                              type="text"
                              defaultValue={userProfile.name}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              defaultValue={userProfile.email}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              defaultValue={userProfile.phone}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input
                              type="text"
                              defaultValue={userProfile.role}
                              disabled
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input
                              type="text"
                              defaultValue={userProfile.department}
                              disabled
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                              <option value="America/New_York">Eastern Time (ET)</option>
                              <option value="America/Chicago">Central Time (CT)</option>
                              <option value="America/Denver">Mountain Time (MT)</option>
                              <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                              <Mail className="w-5 h-5 text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                                <p className="text-sm text-gray-600">Receive notifications via email</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setEmailNotifications(!emailNotifications)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                emailNotifications ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                              <Smartphone className="w-5 h-5 text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                                <p className="text-sm text-gray-600">Receive push notifications on mobile devices</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setPushNotifications(!pushNotifications)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                pushNotifications ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  pushNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
                            <div className="space-y-3">
                              {[
                                { label: 'Field status alerts', checked: true },
                                { label: 'Maintenance reminders', checked: true },
                                { label: 'Safety inspection due', checked: true },
                                { label: 'Budget threshold warnings', checked: false },
                                { label: 'Weekly summary reports', checked: true }
                              ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                  />
                                  <label className="ml-3 text-sm text-gray-700">{item.label}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <div className="relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                  />
                                  <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                  type="password"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                  type="password"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <button className={designTokens.components.button.primary}>
                                Update Password
                              </button>
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <div className="flex items-center justify-between py-3">
                              <div className="flex items-center space-x-3">
                                <Key className="w-5 h-5 text-gray-400" />
                                <div>
                                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
                            <div className="space-y-3">
                              {[
                                { device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
                                { device: 'iPhone 13', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
                                { device: 'Windows PC', location: 'New York, NY', lastActive: '3 days ago', current: false }
                              ].map((session, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border border-gray-200 rounded-md px-4">
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-gray-900">{session.device}</span>
                                      {session.current && (
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                          Current
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">{session.location} • Last active {session.lastActive}</p>
                                  </div>
                                  {!session.current && (
                                    <button className="text-red-600 hover:text-red-700 text-sm">
                                      Revoke
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'system' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h2>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention (days)</label>
                              <input
                                type="number"
                                defaultValue={systemSettings.dataRetention}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                              <input
                                type="number"
                                defaultValue={systemSettings.sessionTimeout}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                              <select 
                                defaultValue={systemSettings.backupFrequency}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Window</label>
                              <input
                                type="text"
                                defaultValue={systemSettings.maintenanceWindow}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <div className="flex items-center justify-between py-3">
                              <div className="flex items-center space-x-3">
                                <Database className="w-5 h-5 text-gray-400" />
                                <div>
                                  <h4 className="font-medium text-gray-900">Automatic Backup</h4>
                                  <p className="text-sm text-gray-600">Automatically backup system data and settings</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setAutoBackup(!autoBackup)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  autoBackup ? 'bg-green-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    autoBackup ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <h4 className="font-medium text-gray-900 mb-3">System Actions</h4>
                            <div className="flex flex-wrap gap-3">
                              <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                                <Download className="w-4 h-4" />
                                <span>Export Data</span>
                              </button>
                              <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                                <Upload className="w-4 h-4" />
                                <span>Import Data</span>
                              </button>
                              <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                                <RefreshCw className="w-4 h-4" />
                                <span>Clear Cache</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance Preferences</h2>
                        
                        <div className="space-y-6">
                          <div className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3">
                              <Palette className="w-5 h-5 text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                                <p className="text-sm text-gray-600">Switch to dark theme for better viewing in low light</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setDarkMode(!darkMode)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                darkMode ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  darkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Theme Color</h4>
                            <div className="flex space-x-3">
                              {[
                                { color: 'bg-green-600', name: 'Green' },
                                { color: 'bg-blue-600', name: 'Blue' },
                                { color: 'bg-purple-600', name: 'Purple' },
                                { color: 'bg-red-600', name: 'Red' },
                                { color: 'bg-yellow-600', name: 'Yellow' }
                              ].map((theme, index) => (
                                <button
                                  key={index}
                                  className={`w-8 h-8 rounded-full ${theme.color} ${index === 0 ? 'ring-2 ring-offset-2 ring-green-600' : ''}`}
                                  title={theme.name}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Display Preferences</h4>
                            <div className="space-y-3">
                              {[
                                { label: 'Compact view', checked: false },
                                { label: 'Show field thumbnails', checked: true },
                                { label: 'Enable animations', checked: true },
                                { label: 'High contrast mode', checked: false }
                              ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                  />
                                  <label className="ml-3 text-sm text-gray-700">{item.label}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'integrations' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Services</h2>
                        
                        <div className="space-y-4">
                          {integrations.map((integration) => (
                            <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    integration.status === 'connected' ? 'bg-green-100' : 'bg-gray-100'
                                  }`}>
                                    <Globe className={`w-6 h-6 ${
                                      integration.status === 'connected' ? 'text-green-600' : 'text-gray-400'
                                    }`} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                                      {integration.name}
                                      {integration.status === 'connected' ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-gray-400" />
                                      )}
                                    </h4>
                                    <p className="text-sm text-gray-600">{integration.description}</p>
                                    {integration.lastSync && (
                                      <p className="text-xs text-gray-500 mt-1">Last sync: {integration.lastSync}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {integration.status === 'connected' ? (
                                    <>
                                      <button className={designTokens.components.button.outline + ' text-sm'}>
                                        Configure
                                      </button>
                                      <button className="text-red-600 hover:text-red-700 text-sm">
                                        Disconnect
                                      </button>
                                    </>
                                  ) : (
                                    <button className={designTokens.components.button.primary + ' text-sm'}>
                                      Connect
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-6">
                          <h4 className="font-medium text-gray-900 mb-3">API Configuration</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                              <div className="flex space-x-2">
                                <input
                                  type="password"
                                  value="••••••••••••••••••••••••••••••••"
                                  readOnly
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                />
                                <button className={designTokens.components.button.outline}>
                                  Regenerate
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit (requests per hour)</label>
                              <input
                                type="number"
                                defaultValue={systemSettings.apiRateLimit}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}