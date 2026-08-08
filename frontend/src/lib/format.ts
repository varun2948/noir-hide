const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatPrice(value: number | string): string {
  const amount = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(amount)) return '$0'
  return currencyFormatter.format(amount)
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min)
  return `${formatPrice(min)} – ${formatPrice(max)}`
}

export function parsePrice(value: number | string): number {
  const amount = typeof value === 'string' ? Number(value) : value
  return Number.isFinite(amount) ? amount : 0
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
