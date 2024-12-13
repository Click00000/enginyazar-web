'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Article {
  title: string
  image: string
  summary: string
  url: string
  date: string
  source: string
  categories: string[]
}

export default function NewsSlider() {
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
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
    >
      {news.map((article, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              quality={100}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex gap-2 mb-3">
                <span className="bg-blue-500 px-2 py-1 rounded text-sm">
                  {article.source}
                </span>
                {article.categories.slice(0, 2).map(cat => (
                  <span key={cat} className="bg-gray-700/50 px-2 py-1 rounded text-sm">
                    {cat}
                  </span>
                ))}
              </div>
              <Link href={article.url} target="_blank">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-gray-200 line-clamp-2 md:line-clamp-3">
                {article.summary}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
