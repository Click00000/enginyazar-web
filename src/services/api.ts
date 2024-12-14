const WS_ENDPOINT = 'wss://stream.binance.com:9443/ws'

export async function getMarketData() {
  try {
    const ws = new WebSocket(WS_ENDPOINT)
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['!ticker@arr'],
        id: 1
      }))
    }

    return new Promise((resolve) => {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (Array.isArray(data)) {
          const btcData = data.find(item => item.s === 'BTCUSDT')
          const totalMarketCap = Number(btcData.c) * Number(btcData.v)
          
          resolve({
            totalMarketCap: `${(totalMarketCap / 1e12).toFixed(2)}T`,
            btcDominance: "52.4%",
            volume24h: `${(Number(btcData.v) * Number(btcData.c) / 1e9).toFixed(2)}B`,
            fearGreedIndex: {
              value: 72,
              status: "Greed"
            }
          })
          
          ws.close()
        }
      }    })
  } catch (error) {
    console.error('Error fetching market data:', error)
    return null
  }
}
