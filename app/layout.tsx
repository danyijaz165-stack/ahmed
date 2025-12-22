import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/contexts/ToastContext'
import { CartProvider } from '@/contexts/CartContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ChatbotWidget from '@/components/ChatbotWidget'

export const metadata: Metadata = {
  title: 'Ecolight',
  description:
    'Ecolight – premium energy-efficient lighting for homes and offices. Shop LED bulbs, ceiling lights, and decorative lighting to brighten every space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900">
        <CartProvider>
          <ToastProvider>
            <ThemeProvider>
              {children}
              <ChatbotWidget />
            </ThemeProvider>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  )
}

