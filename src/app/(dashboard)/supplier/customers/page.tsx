import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  UsersIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  StarIcon,
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  EyeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

export default function SupplierCustomers() {
  // Mock customers data
  const customers = [
    {
      id: 'CUST-001',
      name: 'Mumbai Street Foods',
      email: 'orders@mumbaistreetfoods.com',
      phone: '+91 98765 43210',
      address: 'Stall No. 12, Street Food Hub, Andheri West',
      businessType: 'Street Food Vendor',
      joinedDate: '2024-01-15',
      totalOrders: 28,
      totalSpent: 45600,
      avgOrderValue: 1628,
      lastOrderDate: '2024-07-25',
      status: 'active',
      rating: 4.8,
      preferredProducts: ['Fresh Onions', 'Tomatoes', 'Green Chilies'],
      paymentMethod: 'UPI',
      creditLimit: 10000,
      outstandingAmount: 0
    },
    {
      id: 'CUST-002',
      name: 'Spice Corner',
      email: 'purchase@spicecorner.in',
      phone: '+91 87654 32109',
      address: 'Shop No. 45, Spice Market, Mulund East',
      businessType: 'Spice Retailer',
      joinedDate: '2024-02-10',
      totalOrders: 42,
      totalSpent: 78200,
      avgOrderValue: 1862,
      lastOrderDate: '2024-07-26',
      status: 'active',
      rating: 4.9,
      preferredProducts: ['Red Chili Powder', 'Turmeric Powder', 'Garam Masala'],
      paymentMethod: 'Bank Transfer',
      creditLimit: 15000,
      outstandingAmount: 2400
    },
    {
      id: 'CUST-003',
      name: 'Golden Dosa',
      email: 'supplies@goldendosa.com',
      phone: '+91 76543 21098',
      address: 'Stall No. 8, Food Court, Bandra West',
      businessType: 'South Indian Restaurant',
      joinedDate: '2024-03-05',
      totalOrders: 35,
      totalSpent: 62300,
      avgOrderValue: 1780,
      lastOrderDate: '2024-07-27',
      status: 'active',
      rating: 4.7,
      preferredProducts: ['Basmati Rice', 'Wheat Flour', 'Dal'],
      paymentMethod: 'UPI',
      creditLimit: 12000,
      outstandingAmount: 3200
    },
    {
      id: 'CUST-004',
      name: 'Chat Corner',
      email: 'orders@chatcorner.in',
      phone: '+91 65432 10987',
      address: 'Stall No. 23, Beach Road, Juhu',
      businessType: 'Street Food Vendor',
      joinedDate: '2024-04-12',
      totalOrders: 18,
      totalSpent: 28900,
      avgOrderValue: 1605,
      lastOrderDate: '2024-07-20',
      status: 'inactive',
      rating: 4.5,
      preferredProducts: ['Fresh Onions', 'Potatoes', 'Green Chilies'],
      paymentMethod: 'Cash',
      creditLimit: 8000,
      outstandingAmount: 0
    },
    {
      id: 'CUST-005',
      name: 'Tandoor Express',
      email: 'procurement@tandoorexpress.com',
      phone: '+91 54321 09876',
      address: 'Restaurant No. 15, Food Street, Powai',
      businessType: 'North Indian Restaurant',
      joinedDate: '2024-01-28',
      totalOrders: 52,
      totalSpent: 89600,
      avgOrderValue: 1723,
      lastOrderDate: '2024-07-24',
      status: 'active',
      rating: 4.6,
      preferredProducts: ['Spices', 'Wheat Flour', 'Cooking Oil'],
      paymentMethod: 'Bank Transfer',
      creditLimit: 20000,
      outstandingAmount: 4500
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getBusinessTypeIcon = (type: string) => {
    if (type.includes('Restaurant')) return '🍽️'
    if (type.includes('Street Food')) return '🍜'
    if (type.includes('Retailer')) return '🏪'
    return '🏢'
  }

  return (
    <SupplierDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="mt-2 text-gray-600">Manage your customer relationships and orders</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button className="btn btn-outline">
              Export Customers
            </button>
            <button className="btn btn-primary">
              Add Customer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">✅</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Customers</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">💳</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(customers.reduce((sum, c) => sum + c.outstandingAmount, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                className="input pl-10"
              />
            </div>
            <div className="flex gap-3">
              <select className="input">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="input">
                <option>All Business Types</option>
                <option>Street Food Vendor</option>
                <option>Restaurant</option>
                <option>Retailer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customers List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {getBusinessTypeIcon(customer.businessType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {customer.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{customer.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{customer.businessType}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {customer.address}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Joined {formatDate(customer.joinedDate)}
                        </div>
                      </div>
                      
                      {/* Customer Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm font-medium text-gray-900">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-500">Total Orders</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                          <p className="text-xs text-gray-500">Total Spent</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(customer.avgOrderValue)}</p>
                          <p className="text-xs text-gray-500">Avg Order</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm font-medium text-gray-900">{formatDate(customer.lastOrderDate)}</p>
                          <p className="text-xs text-gray-500">Last Order</p>
                        </div>
                      </div>
                      
                      {/* Preferred Products */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Preferred Products:</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.preferredProducts.map((product, index) => (
                            <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Payment Info */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span>Payment: {customer.paymentMethod}</span>
                          <span>Credit Limit: {formatCurrency(customer.creditLimit)}</span>
                        </div>
                        {customer.outstandingAmount > 0 && (
                          <span className="text-red-600 font-medium">
                            Outstanding: {formatCurrency(customer.outstandingAmount)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-outline btn-sm flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Profile
                    </button>
                    <button className="btn btn-outline btn-sm flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      Message
                    </button>
                    <button className="btn btn-primary btn-sm flex items-center">
                      <ShoppingBagIcon className="h-4 w-4 mr-1" />
                      View Orders
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{customers.length}</span> of{' '}
                <span className="font-medium">{customers.length}</span> customers
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn btn-outline btn-sm">Previous</button>
              <button className="btn btn-outline btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </SupplierDashboardLayout>
  )
}
