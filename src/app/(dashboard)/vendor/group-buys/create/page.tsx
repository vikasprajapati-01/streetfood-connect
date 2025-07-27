'use client'

import { VendorDashboardLayout } from '@/components/vendor/layout'
import Link from 'next/link'
import { useState } from 'react'
import { 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  InformationCircleIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function CreateGroupBuy() {
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    maxParticipants: '',
    minOrderPerVendor: '',
    deadline: '',
    deliveryDate: '',
    deliveryLocation: '',
    paymentDeadline: ''
  })

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: "Mumbai Fresh Vegetables",
      category: "Vegetables & Fruits",
      location: "Andheri, Mumbai",
      image: "🥬",
      verified: true,
      deliveryTime: "2-4 hours",
      minOrder: "₹500",
      rating: 4.8,
      products: [
        { id: 1, name: "Fresh Onions", price: "₹25/kg", bulkPrice: "₹22/kg", unit: "kg" },
        { id: 2, name: "Tomatoes", price: "₹35/kg", bulkPrice: "₹30/kg", unit: "kg" },
        { id: 3, name: "Potatoes", price: "₹28/kg", bulkPrice: "₹25/kg", unit: "kg" },
        { id: 4, name: "Green Chilies", price: "₹80/kg", bulkPrice: "₹70/kg", unit: "kg" },
        { id: 5, name: "Coriander", price: "₹40/bundle", bulkPrice: "₹35/bundle", unit: "bundle" }
      ]
    },
    {
      id: 2,
      name: "Spice Master Trading",
      category: "Spices & Condiments",
      location: "Chandni Chowk, Delhi",
      image: "🌶️",
      verified: true,
      deliveryTime: "1-2 days",
      minOrder: "₹800",
      rating: 4.9,
      products: [
        { id: 6, name: "Red Chili Powder", price: "₹200/kg", bulkPrice: "₹160/kg", unit: "kg" },
        { id: 7, name: "Turmeric Powder", price: "₹200/kg", bulkPrice: "₹160/kg", unit: "kg" },
        { id: 8, name: "Garam Masala", price: "₹600/kg", bulkPrice: "₹480/kg", unit: "kg" },
        { id: 9, name: "Cumin Seeds", price: "₹250/kg", bulkPrice: "₹200/kg", unit: "kg" }
      ]
    }
  ]

  const addItemToGroup = (product: any) => {
    const existingItem = selectedItems.find(item => item.id === product.id)
    if (existingItem) {
      setSelectedItems(selectedItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 1, supplierId: selectedSupplier.id }])
    }
  }

  const removeItemFromGroup = (productId: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== productId))
  }

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromGroup(productId)
    } else {
      setSelectedItems(selectedItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ))
    }
  }

  const calculateTotalValue = () => {
    return selectedItems.reduce((total, item) => {
      const price = parseInt(item.bulkPrice.replace(/[₹/]/g, '').split('/')[0])
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateSavings = () => {
    const regularTotal = selectedItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹/]/g, '').split('/')[0])
      return total + (price * item.quantity)
    }, 0)
    const bulkTotal = calculateTotalValue()
    return ((regularTotal - bulkTotal) / regularTotal * 100).toFixed(1)
  }

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/vendor/group-buys" className="btn btn-outline btn-sm flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Group Buys
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Group Buy</h1>
            <p className="mt-2 text-gray-600">Start a group buying opportunity and save money with other vendors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">1. Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Group Buy Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="e.g., Fresh Vegetables Bulk Order - Andheri Area"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Describe what you're ordering, quality expectations, delivery details..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                      Max Participants *
                    </label>
                    <input
                      type="number"
                      id="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="15"
                      min="2"
                      max="50"
                    />
                  </div>

                  <div>
                    <label htmlFor="minOrderPerVendor" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Order per Vendor *
                    </label>
                    <input
                      type="text"
                      id="minOrderPerVendor"
                      value={formData.minOrderPerVendor}
                      onChange={(e) => setFormData({...formData, minOrderPerVendor: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="₹1,000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Select Supplier */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">2. Select Supplier</h2>
              
              {!selectedSupplier ? (
                <div className="space-y-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {suppliers.map((supplier) => (
                      <div
                        key={supplier.id}
                        onClick={() => setSelectedSupplier(supplier)}
                        className="border border-gray-200 rounded-lg p-4 hover:border-black cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                            {supplier.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                            <p className="text-sm text-gray-600">{supplier.category}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>⭐ {supplier.rating}</span>
                              <span>📍 {supplier.location}</span>
                              <span>🕒 {supplier.deliveryTime}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Min Order</p>
                            <p className="font-medium">{supplier.minOrder}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {selectedSupplier.image}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedSupplier.name}</h3>
                        <p className="text-sm text-gray-600">{selectedSupplier.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSupplier(null)}
                      className="btn btn-outline btn-sm"
                    >
                      Change Supplier
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Select Products */}
            {selectedSupplier && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">3. Select Products</h2>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Available Products:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedSupplier.products.map((product: any) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-500">Regular: {product.price}</span>
                            <span className="text-green-600 font-medium">Bulk: {product.bulkPrice}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => addItemToGroup(product)}
                          className="btn btn-outline btn-sm flex items-center"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Timeline & Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">4. Timeline & Delivery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    id="deadline"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="paymentDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    id="paymentDeadline"
                    value={formData.paymentDeadline}
                    onChange={(e) => setFormData({...formData, paymentDeadline: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Delivery Date *
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    id="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Central delivery point for all participants"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Items</h3>
              
              {selectedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No items selected yet</p>
              ) : (
                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.bulkPrice}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="1"
                        />
                        <button
                          onClick={() => removeItemFromGroup(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Value:</span>
                      <span className="font-semibold">₹{calculateTotalValue().toLocaleString()}</span>
                    </div>
                    {selectedItems.length > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Savings:</span>
                        <span className="font-semibold">{calculateSavings()}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2" />
                Pro Tips
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Set realistic deadlines (3-7 days is optimal)</li>
                <li>• Choose suppliers you've worked with before</li>
                <li>• Include popular items that vendors frequently need</li>
                <li>• Set a reasonable minimum order per vendor</li>
                <li>• Choose a central delivery location</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full btn btn-primary py-3"
                disabled={!selectedSupplier || selectedItems.length === 0}
              >
                Create Group Buy
              </button>
              <button className="w-full btn btn-outline py-3">
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
