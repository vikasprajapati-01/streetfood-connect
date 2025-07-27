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

const vendorSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  businessName: z.string().min(3, 'Business name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  foodType: z.string().min(3, 'Food type is required'),
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

type VendorFormValues = z.infer<typeof vendorSchema>

const foodTypes = [
  'Chaat & Snacks',
  'South Indian',
  'North Indian',
  'Chinese',
  'Fast Food',
  'Sweets & Desserts',
  'Beverages',
  'Rolls & Wraps',
  'Other'
]

export default function RegisterVendor() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      terms: false,
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
      }
    }
  })
  
  const onSubmit = async (data: VendorFormValues) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      
      // Save vendor profile to Firestore
      await setDoc(doc(db, 'vendors', user.uid), {
        id: user.uid,
        name: data.fullName,
        email: data.email,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        foodType: data.foodType.split(',').map(item => item.trim()),
        address: data.address,
        role: 'vendor',
        createdAt: new Date().toISOString()
      })
      
      // Redirect to vendor dashboard
      router.push('/vendor/dashboard')
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
            <h1 className="text-3xl font-bold">Join as a Food Vendor</h1>
            <p className="text-gray-600 mt-2">Create your account and start finding trusted suppliers</p>
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
                    placeholder="Your stall or business name"
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
                
                <div>
                  <label htmlFor="foodType" className="label">Food Type</label>
                  <select
                    id="foodType"
                    className={`input ${errors.foodType ? 'border-red-500' : ''}`}
                    {...register('foodType')}
                  >
                    <option value="" disabled>Select food type</option>
                    {foodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.foodType && (
                    <p className="mt-1 text-sm text-red-600">{errors.foodType.message}</p>
                  )}
                </div>
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
                  {isLoading ? 'Creating account...' : 'Create Vendor Account'}
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