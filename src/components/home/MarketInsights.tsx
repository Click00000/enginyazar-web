'use client'
import { useState } from 'react'

interface MarketData {
  totalMarketCap: string
  btcDominance: string
  volume24h: string
  fearGreedIndex: {
    value: number
    status: string
  }
}

export default function MarketInsights() {
  const [marketData] = useState<MarketData>({
    totalMarketCap: "$3.02T",
    btcDominance: "52.4%",
    volume24h: "$52.8B",
    fearGreedIndex: {
      value: 72,
      status: "Greed"
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Market Insights</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</div>
          <div className="text-xl font-bold mt-1">{marketData.totalMarketCap}</div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</div>
          <div className="text-xl font-bold mt-1">{marketData.btcDominance}</div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
          <div className="text-xl font-bold mt-1">{marketData.volume24h}</div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Fear & Greed Index</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-bold">{marketData.fearGreedIndex.value}</span>
            <span className={`text-sm ${
              marketData.fearGreedIndex.value > 50 ? 'text-green-500' : 'text-red-500'
            }`}>
              {marketData.fearGreedIndex.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
