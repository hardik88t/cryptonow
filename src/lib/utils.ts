import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Price formatting utilities for crypto trading
export function formatPrice(price: number, currency = 'USD'): string {
  if (price < 0.000001) return price.toFixed(8);
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 100) return price.toFixed(2);
  
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function formatPercentage(change: number): string {
  const formatted = Math.abs(change).toFixed(2);
  const sign = change >= 0 ? '+' : '-';
  return `${sign}${formatted}%`;
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  }
  if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  }
  if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  }
  return `$${marketCap.toFixed(2)}`;
}

export function formatVolume(volume: number): string {
  return formatMarketCap(volume); // Same formatting logic
}

export function getPriceChangeColor(change: number): string {
  if (change > 0) return 'text-profit';
  if (change < 0) return 'text-loss';
  return 'text-neutral';
}

export function validateCoinId(id: string): boolean {
  return /^[a-z0-9-]+$/.test(id) && id.length <= 50;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
