'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { VendorDashboardLayout } from '@/components/vendor/layout'
import { GroupBuy, Product } from '@/types'

export default function VendorGroupBuys() {
  const [activeGroupBuys, setActiveGroupBuys] = useState<(GroupBuy & { product?: Product })[]>([])
  const [myGroupBuys, setMyGroupBuys] = useState<(GroupBuy & { product?: Product })[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchGroupBuys = async () => {
      try {
        // Fetch active group buys 
        // Note: Using simplified query until composite index is ready
        // Once index builds (can take a few minutes), we can use:
        // query(collection(db, 'groupBuys'), where('status', '==', 'active'), orderBy('deadline'))
        const groupBuysSnapshot = await getDocs(
          query(
            collection(db, 'groupBuys'),
            where('status', '==', 'active')
          )
        )
        
        const groupBuysData: GroupBuy[] = []
        groupBuysSnapshot.forEach(doc => {
          groupBuysData.push({ id: doc.id, ...doc.data() } as GroupBuy)
        })
        
        // Sort by deadline in memory (until index is ready)
        groupBuysData.sort((a, b) => {
          const dateA = new Date(a.deadline).getTime()
          const dateB = new Date(b.deadline).getTime()
          return dateA - dateB
        })
        
        // Fetch product details for each group buy
        const groupBuysWithProducts = await Promise.all(
          groupBuysData.map(async (groupBuy) => {
            try {
              const productDoc = await getDocs(
                query(collection(db, 'products'), where('id', '==', groupBuy.productId))
              )
              let product: Product | undefined
              
              productDoc.forEach(doc => {
                product = { id: doc.id, ...doc.data() } as Product
              })
              
              return { ...groupBuy, product }
            } catch (error) {
              console.error(`Error fetching product for group buy ${groupBuy.id}:`, error)
              return groupBuy
            }
          })
        )
        
        setActiveGroupBuys(groupBuysWithProducts)
        
        // Filter for group buys that the current user participates in
        // In a real application, you would use the current user's ID
        const mockCurrentUserId = 'current-user-id'
        setMyGroupBuys(
          groupBuysWithProducts.filter(groupBuy => 
            groupBuy.participants?.some(p => p.vendorId === mockCurrentUserId) ||
            groupBuy.initiatorId === mockCurrentUserId
          )
        )
      } catch (error) {
        console.error('Error fetching group buys:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchGroupBuys()
  }, [])
  
  // Helper function to calculate the time remaining for a group buy
  const getTimeRemaining = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    
    if (diffTime <= 0) return 'Ended'
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h left`
    }
    return `${diffHours}h left`
  }
  
  // Helper function to calculate progress percentage
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }
  
  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Group Buys</h1>
          <p className="text-gray-600">
            Join other vendors to buy in bulk and get better prices on raw materials.
          </p>
        </div>
        
        {/* Create New Group Buy CTA */}
        <div className="bg-black text-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Start a New Group Buy</h2>
              <p className="text-gray-300">
                Can't find what you're looking for? Start your own group buy and invite others to join!
              </p>
            </div>
            <Link href="/vendor/group-buys/create" className="btn bg-white text-black hover:bg-gray-100">
              Create Group Buy
            </Link>
          </div>
        </div>
        
        {/* My Group Buys */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">My Group Buys</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : myGroupBuys.length > 0 ? (
            <div className="space-y-4">
              {myGroupBuys.map(groupBuy => (
                <Link
                  key={groupBuy.id}
                  href={`/vendor/group-buys/${groupBuy.id}`}
                  className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-48 h-40 bg-gray-100">
                      {groupBuy.product?.image ? (
                        <Image 
                          src={groupBuy.product.image} 
                          alt={groupBuy.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-medium text-lg mb-1">{groupBuy.productName}</h3>
                      <p className="text-sm text-gray-500 mb-2">By {groupBuy.supplierName}</p>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <span className="font-bold mr-1">₹{groupBuy.discountedUnitPrice}</span>
                          <span className="text-sm text-gray-500 line-through">₹{groupBuy.unitPrice}</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Save {Math.round((1 - groupBuy.discountedUnitPrice / groupBuy.unitPrice) * 100)}%
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>{groupBuy.currentQuantity} of {groupBuy.targetQuantity} units</span>
                          <span className="text-blue-600 font-medium">
                            {getTimeRemaining(groupBuy.deadline)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full" 
                            style={{ width: `${getProgressPercentage(groupBuy.currentQuantity, groupBuy.targetQuantity)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, groupBuy.participants.length))].map((_, i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {groupBuy.participants.length} participants
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 md:w-40 bg-gray-50 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-2">
                        {groupBuy.initiatorId === 'current-user-id' ? 'You initiated' : 'You joined'}
                      </div>
                      <div className="text-sm text-blue-600">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium mb-2">You haven't joined any group buys yet</h3>
              <p className="text-gray-500 mb-4">Join a group buy below or start your own!</p>
            </div>
          )}
        </div>
        
        {/* Active Group Buys */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Active Group Buys</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : activeGroupBuys.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGroupBuys.map(groupBuy => (
                <Link
                  key={groupBuy.id}
                  href={`/vendor/group-buys/${groupBuy.id}`}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative h-48 bg-gray-100">
                    {groupBuy.product?.image ? (
                      <Image 
                        src={groupBuy.product.image} 
                        alt={groupBuy.productName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                      {getTimeRemaining(groupBuy.deadline)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{groupBuy.productName}</h3>
                    <p className="text-sm text-gray-500 mb-3">By {groupBuy.supplierName}</p>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center">
                        <span className="font-bold mr-1">₹{groupBuy.discountedUnitPrice}</span>
                        <span className="text-sm text-gray-500 line-through">₹{groupBuy.unitPrice}</span>
                      </div>
                      <div className="text-xs text-green-600 font-medium px-1.5 py-0.5 bg-green-50 rounded">
                        Save {Math.round((1 - groupBuy.discountedUnitPrice / groupBuy.unitPrice) * 100)}%
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>{groupBuy.currentQuantity} of {groupBuy.targetQuantity} units</span>
                        <span className="text-gray-500">{Math.round((groupBuy.currentQuantity / groupBuy.targetQuantity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${getProgressPercentage(groupBuy.currentQuantity, groupBuy.targetQuantity)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, groupBuy.participants.length))].map((_, i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {groupBuy.participants.length} joined
                        </span>
                      </div>
                      <span className="text-sm font-medium text-black">Join Now</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">No active group buys found</h3>
              <p className="text-gray-500 mb-4">Be the first to start a group buy!</p>
              <Link href="/vendor/group-buys/create" className="btn btn-primary">
                Start a Group Buy
              </Link>
            </div>
          )}
        </div>
        
        {/* How Group Buys Work */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">How Group Buys Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Start or Join a Group Buy",
                description: "Choose a product you want to buy in bulk or join an existing group buy.",
                icon: "🏁"
              },
              {
                title: "Reach the Target Quantity",
                description: "When enough vendors join and the target quantity is reached, the group buy is confirmed.",
                icon: "🎯"
              },
              {
                title: "Save with Bulk Pricing",
                description: "Everyone in the group gets the special discounted price when the order is placed.",
                icon: "💰"
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4">
                <div className="flex items-center justify-center w-16 h-16 mb-4 text-3xl bg-gray-100 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}