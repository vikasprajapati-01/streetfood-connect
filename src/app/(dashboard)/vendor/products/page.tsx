'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { VendorDashboardLayout } from '@/components/vendor/layout'
import { Product } from '@/types'

const categories = [
  'All Categories',
  'Vegetables & Fruits',
  'Spices & Condiments',
  'Dairy Products',
  'Grains & Pulses',
  'Meat & Seafood',
  'Cooking Oils',
  'Packaging Materials',
  'Ready-made Mixes',
  'Beverages',
]

export default function VendorProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('recommended')
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(query(collection(db, 'products')))
        const productsData: Product[] = []
        productsSnapshot.forEach(doc => {
          productsData.push({ id: doc.id, ...doc.data() } as Product)
        })
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  useEffect(() => {
    let filtered = [...products]
    
    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      // Default is recommended (could be based on a recommendation algorithm)
      default:
        break
    }
    
    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])
  
  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Browse Products</h1>
          <p className="text-gray-600">Find the raw materials you need at competitive prices.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  className="input pl-10"
                  placeholder="Search products by name, description, or category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div>
                <label htmlFor="category" className="sr-only">Category</label>
                <select
                  id="category"
                  className="input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  className="input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative h-48 w-full bg-gray-100">
                    {product.image ? (
                      <div className="relative h-full w-full">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.round(product.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <span className="text-sm">
                        Min. order: {product.minimumOrderQuantity} {product.unit}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">₹{product.price}/{product.unit}</span>
                      <Link href={`/vendor/products/${product.id}`} className="btn btn-primary py-1 px-3 text-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                        {product.supplierName?.charAt(0) || 'S'}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{product.supplierName}</p>
                        <Link href={`/vendor/suppliers/${product.supplierId}`} className="text-xs text-black hover:underline">
                          View Supplier
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All Categories')
                  setSortBy('recommended')
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Pagination (simplified for now) */}
          {filteredProducts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
        
        {/* Group Buy Promotion */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-black">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">Save with Group Buys</h2>
              <p className="text-gray-600 mb-4">
                Join other vendors to purchase in bulk and get better prices on popular items.
              </p>
              <Link href="/vendor/group-buys" className="btn btn-primary">
                Explore Group Buys
              </Link>
            </div>
            <div className="hidden md:block text-5xl">👥</div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}