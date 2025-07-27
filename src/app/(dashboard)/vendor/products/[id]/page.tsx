'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { VendorDashboardLayout } from '@/components/vendor/layout'
import { Product, Review } from '@/types'

export default function ProductDetails() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productDoc = await getDoc(doc(db, 'products', id))
        
        if (!productDoc.exists()) {
          setError('Product not found')
          return
        }
        
        const productData = { id: productDoc.id, ...productDoc.data() } as Product
        setProduct(productData)
        
        // Set initial quantity to minimum order quantity if available
        if (productData.minimumOrderQuantity) {
          setQuantity(productData.minimumOrderQuantity)
        }
        
        // Fetch related products (same category)
        const relatedQuery = query(
          collection(db, 'products'),
          where('category', '==', productData.category),
          where('id', '!=', id)
        )
        const relatedSnapshot = await getDocs(relatedQuery)
        const relatedData: Product[] = []
        relatedSnapshot.forEach(doc => {
          relatedData.push({ id: doc.id, ...doc.data() } as Product)
        })
        setRelatedProducts(relatedData.slice(0, 3)) // Limit to 3 related products
        
        // Fetch reviews
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('productId', '==', id)
        )
        const reviewsSnapshot = await getDocs(reviewsQuery)
        const reviewsData: Review[] = []
        reviewsSnapshot.forEach(doc => {
          reviewsData.push({ id: doc.id, ...doc.data() } as Review)
        })
        setReviews(reviewsData)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchProduct()
    }
  }, [id])
  
  const handleQuantityChange = (value: number) => {
    if (product && value >= product.minimumOrderQuantity) {
      setQuantity(value)
    }
  }
  
  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      setIsAddingToCart(true)
      
      const currentUser = auth.currentUser
      if (!currentUser) {
        router.push('/login')
        return
      }
      
      // Add to cart collection (could also be handled in local state/storage)
      await addDoc(collection(db, 'cart'), {
        userId: currentUser.uid,
        productId: product.id,
        quantity: quantity,
        price: product.price,
        addedAt: new Date().toISOString()
      })
      
      // Navigate to cart page
      router.push('/vendor/cart')
    } catch (err) {
      console.error('Error adding to cart:', err)
      // Handle error
    } finally {
      setIsAddingToCart(false)
    }
  }
  
  const handleBuyNow = () => {
    if (!product) return
    
    // In a real implementation, you might want to add to cart and then redirect
    // For now, we'll just redirect to checkout
    router.push(`/vendor/checkout?product=${product.id}&quantity=${quantity}`)
  }
  
  if (loading) {
    return (
      <VendorDashboardLayout>
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </VendorDashboardLayout>
    )
  }
  
  if (error || !product) {
    return (
      <VendorDashboardLayout>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Failed to load product'}</p>
          <Link href="/vendor/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </VendorDashboardLayout>
    )
  }
  
  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm font-medium">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/vendor/dashboard" className="text-gray-500 hover:text-black">
                Dashboard
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/vendor/products" className="text-gray-500 hover:text-black">
                Products
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-black truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-[300px] md:h-[500px] bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
              {product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold">₹{product.price}</span>
                <span className="text-gray-500 ml-1">/ {product.unit}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="w-40 text-gray-500">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-gray-500">Minimum Order</span>
                  <span>{product.minimumOrderQuantity} {product.unit}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-gray-500">Availability</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-gray-500">Supplier</span>
                  <Link 
                    href={`/vendor/suppliers/${product.supplierId}`}
                    className="text-black hover:underline font-medium"
                  >
                    {product.supplierName}
                  </Link>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <label htmlFor="quantity" className="font-medium">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      type="button"
                      className="px-3 py-1 text-lg"
                      onClick={() => handleQuantityChange(Math.max(product.minimumOrderQuantity, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="w-16 text-center border-none focus:ring-0"
                      value={quantity}
                      min={product.minimumOrderQuantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.minimumOrderQuantity)}
                    />
                    <button 
                      type="button"
                      className="px-3 py-1 text-lg"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500">
                    ({product.unit})
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="btn btn-primary flex-1 py-3"
                    onClick={handleBuyNow}
                    disabled={isAddingToCart || product.stock <= 0}
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline flex-1 py-3"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || product.stock <= 0}
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{review.vendorName}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No reviews yet for this product.</p>
          )}
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/vendor/products/${relatedProduct.id}`}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative h-40 w-full bg-gray-100">
                    {relatedProduct.image ? (
                      <Image 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{relatedProduct.price}/{relatedProduct.unit}</span>
                      <div className="flex text-yellow-400 text-sm">
                        <span>{relatedProduct.rating.toFixed(1)} ★</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </VendorDashboardLayout>
  )
}