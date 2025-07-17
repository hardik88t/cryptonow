import { Suspense } from "react"
import { MarketSearch } from "@/components/markets/market-search"
import { MarketFilters } from "@/components/markets/market-filters"
import { MarketTable } from "@/components/markets/market-table"
import { MarketStats } from "@/components/dashboard/market-stats"

export default function MarketsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
        <div className="text-sm text-muted-foreground">
          Comprehensive cryptocurrency market data
        </div>
      </div>

      <Suspense fallback={<div>Loading market stats...</div>}>
        <MarketStats />
      </Suspense>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80">
          <div className="space-y-6">
            <MarketSearch />
            <MarketFilters />
          </div>
        </div>

        <div className="flex-1">
          <Suspense fallback={<div>Loading market data...</div>}>
            <MarketTable />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
