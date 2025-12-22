'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">UP TO 30% OFF</h3>
            <p className="text-sm text-gray-300 mb-4">
              Sign up for Ecolight deals, new arrivals and energy saving tips.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 px-4 py-2 text-black rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black px-6 py-2 rounded-r hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold block mb-4">
              Ecolight
            </Link>
            <p className="text-gray-400 text-sm">
              Energy-efficient lighting for homes, shops and offices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections/catalog" className="hover:text-white">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/pages/privacy-policy" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/pages/refund-policy" className="hover:text-white">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-of-service" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping-policy" className="hover:text-white">
                  Shipping policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/pages/contact-information"
                  className="hover:text-white"
                >
                  Contact information
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Ecolight. All rights reserved.</p>
          <p className="mt-2">Powered by Next.js</p>
        </div>
      </div>
    </footer>
  )
}


