import { NextResponse } from 'next/server'
import axios from 'axios'

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

export async function GET() {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
      headers: {
        'Authorization': `Apikey ${API_KEY}`
      }
    })
    
    const articles = await Promise.all(response.data.Data.map(async (item: any) => ({
      title: await translateText(item.title),
      image: item.imageurl,
      summary: await translateText(item.body.substring(0, 200) + '...'),
      slug: `${item.id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      url: item.url,
      date: new Date(item.published_on * 1000).toLocaleDateString('tr-TR'),
      source: item.source,
      categories: item.categories.split('|').filter(Boolean),
      sourceInfo: {
        name: item.source_info.name,
        lang: item.source_info.lang,
        img: item.source_info.img
      }
    })))

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Haber çekme hatası:', error)
    return NextResponse.json({ 
      articles: [],
      error: 'Haberler yüklenirken bir hata oluştu'
    }, { status: 500 })
  }
}
