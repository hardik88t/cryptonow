import { 
  CryptoCurrency, 
  CoinDetails, 
  MarketData, 
  TrendingResponse, 
  ChartData,
  SearchResponse 
} from '@/types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 333, // Daily limit (10,000/month ≈ 333/day)
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  requests: new Map<string, number[]>(),
};

// Cache configuration
const CACHE = new Map<string, { data: any; timestamp: number; ttl: number }>();

const CACHE_DURATION = {
  POPULAR_COINS: 60 * 1000, // 1 minute
  MARKET_DATA: 2 * 60 * 1000, // 2 minutes
  DETAILED_DATA: 5 * 60 * 1000, // 5 minutes
  TRENDING: 10 * 60 * 1000, // 10 minutes
  SEARCH: 30 * 60 * 1000, // 30 minutes
};

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

function checkRateLimit(): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  
  // Clean old requests
  const requests = RATE_LIMIT.requests.get('global') || [];
  const validRequests = requests.filter(time => time > windowStart);
  RATE_LIMIT.requests.set('global', validRequests);
  
  return validRequests.length < RATE_LIMIT.maxRequests;
}

function recordRequest(): void {
  const now = Date.now();
  const requests = RATE_LIMIT.requests.get('global') || [];
  requests.push(now);
  RATE_LIMIT.requests.set('global', requests);
}

function getCachedData<T>(key: string): T | null {
  const cached = CACHE.get(key);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > cached.ttl) {
    CACHE.delete(key);
    return null;
  }
  
  return cached.data as T;
}

function setCachedData<T>(key: string, data: T, ttl: number): void {
  CACHE.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

async function apiRequest<T>(endpoint: string, cacheTtl: number = CACHE_DURATION.MARKET_DATA): Promise<T> {
  const cacheKey = endpoint;
  
  // Check cache first
  const cached = getCachedData<T>(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Check rate limit
  if (!checkRateLimit()) {
    // Return cached data if available, even if expired
    const expiredCache = CACHE.get(cacheKey);
    if (expiredCache) {
      console.warn('Rate limit reached, returning expired cache');
      return expiredCache.data as T;
    }
    throw new RateLimitError('Rate limit exceeded and no cached data available');
  }
  
  try {
    recordRequest();
    
    const url = `${BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };
    
    if (API_KEY) {
      headers['x-cg-demo-api-key'] = API_KEY;
    }
    
    const response = await fetch(url, { headers });
    
    if (response.status === 429) {
      // Rate limited by CoinGecko
      const expiredCache = CACHE.get(cacheKey);
      if (expiredCache) {
        console.warn('CoinGecko rate limit, returning expired cache');
        return expiredCache.data as T;
      }
      throw new RateLimitError('CoinGecko rate limit exceeded');
    }
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    setCachedData(cacheKey, data, cacheTtl);
    
    return data;
  } catch (error) {
    // Try to return cached data on error
    const expiredCache = CACHE.get(cacheKey);
    if (expiredCache) {
      console.warn('API error, returning expired cache:', error);
      return expiredCache.data as T;
    }
    throw error;
  }
}

export const coinGeckoApi = {
  // Get list of cryptocurrencies with market data
  async getCoins(
    vs_currency = 'usd',
    order = 'market_cap_desc',
    per_page = 100,
    page = 1,
    sparkline = false
  ): Promise<CryptoCurrency[]> {
    const endpoint = `/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}`;
    return apiRequest<CryptoCurrency[]>(endpoint, CACHE_DURATION.POPULAR_COINS);
  },

  // Get detailed coin information
  async getCoinDetails(id: string): Promise<CoinDetails> {
    const endpoint = `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    return apiRequest<CoinDetails>(endpoint, CACHE_DURATION.DETAILED_DATA);
  },

  // Get global market data
  async getGlobalMarketData(): Promise<{ data: MarketData }> {
    const endpoint = '/global';
    return apiRequest<{ data: MarketData }>(endpoint, CACHE_DURATION.MARKET_DATA);
  },

  // Get trending coins
  async getTrendingCoins(): Promise<TrendingResponse> {
    const endpoint = '/search/trending';
    return apiRequest<TrendingResponse>(endpoint, CACHE_DURATION.TRENDING);
  },

  // Get price chart data
  async getCoinChart(
    id: string,
    vs_currency = 'usd',
    days = '7',
    interval?: string
  ): Promise<ChartData> {
    let endpoint = `/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`;
    if (interval) {
      endpoint += `&interval=${interval}`;
    }
    return apiRequest<ChartData>(endpoint, CACHE_DURATION.DETAILED_DATA);
  },

  // Search coins
  async searchCoins(query: string): Promise<SearchResponse> {
    const endpoint = `/search?query=${encodeURIComponent(query)}`;
    return apiRequest<SearchResponse>(endpoint, CACHE_DURATION.SEARCH);
  },

  // Get multiple coins by IDs (batch request)
  async getCoinsByIds(ids: string[], vs_currency = 'usd'): Promise<CryptoCurrency[]> {
    const idsString = ids.join(',');
    const endpoint = `/coins/markets?vs_currency=${vs_currency}&ids=${idsString}&order=market_cap_desc&sparkline=false`;
    return apiRequest<CryptoCurrency[]>(endpoint, CACHE_DURATION.POPULAR_COINS);
  },

  // Get rate limit status
  getRateLimitStatus() {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.windowMs;
    const requests = RATE_LIMIT.requests.get('global') || [];
    const validRequests = requests.filter(time => time > windowStart);
    
    return {
      remaining: RATE_LIMIT.maxRequests - validRequests.length,
      total: RATE_LIMIT.maxRequests,
      resetTime: windowStart + RATE_LIMIT.windowMs,
    };
  },

  // Clear cache (useful for testing)
  clearCache() {
    CACHE.clear();
  },
};
