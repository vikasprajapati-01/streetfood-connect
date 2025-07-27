import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">StreetConnect</h3>
            <p className="text-gray-400 mb-4">
              Connecting street food vendors with trusted suppliers for affordable raw materials.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <Link 
                  key={social} 
                  href={`#${social}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'How It Works', href: '/#how-it-works' },
                { name: 'Find Suppliers', href: '/suppliers' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2">
              {[
                { name: 'Sign Up as Vendor', href: '/register/vendor' },
                { name: 'Find Raw Materials', href: '/vendor/products' },
                { name: 'Join Group Buys', href: '/vendor/group-buys' },
                { name: 'Vendor FAQs', href: '/vendor/faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Suppliers</h3>
            <ul className="space-y-2">
              {[
                { name: 'Sign Up as Supplier', href: '/register/supplier' },
                { name: 'List Products', href: '/supplier/products' },
                { name: 'Manage Orders', href: '/supplier/orders' },
                { name: 'Supplier FAQs', href: '/supplier/faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} StreetConnect. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}