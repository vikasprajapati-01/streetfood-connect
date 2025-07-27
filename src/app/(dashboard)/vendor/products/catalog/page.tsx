import { VendorDashboardLayout } from '@/components/vendor/layout'

export default function ProductCatalog() {
  return (
    <VendorDashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="mt-2 text-gray-600">
            Browse and manage your product catalog here.
          </p>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
