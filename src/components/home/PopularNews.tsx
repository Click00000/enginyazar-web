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

export default function PopularNews() {
  const [news, setNews] = useState<Article[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/scrape')
        const data = await response.json()
        setNews(data.articles.slice(0, 5))
      } catch (error) {
        console.error('Haberler yüklenirken hata:', error)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Popüler Haberler</h2>
      <div className="space-y-4">
        {news.map((article, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="96px"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <Link 
                href={`/news/${article.slug}`}
                className="font-semibold hover:text-blue-500 line-clamp-2"
              >
                {article.title}
              </Link>
              <div className="flex gap-2 mt-2 text-sm text-gray-500">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
