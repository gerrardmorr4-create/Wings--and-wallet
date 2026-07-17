/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CurrencyMode = 'original' | 'EUR' | 'USD' | 'local';

export interface CurrencyMeta {
  symbol: string;
  code: string;
  rateFromEUR: number; // 1 EUR = Rate of currency
}

export const LOCAL_CURRENCIES: Record<string, CurrencyMeta> = {
  'Nigeria': { symbol: '₦', code: 'NGN', rateFromEUR: 1650 },
  'Ghana': { symbol: 'GH₵', code: 'GHS', rateFromEUR: 16.5 },
  'Senegal': { symbol: 'CFA ', code: 'XOF', rateFromEUR: 655.957 },
  'Ivory Coast': { symbol: 'CFA ', code: 'XOF', rateFromEUR: 655.957 },
  'DR Congo': { symbol: 'FC ', code: 'CDF', rateFromEUR: 3050 },
  'Kenya': { symbol: 'KSh ', code: 'KES', rateFromEUR: 140 },
};

/**
 * Converts a raw amount from GBP/EUR into EUR, USD, or local African currency.
 */
export function convertAmount(
  amount: number,
  fromSymbol: '£' | '€',
  targetCurrency: CurrencyMode,
  destinationCountry: string
): string {
  if (targetCurrency === 'original') {
    return `${fromSymbol}${amount}`;
  }

  // Convert to EUR pivot
  let amountInEUR = amount;
  if (fromSymbol === '£') {
    amountInEUR = amount * 1.18; // 1 GBP ≈ 1.18 EUR
  }

  if (targetCurrency === 'EUR') {
    return `€${Math.round(amountInEUR)}`;
  }

  if (targetCurrency === 'USD') {
    return `$${Math.round(amountInEUR * 1.09)}`; // 1 EUR ≈ 1.09 USD
  }

  if (targetCurrency === 'local') {
    const countryKey = Object.keys(LOCAL_CURRENCIES).find(
      (key) => key.toLowerCase() === destinationCountry.trim().toLowerCase()
    );
    const meta = countryKey ? LOCAL_CURRENCIES[countryKey] : null;
    
    if (meta) {
      const convertedValue = amountInEUR * meta.rateFromEUR;
      const formatted = Math.round(convertedValue).toLocaleString('en-US');
      return `${meta.symbol}${formatted} ${meta.code}`;
    }
    
    // Fallback to EUR if destination not registered
    return `€${Math.round(amountInEUR)}`;
  }

  return `${fromSymbol}${amount}`;
}

/**
 * Parses a string and converts any prices found (e.g., £495, €540) to the target currency.
 */
export function convertString(
  text: string | undefined | null,
  targetCurrency: CurrencyMode,
  destinationCountry: string
): string {
  if (!text) return '';
  if (targetCurrency === 'original') return text;

  // Matches symbol (£ or €) optionally followed by space, and then digits
  return text.replace(/([£€])\s*(\d+)/g, (match, symbol, valueStr) => {
    const value = parseInt(valueStr, 10);
    if (isNaN(value)) return match;
    return convertAmount(value, symbol as '£' | '€', targetCurrency, destinationCountry);
  });
}
