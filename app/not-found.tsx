import Link from 'next/link'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
          >
            Continue shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}


