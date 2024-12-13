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

export default function TopNews() {
  const [topNews, setTopNews] = useState<Article | null>(null)

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const response = await fetch('/api/scrape')
        const data = await response.json()
        if (data.articles && data.articles.length > 0) {
          setTopNews(data.articles[0])
        }
      } catch (error) {
        console.error('Top haber yüklenirken hata:', error)
      }
    }

    fetchTopNews()
  }, [])

  if (!topNews) return null

  return (
    <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
      <Image
        src={topNews.image}
        alt={topNews.title}
        fill
        quality={100}
        priority={true}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex gap-2 mb-3">
          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
            {topNews.source}
          </span>
          {topNews.categories.slice(0, 2).map(cat => (
            <span key={cat} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm">
              {cat}
            </span>
          ))}
        </div>
        <Link href={`/news/${topNews.slug}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hover:text-blue-400 transition-colors">
            {topNews.title}
          </h1>
        </Link>
        <p className="text-gray-200 text-lg md:w-3/4">
          {topNews.summary}
        </p>
      </div>
    </div>
  )
}
