'use client'

import { FiStar } from 'react-icons/fi'

const reviews = [
  {
    id: 1,
    name: 'Ahmed Khan',
    rating: 5,
    comment: 'Amazing fragrances! The quality is outstanding and the scents last all day. Highly recommended!',
    product: 'ORCHID DE VANILLE',
  },
  {
    id: 2,
    name: 'Fatima Ali',
    rating: 5,
    comment: 'Best perfume collection I have ever tried. The packaging is beautiful and the fragrances are luxurious.',
    product: 'ELYSIAN FIELDS',
  },
  {
    id: 3,
    name: 'Hassan Malik',
    rating: 5,
    comment: 'Great value for money. The scents are premium quality and delivery was super fast. Will order again!',
    product: 'Killer Impre ed by Tuxedo YSL',
  },
  {
    id: 4,
    name: 'Sara Ahmed',
    rating: 5,
    comment: 'Love the variety of scents available. Each one is unique and long-lasting. Perfect for gifting!',
    product: 'FLORAL VALLEY IMPRESSED BY GUCCI FLORA',
  },
]

export default function ReviewSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-gray-500">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

