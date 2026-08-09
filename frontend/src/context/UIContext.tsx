import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const FAVORITES_KEY = 'mocchi-favorites'

interface UIContextValue {
  isMobileNavOpen: boolean
  isSearchOpen: boolean
  favorites: number[]
  openMobileNav: () => void
  closeMobileNav: () => void
  toggleMobileNav: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
}

const UIContext = createContext<UIContextValue | null>(null)

function loadFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as number[]
    return Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : []
  } catch {
    return []
  }
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setFavorites(loadFavorites())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites, hydrated])

  useEffect(() => {
    if (!isMobileNavOpen && !isSearchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false)
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobileNavOpen, isSearchOpen])

  const openMobileNav = useCallback(() => {
    setIsSearchOpen(false)
    setIsMobileNavOpen(true)
  }, [])
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), [])
  const toggleMobileNav = useCallback(
    () =>
      setIsMobileNavOpen((open) => {
        if (!open) setIsSearchOpen(false)
        return !open
      }),
    [],
  )

  const openSearch = useCallback(() => {
    setIsMobileNavOpen(false)
    setIsSearchOpen(true)
  }, [])
  const closeSearch = useCallback(() => setIsSearchOpen(false), [])
  const toggleSearch = useCallback(
    () =>
      setIsSearchOpen((open) => {
        if (!open) setIsMobileNavOpen(false)
        return !open
      }),
    [],
  )

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }, [])

  const isFavorite = useCallback(
    (productId: number) => favorites.includes(productId),
    [favorites],
  )

  const clearFavorites = useCallback(() => setFavorites([]), [])

  const value = useMemo(
    () => ({
      isMobileNavOpen,
      isSearchOpen,
      favorites,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      openSearch,
      closeSearch,
      toggleSearch,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [
      isMobileNavOpen,
      isSearchOpen,
      favorites,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      openSearch,
      closeSearch,
      toggleSearch,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    ],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext)
  if (!ctx) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return ctx
}
