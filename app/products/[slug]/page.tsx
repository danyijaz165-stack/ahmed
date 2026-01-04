import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetails from '@/components/ProductDetails'

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetails product={product} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

