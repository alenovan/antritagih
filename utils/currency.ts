/**
 * Format number as Indonesian Rupiah (IDR) currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export function formatIDR(
  amount: number | undefined | null,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean;
  } = {}
): string {
  if (amount === undefined || amount === null) {
    return "Rp 0";
  }

  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    compact = false,
  } = options;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits,
    maximumFractionDigits,
    notation: compact ? "compact" : "standard",
  });

  return formatter.format(amount);
}

/**
 * Format number with thousand separators (without currency symbol)
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export function formatNumber(
  amount: number | undefined | null,
  decimals: number = 0
): string {
  if (amount === undefined || amount === null) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format as compact IDR (e.g., Rp 1,2 jt for 1,200,000)
 * @param amount - The amount to format
 * @returns Compact formatted currency string
 */
export function formatIDRCompact(amount: number | undefined | null): string {
  return formatIDR(amount, { compact: true });
}

/**
 * Format IDR with decimals
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string with decimals
 */
export function formatIDRWithDecimals(
  amount: number | undefined | null,
  decimals: number = 2
): string {
  return formatIDR(amount, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
} 