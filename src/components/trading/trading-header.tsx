import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coinGeckoApi } from "@/lib/coingecko"
import { formatPrice, formatPercentage, formatVolume, getPriceChangeColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, Star, BarChart3 } from "lucide-react"
import Image from "next/image"

export async function TradingHeader() {
  try {
    // Get Bitcoin data as the default trading pair
    const bitcoinData = await coinGeckoApi.getCoinDetails('bitcoin')
    const coin = bitcoinData

    // Safely access nested properties with fallbacks
    const priceChangePercent = coin.market_data?.price_change_percentage_24h?.usd || 0
    const priceChange24h = coin.market_data?.price_change_24h?.usd || 0
    const currentPrice = coin.market_data?.current_price?.usd || 0
    const high24h = coin.market_data?.high_24h?.usd || 0
    const low24h = coin.market_data?.low_24h?.usd || 0
    const volume24h = coin.market_data?.total_volume?.usd || 0

    const changeColor = getPriceChangeColor(priceChangePercent)
    const ChangeIcon = priceChangePercent > 0 ? TrendingUp : TrendingDown

    return (
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={coin.image.large}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{coin.name}</h1>
                    <span className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Rank #{coin.market_cap_rank}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-2xl font-bold">
                    {formatPrice(currentPrice)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
                    <ChangeIcon className="h-4 w-4" />
                    {formatPercentage(priceChangePercent)}
                    <span className="text-muted-foreground">
                      ({priceChange24h >= 0 ? '+' : ''}{formatPrice(Math.abs(priceChange24h))})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-muted-foreground">24h High</div>
                    <div className="font-medium">
                      {formatPrice(high24h)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">24h Low</div>
                    <div className="font-medium">
                      {formatPrice(low24h)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">24h Volume</div>
                    <div className="font-medium">
                      {formatVolume(volume24h)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Indicators
              </Button>
              <Button variant="outline" size="sm">
                Timeframe
              </Button>
              <Button variant="outline" size="sm">
                Fullscreen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('Failed to fetch trading header data:', error)
    return (
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
              <div>
                <div className="h-6 bg-muted animate-pulse rounded w-32 mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-20" />
              </div>
            </div>
            <div className="h-8 bg-muted animate-pulse rounded w-40" />
          </div>
        </CardContent>
      </Card>
    )
  }
}
