import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  FunnelIcon,
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function SupplierOrders() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-07-25",
      customer: "Mumbai Street Foods",
      customerPhone: "+91 98765 43210",
      customerAddress: "Stall No. 12, Street Food Hub, Andheri West",
      status: "delivered",
      total: 2450,
      items: [
        { name: "Fresh Onions", quantity: "25 kg", price: 625, productId: "PROD-001" },
        { name: "Tomatoes", quantity: "20 kg", price: 700, productId: "PROD-005" },
        { name: "Green Chilies", quantity: "5 kg", price: 400, productId: "PROD-003" },
        { name: "Coriander", quantity: "10 bundles", price: 350, productId: "PROD-002" },
        { name: "Potatoes", quantity: "15 kg", price: 375, productId: "PROD-004" }
      ],
      deliveredAt: "2024-07-25 10:30 AM",
      paymentStatus: "paid"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-07-26",
      customer: "Spice Corner",
      customerPhone: "+91 87654 32109",
      customerAddress: "Shop No. 45, Spice Market, Mulund East",
      status: "processing",
      total: 1800,
      items: [
        { name: "Red Chili Powder", quantity: "2 kg", price: 400, productId: "PROD-003" },
        { name: "Turmeric Powder", quantity: "1 kg", price: 200, productId: "PROD-004" },
        { name: "Garam Masala", quantity: "500g", price: 300, productId: "PROD-005" },
        { name: "Cumin Seeds", quantity: "1 kg", price: 250, productId: "PROD-006" },
        { name: "Coriander Seeds", quantity: "1 kg", price: 180, productId: "PROD-007" },
        { name: "Bay Leaves", quantity: "100g", price: 120, productId: "PROD-008" },
        { name: "Black Pepper", quantity: "250g", price: 350, productId: "PROD-009" }
      ],
      estimatedDelivery: "Tomorrow by 11:00 AM",
      paymentStatus: "pending"
    },
    {
      id: "ORD-2024-003",
      date: "2024-07-27",
      customer: "Golden Dosa", 
      customerPhone: "+91 76543 21098",
      customerAddress: "Stall No. 8, Food Court, Bandra West",
      status: "confirmed",
      total: 3200,
      items: [
        { name: "Basmati Rice", quantity: "10 kg", price: 800, productId: "PROD-002" },
        { name: "Wheat Flour", quantity: "25 kg", price: 1200, productId: "PROD-001" },
        { name: "Bengal Gram Dal", quantity: "5 kg", price: 600, productId: "PROD-003" },
        { name: "Toor Dal", quantity: "5 kg", price: 600, productId: "PROD-004" }
      ],
      estimatedDelivery: "Today by 2:00 PM",
      paymentStatus: "paid"
    },
    {
      id: "ORD-2024-004",
      date: "2024-07-20",
      customer: "Chat Corner",
      customerPhone: "+91 65432 10987",
      customerAddress: "Stall No. 23, Beach Road, Juhu",
      status: "cancelled",
      total: 1500,
      items: [
        { name: "Fresh Onions", quantity: "20 kg", price: 500, productId: "PROD-001" },
        { name: "Tomatoes", quantity: "15 kg", price: 525, productId: "PROD-005" },
        { name: "Green Chilies", quantity: "3 kg", price: 240, productId: "PROD-003" },
        { name: "Potatoes", quantity: "10 kg", price: 235, productId: "PROD-004" }
      ],
      cancelReason: "Customer cancelled due to change in requirements",
      paymentStatus: "refunded"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircleIcon
      case 'processing': return TruckIcon
      case 'confirmed': return ClockIcon
      case 'cancelled': return XCircleIcon
      default: return ShoppingBagIcon
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'processing': return 'Processing'
      case 'confirmed': return 'Confirmed'
      case 'cancelled': return 'Cancelled'
      default: return 'Unknown'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
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

  return (
    <SupplierDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-600">Manage and track your customer orders</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button className="btn btn-outline flex items-center">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="btn btn-primary">
              Export Orders
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
                <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Processing</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(o => o.status === 'processing' || o.status === 'confirmed').length}
                </p>
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
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(o => o.status === 'delivered').length}
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
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { name: 'All Orders', count: orders.length.toString(), active: true },
                { name: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length.toString(), active: false },
                { name: 'Processing', count: orders.filter(o => o.status === 'processing').length.toString(), active: false },
                { name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length.toString(), active: false },
                { name: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length.toString(), active: false }
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
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingBagIcon className="h-8 w-8 text-gray-600" />
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
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-gray-900 font-medium">{order.customer}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-1" />
                              {order.customerPhone}
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {order.customerAddress}
                            </div>
                          </div>
                        </div>
                        
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
                        {(order.status === 'processing' || order.status === 'confirmed') && order.estimatedDelivery && (
                          <p className="text-sm text-blue-600">
                            🚛 Expected delivery: {order.estimatedDelivery}
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
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="btn btn-outline btn-sm flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        {order.status === 'confirmed' && (
                          <button className="btn btn-primary btn-sm">
                            Start Processing
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button className="btn btn-primary btn-sm">
                            Mark as Delivered
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
    </SupplierDashboardLayout>
  )
}
