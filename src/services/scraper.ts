import axios from 'axios'

interface NewsItem {
  id: string
  title: string
  imageurl: string
  body: string
  published_on: number
  url: string
  source: string
  categories: string
  source_info: {
    name: string
    lang: string
    img: string
  }
}

interface NewsResponse {
  Data: NewsItem[]
}

const API_KEY = process.env.CRYPTOCOMPARE_API_KEY

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

export async function getNewsById(id: string): Promise<NewsItem> {
  try {
    const response = await axios.get<NewsResponse>('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
      headers: {
        'Authorization': `Apikey ${API_KEY}`
      }
    })

    const newsItem = response.data.Data.find(item => item.id === id)

    if (!newsItem) {
      throw new Error('News item not found')
    }

    const translatedTitle = await translateText(newsItem.title)
    const translatedBody = await translateText(newsItem.body)

    return {
      ...newsItem,
      title: translatedTitle,
      body: translatedBody
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const response = await axios.get<NewsResponse>('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
      headers: {
        'Authorization': `Apikey ${API_KEY}`
      }
    })

    const translatedNews = await Promise.all(
      response.data.Data.map(async (item) => ({
        ...item,
        title: await translateText(item.title),
        body: await translateText(item.body)
      }))
    )

    return translatedNews
  } catch (error) {
    console.error('Error fetching all news:', error)
    throw error
  }
}
