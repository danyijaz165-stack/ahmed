'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()

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
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar with Menu, Logo, and Icons */}
          <div className="flex items-center justify-between h-16 border-b border-white/30 dark:border-gray-800">
            {/* Menu Button - Left Corner (Desktop & Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg transition backdrop-blur-sm text-gray-900 dark:text-gray-100"
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo in Center */}
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2 text-gray-900 dark:text-gray-100"
            >
              Ecolight
            </Link>

            {/* Right Side Icons - Search, Theme, Login, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
              <button
                onClick={toggleTheme}
                className="p-2 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg transition backdrop-blur-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg transition backdrop-blur-sm"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
              <Link
                href="/account/login"
                className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg px-2 py-1 transition backdrop-blur-sm"
              >
                <FiUser size={20} className="mr-1" />
                <span className="text-sm hidden sm:inline">Log in</span>
              </Link>
              <Link
                href="/cart"
                className="p-2 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg relative transition backdrop-blur-sm"
                aria-label="Cart"
              >
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Navigation Below - Desktop Only (under logo: only 3 main pages) */}
          <div className="hidden lg:flex justify-center py-3">
            <nav className="flex items-center space-x-6">
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
          <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collections/catalog"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Catalog
                </Link>
                <Link
                  href="/collections/gentlemans-reserve"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Featured Collection
                </Link>
                <Link
                  href="/collections/products"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  All Lights
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                <Link
                  href="/pages/contact"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/account/login"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/account/signup"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  href="/cart"
                  className="block py-3 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Cart ({cartCount > 0 ? cartCount : 0})
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Search Dialog */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 backdrop-blur-md bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="ml-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-900 dark:text-gray-100"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {filteredProducts.length > 0 
                      ? `Found ${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''}`
                      : 'No products found'}
                  </p>
                  {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    All Products ({products.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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


