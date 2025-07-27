'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRightOnRectangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Clear any authentication tokens/session data
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    sessionStorage.clear()
    
    // Clear any cookies (if using cookies for auth)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })

    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Successfully Logged Out
          </h2>
          
          <p className="text-gray-600 mb-8">
            Thank you for using StreetConnect. You have been safely logged out of your account.
          </p>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <ArrowRightOnRectangleIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Session Ended</h3>
            <p className="text-sm text-gray-600">
              Your session has been terminated and all data has been cleared from this device.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500 mb-6">
              Redirecting to homepage in <span className="font-medium">3 seconds</span>...
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="btn btn-primary w-full"
              >
                Sign In Again
              </Link>
              
              <Link
                href="/"
                className="btn btn-outline w-full"
              >
                Go to Homepage
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Need help? <Link href="/contact" className="text-black hover:underline">Contact support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
