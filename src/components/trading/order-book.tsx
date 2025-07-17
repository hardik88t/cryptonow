"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { BookOpen } from "lucide-react"

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

// Mock order book data generator
const generateOrderBookData = (currentPrice: number) => {
  const asks: OrderBookEntry[] = []
  const bids: OrderBookEntry[] = []
  
  // Generate asks (sell orders) - prices above current price
  for (let i = 1; i <= 15; i++) {
    const price = currentPrice + (i * 50)
    const amount = Math.random() * 2 + 0.1
    const total = price * amount
    asks.push({ price, amount, total })
  }
  
  // Generate bids (buy orders) - prices below current price
  for (let i = 1; i <= 15; i++) {
    const price = currentPrice - (i * 50)
    const amount = Math.random() * 2 + 0.1
    const total = price * amount
    bids.push({ price, amount, total })
  }
  
  return { asks: asks.reverse(), bids }
}

export function OrderBook() {
  const [orderBook, setOrderBook] = useState<{ asks: OrderBookEntry[], bids: OrderBookEntry[] }>({
    asks: [],
    bids: []
  })
  const [currentPrice] = useState(45000) // Mock current BTC price

  useEffect(() => {
    // Generate initial order book data
    const data = generateOrderBookData(currentPrice)
    setOrderBook(data)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newData = generateOrderBookData(currentPrice + (Math.random() - 0.5) * 100)
      setOrderBook(newData)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const maxTotal = Math.max(
    ...orderBook.asks.map(entry => entry.total),
    ...orderBook.bids.map(entry => entry.total)
  )

  return (
    <Card className="bg-card border-border/50 h-[500px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <BookOpen className="h-4 w-4" />
          Order Book
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-[450px] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/50">
            <div className="text-right">Price (USD)</div>
            <div className="text-right">Amount (BTC)</div>
            <div className="text-right">Total</div>
          </div>

          {/* Asks (Sell Orders) */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="space-y-0.5 p-2">
              {orderBook.asks.map((ask, index) => (
                <div
                  key={`ask-${index}`}
                  className="relative grid grid-cols-3 gap-2 px-2 py-1 text-xs hover:bg-muted/20 rounded"
                >
                  <div
                    className="absolute inset-0 bg-loss/10 rounded"
                    style={{
                      width: `${(ask.total / maxTotal) * 100}%`,
                      right: 0,
                      left: 'auto'
                    }}
                  />
                  <div className="text-right text-loss relative z-10">
                    {formatPrice(ask.price)}
                  </div>
                  <div className="text-right relative z-10">
                    {ask.amount.toFixed(4)}
                  </div>
                  <div className="text-right text-muted-foreground relative z-10">
                    {ask.total.toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Price */}
          <div className="px-4 py-3 border-y border-border/50 bg-muted/20">
            <div className="text-center">
              <div className="text-lg font-bold text-profit">
                {formatPrice(currentPrice)}
              </div>
              <div className="text-xs text-muted-foreground">
                Last Price
              </div>
            </div>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="space-y-0.5 p-2">
              {orderBook.bids.map((bid, index) => (
                <div
                  key={`bid-${index}`}
                  className="relative grid grid-cols-3 gap-2 px-2 py-1 text-xs hover:bg-muted/20 rounded"
                >
                  <div
                    className="absolute inset-0 bg-profit/10 rounded"
                    style={{
                      width: `${(bid.total / maxTotal) * 100}%`,
                      right: 0,
                      left: 'auto'
                    }}
                  />
                  <div className="text-right text-profit relative z-10">
                    {formatPrice(bid.price)}
                  </div>
                  <div className="text-right relative z-10">
                    {bid.amount.toFixed(4)}
                  </div>
                  <div className="text-right text-muted-foreground relative z-10">
                    {bid.total.toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
