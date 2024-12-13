import axios from 'axios'

interface Article {
  title: string
  image: string
  summary: string
  url: string
  date: string
  source: string
  categories: string[]
}

export async function getNewsFromCryptoCompare(): Promise<Article[]> {
  try {
    const url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
    const response = await axios.get(url)
    
    return response.data.Data.map((item: any) => ({
      title: item.title,
      image: item.imageurl,
      summary: item.body,
      url: item.url,
      date: new Date(item.published_on * 1000).toLocaleDateString(),
      source: item.source,
      categories: item.categories.split('|')
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}
