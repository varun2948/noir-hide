import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '@/types'
import { parsePrice } from '@/lib/format'

const STORAGE_KEY = 'noir-hide-cart'

interface AddToCartInput {
  product: Product
  quantity?: number
  color?: string
  size?: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isDrawerOpen: boolean
  addItem: (input: AddToCartInput) => void
  removeItem: (productId: number, size?: string, color?: string) => void
  updateQuantity: (
    productId: number,
    quantity: number,
    size?: string,
    color?: string,
  ) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function itemKey(productId: number, size?: string, color?: string) {
  return `${productId}::${size ?? ''}::${color ?? ''}`
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback(({ product, quantity = 1, color, size }: AddToCartInput) => {
    const image =
      product.primary_image ||
      product.images.find((img) => img.is_primary)?.url ||
      product.images[0]?.url ||
      ''

    setItems((prev) => {
      const key = itemKey(product.id, size, color)
      const existing = prev.find(
        (item) => itemKey(item.productId, item.size, item.color) === key,
      )
      if (existing) {
        return prev.map((item) =>
          itemKey(item.productId, item.size, item.color) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: parsePrice(product.price),
          image,
          color,
          size,
          quantity,
        },
      ]
    })
    setIsDrawerOpen(true)
  }, [])

  const removeItem = useCallback(
    (productId: number, size?: string, color?: string) => {
      const key = itemKey(productId, size, color)
      setItems((prev) =>
        prev.filter(
          (item) => itemKey(item.productId, item.size, item.color) !== key,
        ),
      )
    },
    [],
  )

  const updateQuantity = useCallback(
    (
      productId: number,
      quantity: number,
      size?: string,
      color?: string,
    ) => {
      const key = itemKey(productId, size, color)
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter(
            (item) => itemKey(item.productId, item.size, item.color) !== key,
          ),
        )
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          itemKey(item.productId, item.size, item.color) === key
            ? { ...item, quantity }
            : item,
        ),
      )
    },
    [],
  )

  const clearCart = useCallback(() => setItems([]), [])
  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const toggleDrawer = useCallback(
    () => setIsDrawerOpen((open) => !open),
    [],
  )

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
    }),
    [
      items,
      itemCount,
      subtotal,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
