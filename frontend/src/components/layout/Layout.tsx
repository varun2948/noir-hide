import { Outlet } from 'react-router-dom'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { MobileNavigation } from '@/components/layout/MobileNavigation'
import { SearchOverlay } from '@/components/layout/SearchOverlay'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Footer } from '@/components/layout/Footer'

export function Layout() {
  return (
    <NoiseOverlay className="flex min-h-svh flex-col !overflow-visible">
      <AnnouncementBar />
      <Header />
      <MobileNavigation />
      <SearchOverlay />
      <CartDrawer />
      <main id="main-content" className="relative z-[2] flex-1">
        <Outlet />
      </main>
      <Footer />
    </NoiseOverlay>
  )
}
