'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { Product, Order } from '@/types'

export default function SupplierDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch supplier products (simulate with random products)
        const productsSnapshot = await getDocs(query(collection(db, 'products'), limit(6)))
        const productsData: Product[] = []
        productsSnapshot.forEach(doc => {
          productsData.push({ id: doc.id, ...doc.data() } as Product)
        })
        setProducts(productsData)
        
        // Fetch recent orders (simulate with placeholder orders)
        // In a real app, we would filter by supplierId
        const ordersSnapshot = await getDocs(query(collection(db, 'orders'), limit(5)))
        const ordersData: Order[] = []
        ordersSnapshot.forEach(doc => {
          ordersData.push({ id: doc.id, ...doc.data() } as Order)
        })
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  return (
    <SupplierDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Supplier!</h1>
          <p className="text-gray-600">Here&apos;s an overview of your business.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Products', value: products.length.toString(), icon: '📦', color: 'bg-blue-50' },
            { title: 'Active Orders', value: orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length.toString(), icon: '🚚', color: 'bg-green-50' },
            { title: 'Revenue (Month)', value: '₹32,450', icon: '💰', color: 'bg-yellow-50' },
            { title: 'New Customers', value: '12', icon: '👤', color: 'bg-purple-50' },
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
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/supplier/orders" className="text-sm font-medium text-black hover:underline">
              View all orders
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vendor</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-3 px-4 text-sm">{order.vendorId}</td>
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
                        <Link href={`/supplier/orders/${order.id}`} className="text-sm text-black hover:underline">
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
              <p className="text-gray-500">No orders yet.</p>
            </div>
          )}
        </div>
        
        {/* Your Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Products</h2>
            <Link href="/supplier/catalog" className="text-sm font-medium text-black hover:underline">
              Manage catalog
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map(product => (
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
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{product.price}/{product.unit}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No products in your catalog yet.</p>
              <Link href="/supplier/catalog/add" className="btn btn-primary mt-4">
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
        
        {/* Performance Insights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Performance Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-4">Top Selling Products</h3>
              <ul className="space-y-2">
                {products.slice(0, 3).map(product => (
                  <li key={product.id} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm font-medium">32 orders</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-4">Monthly Revenue</h3>
              <div className="h-40 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Graph visualization would go here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tips and Recommendations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Tips to Grow Your Business</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Optimize your inventory",
                description: "Keep track of your most popular items and ensure they are always in stock.",
              },
              {
                title: "Offer bulk discounts",
                description: "Attract more vendor group buys by offering special pricing for larger orders.",
              },
              {
                title: "Update your catalog regularly",
                description: "Add new products and update prices to stay competitive in the marketplace.",
              },
              {
                title: "Respond quickly to orders",
                description: "Fast confirmation and shipping leads to better reviews and repeat business.",
              },
            ].map((tip, i) => (
              <div key={i} className="border-l-4 border-black pl-4 py-1">
                <h3 className="font-medium">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupplierDashboardLayout>
  )
}