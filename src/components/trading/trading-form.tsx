"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export function TradingForm() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  
  const currentPrice = 45000 // Mock current BTC price
  const balance = {
    usd: 10000,
    btc: 0.5
  }

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0
    const priceNum = orderType === 'market' ? currentPrice : parseFloat(price) || 0
    return amountNum * priceNum
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock order submission
    console.log('Order submitted:', {
      type: orderType,
      side,
      amount: parseFloat(amount),
      price: orderType === 'limit' ? parseFloat(price) : currentPrice,
      total: calculateTotal()
    })
    
    // Reset form
    setAmount('')
    setPrice('')
  }

  return (
    <Card className="bg-trading-surface border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <ShoppingCart className="h-4 w-4" />
          Place Order
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order Type Toggle */}
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={orderType === 'market' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setOrderType('market')}
            className="flex-1"
          >
            Market
          </Button>
          <Button
            variant={orderType === 'limit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setOrderType('limit')}
            className="flex-1"
          >
            Limit
          </Button>
        </div>

        {/* Buy/Sell Toggle */}
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={side === 'buy' ? 'profit' : 'ghost'}
            size="sm"
            onClick={() => setSide('buy')}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Buy
          </Button>
          <Button
            variant={side === 'sell' ? 'loss' : 'ghost'}
            size="sm"
            onClick={() => setSide('sell')}
            className="flex-1"
          >
            <TrendingDown className="h-4 w-4 mr-1" />
            Sell
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Price Input (for limit orders) */}
          {orderType === 'limit' && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Price (USD)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
              />
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Amount (BTC)
            </label>
            <Input
              type="number"
              placeholder="0.00000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.00000001"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {['25%', '50%', '75%', '100%'].map((percentage) => (
              <Button
                key={percentage}
                variant="outline"
                size="sm"
                type="button"
                onClick={() => {
                  const percent = parseInt(percentage) / 100
                  const maxAmount = side === 'buy' 
                    ? balance.usd / (orderType === 'market' ? currentPrice : parseFloat(price) || currentPrice)
                    : balance.btc
                  setAmount((maxAmount * percent).toFixed(8))
                }}
              >
                {percentage}
              </Button>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span>
                {orderType === 'market' 
                  ? `${formatPrice(currentPrice)} (Market)`
                  : formatPrice(parseFloat(price) || 0)
                }
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span>{amount || '0.00000000'} BTC</span>
            </div>
            <div className="flex justify-between text-sm font-medium border-t border-border/50 pt-2">
              <span>Total:</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span>
              Balance: {formatPrice(balance.usd)} | {balance.btc.toFixed(8)} BTC
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            variant={side === 'buy' ? 'profit' : 'loss'}
            disabled={!amount || (orderType === 'limit' && !price)}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} BTC
          </Button>
        </form>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center">
          ⚠️ This is a demo trading interface. No real trades are executed.
        </div>
      </CardContent>
    </Card>
  )
}
