'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const supplierSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  businessName: z.string().min(3, 'Business name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  description: z.string().min(20, 'Please provide a description of at least 20 characters'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  address: z.object({
    street: z.string().min(3, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
  }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SupplierFormValues = z.infer<typeof supplierSchema>

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

export default function RegisterSupplier() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      categories: [],
      terms: false,
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
      }
    }
  })
  
  const watchedCategories = watch('categories')
  
  const toggleCategory = (category: string) => {
    const currentCategories = watchedCategories || []
    const newCategories = currentCategories.includes(category) 
      ? currentCategories.filter(c => c !== category) 
      : [...currentCategories, category]
    
    setValue('categories', newCategories)
  }
  
  const onSubmit = async (data: SupplierFormValues) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      
      // Save supplier profile to Firestore
      await setDoc(doc(db, 'suppliers', user.uid), {
        id: user.uid,
        name: data.fullName,
        email: data.email,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        description: data.description,
        categories: data.categories,
        address: data.address,
        role: 'supplier',
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString()
      })
      
      // Redirect to supplier dashboard
      router.push('/supplier/dashboard')
    } catch (error: any) {
      setError('Failed to create account: ' + error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Join as a Supplier</h1>
            <p className="text-gray-600 mt-2">Create your account and start selling to food vendors</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="label">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    className={`input ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Your full name"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="businessName" className="label">Business Name</label>
                  <input
                    id="businessName"
                    type="text"
                    className={`input ${errors.businessName ? 'border-red-500' : ''}`}
                    placeholder="Your business name"
                    {...register('businessName')}
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="label">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={`input ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    placeholder="Your phone number"
                    {...register('phoneNumber')}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className={`input ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="label">Business Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className={`input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your business, products, and services..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
              
              <div>
                <label className="label">Product Categories</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        className="h-4 w-4 text-black border-gray-300 rounded"
                        checked={(watchedCategories || []).includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.categories && (
                  <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Business Address</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className="label">Street Address</label>
                    <input
                      id="street"
                      type="text"
                      className={`input ${errors.address?.street ? 'border-red-500' : ''}`}
                      placeholder="Street address"
                      {...register('address.street')}
                    />
                    {errors.address?.street && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="label">City</label>
                    <input
                      id="city"
                      type="text"
                      className={`input ${errors.address?.city ? 'border-red-500' : ''}`}
                      placeholder="City"
                      {...register('address.city')}
                    />
                    {errors.address?.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="label">State</label>
                    <input
                      id="state"
                      type="text"
                      className={`input ${errors.address?.state ? 'border-red-500' : ''}`}
                      placeholder="State"
                      {...register('address.state')}
                    />
                    {errors.address?.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="label">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      className={`input ${errors.address?.postalCode ? 'border-red-500' : ''}`}
                      placeholder="Postal code"
                      {...register('address.postalCode')}
                    />
                    {errors.address?.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.postalCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-black border-gray-300 rounded"
                  {...register('terms')}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-black font-medium hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-black font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Supplier Account'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-black font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}