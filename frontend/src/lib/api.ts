import { journalArticles } from '@/data/journal'
import { materials } from '@/data/materials'
import { collections } from '@/data/navigation'
import { getProductBySlug, products } from '@/data/products'
import { testimonials } from '@/data/testimonials'
import type {
  Collection,
  JournalArticle,
  Material,
  Product,
  Testimonial,
} from '@/types'

// Resolve the API base URL. Supports:
//  - unset -> same-origin `/api` (local Vite proxy / same-host deploys)
//  - full URL (e.g. https://api.example.com/api) -> used as-is
//  - bare host (e.g. noirhide-api.onrender.com) -> https://<host>/api
//    (Render blueprints can only inject another service's host)
function resolveApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE as string | undefined
  if (!raw) return '/api'
  const value = raw.trim()
  if (!value) return '/api'
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value.replace(/\/$/, '')
  }
  return `https://${value.replace(/\/$/, '')}/api`
}

const API_BASE = resolveApiBase()

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type QueryValue = string | number | boolean | undefined | null

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!res.ok) {
    throw new ApiError(`API ${res.status}: ${path}`, res.status)
  }

  return res.json() as Promise<T>
}

function toQuery(params?: Record<string, QueryValue>): string {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

function unwrapList<T>(data: T[] | { results: T[] }): T[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && Array.isArray(data.results)) {
    return data.results
  }
  return []
}

function filterLocalProducts(
  params?: Record<string, QueryValue>,
): Product[] {
  let list = [...products]

  if (params?.category) {
    list = list.filter(
      (p) => p.category === String(params.category).toLowerCase(),
    )
  }
  if (params?.collection) {
    const c = String(params.collection).toLowerCase()
    list = list.filter((p) => p.collection.toLowerCase().replace(/\s+/g, '-') === c
      || p.collection.toLowerCase() === c)
  }
  if (params?.material || params?.leather_type) {
    const m = String(params.material ?? params.leather_type).toLowerCase()
    list = list.filter((p) => p.leather_type.toLowerCase().includes(m))
  }
  if (params?.color) {
    const color = String(params.color).toLowerCase()
    list = list.filter((p) =>
      p.colors.some(
        (c) =>
          c.name.toLowerCase().includes(color) ||
          c.hex.toLowerCase() === color,
      ),
    )
  }
  if (params?.size) {
    const size = String(params.size)
    list = list.filter((p) =>
      p.sizes.some((s) => s.size === size && s.in_stock),
    )
  }
  if (params?.search) {
    const q = String(params.search).toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.leather_type.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q),
    )
  }
  if (params?.min_price != null) {
    const min = Number(params.min_price)
    list = list.filter((p) => Number(p.price) >= min)
  }
  if (params?.max_price != null) {
    const max = Number(params.max_price)
    list = list.filter((p) => Number(p.price) <= max)
  }

  const ordering = params?.ordering ? String(params.ordering) : null
  if (ordering === 'price') {
    list.sort((a, b) => Number(a.price) - Number(b.price))
  } else if (ordering === '-price') {
    list.sort((a, b) => Number(b.price) - Number(a.price))
  } else if (ordering === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (ordering === '-name') {
    list.sort((a, b) => b.name.localeCompare(a.name))
  } else if (ordering === 'featured_order') {
    list.sort((a, b) => a.featured_order - b.featured_order)
  }

  return list
}

export async function fetchProducts(
  params?: Record<string, QueryValue>,
): Promise<Product[]> {
  try {
    const data = await request<Product[] | { results: Product[] }>(
      `/products/${toQuery(params)}`,
    )
    return unwrapList(data)
  } catch {
    return filterLocalProducts(params)
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const data = await request<Product[] | { results: Product[] }>(
      '/products/featured/',
    )
    return unwrapList(data)
  } catch {
    return products
      .filter((p) => p.is_featured)
      .sort((a, b) => a.featured_order - b.featured_order)
  }
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    return await request<Product>(`/products/${slug}/`)
  } catch {
    return getProductBySlug(slug) ?? null
  }
}

export async function fetchMaterials(): Promise<Material[]> {
  try {
    const data = await request<Material[] | { results: Material[] }>(
      '/materials/',
    )
    return unwrapList(data)
  } catch {
    return materials
  }
}

export async function fetchMaterial(slug: string): Promise<Material | null> {
  try {
    return await request<Material>(`/materials/${slug}/`)
  } catch {
    return materials.find((m) => m.slug === slug) ?? null
  }
}

export async function fetchJournalArticles(): Promise<JournalArticle[]> {
  try {
    const data = await request<
      JournalArticle[] | { results: JournalArticle[] }
    >('/journal/')
    return unwrapList(data)
  } catch {
    return journalArticles
  }
}

export async function fetchJournalArticle(
  slug: string,
): Promise<JournalArticle | null> {
  try {
    return await request<JournalArticle>(`/journal/${slug}/`)
  } catch {
    return journalArticles.find((a) => a.slug === slug) ?? null
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await request<Testimonial[] | { results: Testimonial[] }>(
      '/testimonials/',
    )
    return unwrapList(data)
  } catch {
    return testimonials
  }
}

export async function fetchCollections(): Promise<Collection[]> {
  try {
    const data = await request<Collection[]>('/collections/')
    return data
  } catch {
    return collections
  }
}

export async function subscribeNewsletter(
  email: string,
): Promise<{ detail: string; email: string }> {
  try {
    return await request<{ detail: string; email: string }>(
      '/newsletter/subscribe/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
    )
  } catch (err) {
    if (err instanceof ApiError && err.status === 400) {
      throw err
    }
    // Offline / API down — accept locally for UX continuity
    return {
      detail:
        'Welcome to the atelier list. Crafted by hand. Shaped by time.',
      email,
    }
  }
}

export { API_BASE }
