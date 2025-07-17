"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coinGeckoApi } from "@/lib/coingecko"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Calendar } from "lucide-react"

interface ChartDataPoint {
  timestamp: number
  price: number
  date: string
}

const timeframes = [
  { label: '1D', value: '1', interval: 'hourly' },
  { label: '7D', value: '7', interval: 'daily' },
  { label: '30D', value: '30', interval: 'daily' },
  { label: '90D', value: '90', interval: 'daily' },
  { label: '1Y', value: '365', interval: 'daily' },
]

export function TradingChart() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('7')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      try {
        const timeframe = timeframes.find(t => t.value === selectedTimeframe)
        const data = await coinGeckoApi.getCoinChart(
          'bitcoin', 
          'usd', 
          selectedTimeframe,
          timeframe?.interval
        )
        
        const formattedData: ChartDataPoint[] = data.prices.map(([timestamp, price]) => ({
          timestamp,
          price,
          date: new Date(timestamp).toLocaleDateString()
        }))
        
        setChartData(formattedData)
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [selectedTimeframe])

  const currentPrice = chartData[chartData.length - 1]?.price || 0
  const firstPrice = chartData[0]?.price || 0
  const priceChange = currentPrice - firstPrice
  const priceChangePercent = firstPrice ? (priceChange / firstPrice) * 100 : 0
  const isPositive = priceChange >= 0

  return (
    <Card className="bg-card border-border/50 h-[500px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            BTC/USD Chart
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.value)}
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
        
        {!isLoading && chartData.length > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1 ${isPositive ? 'text-profit' : 'text-loss'}`}>
              <span>Change: </span>
              <span className="font-medium">
                {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
              </span>
              <span className="text-muted-foreground">
                (${priceChange.toFixed(2)})
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0 h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp)
                  if (selectedTimeframe === '1') {
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
                }}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#00ff88' : '#ff4757'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: isPositive ? '#00ff88' : '#ff4757' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">No chart data available</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
