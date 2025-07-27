'use client'

import { VendorDashboardLayout } from '@/components/vendor/layout'
import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  UserGroupIcon,
  StarIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChartBarIcon,
  FunnelIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  lastOrderDate: string
  joinDate: string
  status: 'active' | 'inactive'
  type: 'regular' | 'premium' | 'vip'
  favoriteProducts: string[]
}

export default function VendorCustomers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('totalSpent')

  // Mock customer data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Raj Patel',
      email: 'raj.patel@email.com',
      phone: '+91 98765 43210',
      location: 'Andheri West, Mumbai',
      totalOrders: 28,
      totalSpent: 45600,
      avgOrderValue: 1628,
      lastOrderDate: '2024-07-26',
      joinDate: '2024-03-15',
      status: 'active',
      type: 'vip',
      favoriteProducts: ['Fresh Onions', 'Basmati Rice', 'Spices']
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      location: 'Bandra West, Mumbai',
      totalOrders: 22,
      totalSpent: 32400,
      avgOrderValue: 1472,
      lastOrderDate: '2024-07-25',
      joinDate: '2024-04-02',
      status: 'active',
      type: 'premium',
      favoriteProducts: ['Vegetables', 'Dairy Products']
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed.ali@email.com',
      phone: '+91 98765 43212',
      location: 'Juhu, Mumbai',
      totalOrders: 15,
      totalSpent: 28900,
      avgOrderValue: 1926,
      lastOrderDate: '2024-07-27',
      joinDate: '2024-05-10',
      status: 'active',
      type: 'regular',
      favoriteProducts: ['Meat & Seafood', 'Spices']
    },
    {
      id: '4',
      name: 'Anjali Desai',
      email: 'anjali.desai@email.com',
      phone: '+91 98765 43213',
      location: 'Santacruz East, Mumbai',
      totalOrders: 35,
      totalSpent: 52300,
      avgOrderValue: 1494,
      lastOrderDate: '2024-07-24',
      joinDate: '2024-02-28',
      status: 'active',
      type: 'vip',
      favoriteProducts: ['Grains & Pulses', 'Cooking Oils']
    },
    {
      id: '5',
      name: 'Suresh Kumar',
      email: 'suresh.kumar@email.com',
      phone: '+91 98765 43214',
      location: 'Powai, Mumbai',
      totalOrders: 8,
      totalSpent: 12600,
      avgOrderValue: 1575,
      lastOrderDate: '2024-06-15',
      joinDate: '2024-05-25',
      status: 'inactive',
      type: 'regular',
      favoriteProducts: ['Vegetables', 'Beverages']
    }
  ]

  const customerTypes = ['all', 'regular', 'premium', 'vip']
  const statuses = ['all', 'active', 'inactive']

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || customer.type === selectedType
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'totalSpent':
        return b.totalSpent - a.totalSpent
      case 'totalOrders':
        return b.totalOrders - a.totalOrders
      case 'avgOrderValue':
        return b.avgOrderValue - a.avgOrderValue
      case 'lastOrderDate':
        return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
      default:
        return 0
    }
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'regular': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'vip': return 'VIP'
      case 'premium': return 'Premium'
      case 'regular': return 'Regular'
      default: return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600'
      case 'inactive': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgOrderValue = customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="mt-2 text-gray-600">Manage and analyze your customer relationships</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button className="btn btn-outline flex items-center">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary flex items-center">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              Send Newsletter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{totalCustomers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{activeCustomers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">💰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
                <p className="text-2xl font-semibold text-gray-900">₹{Math.round(avgOrderValue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input pr-8 appearance-none"
                >
                  {customerTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : getTypeText(type)}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input pr-8 appearance-none"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input pr-8 appearance-none"
                >
                  <option value="totalSpent">Sort by Total Spent</option>
                  <option value="name">Sort by Name</option>
                  <option value="totalOrders">Sort by Orders</option>
                  <option value="avgOrderValue">Sort by Avg Order</option>
                  <option value="lastOrderDate">Sort by Last Order</option>
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="divide-y divide-gray-200">
            {filteredCustomers.map(customer => (
              <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(customer.type)}`}>
                          {getTypeText(customer.type)}
                        </span>
                        <span className={`text-sm font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {customer.location}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Total Orders</p>
                          <p className="font-semibold">{customer.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Spent</p>
                          <p className="font-semibold">₹{customer.totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Avg Order Value</p>
                          <p className="font-semibold">₹{customer.avgOrderValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Order</p>
                          <p className="font-semibold">
                            {new Date(customer.lastOrderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Favorite Products:</p>
                        <div className="flex flex-wrap gap-1">
                          {customer.favoriteProducts.map(product => (
                            <span key={product} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        Customer since {new Date(customer.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="btn btn-outline btn-sm flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    <button className="btn btn-outline btn-sm flex items-center">
                      <EnvelopeIcon className="h-4 w-4 mr-1" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Load More */}
        {filteredCustomers.length > 0 && (
          <div className="text-center">
            <button className="btn btn-outline">
              Load More Customers
            </button>
          </div>
        )}
      </div>
    </VendorDashboardLayout>
  )
}
