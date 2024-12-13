import Image from 'next/image'
import Link from 'next/link'

interface FeaturedNews {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
}

export default function HeroSection() {
  // Mock data - later we'll fetch from API
  const featuredNews: FeaturedNews = {
    id: '1',
    slug: 'bitcoin-52000-dolari-gordu',
    title: 'Bitcoin 52.000 Doları Gördü',
    excerpt: 'Kripto para piyasasının öncü birimi Bitcoin, kurumsal yatırımcıların ilgisiyle birlikte yükseliş trendini sürdürüyor.',
    image: '/images/news/bitcoin-rally.jpg',
    category: 'Bitcoin',
    date: '15 Şubat 2024'
  }

  return (
    <section className="relative h-[380px] mb-12">
      <Link href={`/news/${featuredNews.slug}`}>
        <div className="relative h-full">
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-3">
              {featuredNews.category}
            </span>
            <h1 className="text-4xl font-bold text-white mb-3">
              {featuredNews.title}
            </h1>
            <p className="text-gray-200 text-lg mb-4">
              {featuredNews.excerpt}
            </p>
            <time className="text-gray-300">
              {featuredNews.date}
            </time>
          </div>
        </div>
      </Link>
    </section>
  )
}
