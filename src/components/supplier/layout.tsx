'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  TruckIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface SupplierDashboardLayoutProps {
  children: ReactNode
}

export function SupplierDashboardLayout({ children }: SupplierDashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const navigation = [
    { name: 'Dashboard', href: '/supplier/dashboard', icon: HomeIcon },
    { name: 'Product Catalog', href: '/supplier/catalog', icon: ShoppingBagIcon },
    { name: 'Orders', href: '/supplier/orders', icon: TruckIcon },
    { name: 'Analytics', href: '/supplier/analytics', icon: ChartBarIcon },
    { name: 'Customers', href: '/supplier/customers', icon: UsersIcon },
    { name: 'Settings', href: '/supplier/settings', icon: Cog6ToothIcon },
  ]
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-modal="true"
      >
        <div 
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'ease-out duration-300' : 'ease-in duration-200'}`}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ${sidebarOpen ? 'ease-out duration-300 transform translate-x-0' : 'ease-in duration-200 transform -translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-xl font-bold">Street<span className="text-gray-600">Connect</span></span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname.startsWith(item.href)
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      pathname.startsWith(item.href) ? 'text-black' : 'text-gray-400 group-hover:text-black'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/logout" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-black">Log out</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-xl font-bold">Street<span className="text-gray-600">Connect</span></span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname.startsWith(item.href)
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        pathname.startsWith(item.href) ? 'text-black' : 'text-gray-400 group-hover:text-black'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Link href="/logout" className="flex items-center">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700 hover:text-black">Log out</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}