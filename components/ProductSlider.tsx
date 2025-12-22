'use client'

import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  onSale?: boolean
}

interface ProductSliderProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

export default function ProductSlider({ title, products, viewAllLink }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4">
            {viewAllLink && (
              <a
                href={viewAllLink}
                className="text-sm hover:underline"
              >
                View all products
              </a>
            )}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                aria-label="Previous"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                aria-label="Next"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Mobile arrows pinned to bottom-right of slider */}
          <div className="md:hidden absolute right-2 bottom-2 flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              aria-label="Previous"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              aria-label="Next"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


