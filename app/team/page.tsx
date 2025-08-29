'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { designTokens } from '@/lib/design-tokens'
import { 
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  Crown,
  User,
  MoreHorizontal,
  Settings,
  UserPlus,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'members' | 'roles' | 'permissions'>('members')

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1 (555) 123-4567',
      role: 'Field Manager',
      department: 'Athletics',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      lastLogin: '2025-01-28',
      joinedDate: '2023-08-15',
      permissions: ['view_all_fields', 'edit_field_data', 'schedule_maintenance']
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@school.edu',
      phone: '+1 (555) 234-5678',
      role: 'Safety Inspector',
      department: 'Safety',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      lastLogin: '2025-01-27',
      joinedDate: '2023-09-20',
      permissions: ['view_all_fields', 'create_safety_reports', 'approve_maintenance']
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@school.edu',
      phone: '+1 (555) 345-6789',
      role: 'Budget Manager',
      department: 'Finance',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      lastLogin: '2025-01-28',
      joinedDate: '2023-07-10',
      permissions: ['view_budget_reports', 'approve_expenses', 'generate_financial_reports']
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@school.edu',
      phone: '+1 (555) 456-7890',
      role: 'Maintenance Tech',
      department: 'Maintenance',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      lastLogin: '2025-01-26',
      joinedDate: '2024-01-15',
      permissions: ['view_maintenance_tasks', 'update_field_status', 'upload_test_results']
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@school.edu',
      phone: '+1 (555) 567-8901',
      role: 'Administrator',
      department: 'IT',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      lastLogin: '2025-01-28',
      joinedDate: '2023-06-01',
      permissions: ['admin_all', 'manage_users', 'system_settings']
    }
  ]

  const roles = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access and user management capabilities',
      memberCount: 1,
      permissions: ['admin_all', 'manage_users', 'system_settings'],
      color: 'purple'
    },
    {
      id: 2,
      name: 'Field Manager',
      description: 'Manage field operations and maintenance scheduling',
      memberCount: 1,
      permissions: ['view_all_fields', 'edit_field_data', 'schedule_maintenance'],
      color: 'blue'
    },
    {
      id: 3,
      name: 'Safety Inspector',
      description: 'Conduct safety inspections and approve maintenance work',
      memberCount: 1,
      permissions: ['view_all_fields', 'create_safety_reports', 'approve_maintenance'],
      color: 'red'
    },
    {
      id: 4,
      name: 'Budget Manager',
      description: 'Oversee financial aspects and budget planning',
      memberCount: 1,
      permissions: ['view_budget_reports', 'approve_expenses', 'generate_financial_reports'],
      color: 'green'
    },
    {
      id: 5,
      name: 'Maintenance Tech',
      description: 'Execute maintenance tasks and update field status',
      memberCount: 1,
      permissions: ['view_maintenance_tasks', 'update_field_status', 'upload_test_results'],
      color: 'yellow'
    }
  ]

  const permissions = [
    {
      category: 'Field Management',
      items: [
        { id: 'view_all_fields', name: 'View All Fields', description: 'Access to view all field data and status' },
        { id: 'edit_field_data', name: 'Edit Field Data', description: 'Ability to modify field information and test results' },
        { id: 'add_new_fields', name: 'Add New Fields', description: 'Create new field records in the system' }
      ]
    },
    {
      category: 'Maintenance',
      items: [
        { id: 'schedule_maintenance', name: 'Schedule Maintenance', description: 'Create and modify maintenance schedules' },
        { id: 'approve_maintenance', name: 'Approve Maintenance', description: 'Approve maintenance requests and work orders' },
        { id: 'view_maintenance_tasks', name: 'View Maintenance Tasks', description: 'Access to maintenance task lists and history' }
      ]
    },
    {
      category: 'Reporting',
      items: [
        { id: 'generate_reports', name: 'Generate Reports', description: 'Create and export various system reports' },
        { id: 'view_analytics', name: 'View Analytics', description: 'Access to analytics dashboard and insights' },
        { id: 'create_safety_reports', name: 'Create Safety Reports', description: 'Generate safety inspection reports' }
      ]
    },
    {
      category: 'Administration',
      items: [
        { id: 'manage_users', name: 'Manage Users', description: 'Add, edit, and remove user accounts' },
        { id: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings and preferences' },
        { id: 'admin_all', name: 'Administrator Access', description: 'Full administrative privileges' }
      ]
    }
  ]

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || member.role === filterRole
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment
    return matchesSearch && matchesRole && matchesDepartment
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Administrator': return Crown
      case 'Field Manager': return ShieldCheck
      case 'Safety Inspector': return Shield
      default: return User
    }
  }

  const getRoleColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-800'
      case 'blue': return 'bg-blue-100 text-blue-800'
      case 'red': return 'bg-red-100 text-red-800'
      case 'green': return 'bg-green-100 text-green-800'
      case 'yellow': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                  <h1 className={designTokens.typography.heading.h1}>Team Management</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Manage team members, roles, and permissions
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Member</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Team Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-blue-600">{teamMembers.length}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Users className="w-4 h-4 mr-1" />
                  Total Members
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-green-600">
                  {teamMembers.filter(m => m.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Active
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-purple-600">{roles.length}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Roles
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-yellow-600">
                  {new Set(teamMembers.map(m => m.department)).size}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Departments
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'members', label: 'Team Members', icon: Users },
                    { id: 'roles', label: 'Roles', icon: Shield },
                    { id: 'permissions', label: 'Permissions', icon: Settings }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as 'members' | 'roles' | 'permissions')}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'members' && (
                <div>
                  {/* Filters */}
                  <div className={`${designTokens.components.card} p-6 mb-6`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search team members..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                          value={filterRole}
                          onChange={(e) => setFilterRole(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Roles</option>
                          {roles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                          ))}
                        </select>
                        <select
                          value={filterDepartment}
                          onChange={(e) => setFilterDepartment(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Departments</option>
                          {Array.from(new Set(teamMembers.map(m => m.department))).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Team Members List */}
                  <div className="space-y-4">
                    {filteredMembers.map((member, index) => {
                      const RoleIcon = getRoleIcon(member.role)
                      return (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`${designTokens.components.card} p-6 hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                                  <div className="flex items-center">
                                    <RoleIcon className="w-4 h-4 mr-1" />
                                    {member.role}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {member.department}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Last login: {member.lastLogin}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {member.email}
                                  </div>
                                  <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {member.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'roles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roles.map((role, index) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`${designTokens.components.card} p-6 hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${getRoleColor(role.color)} rounded-lg flex items-center justify-center`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{role.name}</h3>
                            <p className="text-sm text-gray-500">{role.memberCount} members</p>
                          </div>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((permission, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                              {permission.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {role.permissions.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                              +{role.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'permissions' && (
                <div className="space-y-6">
                  {permissions.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`${designTokens.components.card} p-6`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                      <div className="space-y-3">
                        {category.items.map((permission) => (
                          <div key={permission.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h4 className="font-medium text-gray-900">{permission.name}</h4>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {permission.id}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            </div>
                            <button className={designTokens.components.button.outline + ' text-sm ml-4'}>
                              Edit
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}