import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SupplierCatalog() {
  // Mock product data
  const products = [
    {
      id: 'PROD-001',
      name: 'Fresh Red Onions',
      category: 'Vegetables',
      price: 25,
      unit: 'per kg',
      stock: 500,
      status: 'active',
      image: '🧅',
      description: 'Premium quality red onions, fresh from farm',
      lastUpdated: '2024-07-25',
      orders: 45,
      revenue: 11250
    },
    {
      id: 'PROD-002',
      name: 'Basmati Rice Premium',
      category: 'Grains',
      price: 80,
      unit: 'per kg',
      stock: 200,
      status: 'active',
      image: '🌾',
      description: 'Premium aged basmati rice, 1121 variety',
      lastUpdated: '2024-07-24',
      orders: 32,
      revenue: 25600
    },
    {
      id: 'PROD-003',
      name: 'Red Chili Powder',
      category: 'Spices',
      price: 200,
      unit: 'per kg',
      stock: 50,
      status: 'active',
      image: '🌶️',
      description: 'Pure red chili powder, medium spice level',
      lastUpdated: '2024-07-23',
      orders: 28,
      revenue: 5600
    },
    {
      id: 'PROD-004',
      name: 'Turmeric Powder',
      category: 'Spices',
      price: 180,
      unit: 'per kg',
      stock: 0,
      status: 'out_of_stock',
      image: '🟡',
      description: 'Organic turmeric powder, high curcumin content',
      lastUpdated: '2024-07-22',
      orders: 15,
      revenue: 2700
    },
    {
      id: 'PROD-005',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 35,
      unit: 'per kg',
      stock: 300,
      status: 'active',
      image: '🍅',
      description: 'Fresh red tomatoes, perfect for cooking',
      lastUpdated: '2024-07-25',
      orders: 38,
      revenue: 13300
    },
    {
      id: 'PROD-006',
      name: 'Wheat Flour',
      category: 'Grains',
      price: 45,
      unit: 'per kg',
      stock: 150,
      status: 'draft',
      image: '🌾',
      description: 'Whole wheat flour, stone ground',
      lastUpdated: '2024-07-20',
      orders: 0,
      revenue: 0
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'draft': return 'Draft'
      case 'out_of_stock': return 'Out of Stock'
      default: return 'Unknown'
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
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <p className="mt-2 text-gray-600">Manage your products and inventory</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/supplier/catalog/add" className="btn btn-primary flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">📦</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">✅</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Products</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">⚠️</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.stock < 100).length}
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
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(products.reduce((sum, p) => sum + p.revenue, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="input pl-10"
              />
            </div>
            <div className="flex gap-3">
              <select className="input">
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Grains</option>
                <option>Spices</option>
                <option>Dairy</option>
              </select>
              <select className="input">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
              <button className="btn btn-outline flex items-center">
                <FunnelIcon className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(product.price)} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`${product.stock < 100 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock} kg
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of{' '}
                <span className="font-medium">{products.length}</span> results
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
