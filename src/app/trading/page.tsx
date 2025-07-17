import { Suspense } from "react"
import { TradingHeader } from "@/components/trading/trading-header"
import { TradingChart } from "@/components/trading/trading-chart"
import { OrderBook } from "@/components/trading/order-book"
import { TradeHistory } from "@/components/trading/trade-history"
import { TradingForm } from "@/components/trading/trading-form"

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-trading-background">
      <div className="container mx-auto p-4 space-y-4">
        <Suspense fallback={<div>Loading trading data...</div>}>
          <TradingHeader />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Main Chart Area */}
          <div className="lg:col-span-3 space-y-4">
            <Suspense fallback={<div>Loading chart...</div>}>
              <TradingChart />
            </Suspense>

            <Suspense fallback={<div>Loading trade history...</div>}>
              <TradeHistory />
            </Suspense>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <Suspense fallback={<div>Loading order book...</div>}>
              <OrderBook />
            </Suspense>

            <TradingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
