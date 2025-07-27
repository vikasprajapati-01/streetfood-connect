import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StreetConnect | Connecting Street Food Vendors with Suppliers',
  description: 'A platform for street food vendors to source quality raw materials at affordable prices from trusted suppliers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}