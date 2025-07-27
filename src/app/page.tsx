import Link from 'next/link'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen text-white bg-gradient-to-r from-gray-800 to-black">
        <div className="container relative z-10 text-center px-4">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Connecting Street Food Vendors with Trusted Suppliers
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Source quality raw materials at affordable prices and grow your food business
          </p>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-center">
            <Link href="/register/vendor" className="btn bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-md transition-all">
              Join as a Vendor
            </Link>
            <Link href="/register/supplier" className="btn bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-md transition-all">
              Join as a Supplier
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="mb-12 text-4xl font-bold text-center">How StreetConnect Works</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                title: "Find Suppliers",
                description: "Search and discover verified suppliers in your area who offer quality raw materials at competitive prices.",
                icon: "🔍"
              },
              {
                title: "Compare & Order",
                description: "Compare prices, read reviews, and place orders directly through our secure platform.",
                icon: "📋"
              },
              {
                title: "Save with Group Buys",
                description: "Join forces with other vendors to place bulk orders and get even better prices.",
                icon: "👥"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-6 text-4xl bg-gray-100 rounded-full">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-full mb-10 md:w-1/2 md:pr-10 md:mb-0">
              <h2 className="mb-6 text-4xl font-bold">Why Choose StreetConnect?</h2>
              <ul className="space-y-4">
                {[
                  "Verified suppliers you can trust",
                  "Competitive pricing and transparent quotes",
                  "Convenient ordering system that saves time",
                  "Group buying power for better deals",
                  "Delivery tracking and reliable service"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/register/vendor" className="btn btn-primary">
                  Get Started Today
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-[400px] rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
                <div className="text-gray-600 text-center px-4">
                  <div className="text-5xl mb-4">🍲</div>
                  <p className="text-xl font-medium">Quality Raw Materials for Street Food Vendors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="mb-12 text-4xl font-bold text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rahul Singh",
                role: "Chaat Vendor, Delhi",
                quote: "StreetConnect has completely changed how I source ingredients. I'm saving 15% on costs and the quality is better than what I used to get.",
                emoji: "🌮"
              },
              {
                name: "Priya Sharma",
                role: "Dosa Stall Owner, Bangalore",
                quote: "The group buying feature is a game changer. I've connected with other vendors in my area and we're getting bulk discounts we couldn't before.",
                emoji: "🥘"
              },
              {
                name: "Mohammed Ali",
                role: "Spice Supplier, Mumbai",
                quote: "As a supplier, I've grown my business by 30% since joining. The platform makes it easy to reach new customers and manage orders.",
                emoji: "🌶️"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.emoji}
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 text-white bg-black">
        <div className="container text-center px-4">
          <h2 className="mb-6 text-4xl font-bold">Ready to Transform Your Business?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of street food vendors who are saving time and money while accessing better quality ingredients.
          </p>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:justify-center">
            <Link href="/register/vendor" className="btn px-8 py-3 bg-white text-black hover:bg-gray-200">
              Sign Up as a Vendor
            </Link>
            <Link href="/register/supplier" className="btn px-8 py-3 border border-white text-white hover:bg-white hover:text-black">
              Sign Up as a Supplier
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}