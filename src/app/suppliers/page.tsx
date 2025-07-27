import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CheckBadgeIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function Suppliers() {
  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "Mumbai Fresh Vegetables",
      category: "Vegetables & Fruits",
      location: "Andheri, Mumbai",
      rating: 4.8,
      reviewCount: 156,
      image: "🥬",
      verified: true,
      deliveryTime: "2-4 hours",
      minOrder: "₹500",
      description: "Premium quality fresh vegetables and fruits sourced directly from farms. Specializing in organic produce.",
      products: ["Onions", "Tomatoes", "Potatoes", "Leafy Greens", "Seasonal Fruits"],
      badges: ["Organic Certified", "Same Day Delivery", "Bulk Orders"]
    },
    {
      id: 2,
      name: "Spice Master Trading",
      category: "Spices & Condiments",
      location: "Chandni Chowk, Delhi",
      rating: 4.9,
      reviewCount: 243,
      image: "🌶️",
      verified: true,
      deliveryTime: "1-2 days",
      minOrder: "₹800",
      description: "Authentic Indian spices and condiments. Third-generation spice merchants with premium quality guarantee.",
      products: ["Whole Spices", "Ground Spices", "Masala Blends", "Dried Herbs", "Essential Oils"],
      badges: ["Premium Quality", "Traditional Grinding", "Export Quality"]
    },
    {
      id: 3,
      name: "Golden Grain Suppliers",
      category: "Grains & Pulses",
      location: "Rajouri Garden, Delhi",
      rating: 4.7,
      reviewCount: 189,
      image: "🌾",
      verified: true,
      deliveryTime: "4-6 hours",
      minOrder: "₹1000",
      description: "Complete range of grains, pulses, and cereals. Quality tested products at wholesale prices.",
      products: ["Rice Varieties", "Wheat Flour", "Pulses", "Millets", "Quinoa"],
      badges: ["Quality Tested", "Wholesale Prices", "Bulk Available"]
    },
    {
      id: 4,
      name: "Dairy Fresh Mumbai",
      category: "Dairy & Beverages",
      location: "Borivali, Mumbai",
      rating: 4.6,
      reviewCount: 127,
      image: "🥛",
      verified: true,
      deliveryTime: "1-3 hours",
      minOrder: "₹300",
      description: "Fresh dairy products and beverages. Direct from dairy farms with temperature-controlled delivery.",
      products: ["Fresh Milk", "Paneer", "Yogurt", "Butter", "Cream"],
      badges: ["Farm Fresh", "Cold Chain", "Daily Delivery"]
    },
    {
      id: 5,
      name: "Ocean Catch Seafood",
      category: "Meat & Seafood",
      location: "Worli, Mumbai",
      rating: 4.8,
      reviewCount: 201,
      image: "🐟",
      verified: true,
      deliveryTime: "2-4 hours",
      minOrder: "₹600",
      description: "Fresh seafood and meat products. Sourced daily from local fishermen and trusted meat suppliers.",
      products: ["Fresh Fish", "Prawns", "Crab", "Chicken", "Mutton"],
      badges: ["Fresh Daily", "Hygiene Certified", "Custom Cuts"]
    },
    {
      id: 6,
      name: "Kitchen Essentials Co.",
      category: "Kitchen Supplies",
      location: "Karol Bagh, Delhi",
      rating: 4.5,
      reviewCount: 98,
      image: "🍽️",
      verified: true,
      deliveryTime: "1-2 days",
      minOrder: "₹1200",
      description: "Complete kitchen equipment and disposables for food businesses. Quality products at competitive prices.",
      products: ["Cooking Utensils", "Storage Containers", "Disposable Items", "Gas Equipment", "Cleaning Supplies"],
      badges: ["Commercial Grade", "Warranty Available", "Bulk Discounts"]
    }
  ]

  const categories = [
    "All Categories",
    "Vegetables & Fruits",
    "Spices & Condiments", 
    "Grains & Pulses",
    "Dairy & Beverages",
    "Meat & Seafood",
    "Kitchen Supplies",
    "Oils & Cooking Medium",
    "Snacks & Beverages"
  ]

  const locations = [
    "All Locations",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-40">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover Trusted Suppliers
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Browse through our network of verified suppliers and find the best quality ingredients for your street food business.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search suppliers, products, or locations..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-black mb-2">500+</div>
                <div className="text-gray-600">Verified Suppliers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">50+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">10K+</div>
                <div className="text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">4.8⭐</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Location Filter */}
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                {/* Rating Filter */}
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>All Ratings</option>
                  <option>4.5+ Stars</option>
                  <option>4.0+ Stars</option>
                  <option>3.5+ Stars</option>
                </select>

                {/* Delivery Time Filter */}
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>Any Delivery Time</option>
                  <option>Same Day</option>
                  <option>Within 4 Hours</option>
                  <option>Within 24 Hours</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Suppliers Grid */}
        <section className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Suppliers</h2>
                <p className="text-gray-600">{suppliers.length} suppliers found</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                <option>Sort by: Relevance</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Distance</option>
                <option>Sort by: Reviews</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Supplier Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                          {supplier.image}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            {supplier.name}
                            {supplier.verified && (
                              <CheckBadgeIcon className="h-5 w-5 text-blue-500 ml-2" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{supplier.category}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rating and Location */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{supplier.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({supplier.reviewCount})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {supplier.location}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{supplier.description}</p>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Delivery: {supplier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center">
                        <ShoppingBagIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Min Order: {supplier.minOrder}</span>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Popular Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {supplier.products.slice(0, 4).map((product, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {product}
                        </span>
                      ))}
                      {supplier.products.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{supplier.products.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badges and Action */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {supplier.badges.map((badge, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link 
                        href={`/suppliers/${supplier.id}`} 
                        className="flex-1 btn btn-primary text-center py-2"
                      >
                        View Supplier
                      </Link>
                      <button className="btn btn-outline px-4 py-2">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn btn-outline px-8 py-3">
                Load More Suppliers
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Join Our Supplier Network?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Reach thousands of street food vendors and grow your business with StreetConnect. 
              Join our verified supplier network today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/supplier" className="btn bg-white text-black hover:bg-gray-200 px-8 py-3">
                Become a Supplier
              </Link>
              <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-black px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
