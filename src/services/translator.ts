import axios from 'axios'

export async function translateText(text: string): Promise<string> {
  try {
    const response = await axios.get('/api/translate', {
      params: { text }
    })
    return response.data.translation
  } catch (error) {
    console.error('Çeviri hatası:', error)
    return text
  }
}
