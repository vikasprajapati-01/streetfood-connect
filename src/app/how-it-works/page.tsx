import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  TruckIcon,
  StarIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How StreetConnect Works
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              A simple, efficient way for street food vendors to source quality ingredients and for suppliers to reach new customers.
            </p>
          </div>
        </section>

        {/* For Vendors Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                For Street Food Vendors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how easy it is to source quality ingredients, save money through group buying, and manage your supply chain efficiently.
              </p>
            </div>

            <div className="space-y-16">
              {[
                {
                  step: "01",
                  icon: MagnifyingGlassIcon,
                  title: "Discover Suppliers",
                  description: "Browse through our verified network of suppliers in your area. Filter by product type, price range, delivery options, and ratings to find exactly what you need.",
                  features: ["Verified supplier profiles", "Real-time pricing", "Location-based search", "Product catalogs", "Supplier ratings & reviews"]
                },
                {
                  step: "02",
                  icon: ClipboardDocumentListIcon,
                  title: "Compare & Order",
                  description: "Compare prices across multiple suppliers, read reviews from other vendors, and place orders directly through our secure platform with just a few clicks.",
                  features: ["Price comparison tools", "Bulk pricing options", "Order history tracking", "Favorite suppliers", "Quick reorder options"]
                },
                {
                  step: "03",
                  icon: UserGroupIcon,
                  title: "Join Group Buys",
                  description: "Team up with other vendors in your area to place bulk orders and unlock better pricing. Create or join existing group buying opportunities.",
                  features: ["Group order creation", "Automatic savings calculation", "Vendor network expansion", "Shared delivery costs", "Community building"]
                },
                {
                  step: "04",
                  icon: TruckIcon,
                  title: "Track & Receive",
                  description: "Monitor your order progress with real-time tracking, coordinate deliveries, and receive quality ingredients right to your location.",
                  features: ["Real-time tracking", "Delivery scheduling", "Quality assurance", "Proof of delivery", "Issue resolution support"]
                }
              ].map((step, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-black" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-8 h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <step.icon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/register/vendor" className="btn btn-primary px-8 py-3 text-lg">
                Start as a Vendor
              </Link>
            </div>
          </div>
        </section>

        {/* For Suppliers Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                For Suppliers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Expand your customer base, manage orders efficiently, and grow your business by connecting with street food vendors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "Get Verified",
                  description: "Complete our verification process to build trust with vendors. Showcase your business credentials and quality standards.",
                  color: "bg-blue-500"
                },
                {
                  icon: ClipboardDocumentListIcon,
                  title: "List Products",
                  description: "Upload your product catalog with prices, descriptions, and availability. Set bulk pricing and delivery options.",
                  color: "bg-green-500"
                },
                {
                  icon: ChartBarIcon,
                  title: "Manage Orders",
                  description: "Receive orders through our platform, manage inventory, process payments, and coordinate deliveries efficiently.",
                  color: "bg-purple-500"
                },
                {
                  icon: StarIcon,
                  title: "Build Reputation",
                  description: "Deliver quality products and service to earn positive reviews and grow your vendor network organically.",
                  color: "bg-yellow-500"
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/register/supplier" className="btn btn-primary px-8 py-3 text-lg">
                Become a Supplier
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose StreetConnect?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers unique advantages that help both vendors and suppliers succeed in the street food ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "💰",
                  title: "Save Money",
                  description: "Group buying power and competitive pricing help vendors reduce ingredient costs by up to 15%."
                },
                {
                  icon: "⏰",
                  title: "Save Time",
                  description: "Streamlined ordering process and reliable delivery schedules help you focus on your business."
                },
                {
                  icon: "🔒",
                  title: "Secure Transactions",
                  description: "End-to-end encrypted payments and escrow protection ensure safe and secure transactions."
                },
                {
                  icon: "📱",
                  title: "Mobile Friendly",
                  description: "Access our platform from any device, place orders on the go, and manage your business efficiently."
                },
                {
                  icon: "🤝",
                  title: "Community Support",
                  description: "Join a network of like-minded entrepreneurs and get support from our community and team."
                },
                {
                  icon: "📊",
                  title: "Business Insights",
                  description: "Track your spending, analyze trends, and make data-driven decisions to grow your business."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Getting Started is Easy
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of vendors and suppliers who are already transforming their businesses with StreetConnect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
                <p className="text-gray-600">Create your account in under 2 minutes with basic business information.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Verified</h3>
                <p className="text-gray-600">Complete verification to access all features and build trust in the community.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Trading</h3>
                <p className="text-gray-600">Begin sourcing ingredients or listing products and grow your business.</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register/vendor" className="btn btn-primary px-8 py-3">
                  Join as Vendor
                </Link>
                <Link href="/register/supplier" className="btn btn-outline px-8 py-3">
                  Join as Supplier
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No setup fees • Cancel anytime • 24/7 support
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  question: "How does group buying work?",
                  answer: "Vendors can create or join group orders to purchase ingredients in bulk. When multiple vendors order the same items, everyone gets better pricing. The platform automatically calculates savings and coordinates delivery."
                },
                {
                  question: "Are all suppliers verified?",
                  answer: "Yes, all suppliers go through a comprehensive verification process including business license checks, quality certifications, and reference validation before they can list products on our platform."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept UPI, bank transfers, credit/debit cards, and popular digital wallets. All transactions are secured with bank-level encryption and escrow protection."
                },
                {
                  question: "How do delivery and logistics work?",
                  answer: "Suppliers can offer their own delivery or use our logistics partners. Delivery costs are shared in group orders. You can track your orders in real-time and schedule deliveries according to your needs."
                },
                {
                  question: "Is there a minimum order requirement?",
                  answer: "Minimum orders vary by supplier and product. Group buying helps you meet minimum requirements while getting better prices. Individual order minimums are clearly displayed on product listings."
                },
                {
                  question: "What if I receive damaged or incorrect items?",
                  answer: "We have a comprehensive quality assurance process and easy return/refund policy. Report any issues within 24 hours and our team will work with the supplier to resolve it quickly."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="/contact" className="btn btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
