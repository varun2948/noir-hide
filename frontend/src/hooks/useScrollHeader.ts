import { useEffect, useState } from 'react'

interface UseScrollHeaderOptions {
  /** Pixels scrolled before header is considered "scrolled". Default 24. */
  threshold?: number
}

interface ScrollHeaderState {
  isScrolled: boolean
  isHidden: boolean
  scrollY: number
}

/** Tracks scroll for sticky header show/hide and scrolled styling. */
export function useScrollHeader(
  options: UseScrollHeaderOptions = {},
): ScrollHeaderState {
  const threshold = options.threshold ?? 24
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    isHidden: false,
    scrollY: 0,
  })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const isScrolled = y > threshold
      const isHidden = y > lastY && y > threshold + 80
      lastY = y
      setState({ isScrolled, isHidden, scrollY: y })
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
