'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError('')
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      
      // Redirect based on user role (would be stored in user profile)
      // For demo, redirecting to vendor dashboard
      router.push('/vendor/dashboard')
    } catch (error: any) {
      setError('Failed to sign in. Please check your credentials.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-600 mt-2">Log in to your StreetConnect account</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
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
                <label htmlFor="password" className="label">
                  Password
                </label>
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
                <div className="mt-1 text-right">
                  <Link href="/forgot-password" className="text-sm text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <div className="h-5 w-5 mr-2 bg-gray-200 rounded-full"></div>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Phone</span>
                  <div className="h-5 w-5 mr-2 bg-gray-200 rounded-full"></div>
                  Phone
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/register/vendor" className="text-black font-medium hover:underline">
                  Sign up
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