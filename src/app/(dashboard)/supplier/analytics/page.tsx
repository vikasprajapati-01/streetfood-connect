import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ShoppingCartIcon,
  CurrencyRupeeIcon,
  UsersIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function SupplierAnalytics() {
  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 125000,
      revenueGrowth: 12.5,
      totalOrders: 342,
      ordersGrowth: 8.3,
      totalCustomers: 56,
      customersGrowth: 15.2,
      avgOrderValue: 1850,
      avgOrderGrowth: -2.1
    },
    salesData: [
      { month: 'Jan', revenue: 18000, orders: 45 },
      { month: 'Feb', revenue: 22000, orders: 52 },
      { month: 'Mar', revenue: 19500, orders: 48 },
      { month: 'Apr', revenue: 25000, orders: 61 },
      { month: 'May', revenue: 28000, orders: 68 },
      { month: 'Jun', revenue: 31500, orders: 76 }
    ],
    topProducts: [
      { name: 'Fresh Onions', sales: 45000, orders: 89, category: 'Vegetables' },
      { name: 'Basmati Rice', sales: 38000, orders: 67, category: 'Grains' },
      { name: 'Red Chili Powder', sales: 22000, orders: 45, category: 'Spices' },
      { name: 'Turmeric Powder', sales: 18000, orders: 38, category: 'Spices' },
      { name: 'Tomatoes', sales: 15000, orders: 32, category: 'Vegetables' }
    ],
    recentActivity: [
      { type: 'order', customer: 'Mumbai Street Foods', amount: 2450, time: '2 hours ago' },
      { type: 'inquiry', customer: 'Spice Corner', product: 'Garam Masala', time: '4 hours ago' },
      { type: 'order', customer: 'Golden Dosa', amount: 1850, time: '6 hours ago' },
      { type: 'review', customer: 'Chat Corner', rating: 5, time: '1 day ago' },
      { type: 'order', customer: 'Tandoor Express', amount: 3200, time: '1 day ago' }
    ]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0
    return (
      <span className={`inline-flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
        )}
        {Math.abs(growth)}%
      </span>
    )
  }

  return (
    <SupplierDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-2 text-gray-600">Track your business performance and insights</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <select className="input">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
            <button className="btn btn-primary">
              Download Report
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.overview.totalRevenue)}
                </p>
                <div className="mt-2">
                  {formatGrowth(analyticsData.overview.revenueGrowth)}
                </div>
              </div>
              <div className="flex-shrink-0">
                <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalOrders}</p>
                <div className="mt-2">
                  {formatGrowth(analyticsData.overview.ordersGrowth)}
                </div>
              </div>
              <div className="flex-shrink-0">
                <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalCustomers}</p>
                <div className="mt-2">
                  {formatGrowth(analyticsData.overview.customersGrowth)}
                </div>
              </div>
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.overview.avgOrderValue)}
                </p>
                <div className="mt-2">
                  {formatGrowth(analyticsData.overview.avgOrderGrowth)}
                </div>
              </div>
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="space-y-4">
              {analyticsData.salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="w-12 text-sm font-medium text-gray-600">{data.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 35000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(data.revenue)}</p>
                    <p className="text-xs text-gray-500">{data.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category} • {product.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(product.sales)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'order' ? 'bg-green-100' :
                    activity.type === 'inquiry' ? 'bg-blue-100' :
                    activity.type === 'review' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    {activity.type === 'order' && <ShoppingCartIcon className="h-4 w-4 text-green-600" />}
                    {activity.type === 'inquiry' && <EyeIcon className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'review' && <span className="text-yellow-600">★</span>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type === 'order' && `New order from ${activity.customer}`}
                      {activity.type === 'inquiry' && `Product inquiry from ${activity.customer}`}
                      {activity.type === 'review' && `${activity.rating}-star review from ${activity.customer}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.type === 'order' && `Order value: ${formatCurrency(activity.amount!)}`}
                      {activity.type === 'inquiry' && `Product: ${activity.product}`}
                      {activity.type === 'review' && 'Review posted'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupplierDashboardLayout>
  )
}
