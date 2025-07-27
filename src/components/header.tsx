'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Suppliers', href: '/suppliers' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const userMenuRef = useRef<HTMLDivElement>(null)
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="container flex items-center justify-between py-16" aria-label="Global">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">StreetConnect</span>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-black">Street<span className="text-gray-600">Connect</span></span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                isActive(item.href) 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Desktop auth section */}
        {user ? (
          <div className="hidden lg:flex lg:items-center lg:gap-x-4 xl:gap-x-6">
            <span className="text-sm text-gray-600 hidden xl:block">Welcome back!</span>
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-x-2 rounded-full bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="hidden sm:block max-w-32 truncate">{user.email?.split('@')[0]}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/vendor/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/vendor/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:items-center lg:gap-x-6 xl:gap-x-8">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Log in
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-x-3 xl:gap-x-4">
              <Link
                href="/register/vendor"
                className="btn btn-outline text-sm px-4 xl:px-5 py-2.5"
              >
                Join as Vendor
              </Link>
              <Link
                href="/register/supplier"
                className="btn btn-primary text-sm px-4 xl:px-5 py-2.5"
              >
                Join as Supplier
              </Link>
            </div>
          </div>
        )}
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">StreetConnect</span>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-black">Street<span className="text-gray-600">Connect</span></span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                      isActive(item.href) 
                        ? 'bg-gray-50 text-black' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* Mobile auth section */}
              {user ? (
                <div className="py-6 space-y-3 border-t border-gray-200">
                  <div className="px-4 py-2">
                    <p className="text-base font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-500">Signed in</p>
                  </div>
                  <Link
                    href="/vendor/dashboard"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/vendor/settings"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="-mx-3 block w-full text-left rounded-lg px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="py-6 space-y-3">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <div className="border-t border-gray-200 my-3"></div>
                  <Link
                    href="/register/vendor"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join as Vendor
                  </Link>
                  <Link
                    href="/register/supplier"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join as Supplier
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}