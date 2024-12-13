'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { FaBitcoin, FaEthereum, FaChartLine, FaCaretUp, FaCaretDown, FaSearch } from 'react-icons/fa'
import { GiGoldBar } from 'react-icons/gi'

interface CryptoPrice {
  symbol: string
  price: string
  change: string
  icon: React.ReactNode
}

export default function PriceWidget() {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', price: '0', change: '0', icon: <FaBitcoin className="text-orange-500" size={24} /> },
    { symbol: 'ETH', price: '0', change: '0', icon: <FaEthereum className="text-purple-500" size={24} /> },
    { symbol: 'XU100', price: '0', change: '0', icon: <FaChartLine className="text-blue-500" size={24} /> },
    { symbol: 'GOLD', price: '0', change: '0', icon: <GiGoldBar className="text-yellow-500" size={24} /> }
  ])
  
  const [searchSymbol, setSearchSymbol] = useState('')
  const [customPrice, setCustomPrice] = useState<CryptoPrice | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Kripto fiyatları için Binance API
        const [btcResponse, ethResponse] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
        ])
        
        const btcData = await btcResponse.json()
        const ethData = await ethResponse.json()

        // BIST100 ve Altın için farklı API kullanılabilir
        // Şimdilik örnek veriler
        const xu100Data = {
          lastPrice: "8750.25",
          priceChangePercent: "1.25"
        }
        
        const goldData = {
          lastPrice: "2150.30",
          priceChangePercent: "0.75"
        }
        
        setPrices(prev => [
          {
            ...prev[0],
            price: Number(btcData.lastPrice).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            change: Number(btcData.priceChangePercent).toFixed(2)
          },
          {
            ...prev[1],
            price: Number(ethData.lastPrice).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            change: Number(ethData.priceChangePercent).toFixed(2)
          },
          {
            ...prev[2],
            price: xu100Data.lastPrice,
            change: xu100Data.priceChangePercent
          },
          {
            ...prev[3],
            price: goldData.lastPrice,
            change: goldData.priceChangePercent
          }
        ])
      } catch (error) {
        console.error('Fiyatları çekerken hata:', error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = async () => {
    if (!searchSymbol) return
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${searchSymbol.toUpperCase()}USDT`)
      const data = await response.json()
      
      setCustomPrice({
        symbol: searchSymbol.toUpperCase(),
        price: Number(data.lastPrice).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        change: Number(data.priceChangePercent).toFixed(2),
        icon: <FaSearch className="text-gray-500" size={24} />
      })
    } catch (error) {
      console.error('Özel fiyat çekerken hata:', error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-6">Piyasa Verileri</h2>
      
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Sembol ara... (örn: SOL)"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Ara
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {prices.map((crypto) => (
          <div 
            key={crypto.symbol}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              {crypto.icon}
              <span className="font-semibold">{crypto.symbol}</span>
            </div>
            <div className="text-right">
              <div className="font-bold">${crypto.price}</div>
              <div className={`flex items-center justify-end text-sm ${
                Number(crypto.change) >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {Number(crypto.change) >= 0 ? (
                  <FaCaretUp className="mr-1" />
                ) : (
                  <FaCaretDown className="mr-1" />
                )}
                {Math.abs(Number(crypto.change))}%
              </div>
            </div>
          </div>
        ))}
        {customPrice && (
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              {customPrice.icon}
              <span className="font-semibold">{customPrice.symbol}</span>
            </div>
            <div className="text-right">
              <div className="font-bold">${customPrice.price}</div>
              <div className={`flex items-center justify-end text-sm ${
                Number(customPrice.change) >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {Number(customPrice.change) >= 0 ? (
                  <FaCaretUp className="mr-1" />
                ) : (
                  <FaCaretDown className="mr-1" />
                )}
                {Math.abs(Number(customPrice.change))}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
