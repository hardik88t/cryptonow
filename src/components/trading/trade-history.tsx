"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { History, TrendingUp, TrendingDown } from "lucide-react"

interface Trade {
  id: string
  timestamp: number
  price: number
  amount: number
  side: 'buy' | 'sell'
  total: number
}

// Mock trade data generator
const generateTradeData = (): Trade[] => {
  const trades: Trade[] = []
  const basePrice = 45000
  
  for (let i = 0; i < 50; i++) {
    const side = Math.random() > 0.5 ? 'buy' : 'sell'
    const price = basePrice + (Math.random() - 0.5) * 1000
    const amount = Math.random() * 0.5 + 0.01
    const total = price * amount
    
    trades.push({
      id: `trade-${i}`,
      timestamp: Date.now() - (i * 30000), // 30 seconds apart
      price,
      amount,
      side,
      total
    })
  }
  
  return trades.sort((a, b) => b.timestamp - a.timestamp)
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    // Generate initial trade data
    setTrades(generateTradeData())

    // Simulate new trades
    const interval = setInterval(() => {
      const newTrade: Trade = {
        id: `trade-${Date.now()}`,
        timestamp: Date.now(),
        price: 45000 + (Math.random() - 0.5) * 1000,
        amount: Math.random() * 0.5 + 0.01,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        total: 0
      }
      newTrade.total = newTrade.price * newTrade.amount

      setTrades(prev => [newTrade, ...prev.slice(0, 49)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-trading-surface border-border/50 h-[200px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <History className="h-4 w-4" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-[150px] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/50">
          <div>Time</div>
          <div className="text-right">Price (USD)</div>
          <div className="text-right">Amount (BTC)</div>
          <div className="text-right">Total</div>
        </div>

        {/* Trades */}
        <div className="h-[110px] overflow-y-auto scrollbar-thin">
          <div className="space-y-0.5 p-2">
            {trades.map((trade) => {
              const timeAgo = Math.floor((Date.now() - trade.timestamp) / 1000)
              const Icon = trade.side === 'buy' ? TrendingUp : TrendingDown
              const sideColor = trade.side === 'buy' ? 'text-profit' : 'text-loss'
              
              return (
                <div
                  key={trade.id}
                  className="grid grid-cols-4 gap-2 px-2 py-1 text-xs hover:bg-muted/20 rounded"
                >
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon className={`h-3 w-3 ${sideColor}`} />
                    {timeAgo < 60 ? `${timeAgo}s` : `${Math.floor(timeAgo / 60)}m`}
                  </div>
                  <div className={`text-right font-medium ${sideColor}`}>
                    {formatPrice(trade.price)}
                  </div>
                  <div className="text-right">
                    {trade.amount.toFixed(4)}
                  </div>
                  <div className="text-right text-muted-foreground">
                    {trade.total.toFixed(0)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
