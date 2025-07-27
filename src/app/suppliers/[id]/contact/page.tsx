import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

export default function SupplierContact({ params }: { params: { id: string } }) {
  // Mock data for the supplier - in real app, this would be fetched based on params.id
  const supplier = {
    id: params.id,
    name: "Mumbai Fresh Vegetables",
    category: "Vegetables & Fruits",
    location: "Andheri, Mumbai",
    fullAddress: "Shop No. 15, Andheri Vegetable Market, Andheri West, Mumbai - 400058",
    image: "🥬",
    verified: true,
    contact: {
      phone: "+91 98765 43210",
      email: "orders@mumbaifreeveg.com",
      whatsapp: "+91 98765 43210"
    },
    businessHours: {
      weekdays: "6:00 AM - 8:00 PM",
      saturday: "6:00 AM - 6:00 PM",
      sunday: "7:00 AM - 4:00 PM"
    },
    responseTime: "Usually responds within 2 hours"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-40 pb-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/suppliers" className="text-gray-500 hover:text-gray-700">
              Suppliers
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/suppliers/${params.id}`} className="text-gray-500 hover:text-gray-700">
              {supplier.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Contact</span>
          </div>

          {/* Back Button */}
          <Link 
            href={`/suppliers/${params.id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Supplier Profile
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact {supplier.name}</h1>
                  <p className="text-gray-600">
                    Get in touch with this supplier for quotes, product inquiries, or business discussions.
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What would you like to discuss?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Request a Quote",
                        "Product Inquiry", 
                        "Bulk Order Pricing",
                        "Delivery Information",
                        "Partnership Opportunity",
                        "Other"
                      ].map((option) => (
                        <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="inquiry_type" value={option} className="mr-3" />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Your business/stall name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Area, City"
                    />
                  </div>

                  {/* Product Interest */}
                  <div>
                    <label htmlFor="products" className="block text-sm font-medium text-gray-700 mb-2">
                      Products of Interest
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Onions", "Tomatoes", "Potatoes", "Green Chilies", 
                        "Coriander", "Lemons", "Garlic", "Ginger"
                      ].map((product) => (
                        <label key={product} className="flex items-center">
                          <input type="checkbox" name="products[]" value={product} className="mr-2" />
                          <span className="text-sm">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Monthly Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">Select quantity range</option>
                        <option value="under-100kg">Under 100 kg</option>
                        <option value="100-500kg">100 - 500 kg</option>
                        <option value="500-1000kg">500 - 1000 kg</option>
                        <option value="1000-2000kg">1000 - 2000 kg</option>
                        <option value="over-2000kg">Over 2000 kg</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under ₹5,000</option>
                        <option value="5k-15k">₹5,000 - ₹15,000</option>
                        <option value="15k-30k">₹15,000 - ₹30,000</option>
                        <option value="30k-50k">₹30,000 - ₹50,000</option>
                        <option value="over-50k">Over ₹50,000</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Please provide details about your requirements, preferred delivery schedule, payment terms, or any specific questions you have..."
                    ></textarea>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="contact_method" value="email" className="mr-2" />
                        <span className="text-sm">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="contact_method" value="phone" className="mr-2" />
                        <span className="text-sm">Phone Call</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="contact_method" value="whatsapp" className="mr-2" />
                        <span className="text-sm">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button type="submit" className="w-full btn btn-primary py-4 text-lg font-medium">
                      Send Message to Supplier
                    </button>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      By sending this message, you agree to share your contact information with the supplier.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Supplier Info Sidebar */}
            <div className="space-y-6">
              {/* Supplier Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                    {supplier.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {supplier.name}
                      {supplier.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{supplier.category}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {supplier.responseTime}
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4">Quick Contact</h4>
                <div className="space-y-3">
                  <a
                    href={`tel:${supplier.contact.phone}`}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-sm">Call Now</div>
                      <div className="text-xs text-gray-500">{supplier.contact.phone}</div>
                    </div>
                  </a>
                  
                  <a
                    href={`https://wa.me/${supplier.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-sm">WhatsApp</div>
                      <div className="text-xs text-gray-500">Quick chat</div>
                    </div>
                  </a>
                  
                  <a
                    href={`mailto:${supplier.contact.email}`}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <div className="text-xs text-gray-500">Direct email</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">{supplier.businessHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium">{supplier.businessHours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium">{supplier.businessHours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-medium text-blue-900 mb-3">💡 Contact Tips</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Be specific about your requirements</li>
                  <li>• Mention your expected quantities</li>
                  <li>• Ask about bulk pricing discounts</li>
                  <li>• Inquire about delivery schedules</li>
                  <li>• Discuss payment terms upfront</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
