import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coinGeckoApi } from "@/lib/coingecko"
import { formatPrice, formatPercentage, formatMarketCap, getPriceChangeColor } from "@/lib/utils"
import { ArrowUpDown, Star, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

export async function MarketTable() {
  try {
    // Get top 100 coins for comprehensive market data
    const coins = await coinGeckoApi.getCoins('usd', 'market_cap_desc', 100, 1, false)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Cryptocurrency Markets</span>
            <div className="text-sm text-muted-foreground">
              {coins.length} cryptocurrencies
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground w-12">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      <Star className="h-4 w-4" />
                    </Button>
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">#</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">
                    <Button variant="ghost" size="sm" className="h-8 p-1">
                      Price <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">
                    <Button variant="ghost" size="sm" className="h-8 p-1">
                      24h % <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">
                    <Button variant="ghost" size="sm" className="h-8 p-1">
                      Market Cap <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">
                    <Button variant="ghost" size="sm" className="h-8 p-1">
                      Volume (24h) <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">
                    Circulating Supply
                  </th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-center">
                    Last 7 Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => {
                  const changeColor = getPriceChangeColor(coin.price_change_percentage_24h)
                  const ChangeIcon = coin.price_change_percentage_24h > 0 ? TrendingUp : TrendingDown
                  
                  return (
                    <tr key={coin.id} className="border-b hover:bg-muted/50 group">
                      <td className="py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {coin.market_cap_rank}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={32}
                            height={32}
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
                      <td className="py-4 text-right font-medium">
                        {formatPrice(coin.current_price)}
                      </td>
                      <td className={`py-4 text-right text-sm ${changeColor}`}>
                        <div className="flex items-center justify-end gap-1">
                          <ChangeIcon className="h-3 w-3" />
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </div>
                      </td>
                      <td className="py-4 text-right text-sm">
                        {formatMarketCap(coin.market_cap)}
                      </td>
                      <td className="py-4 text-right text-sm">
                        {formatMarketCap(coin.total_volume)}
                      </td>
                      <td className="py-4 text-right text-sm">
                        <div>
                          {coin.circulating_supply.toLocaleString(undefined, {
                            maximumFractionDigits: 0
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {coin.symbol}
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="w-20 h-12 bg-muted/30 rounded flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Chart</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing 1-{coins.length} of 9,000+ cryptocurrencies
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-muted-foreground">
              Failed to load market data. Please try again later.
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}
