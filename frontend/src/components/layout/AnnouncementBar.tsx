import { useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'noir-hide-announcement-dismissed'

interface AnnouncementBarProps {
  message?: string
  dismissible?: boolean
}

export function AnnouncementBar({
  message = 'Complimentary leather conditioning kit with orders over $250.',
  dismissible = true,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined' || !dismissible) return false
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  if (dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative z-[60] bg-oxblood text-parchment">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2.5 sm:px-6">
        <p className="label-caps text-center text-[0.65rem] tracking-[0.18em] text-parchment/95 sm:text-[0.7rem]">
          {message}
        </p>
        {dismissible ? (
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-parchment/70 transition-colors hover:text-parchment sm:right-5"
            aria-label="Dismiss announcement"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
