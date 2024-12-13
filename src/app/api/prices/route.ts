import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const [btcData, ethData, goldData, silverData, bist100Data] = await Promise.all([
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT'),
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=XAUUSDT'),
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=XAGUSDT'),
      axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=USDTRY')
    ])

    const priceData = [
      {
        symbol: 'BTC',
        price: parseFloat(btcData.data.lastPrice),
        change: parseFloat(btcData.data.priceChangePercent),
        volume: parseFloat(btcData.data.volume),
        high: parseFloat(btcData.data.highPrice),
        low: parseFloat(btcData.data.lowPrice)
      },
      {
        symbol: 'ETH',
        price: parseFloat(ethData.data.lastPrice),
        change: parseFloat(ethData.data.priceChangePercent),
        volume: parseFloat(ethData.data.volume),
        high: parseFloat(ethData.data.highPrice),
        low: parseFloat(ethData.data.lowPrice)
      },
      {
        symbol: 'GOLD',
        price: parseFloat(goldData.data.lastPrice),
        change: parseFloat(goldData.data.priceChangePercent),
        volume: parseFloat(goldData.data.volume),
        high: parseFloat(goldData.data.highPrice),
        low: parseFloat(goldData.data.lowPrice)
      },
      {
        symbol: 'SILVER',
        price: parseFloat(silverData.data.lastPrice),
        change: parseFloat(silverData.data.priceChangePercent),
        volume: parseFloat(silverData.data.volume),
        high: parseFloat(silverData.data.highPrice),
        low: parseFloat(silverData.data.lowPrice)
      },
      {
        symbol: 'BIST100',
        price: parseFloat(bist100Data.data.lastPrice),
        change: parseFloat(bist100Data.data.priceChangePercent),
        volume: parseFloat(bist100Data.data.volume),
        high: parseFloat(bist100Data.data.highPrice),
        low: parseFloat(bist100Data.data.lowPrice)
      }
    ]

    return NextResponse.json(priceData)
  } catch (error) {
    console.error('Price fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}
