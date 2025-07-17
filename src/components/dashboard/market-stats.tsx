import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coinGeckoApi } from "@/lib/coingecko"
import { formatMarketCap, formatPercentage, getPriceChangeColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

export async function MarketStats() {
  try {
    const globalData = await coinGeckoApi.getGlobalMarketData()
    const marketData = globalData.data

    const totalMarketCap = marketData.total_market_cap.usd
    const totalVolume = marketData.total_volume.usd
    const marketCapChange = marketData.market_cap_change_percentage_24h_usd
    const btcDominance = marketData.market_cap_percentage.btc

    const stats = [
      {
        title: "Total Market Cap",
        value: formatMarketCap(totalMarketCap),
        change: marketCapChange,
        icon: DollarSign,
      },
      {
        title: "24h Volume",
        value: formatMarketCap(totalVolume),
        change: null,
        icon: Activity,
      },
      {
        title: "BTC Dominance",
        value: `${btcDominance.toFixed(1)}%`,
        change: null,
        icon: TrendingUp,
      },
      {
        title: "Active Cryptocurrencies",
        value: marketData.active_cryptocurrencies.toLocaleString(),
        change: null,
        icon: TrendingUp,
      },
    ]

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const changeColor = stat.change ? getPriceChangeColor(stat.change) : ""
          const ChangeIcon = stat.change && stat.change > 0 ? TrendingUp : TrendingDown

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                  <div className={`flex items-center text-xs ${changeColor}`}>
                    <ChangeIcon className="mr-1 h-3 w-3" />
                    {formatPercentage(stat.change)}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch market stats:', error)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-muted animate-pulse h-8 w-24 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}
