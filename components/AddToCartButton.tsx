'use client'

import { useState, useRef } from 'react'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { useFlyingCart } from '@/contexts/FlyingCartContext'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { triggerAnimation } = useFlyingCart()
  const addToCartButtonRef = useRef<HTMLButtonElement>(null)
  const buyNowButtonRef = useRef<HTMLButtonElement>(null)

  const handleAddToCart = () => {
    // Trigger flying animation
    if (addToCartButtonRef.current) {
      triggerAnimation(product.image, addToCartButtonRef.current)
    }
    
    // Small delay before adding to cart
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      showToast(`${quantity} x ${product.name} added to cart!`, 'success')
    }, 100)
  }

  const handleBuyNow = () => {
    // Trigger flying animation
    if (buyNowButtonRef.current) {
      triggerAnimation(product.image, buyNowButtonRef.current)
    }
    
    // Small delay before adding to cart and redirecting
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      showToast(`${quantity} x ${product.name} added to cart!`, 'success')
      setTimeout(() => {
        window.location.href = '/cart'
      }, 500)
    }, 100)
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
          ref={addToCartButtonRef}
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-800 transition font-semibold"
        >
          Add to cart
        </button>
        <button 
          ref={buyNowButtonRef}
          onClick={handleBuyNow}
          className="flex-1 bg-gray-200 text-black py-3 px-6 hover:bg-gray-300 transition font-semibold"
        >
          Buy it now
        </button>
      </div>
    </div>
  )
}


