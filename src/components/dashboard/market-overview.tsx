import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coinGeckoApi } from "@/lib/coingecko"
import { formatPrice, formatPercentage, getPriceChangeColor } from "@/lib/utils"
import { BarChart3 } from "lucide-react"
import Image from "next/image"

export async function MarketOverview() {
  try {
    // Get top 10 coins for market overview
    const coins = await coinGeckoApi.getCoins('usd', 'market_cap_desc', 10, 1, false)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-profit" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coins.map((coin) => {
              const changeColor = getPriceChangeColor(coin.price_change_percentage_24h)
              
              return (
                <div key={coin.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-muted-foreground uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">
                      {formatPrice(coin.current_price)}
                    </div>
                    <div className={`text-sm ${changeColor}`}>
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('Failed to fetch market overview:', error)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-profit" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
                  <div>
                    <div className="h-4 bg-muted animate-pulse rounded w-20 mb-1" />
                    <div className="h-3 bg-muted animate-pulse rounded w-12" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-muted animate-pulse rounded w-16 mb-1" />
                  <div className="h-3 bg-muted animate-pulse rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
}
