'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FlyingCartContextType {
  triggerAnimation: (image: string, fromButton: HTMLElement | null) => void
  cartIconRef: HTMLElement | null
  setCartIconRef: (element: HTMLElement | null) => void
}

const FlyingCartContext = createContext<FlyingCartContextType | undefined>(undefined)

export function FlyingCartProvider({ children }: { children: ReactNode }) {
  const [cartIconRef, setCartIconRef] = useState<HTMLElement | null>(null)

  const triggerAnimation = (image: string, fromButton: HTMLElement | null) => {
    if (!fromButton || !cartIconRef) return

    const fromRect = fromButton.getBoundingClientRect()
    const toRect = cartIconRef.getBoundingClientRect()

    const animation = document.createElement('div')
    animation.style.position = 'fixed'
    animation.style.left = `${fromRect.left + fromRect.width / 2}px`
    animation.style.top = `${fromRect.top + fromRect.height / 2}px`
    animation.style.width = '60px'
    animation.style.height = '60px'
    animation.style.zIndex = '99999'
    animation.style.pointerEvents = 'none'
    animation.style.borderRadius = '8px'
    animation.style.overflow = 'hidden'
    animation.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)'
    animation.style.transform = 'translate(-50%, -50%) scale(1)'
    animation.style.opacity = '1'

    const img = document.createElement('img')
    img.src = image
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.objectFit = 'cover'
    animation.appendChild(img)

    document.body.appendChild(animation)

    // Animate to cart
    requestAnimationFrame(() => {
      const finalX = toRect.left + toRect.width / 2
      const finalY = toRect.top + toRect.height / 2
      
      animation.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      animation.style.left = `${finalX}px`
      animation.style.top = `${finalY}px`
      animation.style.transform = 'translate(-50%, -50%) scale(0.2)'
      animation.style.opacity = '0.6'
    })

    // Cleanup
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation)
      }
    }, 700)
  }

  return (
    <FlyingCartContext.Provider value={{ triggerAnimation, cartIconRef, setCartIconRef }}>
      {children}
    </FlyingCartContext.Provider>
  )
}

export function useFlyingCart() {
  const context = useContext(FlyingCartContext)
  if (!context) {
    throw new Error('useFlyingCart must be used within FlyingCartProvider')
  }
  return context
}

