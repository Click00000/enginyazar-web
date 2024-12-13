'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/search/SearchBar'
import { FaBitcoin, FaEthereum, FaBars, FaTimes } from 'react-icons/fa'

interface CryptoPrices {
  btc: string;
  eth: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [prices, setPrices] = useState<CryptoPrices>({ btc: '0', eth: '0' })

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [btcResponse, ethResponse] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
        ])
        
        const btcData = await btcResponse.json()
        const ethData = await ethResponse.json()
        
        setPrices({
          btc: Number(btcData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          eth: Number(ethData.price).toLocaleString('en-US', { maximumFractionDigits: 0 })
        })
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ZenithCore
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/news" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Haberler
            </Link>
            <Link href="/analysis" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Analizler
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaBitcoin className="text-orange-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300">${prices.btc}</span>
              </div>
              <div className="flex items-center">
                <FaEthereum className="text-purple-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300">${prices.eth}</span>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden z-50">
              <nav className="flex flex-col p-4">
                <Link 
                  href="/news" 
                  className="py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Haberler
                </Link>
                <Link 
                  href="/analysis" 
                  className="py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analizler
                </Link>
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <FaBitcoin className="text-orange-500 mr-1" />
                    <span className="text-gray-600 dark:text-gray-300">${prices.btc}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEthereum className="text-purple-500 mr-1" />
                    <span className="text-gray-600 dark:text-gray-300">${prices.eth}</span>
                  </div>
                </div>
              </nav>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  )
}
