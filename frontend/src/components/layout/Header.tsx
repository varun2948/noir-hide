import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useUI } from '@/context/UIContext'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { primaryNav, BRAND } from '@/data/navigation'

export function Header() {
  const { pathname } = useLocation()
  const { isScrolled, isHidden } = useScrollHeader({ threshold: 24 })
  const { itemCount, openDrawer } = useCart()
  const { openMobileNav, openSearch } = useUI()

  const isHome = pathname === '/'
  const overHero = isHome && !isScrolled
  const solid = isScrolled

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b backdrop-blur-md transition-[transform,background-color,box-shadow,color,border-color] duration-300',
        isHidden && !overHero ? '-translate-y-full' : 'translate-y-0',
        solid
          ? 'border-espresso/12 bg-bone/95 text-espresso shadow-[0_8px_30px_-18px_rgba(17,16,15,0.22)]'
          : overHero
            ? 'border-espresso/8 bg-bone/72 text-espresso'
            : 'border-espresso/10 bg-bone/88 text-espresso',
      ].join(' ')}
    >
      <div className="mx-auto grid h-[4.25rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:h-[4.75rem] lg:px-8">
        {/* Left — desktop nav / mobile menu */}
        <div className="flex items-center gap-1 justify-self-start">
          <button
            type="button"
            onClick={openMobileNav}
            className="inline-flex items-center justify-center p-2 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" strokeWidth={1.4} />
          </button>

          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Primary"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="label-caps text-[0.68rem] tracking-[0.14em] text-espresso/70 transition-colors hover:text-espresso"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center wordmark */}
        <Link
          to="/"
          className="justify-self-center text-center"
          aria-label={`${BRAND.name} home`}
        >
          <span className="font-display text-[1.35rem] font-medium tracking-[0.2em] text-espresso sm:text-[1.55rem] lg:text-[1.7rem]">
            {BRAND.name}
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1 justify-self-end sm:gap-2">
          <button
            type="button"
            onClick={openSearch}
            className="inline-flex items-center justify-center p-2 text-espresso/75 transition-colors hover:text-espresso"
            aria-label="Search"
          >
            <Search className="size-[1.15rem]" strokeWidth={1.4} />
          </button>

          <Link
            to="/account"
            className="hidden items-center justify-center p-2 text-espresso/75 transition-colors hover:text-espresso sm:inline-flex"
            aria-label="Account"
          >
            <User className="size-[1.15rem]" strokeWidth={1.4} />
          </Link>

          <button
            type="button"
            onClick={openDrawer}
            className="relative inline-flex items-center justify-center p-2 text-espresso/75 transition-colors hover:text-espresso"
            aria-label={`Bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-[1.15rem]" strokeWidth={1.4} />
            {itemCount > 0 ? (
              <span
                className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-[3px] bg-espresso font-sans text-[0.6rem] font-medium leading-none text-bone"
              >
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="mx-auto h-px max-w-7xl border-t border-espresso/10 px-4 sm:px-6 lg:px-8"
      />
    </header>
  )
}
