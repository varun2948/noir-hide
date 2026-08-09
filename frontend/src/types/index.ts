export type ProductCategory =
  | 'boots'
  | 'oxfords'
  | 'loafers'
  | 'sneakers'
  | 'care'

export type StockStatus =
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'made_to_order'

export interface ProductImage {
  id: number
  url: string
  alt: string
  is_primary: boolean
  order: number
}

export interface ProductColor {
  id: number
  name: string
  hex: string
  image_url?: string
}

export interface ProductSize {
  id: number
  size: string
  in_stock: boolean
}

export interface Product {
  id: number
  slug: string
  name: string
  category: ProductCategory
  price: number | string
  description: string
  leather_type: string
  construction: string
  material_info: string
  care_info: string
  shipping_info: string
  stock_status: StockStatus
  is_featured: boolean
  featured_order: number
  collection: string
  created_at?: string
  images: ProductImage[]
  colors: ProductColor[]
  sizes: ProductSize[]
  primary_image?: string | null
}

export interface Material {
  id: number
  slug: string
  name: string
  sample_number: string
  description: string
  durability_rating: number
  aging_behavior: string
  care_recommendation: string
  typical_products: string
  texture_image_url: string
}

export interface JournalArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  category_label: string
  published_at: string
}

export interface Testimonial {
  id: number
  quote: string
  attribution: string
  product_name: string
  location: string
  order: number
}

export interface CartItem {
  productId: number
  slug: string
  name: string
  price: number
  image: string
  color?: string
  size?: string
  quantity: number
}

export interface Collection {
  name: string
  slug: string
  description?: string
  image?: string
}

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export const BRAND = {
  name: 'Mocchi',
  tagline: 'Crafted by hand. Shaped by time.',
} as const
