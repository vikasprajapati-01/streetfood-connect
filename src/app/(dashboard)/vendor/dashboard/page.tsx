'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { VendorDashboardLayout } from '@/components/vendor/layout'
import { Product, Order, Supplier } from '@/types'

export default function VendorDashboard() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [recommendedSuppliers, setRecommendedSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent products (simulate with random products)
        const productsSnapshot = await getDocs(query(collection(db, 'products'), limit(3)))
        const productsData: Product[] = []
        productsSnapshot.forEach(doc => {
          productsData.push({ id: doc.id, ...doc.data() } as Product)
        })
        setRecentProducts(productsData)
        
        // Fetch recent orders (simulate with placeholder orders)
        // In a real app, we would filter by vendorId
        const ordersSnapshot = await getDocs(query(collection(db, 'orders'), limit(3)))
        const ordersData: Order[] = []
        ordersSnapshot.forEach(doc => {
          ordersData.push({ id: doc.id, ...doc.data() } as Order)
        })
        setRecentOrders(ordersData)
        
        // Fetch recommended suppliers
        const suppliersSnapshot = await getDocs(query(collection(db, 'suppliers'), limit(3)))
        const suppliersData: Supplier[] = []
        suppliersSnapshot.forEach(doc => {
          suppliersData.push({ id: doc.id, ...doc.data() } as Supplier)
        })
        setRecommendedSuppliers(suppliersData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Vendor!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Active Orders', value: '3', icon: '📦', color: 'bg-blue-50' },
            { title: 'Total Spent', value: '₹4,520', icon: '💰', color: 'bg-green-50' },
            { title: 'Saved This Month', value: '₹780', icon: '💸', color: 'bg-yellow-50' },
            { title: 'Group Buys', value: '2', icon: '👥', color: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Products</h2>
            <Link href="/vendor/products" className="text-sm font-medium text-black hover:underline">
              View all products
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : recentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProducts.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-100">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.supplierName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{product.price}/{product.unit}</span>
                      <Link href={`/vendor/products/${product.id}`} className="text-sm text-black hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found. Start exploring!</p>
              <Link href="/vendor/suppliers" className="btn btn-primary mt-4">
                Find Suppliers
              </Link>
            </div>
          )}
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/vendor/orders" className="text-sm font-medium text-black hover:underline">
              View all orders
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Supplier</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-3 px-4 text-sm">{order.supplierId}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">₹{order.totalAmount}</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/vendor/orders/${order.id}`} className="text-sm text-black hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders yet. Start shopping!</p>
              <Link href="/vendor/products" className="btn btn-primary mt-4">
                Browse Products
              </Link>
            </div>
          )}
        </div>
        
        {/* Recommended Suppliers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recommended Suppliers</h2>
            <Link href="/vendor/suppliers" className="text-sm font-medium text-black hover:underline">
              View all suppliers
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : recommendedSuppliers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedSuppliers.map(supplier => (
                <div key={supplier.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-1">{supplier.businessName}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {supplier.categories.slice(0, 2).join(', ')}
                      {supplier.categories.length > 2 ? ' & more' : ''}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.round(supplier.rating) ? 'text-yellow-400' : 'text-gray-200'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        {supplier.rating.toFixed(1)} ({supplier.reviewCount} reviews)
                      </span>
                    </div>
                    <Link href={`/vendor/suppliers/${supplier.id}`} className="btn btn-primary w-full">
                      View Products
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recommended suppliers yet.</p>
            </div>
          )}
        </div>
        
        {/* Group Buy Opportunities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Group Buy Opportunities</h2>
            <Link href="/vendor/group-buys" className="text-sm font-medium text-black hover:underline">
              View all
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg mb-1">Save up to 25% on bulk orders</h3>
                <p className="text-gray-600 mb-4">
                  Join other vendors to get better prices on raw materials
                </p>
              </div>
              <div className="text-4xl">🤝</div>
            </div>
            <Link href="/vendor/group-buys" className="btn btn-primary">
              Explore Group Buys
            </Link>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}