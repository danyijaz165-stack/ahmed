'use client'

import { useState } from 'react'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    showToast(`${quantity} x ${product.name} added to cart!`, 'success')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="font-semibold">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-0 focus:outline-none"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-800 transition font-semibold"
        >
          Add to cart
        </button>
        <button 
          onClick={() => {
            handleAddToCart()
            window.location.href = '/cart'
          }}
          className="flex-1 bg-gray-200 text-black py-3 px-6 hover:bg-gray-300 transition font-semibold"
        >
          Buy it now
        </button>
      </div>
    </div>
  )
}


