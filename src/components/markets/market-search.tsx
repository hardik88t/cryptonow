"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coinGeckoApi } from "@/lib/coingecko"
import { debounce } from "@/lib/utils"
import { SearchResult } from "@/types/crypto"
import Image from "next/image"

export function MarketSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    try {
      const searchResponse = await coinGeckoApi.searchCoins(searchQuery)
      setResults(searchResponse.coins.slice(0, 10)) // Show top 10 results
      setShowResults(true)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Cryptocurrencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coins..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className="text-sm text-muted-foreground">Searching...</div>
          </div>
        )}

        {showResults && results.length > 0 && (
          <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
            {results.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => {
                  // TODO: Navigate to coin detail or add to watchlist
                  console.log('Selected coin:', coin.id)
                }}
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {coin.name}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">
                    {coin.symbol}
                  </div>
                </div>
                {coin.market_cap_rank && (
                  <div className="text-xs text-muted-foreground">
                    #{coin.market_cap_rank}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showResults && results.length === 0 && !isLoading && query.length >= 2 && (
          <div className="text-center py-4">
            <div className="text-sm text-muted-foreground">No results found</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
