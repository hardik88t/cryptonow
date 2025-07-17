import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Price formatting utilities for crypto trading
export function formatPrice(price: number, currency = 'USD'): string {
  // Handle undefined, null, or NaN values
  if (price == null || isNaN(price)) return '$0.00';

  // Handle negative values
  const absPrice = Math.abs(price);

  if (absPrice < 0.000001) return absPrice.toFixed(8);
  if (absPrice < 0.01) return absPrice.toFixed(6);
  if (absPrice < 1) return absPrice.toFixed(4);
  if (absPrice < 100) return absPrice.toFixed(2);

  try {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    // Fallback if toLocaleString fails
    return `$${price.toFixed(2)}`;
  }
}

export function formatPercentage(change: number): string {
  // Handle undefined, null, or NaN values
  if (change == null || isNaN(change)) return '0.00%';

  const formatted = Math.abs(change).toFixed(2);
  const sign = change >= 0 ? '+' : '-';
  return `${sign}${formatted}%`;
}

export function formatMarketCap(marketCap: number): string {
  // Handle undefined, null, or NaN values
  if (marketCap == null || isNaN(marketCap)) return '$0.00';

  const absValue = Math.abs(marketCap);

  if (absValue >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  }
  if (absValue >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  }
  return `$${marketCap.toFixed(2)}`;
}

export function formatVolume(volume: number): string {
  return formatMarketCap(volume); // Same formatting logic
}

export function getPriceChangeColor(change: number): string {
  // Handle undefined, null, or NaN values
  if (change == null || isNaN(change)) return 'text-neutral';

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
