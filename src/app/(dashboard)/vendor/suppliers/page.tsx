import { VendorDashboardLayout } from '@/components/vendor/layout'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ShoppingBagIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckBadgeIcon,
  PlusIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function VendorSuppliers() {
  // Mock data for vendor's suppliers
  const savedSuppliers = [
    {
      id: 1,
      name: "Mumbai Fresh Vegetables",
      category: "Vegetables & Fruits",
      location: "Andheri, Mumbai",
      rating: 4.8,
      reviewCount: 156,
      image: "🥬",
      verified: true,
      deliveryTime: "2-4 hours",
      minOrder: "₹500",
      isFavorite: true,
      lastOrdered: "2024-07-25",
      totalOrders: 8,
      totalSpent: "₹12,500",
      description: "Premium quality fresh vegetables and fruits sourced directly from farms.",
      specialties: ["Organic Produce", "Same Day Delivery", "Bulk Orders"]
    },
    {
      id: 2,
      name: "Spice Master Trading",
      category: "Spices & Condiments",
      location: "Chandni Chowk, Delhi",
      rating: 4.9,
      reviewCount: 243,
      image: "🌶️",
      verified: true,
      deliveryTime: "1-2 days",
      minOrder: "₹800",
      isFavorite: true,
      lastOrdered: "2024-07-26",
      totalOrders: 5,
      totalSpent: "₹8,900",
      description: "Authentic Indian spices and condiments with traditional grinding methods.",
      specialties: ["Premium Quality", "Traditional Grinding", "Export Quality"]
    },
    {
      id: 3,
      name: "Golden Grain Suppliers",
      category: "Grains & Pulses",
      location: "Rajouri Garden, Delhi",
      rating: 4.7,
      reviewCount: 189,
      image: "🌾",
      verified: true,
      deliveryTime: "4-6 hours",
      minOrder: "₹1000",
      isFavorite: false,
      lastOrdered: "2024-07-27",
      totalOrders: 3,
      totalSpent: "₹6,200",
      description: "Complete range of grains, pulses, and cereals at wholesale prices.",
      specialties: ["Quality Tested", "Wholesale Prices", "Bulk Available"]
    },
    {
      id: 4,
      name: "Dairy Fresh Mumbai",
      category: "Dairy & Beverages",
      location: "Borivali, Mumbai",
      rating: 4.6,
      reviewCount: 127,
      image: "🥛",
      verified: true,
      deliveryTime: "1-3 hours",
      minOrder: "₹300",
      isFavorite: false,
      lastOrdered: "2024-07-22",
      totalOrders: 2,
      totalSpent: "₹1,850",
      description: "Fresh dairy products with temperature-controlled delivery.",
      specialties: ["Farm Fresh", "Cold Chain", "Daily Delivery"]
    }
  ]

  const recentOrders = [
    {
      id: "ORD-2024-001",
      supplier: "Mumbai Fresh Vegetables",
      supplierImage: "🥬",
      date: "2024-07-25",
      total: "₹2,450",
      status: "delivered"
    },
    {
      id: "ORD-2024-002",
      supplier: "Spice Master Trading", 
      supplierImage: "🌶️",
      date: "2024-07-26",
      total: "₹1,800",
      status: "in_transit"
    },
    {
      id: "ORD-2024-003",
      supplier: "Golden Grain Suppliers",
      supplierImage: "🌾",
      date: "2024-07-27",
      total: "₹3,200",
      status: "processing"
    }
  ]

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Suppliers</h1>
            <p className="mt-2 text-gray-600">Manage your trusted supplier network</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/suppliers" className="btn btn-primary flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Find New Suppliers
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingStorefrontIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Suppliers</p>
                <p className="text-2xl font-semibold text-gray-900">{savedSuppliers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HeartIconSolid className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Favorites</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {savedSuppliers.filter(s => s.isFavorite).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {savedSuppliers.reduce((acc, s) => acc + s.totalOrders, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">💰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{savedSuppliers.reduce((acc, s) => acc + parseInt(s.totalSpent.replace(/[₹,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Suppliers List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search suppliers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>All Categories</option>
                  <option>Vegetables & Fruits</option>
                  <option>Spices & Condiments</option>
                  <option>Grains & Pulses</option>
                  <option>Dairy & Beverages</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>All Suppliers</option>
                  <option>Favorites Only</option>
                  <option>Recently Ordered</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {/* Suppliers Grid */}
            <div className="space-y-4">
              {savedSuppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                        {supplier.image}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            {supplier.name}
                            {supplier.verified && (
                              <CheckBadgeIcon className="h-5 w-5 text-blue-500 ml-2" />
                            )}
                          </h3>
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            {supplier.isFavorite ? (
                              <HeartIconSolid className="h-5 w-5 text-red-500" />
                            ) : (
                              <HeartIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <p className="text-gray-600 mb-1">{supplier.category}</p>
                        
                        {/* Rating and Location */}
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <StarIconSolid
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{supplier.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({supplier.reviewCount})</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {supplier.location}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{supplier.description}</p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {supplier.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>

                        {/* Order History */}
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Orders:</span>
                            <span className="font-medium ml-1">{supplier.totalOrders}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Spent:</span>
                            <span className="font-medium ml-1">{supplier.totalSpent}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Order:</span>
                            <span className="font-medium ml-1">
                              {new Date(supplier.lastOrdered).toLocaleDateString('en-IN', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="text-right text-sm">
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {supplier.deliveryTime}
                        </div>
                        <div className="text-gray-500">
                          Min: {supplier.minOrder}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link 
                          href={`/suppliers/${supplier.id}`}
                          className="btn btn-outline btn-sm"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/suppliers/${supplier.id}/contact`}
                          className="btn btn-primary btn-sm"
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {order.supplierImage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {order.supplier}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.date).toLocaleDateString()} • {order.total}
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'delivered' ? 'Delivered' :
                       order.status === 'in_transit' ? 'In Transit' : 'Processing'}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/vendor/orders" className="block mt-4 text-sm text-center text-blue-600 hover:text-blue-800">
                View All Orders
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/suppliers" className="block btn btn-outline w-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Find New Suppliers
                </Link>
                <button className="block btn btn-outline w-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                  Contact Suppliers
                </button>
                <Link href="/vendor/orders" className="block btn btn-primary w-full flex items-center justify-center">
                  <ShoppingBagIcon className="h-4 w-4 mr-2" />
                  View All Orders
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-3">💡 Pro Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Save frequently used suppliers as favorites</li>
                <li>• Build relationships with 2-3 reliable suppliers</li>
                <li>• Compare prices regularly for better deals</li>
                <li>• Leave reviews to help other vendors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
