import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { UIProvider } from '@/context/UIContext'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import ProductPage from '@/pages/ProductPage'
import AboutPage from '@/pages/AboutPage'
import JournalPage from '@/pages/JournalPage'
import JournalArticlePage from '@/pages/JournalArticlePage'
import CollectionPage from '@/pages/CollectionPage'
import MaterialsPage from '@/pages/MaterialsPage'
import AccountPage from '@/pages/AccountPage'
import TermsPage from '@/pages/TermsPage'
import PrivacyPage from '@/pages/PrivacyPage'
import ShippingPage from '@/pages/ShippingPage'
import SizeGuidePage from '@/pages/SizeGuidePage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UIProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="journal" element={<JournalPage />} />
              <Route path="journal/:slug" element={<JournalArticlePage />} />
              <Route path="collections/:slug" element={<CollectionPage />} />
              <Route path="collections" element={<Navigate to="/shop" replace />} />
              <Route path="materials" element={<MaterialsPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="size-guide" element={<SizeGuidePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </UIProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
