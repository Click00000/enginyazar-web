import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import axios from 'axios'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface Article {
  title: string
  image: string
  content: string[]
  date: string
  source: string
  url: string
  categories: string[]
  sourceInfo: {
    name: string
    img: string
  }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const article = await getNewsDetail(params.slug)
  if (!article) {
    return {
      title: 'Haber Bulunamadı',
    }
  }

  return {
    title: article.title,
    description: article.content[0],
    openGraph: {
      title: article.title,
      description: article.content[0],
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
      authors: [article.sourceInfo.name],
    },
  }
}

async function translateText(text: string): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURI(text)}`
    const response = await axios.get(url)
    return response.data[0][0][0]
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

async function getNewsDetail(slug: string): Promise<Article | null> {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
    const newsId = slug.split('-')[0]
    const article = response.data.Data.find((item: any) => item.id.toString() === newsId)
    if (!article) return null

    const sentences = article.body.match(/[^.!?]+[.!?]+/g) || []
    const translatedSentences = await Promise.all(
      sentences.map((sentence: string) => translateText(sentence.trim()))
    )
    const paragraphSize = 3
    const contentParagraphs = []
    for (let i = 0; i < translatedSentences.length; i += paragraphSize) {
      const paragraph = translatedSentences
        .slice(i, i + paragraphSize)
        .join(' ')
      if (paragraph.trim()) {
        contentParagraphs.push(paragraph)
      }
    }

    return {
      title: await translateText(article.title),
      image: article.imageurl,
      content: contentParagraphs,
      date: new Date(article.published_on * 1000).toLocaleDateString('tr-TR'),
      source: article.source,
      url: article.url,
      categories: article.categories.split('|').filter(Boolean),
      sourceInfo: {
        name: article.source_info.name,
        img: article.source_info.img
      }
    }
  } catch (error) {
    console.error('Haber detayı alınamadı:', error)
    return null
  }
}

export default async function NewsDetail(props: PageProps) {
  const params = await props.params
  const article = await getNewsDetail(params.slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Haber bulunamadı</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            ← Ana Sayfaya Dön
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {article.source}
              </span>
              {article.categories.map((cat: string) => (
                <span key={cat} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>

            <div className="flex items-center text-gray-500 mb-6">
              <span>{article.date}</span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              {article.content.map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={article.sourceInfo.img}
                    alt={article.sourceInfo.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-medium">{article.sourceInfo.name}</span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Kaynağa Git →
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
