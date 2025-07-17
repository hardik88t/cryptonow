import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coinGeckoApi } from "@/lib/coingecko"
import { TrendingUp } from "lucide-react"
import Image from "next/image"

export async function TrendingCoins() {
  try {
    const trendingData = await coinGeckoApi.getTrendingCoins()
    const trendingCoins = trendingData.coins.slice(0, 7) // Show top 7

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-profit" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingCoins.map((coin, index) => (
            <div key={coin.item.id} className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground w-4">
                {index + 1}
              </div>
              <Image
                src={coin.item.thumb}
                alt={coin.item.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {coin.item.name}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  {coin.item.symbol}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                #{coin.item.market_cap_rank}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('Failed to fetch trending coins:', error)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-profit" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground w-4">{i}</div>
              <div className="w-6 h-6 bg-muted animate-pulse rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-muted animate-pulse rounded w-20 mb-1" />
                <div className="h-3 bg-muted animate-pulse rounded w-12" />
              </div>
              <div className="h-3 bg-muted animate-pulse rounded w-8" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
}
