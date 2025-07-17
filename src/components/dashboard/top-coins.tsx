import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coinGeckoApi } from "@/lib/coingecko"
import { formatPrice, formatPercentage, formatMarketCap, getPriceChangeColor } from "@/lib/utils"
import { Coins } from "lucide-react"
import Image from "next/image"

export async function TopCoins() {
  try {
    // Get top 20 coins for the table
    const coins = await coinGeckoApi.getCoins('usd', 'market_cap_desc', 20, 1, false)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-profit" />
            Top Cryptocurrencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">#</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Price</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">24h %</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Market Cap</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => {
                  const changeColor = getPriceChangeColor(coin.price_change_percentage_24h)
                  
                  return (
                    <tr key={coin.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 text-sm text-muted-foreground">
                        {coin.market_cap_rank}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium text-sm">{coin.name}</div>
                            <div className="text-xs text-muted-foreground uppercase">
                              {coin.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right font-medium">
                        {formatPrice(coin.current_price)}
                      </td>
                      <td className={`py-3 text-right text-sm ${changeColor}`}>
                        {formatPercentage(coin.price_change_percentage_24h)}
                      </td>
                      <td className="py-3 text-right text-sm">
                        {formatMarketCap(coin.market_cap)}
                      </td>
                      <td className="py-3 text-right text-sm">
                        {formatMarketCap(coin.total_volume)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('Failed to fetch top coins:', error)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-profit" />
            Top Cryptocurrencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-muted animate-pulse rounded-full" />
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
