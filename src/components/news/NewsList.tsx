'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Article {
  title: string
  slug: string
  image: string
  summary: string
  date: string
  source: string
  categories: string[]
}

export default function NewsList() {
  const [news, setNews] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/scrape')
        const data = await response.json()
        setNews(data.articles)
      } catch (error) {
        console.error('Haberler yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <div>Haberler yükleniyor...</div>

  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Son Haberler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <article key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={`/news/${article.slug}`}>
              <div className="relative h-48 sm:h-56 md:h-40 lg:h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    {article.source}
                  </span>
                </div>
              </div>
            </Link>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                <Link href={`/news/${article.slug}`} className="hover:text-blue-500">
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{article.date}</span>
                <div className="flex gap-2">
                  {article.categories.slice(0, 2).map(cat => (
                    <span key={cat} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
