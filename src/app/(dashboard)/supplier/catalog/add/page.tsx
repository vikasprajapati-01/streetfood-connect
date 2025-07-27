'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function AddProduct() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  
  const categories = [
    'Vegetables & Fruits',
    'Spices & Condiments', 
    'Dairy Products',
    'Grains & Pulses',
    'Meat & Seafood',
    'Cooking Oils',
    'Packaging Materials',
    'Ready-made Mixes',
    'Beverages',
    'Other'
  ]

  const units = [
    'per kg',
    'per gram',
    'per piece',
    'per bundle',
    'per liter',
    'per packet',
    'per box',
    'per dozen'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect back to catalog
    router.push('/supplier/catalog')
  }

  const addImage = () => {
    // In a real app, this would open file picker
    const mockImage = `https://via.placeholder.com/300x300?text=Product${images.length + 1}`
    setImages([...images, mockImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <SupplierDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="mt-2 text-gray-600">Add a new product to your catalog</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => router.back()}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Product Name *</label>
                    <input
                      id="name"
                      type="text"
                      className="input"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">Description *</label>
                    <textarea
                      id="description"
                      rows={4}
                      className="input"
                      placeholder="Describe your product, its quality, and key features..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="label">Category *</label>
                      <select id="category" className="input" required>
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="subcategory" className="label">Subcategory</label>
                      <input
                        id="subcategory"
                        type="text"
                        className="input"
                        placeholder="Optional subcategory"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="label">Price *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          id="price"
                          type="number"
                          className="input pl-8"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="unit" className="label">Unit *</label>
                      <select id="unit" className="input" required>
                        <option value="">Select unit</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stock" className="label">Current Stock *</label>
                      <input
                        id="stock"
                        type="number"
                        className="input"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="minOrder" className="label">Minimum Order Quantity</label>
                      <input
                        id="minOrder"
                        type="number"
                        className="input"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bulkPrice" className="label">Bulk Price (50+ units)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          id="bulkPrice"
                          type="number"
                          className="input pl-8"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="discount" className="label">Volume Discount %</label>
                      <input
                        id="discount"
                        type="number"
                        className="input"
                        placeholder="0"
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Additional Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="origin" className="label">Origin/Source</label>
                      <input
                        id="origin"
                        type="text"
                        className="input"
                        placeholder="e.g., Maharashtra, Local Farm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="shelfLife" className="label">Shelf Life</label>
                      <input
                        id="shelfLife"
                        type="text"
                        className="input"
                        placeholder="e.g., 7 days, 6 months"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="storage" className="label">Storage Requirements</label>
                      <input
                        id="storage"
                        type="text"
                        className="input"
                        placeholder="e.g., Refrigerated, Dry place"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="certifications" className="label">Certifications</label>
                      <input
                        id="certifications"
                        type="text"
                        className="input"
                        placeholder="e.g., Organic, FSSAI"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Product Images */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                <div className="space-y-4">
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            width={100}
                            height={96}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={addImage}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Add Image</p>
                  </button>
                  
                  <p className="text-xs text-gray-500">
                    Add up to 5 images. First image will be the main product image.
                  </p>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Delivery Options</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="ml-2 text-sm">Same day delivery</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="ml-2 text-sm">Next day delivery</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="ml-2 text-sm">Bulk delivery available</span>
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryTime" className="label">Preparation Time</label>
                    <select id="deliveryTime" className="input">
                      <option>Ready to ship</option>
                      <option>1-2 hours</option>
                      <option>Same day</option>
                      <option>1-2 days</option>
                      <option>3-5 days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Publish Options */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Publish Options</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="status" className="label">Status</label>
                    <select id="status" className="input">
                      <option value="draft">Save as Draft</option>
                      <option value="active">Publish Immediately</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="featured" 
                      type="checkbox" 
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm">
                      Mark as featured product
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="groupBuy" 
                      type="checkbox" 
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="groupBuy" className="ml-2 text-sm">
                      Available for group buying
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Publishing...' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </SupplierDashboardLayout>
  )
}
