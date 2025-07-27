import { VendorDashboardLayout } from '@/components/vendor/layout'
import { 
  ShoppingBagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  EyeIcon,
  ReceiptRefundIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

export default function VendorOrders() {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-07-25",
      supplier: "Mumbai Fresh Vegetables",
      supplierImage: "🥬",
      status: "delivered",
      total: "₹2,450",
      items: [
        { name: "Fresh Onions", quantity: "25 kg", price: "₹625" },
        { name: "Tomatoes", quantity: "20 kg", price: "₹700" },
        { name: "Green Chilies", quantity: "5 kg", price: "₹400" },
        { name: "Coriander", quantity: "10 bundles", price: "₹350" },
        { name: "Potatoes", quantity: "15 kg", price: "₹375" }
      ],
      deliveryAddress: "Stall No. 12, Street Food Hub, Andheri West",
      trackingId: "TRK123456789",
      deliveredAt: "2024-07-25 10:30 AM"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-07-26",
      supplier: "Spice Master Trading",
      supplierImage: "🌶️",
      status: "in_transit",
      total: "₹1,800",
      items: [
        { name: "Red Chili Powder", quantity: "2 kg", price: "₹400" },
        { name: "Turmeric Powder", quantity: "1 kg", price: "₹200" },
        { name: "Garam Masala", quantity: "500g", price: "₹300" },
        { name: "Cumin Seeds", quantity: "1 kg", price: "₹250" },
        { name: "Coriander Seeds", quantity: "1 kg", price: "₹180" },
        { name: "Bay Leaves", quantity: "100g", price: "₹120" },
        { name: "Black Pepper", quantity: "250g", price: "₹350" }
      ],
      deliveryAddress: "Stall No. 12, Street Food Hub, Andheri West",
      trackingId: "TRK987654321",
      estimatedDelivery: "Today by 2:00 PM"
    },
    {
      id: "ORD-2024-003",
      date: "2024-07-27",
      supplier: "Golden Grain Suppliers", 
      supplierImage: "🌾",
      status: "processing",
      total: "₹3,200",
      items: [
        { name: "Basmati Rice", quantity: "10 kg", price: "₹800" },
        { name: "Wheat Flour", quantity: "25 kg", price: "₹1,200" },
        { name: "Bengal Gram Dal", quantity: "5 kg", price: "₹600" },
        { name: "Toor Dal", quantity: "5 kg", price: "₹600" }
      ],
      deliveryAddress: "Stall No. 12, Street Food Hub, Andheri West",
      estimatedDelivery: "Tomorrow by 11:00 AM"
    },
    {
      id: "ORD-2024-004",
      date: "2024-07-20",
      supplier: "Mumbai Fresh Vegetables",
      supplierImage: "🥬", 
      status: "cancelled",
      total: "₹1,500",
      items: [
        { name: "Fresh Onions", quantity: "20 kg", price: "₹500" },
        { name: "Tomatoes", quantity: "15 kg", price: "₹525" },
        { name: "Green Chilies", quantity: "3 kg", price: "₹240" },
        { name: "Potatoes", quantity: "10 kg", price: "₹235" }
      ],
      deliveryAddress: "Stall No. 12, Street Food Hub, Andheri West",
      cancelReason: "Quality issues reported by vendor"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in_transit': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircleIcon
      case 'in_transit': return TruckIcon
      case 'processing': return ClockIcon
      case 'cancelled': return XCircleIcon
      default: return ShoppingBagIcon
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'in_transit': return 'In Transit'
      case 'processing': return 'Processing'
      case 'cancelled': return 'Cancelled'
      default: return 'Unknown'
    }
  }

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-2 text-gray-600">Track and manage your ingredient orders</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button className="btn btn-outline flex items-center">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="btn btn-primary flex items-center">
              <ShoppingBagIcon className="h-4 w-4 mr-2" />
              New Order
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <p className="text-2xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-2xl font-semibold text-gray-900">21</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">💰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">₹18,450</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { name: 'All Orders', count: '24', active: true },
                { name: 'Processing', count: '1', active: false },
                { name: 'In Transit', count: '2', active: false },
                { name: 'Delivered', count: '21', active: false },
                { name: 'Cancelled', count: '1', active: false }
              ].map((tab) => (
                <button
                  key={tab.name}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    tab.active
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    tab.active ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {orders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                        {order.supplierImage}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.id}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{order.supplier}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          Ordered on {new Date(order.date).toLocaleDateString('en-IN', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        
                        {/* Order Items Summary */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">{order.items.length} items:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {item.name} ({item.quantity})
                              </span>
                            ))}
                            {order.items.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                +{order.items.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status-specific info */}
                        {order.status === 'delivered' && order.deliveredAt && (
                          <p className="text-sm text-green-600">
                            ✓ Delivered on {order.deliveredAt}
                          </p>
                        )}
                        {order.status === 'in_transit' && order.estimatedDelivery && (
                          <p className="text-sm text-blue-600">
                            🚛 Expected: {order.estimatedDelivery}
                          </p>
                        )}
                        {order.status === 'processing' && order.estimatedDelivery && (
                          <p className="text-sm text-yellow-600">
                            ⏳ Expected: {order.estimatedDelivery}
                          </p>
                        )}
                        {order.status === 'cancelled' && order.cancelReason && (
                          <p className="text-sm text-red-600">
                            ❌ Cancelled: {order.cancelReason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{order.total}</p>
                        {order.trackingId && (
                          <p className="text-xs text-gray-500">ID: {order.trackingId}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="btn btn-outline btn-sm flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </button>
                        {order.status === 'delivered' && (
                          <button className="btn btn-outline btn-sm flex items-center">
                            <ReceiptRefundIcon className="h-4 w-4 mr-1" />
                            Reorder
                          </button>
                        )}
                        {order.status === 'in_transit' && (
                          <button className="btn btn-primary btn-sm flex items-center">
                            <TruckIcon className="h-4 w-4 mr-1" />
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="btn btn-outline">
            Load More Orders
          </button>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
