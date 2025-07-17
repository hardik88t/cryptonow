"use client"

import { useState } from "react"
import { Filter, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FilterState {
  priceChange: 'all' | 'gainers' | 'losers'
  marketCap: 'all' | 'large' | 'mid' | 'small'
  volume: 'all' | 'high' | 'medium' | 'low'
}

export function MarketFilters() {
  const [filters, setFilters] = useState<FilterState>({
    priceChange: 'all',
    marketCap: 'all',
    volume: 'all'
  })

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    // TODO: Emit filter change event or update URL params
  }

  const resetFilters = () => {
    setFilters({
      priceChange: 'all',
      marketCap: 'all',
      volume: 'all'
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs"
            >
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Change Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Price Change (24h)
          </h4>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Coins' },
              { value: 'gainers', label: 'Gainers Only', icon: TrendingUp, color: 'text-profit' },
              { value: 'losers', label: 'Losers Only', icon: TrendingDown, color: 'text-loss' }
            ].map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.value}
                  variant={filters.priceChange === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => updateFilter('priceChange', option.value as FilterState['priceChange'])}
                  className={`w-full justify-start ${option.color || ''}`}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Market Cap Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Market Cap
          </h4>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Sizes' },
              { value: 'large', label: 'Large Cap (>$10B)' },
              { value: 'mid', label: 'Mid Cap ($1B-$10B)' },
              { value: 'small', label: 'Small Cap (<$1B)' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={filters.marketCap === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter('marketCap', option.value as FilterState['marketCap'])}
                className="w-full justify-start"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Volume (24h)</h4>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Volumes' },
              { value: 'high', label: 'High Volume (>$1B)' },
              { value: 'medium', label: 'Medium Volume ($100M-$1B)' },
              { value: 'low', label: 'Low Volume (<$100M)' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={filters.volume === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter('volume', option.value as FilterState['volume'])}
                className="w-full justify-start"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Quick Filters</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({
                  priceChange: 'gainers',
                  marketCap: 'large',
                  volume: 'high'
                })
              }}
              className="justify-start"
            >
              🚀 Top Performers
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({
                  priceChange: 'all',
                  marketCap: 'small',
                  volume: 'medium'
                })
              }}
              className="justify-start"
            >
              💎 Hidden Gems
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
