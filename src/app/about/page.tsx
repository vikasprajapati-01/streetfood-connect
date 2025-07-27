import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  CheckCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About StreetConnect
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Empowering street food vendors and suppliers to build stronger, more profitable businesses together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register/vendor" className="btn bg-white text-black hover:bg-gray-200 px-8 py-3">
                  Join as Vendor
                </Link>
                <Link href="/register/supplier" className="btn btn-outline border-white text-white hover:bg-white hover:text-black px-8 py-3">
                  Join as Supplier
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that every street food vendor deserves access to quality ingredients at fair prices. 
                  StreetConnect bridges the gap between small food businesses and trusted suppliers, creating 
                  a thriving ecosystem that benefits everyone.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  By leveraging technology and community collaboration, we're making it easier for vendors 
                  to source ingredients, reduce costs through group buying, and focus on what they do best 
                  – creating delicious food that brings communities together.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">500+</div>
                    <div className="text-sm text-gray-600">Registered Vendors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">100+</div>
                    <div className="text-sm text-gray-600">Verified Suppliers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">₹50L+</div>
                    <div className="text-sm text-gray-600">Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">15%</div>
                    <div className="text-sm text-gray-600">Average Savings</div>
                  </div>
                </div>
              </div>
              <div className="order-first lg:order-last">
                <div className="bg-gray-100 rounded-lg p-8 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤝</div>
                    <h3 className="text-2xl font-bold text-gray-800">Connecting Communities</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and shape how we build relationships with our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "Trust & Transparency",
                  description: "We verify all suppliers and provide transparent pricing with no hidden fees. Trust is the foundation of our marketplace."
                },
                {
                  icon: UserGroupIcon,
                  title: "Community First",
                  description: "We prioritize the needs of small businesses and work to create opportunities for collaboration and growth."
                },
                {
                  icon: ChartBarIcon,
                  title: "Continuous Innovation",
                  description: "We constantly improve our platform based on user feedback and emerging technologies to serve you better."
                },
                {
                  icon: CheckCircleIcon,
                  title: "Quality Assurance",
                  description: "We maintain high standards for both suppliers and products to ensure you receive the best ingredients."
                },
                {
                  icon: TruckIcon,
                  title: "Reliable Service",
                  description: "Dependable delivery, responsive support, and consistent service quality you can count on every day."
                },
                {
                  icon: GlobeAltIcon,
                  title: "Sustainable Growth",
                  description: "We support environmentally conscious practices and help businesses grow sustainably for the future."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
              </div>
              
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="text-lg leading-relaxed mb-6">
                  StreetConnect was born from a simple observation: some of the most delicious and authentic food 
                  comes from street vendors, but these small businesses often struggle with sourcing quality 
                  ingredients at competitive prices.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Our founders, having grown up enjoying street food across India, noticed that vendors were 
                  often paying higher prices for ingredients than larger restaurants, simply because they 
                  couldn't buy in bulk or didn't have direct connections with suppliers.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  We realized that technology could solve this problem by creating a marketplace that connects 
                  vendors with verified suppliers and enables group buying to achieve better pricing. What started 
                  as a solution for a few local vendors has grown into a platform serving hundreds of businesses.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Today, StreetConnect is proud to support the street food community by making quality ingredients 
                  more accessible and helping vendors focus on what they love most – creating amazing food experiences 
                  for their customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate individuals working to revolutionize the street food industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Arjun Patel",
                  role: "Co-Founder & CEO",
                  description: "Former food industry executive with 10+ years experience in supply chain management.",
                  image: "👨‍💼"
                },
                {
                  name: "Priya Mehta",
                  role: "Co-Founder & CTO",
                  description: "Tech entrepreneur passionate about using technology to solve real-world problems.",
                  image: "👩‍💻"
                },
                {
                  name: "Rajesh Kumar",
                  role: "Head of Vendor Relations",
                  description: "20+ years working with street food vendors, understands their challenges intimately.",
                  image: "👨‍🍳"
                },
                {
                  name: "Sunita Singh",
                  role: "Head of Supplier Network",
                  description: "Extensive background in wholesale distribution and supplier relationship management.",
                  image: "👩‍💼"
                },
                {
                  name: "Vikram Sharma",
                  role: "Product Manager",
                  description: "UX designer turned product manager, focused on creating intuitive user experiences.",
                  image: "👨‍🎨"
                },
                {
                  name: "Anita Gupta",
                  role: "Customer Success",
                  description: "Dedicated to ensuring every user has a positive experience on our platform.",
                  image: "👩‍💡"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-black font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a vendor looking for better ingredient sourcing or a supplier wanting to reach more customers, 
              we're here to help you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/vendor" className="btn bg-white text-black hover:bg-gray-200 px-8 py-3">
                Start as Vendor
              </Link>
              <Link href="/register/supplier" className="btn btn-outline border-white text-white hover:bg-white hover:text-black px-8 py-3">
                Become a Supplier
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
