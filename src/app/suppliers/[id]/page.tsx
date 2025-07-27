import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
  CheckBadgeIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function SupplierProfile({ params }: { params: { id: string } }) {
  // Mock data for the supplier - in real app, this would be fetched based on params.id
  const supplier = {
    id: params.id,
    name: "Mumbai Fresh Vegetables",
    category: "Vegetables & Fruits",
    location: "Andheri, Mumbai",
    fullAddress: "Shop No. 15, Andheri Vegetable Market, Andheri West, Mumbai - 400058",
    rating: 4.8,
    reviewCount: 156,
    image: "🥬",
    verified: true,
    establishedYear: 2018,
    deliveryTime: "2-4 hours",
    minOrder: "₹500",
    maxOrder: "₹50,000",
    description: "Premium quality fresh vegetables and fruits sourced directly from farms. We specialize in organic produce and have been serving the Mumbai street food community for over 5 years. Our commitment to quality and freshness has made us one of the most trusted suppliers in the region.",
    badges: ["Organic Certified", "Same Day Delivery", "Bulk Orders", "Farm Fresh", "Quality Guaranteed"],
    contact: {
      phone: "+91 98765 43210",
      email: "orders@mumbaifreeveg.com",
      website: "www.mumbaifreeveg.com",
      whatsapp: "+91 98765 43210"
    },
    businessHours: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM", 
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 8:00 PM",
      saturday: "6:00 AM - 6:00 PM",
      sunday: "7:00 AM - 4:00 PM"
    },
    deliveryAreas: ["Andheri", "Bandra", "Juhu", "Versova", "Goregaon", "Malad", "Borivali"],
    paymentMethods: ["UPI", "Bank Transfer", "Cash on Delivery", "Credit Card"],
    certifications: ["FSSAI License", "Organic Certification", "ISO 9001:2015"],
    products: [
      {
        id: 1,
        name: "Fresh Onions",
        category: "Vegetables",
        price: "₹25/kg",
        bulkPrice: "₹22/kg (50kg+)",
        image: "🧅",
        availability: "In Stock",
        description: "Premium quality red onions, freshly sourced from Maharashtra farms."
      },
      {
        id: 2,
        name: "Tomatoes",
        category: "Vegetables", 
        price: "₹35/kg",
        bulkPrice: "₹30/kg (25kg+)",
        image: "🍅",
        availability: "In Stock",
        description: "Fresh, ripe tomatoes perfect for cooking and garnishing."
      },
      {
        id: 3,
        name: "Green Chilies",
        category: "Vegetables",
        price: "₹80/kg",
        bulkPrice: "₹70/kg (10kg+)",
        image: "🌶️",
        availability: "In Stock", 
        description: "Fresh green chilies with the perfect spice level."
      },
      {
        id: 4,
        name: "Coriander Leaves",
        category: "Herbs",
        price: "₹40/bundle",
        bulkPrice: "₹35/bundle (20+)",
        image: "🌿",
        availability: "In Stock",
        description: "Fresh coriander leaves, harvested daily for maximum freshness."
      },
      {
        id: 5,
        name: "Potatoes",
        category: "Vegetables",
        price: "₹28/kg", 
        bulkPrice: "₹25/kg (50kg+)",
        image: "🥔",
        availability: "In Stock",
        description: "High-quality potatoes, perfect for frying and cooking."
      },
      {
        id: 6,
        name: "Lemons",
        category: "Fruits",
        price: "₹60/kg",
        bulkPrice: "₹50/kg (10kg+)", 
        image: "🍋",
        availability: "Limited Stock",
        description: "Fresh, juicy lemons with high vitamin C content."
      }
    ],
    reviews: [
      {
        id: 1,
        customerName: "Raj Patel",
        customerType: "Pav Bhaji Vendor",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent quality vegetables! Always fresh and delivered on time. The onions and tomatoes are of premium quality. Highly recommended!",
        helpful: 12
      },
      {
        id: 2,
        customerName: "Priya Singh", 
        customerType: "Chaat Vendor",
        rating: 5,
        date: "1 week ago",
        comment: "Been ordering from them for 6 months now. Consistent quality and great prices for bulk orders. The green chilies are always fresh and spicy.",
        helpful: 8
      },
      {
        id: 3,
        customerName: "Arun Kumar",
        customerType: "Tiffin Service",
        rating: 4,
        date: "2 weeks ago", 
        comment: "Good quality products and reliable delivery. Sometimes the delivery is a bit delayed during monsoon season, but overall satisfied with the service.",
        helpful: 5
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-40">
        {/* Supplier Header */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Supplier Info */}
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
                    {supplier.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{supplier.name}</h1>
                      {supplier.verified && (
                        <CheckBadgeIcon className="h-8 w-8 text-blue-500" />
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-3">{supplier.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-lg">{supplier.rating}</span>
                        <span className="text-gray-500 ml-1">({supplier.reviewCount} reviews)</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">Since {supplier.establishedYear}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{supplier.fullAddress}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {supplier.badges.map((badge, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{supplier.description}</p>
              </div>

              {/* Quick Actions Card */}
              <div className="lg:w-80">
                <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-medium">{supplier.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Order:</span>
                      <span className="font-medium">{supplier.minOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Order:</span>
                      <span className="font-medium">{supplier.maxOrder}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/suppliers/${supplier.id}/contact`} className="w-full btn btn-primary flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                      Contact Supplier
                    </Link>
                    <button className="w-full btn btn-outline flex items-center justify-center">
                      <ShoppingBagIcon className="h-5 w-5 mr-2" />
                      Request Quote
                    </button>
                    <div className="flex gap-2">
                      <button className="flex-1 btn btn-outline flex items-center justify-center">
                        <HeartIcon className="h-5 w-5 mr-1" />
                        Save
                      </button>
                      <button className="flex-1 btn btn-outline flex items-center justify-center">
                        <ShareIcon className="h-5 w-5 mr-1" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="container">
            <nav className="flex space-x-8">
              {[
                { name: 'Products', href: '#products', active: true },
                { name: 'Reviews', href: '#reviews' },
                { name: 'Business Info', href: '#business-info' },
                { name: 'Contact', href: '#contact' }
              ].map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    tab.active
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Available Products</h2>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                  <option>All Categories</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Herbs</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                  <option>Sort by Price</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplier.products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                        {product.image}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          product.availability === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Regular Price:</span>
                      <span className="font-semibold">{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bulk Price:</span>
                      <span className="font-semibold text-green-600">{product.bulkPrice}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn btn-primary text-sm py-2">
                      Add to Quote
                    </button>
                    <button className="btn btn-outline text-sm py-2 px-3">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-12 bg-white">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <button className="btn btn-outline">Write a Review</button>
            </div>

            <div className="space-y-6">
              {supplier.reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                        <span className="font-medium text-gray-600">{review.customerName.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                        <p className="text-sm text-gray-500">{review.customerType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      👍 Helpful ({review.helpful})
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Info Section */}
        <section id="business-info" className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Business Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Business Hours */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {Object.entries(supplier.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize text-gray-600">{day}:</span>
                      <span className="font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Areas */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Delivery Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.deliveryAreas.map((area, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.paymentMethods.map((method, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Certifications</h3>
                <div className="space-y-2">
                  {supplier.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <PhoneIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                <h4 className="font-medium mb-2">Phone</h4>
                <p className="text-gray-600">{supplier.contact.phone}</p>
                <button className="btn btn-outline btn-sm mt-3">Call Now</button>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <EnvelopeIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-gray-600 text-sm">{supplier.contact.email}</p>
                <Link href={`/suppliers/${supplier.id}/contact`} className="btn btn-outline btn-sm mt-3">
                  Send Message
                </Link>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                <h4 className="font-medium mb-2">WhatsApp</h4>
                <p className="text-gray-600">{supplier.contact.whatsapp}</p>
                <button className="btn btn-outline btn-sm mt-3">Chat Now</button>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <GlobeAltIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                <h4 className="font-medium mb-2">Website</h4>
                <p className="text-gray-600 text-sm">{supplier.contact.website}</p>
                <button className="btn btn-outline btn-sm mt-3">Visit Site</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
