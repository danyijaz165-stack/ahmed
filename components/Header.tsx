'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiShoppingCart,
  FiMoon,
  FiSun,
  FiZap,
} from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/contexts/ThemeContext'
import { products } from '@/data/products'
import ProductCard from './ProductCard'
import { useFlyingCart } from '@/contexts/FlyingCartContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { setCartIconRef } = useFlyingCart()
  const cartIconRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (cartIconRef.current) {
      setCartIconRef(cartIconRef.current)
    }
  }, [setCartIconRef])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery])

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Top Bar with Menu, Logo, and Icons */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 border-b border-gray-200 dark:border-gray-800 relative">
            {/* Menu Button - Left Corner */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-900 dark:text-gray-100 flex-shrink-0 z-10"
              aria-label="Menu"
            >
              {menuOpen ? (
                <FiX size={22} className="sm:w-6 sm:h-6" />
              ) : (
                <FiMenu size={22} className="sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Logo in Center - Responsive positioning */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap z-10 max-w-[140px] sm:max-w-none truncate sm:truncate-none"
            >
              Ecolight
            </Link>

            {/* Right Side Icons - Responsive spacing */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 ml-auto flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <FiMoon size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                aria-label="Search"
              >
                <FiSearch size={18} className="sm:w-5 sm:h-5" />
              </button>
              <Link
                href="/account/login"
                className="hidden xs:flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 sm:px-2.5 py-1 transition text-gray-700 dark:text-gray-300 flex-shrink-0"
              >
                <FiUser size={18} className="sm:w-5 sm:h-5 sm:mr-1" />
                <span className="text-xs sm:text-sm hidden sm:inline">Log in</span>
              </Link>
              <Link
                ref={cartIconRef}
                href="/cart"
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                aria-label="Cart"
              >
                <FiShoppingCart size={18} className="sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-5 flex items-center justify-center animate-bounce px-0.5 sm:px-1">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Navigation Below - Desktop Only (under logo: only 3 main pages) */}
          <div className="hidden lg:flex justify-center py-2 md:py-3">
            <nav className="flex items-center gap-4 xl:gap-6">
              <Link
                href="/"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-3 py-1 rounded-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12"
                    size={18}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Home</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
              <Link
                href="/collections/catalog"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-3 py-1 rounded-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12"
                    size={18}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Catalog</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
              <Link
                href="/pages/contact"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-3 py-1 rounded-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12"
                    size={18}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Contact</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
            </nav>
          </div>
        </div>

        {/* Menu from 3-line icon (all pages) – visible on all screen sizes */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl z-50">
            <div className="px-3 sm:px-4 py-3 sm:py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collections/catalog"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Catalog
                </Link>
                <Link
                  href="/collections/gentlemans-reserve"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Featured Collection
                </Link>
                <Link
                  href="/collections/products"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  All Lights
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                <Link
                  href="/pages/contact"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/account/login"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/account/signup"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition text-gray-800 dark:text-gray-100 bg-yellow-50 dark:bg-yellow-900/20"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiShoppingCart size={18} className="flex-shrink-0" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1.5">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Search Dialog */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-900 dark:text-gray-100 flex-shrink-0"
                >
                  <FiX size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              
              {/* Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    {filteredProducts.length > 0 
                      ? `Found ${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''}`
                      : 'No products found'}
                  </p>
                  {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                      {filteredProducts.map((product) => (
                        <div key={product.id} onClick={() => setSearchOpen(false)}>
                          <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            slug={product.slug}
                            onSale={product.onSale}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Show all products when search is empty */}
              {searchQuery.trim() === '' && (
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    All Products ({products.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {products.slice(0, 10).map((product) => (
                      <div key={product.id} onClick={() => setSearchOpen(false)}>
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          image={product.image}
                          slug={product.slug}
                          onSale={product.onSale}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}


