import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Geçerli bir email adresi giriniz' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await client.connect()
    const db = client.db('newsletter')
    const collection = db.collection('subscribers')

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email })
    if (existingSubscriber) {
      return new Response(JSON.stringify({ error: 'Bu email adresi zaten kayıtlı' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Add new subscriber
    await collection.insertOne({
      email,
      subscribedAt: new Date(),
      active: true
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return new Response(JSON.stringify({ error: 'Bir hata oluştu' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  } finally {
    await client.close()
  }
}
