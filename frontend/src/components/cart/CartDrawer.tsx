import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/Button'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
  } = useCart()
  const reducedMotion = useReducedMotion()
  const [checkoutMessage, setCheckoutMessage] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isDrawerOpen) {
      setCheckoutMessage(false)
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isDrawerOpen, closeDrawer])

  const duration = reducedMotion ? 0 : 0.35

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="Close bag"
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={closeDrawer}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bone text-espresso shadow-2xl"
            initial={reducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: '100%' }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-dashed border-brass/40 px-5 py-4">
              <div>
                <SectionLabel id={titleId}>Your bag</SectionLabel>
                <p className="mt-1 font-sans text-xs text-espresso/50">
                  {itemCount === 0
                    ? 'Empty'
                    : `${itemCount} ${itemCount === 1 ? 'piece' : 'pieces'}`}
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                className="p-2 text-espresso/70 transition-colors hover:text-oxblood"
                aria-label="Close bag"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag
                  className="mb-4 size-10 text-brass/60"
                  strokeWidth={1.2}
                />
                <p className="font-display text-2xl text-espresso">
                  Your bag is empty
                </p>
                <p className="mt-2 max-w-xs font-serif text-sm italic text-espresso/55">
                  The last is waiting. Browse the shop and add a pair built to
                  age with you.
                </p>
                <Link
                  to="/shop"
                  onClick={closeDrawer}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-[6px] border border-espresso bg-espresso px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:bg-charcoal"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-0 overflow-y-auto px-5 py-2">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.size ?? ''}-${item.color ?? ''}`}
                      className="border-b border-dashed border-brass/30 py-5"
                    >
                      <div className="flex gap-4">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeDrawer}
                          className="size-20 shrink-0 overflow-hidden bg-parchment sm:size-24"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : null}
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link
                                to={`/product/${item.slug}`}
                                onClick={closeDrawer}
                                className="font-display text-lg leading-snug text-espresso hover:text-leather"
                              >
                                {item.name}
                              </Link>
                              {(item.size || item.color) && (
                                <p className="mt-1 font-sans text-xs text-espresso/50">
                                  {[item.color, item.size && `Size ${item.size}`]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </p>
                              )}
                            </div>
                            <p className="shrink-0 font-sans text-sm text-espresso/80">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-espresso/20">
                              <button
                                type="button"
                                className="p-2 text-espresso/70 hover:text-espresso"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                    item.size,
                                    item.color,
                                  )
                                }
                              >
                                <Minus className="size-3.5" strokeWidth={1.5} />
                              </button>
                              <span className="min-w-[2rem] text-center font-sans text-sm tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="p-2 text-espresso/70 hover:text-espresso"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                    item.size,
                                    item.color,
                                  )
                                }
                              >
                                <Plus className="size-3.5" strokeWidth={1.5} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  item.productId,
                                  item.size,
                                  item.color,
                                )
                              }
                              className="label-caps text-[0.6rem] tracking-[0.16em] text-espresso/45 transition-colors hover:text-oxblood"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-dashed border-brass/40 bg-parchment/40 px-5 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="label-caps text-espresso/55">Subtotal</span>
                    <span className="font-display text-2xl text-espresso">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-xs text-espresso/45">
                    Shipping calculated at checkout. Free domestic over $250.
                  </p>

                  <StitchedDivider className="my-4" />

                  {checkoutMessage ? (
                    <div
                      role="status"
                      className="border border-dashed border-brass/50 bg-bone px-4 py-4 text-center"
                    >
                      <p className="font-display text-xl text-espresso">
                        Order reserved — mock only
                      </p>
                      <p className="mt-2 font-serif text-sm italic leading-relaxed text-espresso/60">
                        This is a demonstration atelier. No payment was taken.
                        Your selection remains in the bag for browsing.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                        onClick={() => setCheckoutMessage(false)}
                      >
                        Continue browsing
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="oxblood"
                      fullWidth
                      onClick={() => setCheckoutMessage(true)}
                    >
                      Proceed to checkout
                    </Button>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
