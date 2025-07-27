'use client'

import { VendorDashboardLayout } from '@/components/vendor/layout'
import { useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  image?: string
  orders: number
  revenue: number
  lastUpdated: string
}

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Mock product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Red Onions',
      category: 'Vegetables & Fruits',
      price: 25,
      unit: 'kg',
      stock: 150,
      status: 'active',
      image: '🧅',
      orders: 45,
      revenue: 11250,
      lastUpdated: '2024-07-26'
    },
    {
      id: '2',
      name: 'Basmati Rice Premium',
      category: 'Grains & Pulses',
      price: 80,
      unit: 'kg',
      stock: 50,
      status: 'active',
      image: '🍚',
      orders: 32,
      revenue: 9600,
      lastUpdated: '2024-07-25'
    },
    {
      id: '3',
      name: 'Red Chili Powder',
      category: 'Spices & Condiments',
      price: 300,
      unit: 'kg',
      stock: 0,
      status: 'out_of_stock',
      image: '🌶️',
      orders: 28,
      revenue: 8400,
      lastUpdated: '2024-07-24'
    },
    {
      id: '4',
      name: 'Fresh Tomatoes',
      category: 'Vegetables & Fruits',
      price: 35,
      unit: 'kg',
      stock: 75,
      status: 'active',
      image: '🍅',
      orders: 38,
      revenue: 7980,
      lastUpdated: '2024-07-27'
    },
    {
      id: '5',
      name: 'Turmeric Powder',
      category: 'Spices & Condiments',
      price: 200,
      unit: 'kg',
      stock: 25,
      status: 'inactive',
      image: '🟡',
      orders: 25,
      revenue: 5000,
      lastUpdated: '2024-07-23'
    }
  ]

  const categories = ['all', 'Vegetables & Fruits', 'Spices & Condiments', 'Grains & Pulses', 'Dairy Products', 'Meat & Seafood']
  const statuses = ['all', 'active', 'inactive', 'out_of_stock']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.price - b.price
      case 'stock':
        return b.stock - a.stock
      case 'orders':
        return b.orders - a.orders
      case 'revenue':
        return b.revenue - a.revenue
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'inactive': return 'Inactive'
      case 'out_of_stock': return 'Out of Stock'
      default: return 'Unknown'
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Handle delete logic here
      console.log('Delete product:', productId)
    }
  }

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <p className="mt-2 text-gray-600">Manage your product inventory and listings</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/vendor/products/add" className="btn btn-primary flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{products.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Active Products</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {products.filter(p => p.status === 'active').length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {products.filter(p => p.status === 'out_of_stock').length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              ₹{products.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </p>
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
                  placeholder="Search products..."
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input pr-8 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
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
                      {status === 'all' ? 'All Status' : getStatusText(status)}
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
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="stock">Sort by Stock</option>
                  <option value="orders">Sort by Orders</option>
                  <option value="revenue">Sort by Revenue</option>
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Product Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <div className="text-6xl">{product.image}</div>
                ) : (
                  <PhotoIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{product.category}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">₹{product.price}/{product.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stock</p>
                    <p className="font-semibold">{product.stock} {product.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Orders</p>
                    <p className="font-semibold">{product.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm flex items-center flex-1">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button className="btn btn-outline btn-sm flex items-center flex-1">
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Link href="/vendor/products/add" className="btn btn-primary">
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center">
            <button className="btn btn-outline">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </VendorDashboardLayout>
  )
}
