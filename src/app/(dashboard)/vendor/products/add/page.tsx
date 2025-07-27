'use client'

import { VendorDashboardLayout } from '@/components/vendor/layout'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  unit: z.string().min(1, 'Please select a unit'),
  minOrderQuantity: z.number().min(1, 'Minimum order quantity is required'),
  maxOrderQuantity: z.number().optional(),
  inStock: z.boolean(),
  stockQuantity: z.number().min(0, 'Stock quantity cannot be negative'),
  tags: z.array(z.string()).optional(),
  specifications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).optional()
})

type ProductFormValues = z.infer<typeof productSchema>

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
  'kg', 'grams', 'liters', 'pieces', 'packets', 'boxes', 'bundles', 'dozens'
]

export default function AddProduct() {
  const [images, setImages] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [specifications, setSpecifications] = useState<Array<{key: string, value: string}>>([])
  const [newSpec, setNewSpec] = useState({key: '', value: ''})

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true,
      stockQuantity: 0,
      tags: [],
      specifications: []
    }
  })

  const watchedTags = watch('tags') || []
  const watchedInStock = watch('inStock')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload to a storage service
      // For now, we'll create mock URLs
      const newImages = Array.from(files).map((file, index) => 
        URL.createObjectURL(file)
      )
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !watchedTags.includes(currentTag.trim())) {
      const newTags = [...watchedTags, currentTag.trim()]
      setValue('tags', newTags)
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = watchedTags.filter(tag => tag !== tagToRemove)
    setValue('tags', newTags)
  }

  const addSpecification = () => {
    if (newSpec.key.trim() && newSpec.value.trim()) {
      const newSpecs = [...specifications, newSpec]
      setSpecifications(newSpecs)
      setValue('specifications', newSpecs)
      setNewSpec({key: '', value: ''})
    }
  }

  const removeSpecification = (index: number) => {
    const newSpecs = specifications.filter((_, i) => i !== index)
    setSpecifications(newSpecs)
    setValue('specifications', newSpecs)
  }

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Here you would submit to your backend/Firebase
      console.log('Product data:', { ...data, images })
      alert('Product added successfully!')
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    }
  }

  return (
    <VendorDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-2 text-gray-600">Create a new product listing for your inventory</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="label">Product Name</label>
                <input
                  id="name"
                  type="text"
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="e.g., Fresh Red Onions"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="label">Category</label>
                <select
                  id="category"
                  className={`input ${errors.category ? 'border-red-500' : ''}`}
                  {...register('category')}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="unit" className="label">Unit</label>
                <select
                  id="unit"
                  className={`input ${errors.unit ? 'border-red-500' : ''}`}
                  {...register('unit')}
                >
                  <option value="">Select a unit</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="label">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  className={`input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe your product, its quality, origin, etc."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing & Quantity</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="price" className="label">Price per Unit (₹)</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  className={`input ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                  {...register('price', { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="minOrderQuantity" className="label">Min Order Quantity</label>
                <input
                  id="minOrderQuantity"
                  type="number"
                  className={`input ${errors.minOrderQuantity ? 'border-red-500' : ''}`}
                  placeholder="1"
                  {...register('minOrderQuantity', { valueAsNumber: true })}
                />
                {errors.minOrderQuantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.minOrderQuantity.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="maxOrderQuantity" className="label">Max Order Quantity (Optional)</label>
                <input
                  id="maxOrderQuantity"
                  type="number"
                  className="input"
                  placeholder="No limit"
                  {...register('maxOrderQuantity', { valueAsNumber: true })}
                />
              </div>

              <div>
                <label htmlFor="stockQuantity" className="label">Current Stock</label>
                <input
                  id="stockQuantity"
                  type="number"
                  className={`input ${errors.stockQuantity ? 'border-red-500' : ''}`}
                  placeholder="0"
                  {...register('stockQuantity', { valueAsNumber: true })}
                />
                {errors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.stockQuantity.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <input
                  id="inStock"
                  type="checkbox"
                  className="h-4 w-4 text-black border-gray-300 rounded"
                  {...register('inStock')}
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                  Product is currently in stock
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Upload Image</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <InformationCircleIcon className="h-4 w-4 mt-0.5" />
              <p>Upload high-quality images of your product. First image will be used as the primary image.</p>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {watchedTags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="input flex-1"
                placeholder="Add tags (e.g., organic, fresh, premium)"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn btn-outline flex items-center"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
            
            <div className="space-y-3 mb-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 min-w-0 flex-1">{spec.key}:</span>
                  <span className="text-gray-600 min-w-0 flex-1">{spec.value}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpec.key}
                onChange={(e) => setNewSpec(prev => ({...prev, key: e.target.value}))}
                className="input flex-1"
                placeholder="Specification name (e.g., Origin)"
              />
              <input
                type="text"
                value={newSpec.value}
                onChange={(e) => setNewSpec(prev => ({...prev, value: e.target.value}))}
                className="input flex-1"
                placeholder="Specification value (e.g., Maharashtra)"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="btn btn-outline flex items-center"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button type="button" className="btn btn-outline">
              Save as Draft
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </VendorDashboardLayout>
  )
}
