import Image from 'next/image'
import Link from 'next/link'

interface RelatedNewsItem {
  id: string
  slug: string
  title: string
  image: string
  date: string
}

export default function RelatedNews({ news }: { news: RelatedNewsItem[] }) {
  return (
    <div className="mt-12 border-t dark:border-gray-700">
      <h2 className="text-2xl font-bold mt-8 mb-6">İlgili Haberler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link 
            key={item.id} 
            href={`/news/${item.slug}`}
            className="group"
          >
            <div className="relative h-48 mb-3">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-lg group-hover:opacity-90 transition"
              />
            </div>
            <h3 className="font-semibold group-hover:text-blue-500 transition">{item.title}</h3>
            <time className="text-sm text-gray-600 dark:text-gray-400">{item.date}</time>
          </Link>
        ))}
      </div>
    </div>
  )
}
