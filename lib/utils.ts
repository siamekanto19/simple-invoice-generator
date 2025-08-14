import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })
  const parts = formatter.formatToParts(0)
  const currencyPart = parts.find((part) => part.type === 'currency')
  return currencyPart ? currencyPart.value : ''
}
