import { Suspense } from "react"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { TrendingCoins } from "@/components/dashboard/trending-coins"
import { TopCoins } from "@/components/dashboard/top-coins"
import { MarketStats } from "@/components/dashboard/market-stats"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Real-time cryptocurrency market data
        </div>
      </div>

      <Suspense fallback={<div>Loading market stats...</div>}>
        <MarketStats />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading market overview...</div>}>
            <MarketOverview />
          </Suspense>
        </div>
        
        <div className="space-y-6">
          <Suspense fallback={<div>Loading trending coins...</div>}>
            <TrendingCoins />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div>Loading top coins...</div>}>
        <TopCoins />
      </Suspense>
    </div>
  )
}
