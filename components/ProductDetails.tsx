'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/data/products'
import AddToCartButton from './AddToCartButton'
import { FiStar } from 'react-icons/fi'
import { useToast } from '@/contexts/ToastContext'

interface Review {
  _id: string
  productId: string
  userName: string
  userEmail: string
  rating: number
  comment: string
  createdAt: string
}

interface ProductDetailsProps {
  product: Product
}

// Function to extract wattage options from product description
const getWattageOptions = (description: string): string[] => {
  if (!description) return []
  
  // Match patterns like "Power: 7 Watt / 12 Watt", "Power: 12W", "Power: 12W LED", "Power: 5 Watt", etc.
  // Focus on the "Power:" section to avoid matching equivalent ratings
  // Updated regex to capture everything after "Power:" until comma, period, or opening parenthesis
  const powerMatch = description.match(/Power:\s*([^,\.\(]+)/i)
  if (powerMatch) {
    const powerText = powerMatch[1].trim()
    // Match all wattage values in the power section
    // Handles: "7 Watt / 12 Watt", "12W", "12W LED", "5 Watt", "12 Watt / 24 Watt"
    // This regex finds all numbers followed by W or Watt (case insensitive)
    const wattageRegex = /(\d+)\s*W(?:att)?/gi
    const matches = Array.from(powerText.matchAll(wattageRegex))
    if (matches && matches.length > 0) {
      const wattages = matches
        .map(m => m[1]) // Extract the captured group (the number)
        .filter(w => w && w.length > 0)
        .filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
        .filter(w => {
          const num = parseInt(w)
          return num >= 1 && num <= 100 // Only reasonable wattage values
        })
      if (wattages.length > 0) {
        return wattages.sort((a, b) => parseInt(a) - parseInt(b))
      }
    }
  }
  
  // Fallback: if no "Power:" section found, search entire description but exclude "equivalent to" patterns
  const wattageRegex = /(\d+)\s*W(?:att)?/gi
  const allMatches = Array.from(description.matchAll(wattageRegex))
  if (allMatches && allMatches.length > 0) {
    // Filter out matches that are in "equivalent to" context
    const wattages = allMatches
      .map(m => m[1]) // Extract the captured group
      .filter(w => w && w.length > 0)
      .filter((v, i, a) => a.indexOf(v) === i)
      .filter(w => {
        const num = parseInt(w)
        // Exclude 42W from "equivalent to 42W" - only include reasonable wattages
        return num >= 1 && num <= 30 // LED bulbs typically 1-30W range
      })
    if (wattages.length > 0) {
      return wattages.sort((a, b) => parseInt(a) - parseInt(b))
    }
  }
  return []
}

// Function to calculate price based on wattage
const calculatePrice = (basePrice: number, selectedWattage: string, availableWattages: string[]): number => {
  if (!selectedWattage || availableWattages.length === 0) {
    return basePrice
  }
  
  // Price difference per watt (higher wattage = higher price)
  const pricePerWatt = 20 // 20 PKR per watt difference
  const baseWattage = parseInt(availableWattages[0]) // First (lowest) wattage
  const selectedWattageNum = parseInt(selectedWattage)
  const wattageDifference = selectedWattageNum - baseWattage
  
  return basePrice + (wattageDifference * pricePerWatt)
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [availableWattages, setAvailableWattages] = useState<string[]>([])
  const [selectedWattage, setSelectedWattage] = useState<string>('')
  const [reviews, setReviews] = useState<Review[]>([])
  
  // Calculate dynamic price based on selected wattage
  const currentPrice = calculatePrice(product.price, selectedWattage, availableWattages)
  const [loading, setLoading] = useState(true)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    userEmail: '',
    rating: 5,
    comment: '',
  })
  const { showToast } = useToast()

  useEffect(() => {
    const wattages = getWattageOptions(product.description || '')
    setAvailableWattages(wattages)
    if (wattages.length > 0) {
      setSelectedWattage(wattages[0])
    } else {
      setSelectedWattage('')
    }
  }, [product.id, product.description])

  useEffect(() => {
    fetchReviews()
  }, [product.id])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reviews?productId=${product.id}&productSlug=${product.slug}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reviewForm.userName || !reviewForm.userEmail || !reviewForm.comment) {
      showToast('Please fill all fields', 'error')
      return
    }

    setSubmittingReview(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          productSlug: product.slug,
          userName: reviewForm.userName,
          userEmail: reviewForm.userEmail,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      })

      if (response.ok) {
        showToast('Review submitted successfully!', 'success')
        setReviewForm({ userName: '', userEmail: '', rating: 5, comment: '' })
        setShowReviewForm(false)
        fetchReviews()
      } else {
        const error = await response.json()
        showToast(error.error || 'Failed to submit review', 'error')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      showToast('Failed to submit review', 'error')
    } finally {
      setSubmittingReview(false)
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Product Details</p>
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">{product.name}</h1>
          
          {/* Product Tagline */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-3 italic">
            Energy Efficient • Long Lasting • Premium Quality
          </p>
          
          {/* Product Description Snippet */}
          <p className="text-base text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            Transform your space with our premium LED lighting solution. Designed for modern homes and offices, this product combines exceptional energy efficiency with elegant design.
          </p>
          
          {/* Discounted Price Display */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-gray-400 dark:text-gray-500 line-through">
                PKR {(currentPrice * 1.5).toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                PKR {currentPrice.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Average Rating */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                    size={20}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({reviews.length} review{reviews.length > 1 ? 's' : ''})
              </span>
            </div>
          )}
          
          {availableWattages.length > 0 && selectedWattage && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Price for {selectedWattage}W variant
            </p>
          )}

          {/* Wattage Selection */}
          {availableWattages.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                Power: <span className="font-normal text-gray-600 dark:text-gray-400">{selectedWattage}W</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {availableWattages.map((wattage) => (
                  <button
                    key={wattage}
                    onClick={() => setSelectedWattage(wattage)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all font-semibold text-sm ${
                      selectedWattage === wattage
                        ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-black'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                    aria-label={`Select ${wattage}W power`}
                  >
                    {wattage}W
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          )}

          <AddToCartButton 
            product={product} 
            selectedWattage={availableWattages.length > 0 ? selectedWattage : undefined}
            calculatedPrice={currentPrice}
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Customer Reviews ({reviews.length})
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded"
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={reviewForm.userName}
                    onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={reviewForm.userEmail}
                    onChange={(e) => setReviewForm({ ...reviewForm, userEmail: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating })}
                      className="focus:outline-none"
                    >
                      <FiStar
                        className={rating <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                        size={28}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {reviewForm.rating} out of 5
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Comment *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button
                type="submit"
                disabled={submittingReview}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{review.userName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.userEmail}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                        size={18}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

