import { Hero } from '@/components/home/Hero'
import { EditorialProductSection } from '@/components/home/EditorialProductSection'
import { CraftsmanshipStory } from '@/components/home/CraftsmanshipStory'
import { MaterialsSection } from '@/components/home/MaterialsSection'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { BrandPhilosophy } from '@/components/home/BrandPhilosophy'
import { TestimonialSection } from '@/components/home/TestimonialSection'
import { JournalPreview } from '@/components/home/JournalPreview'
import { Newsletter } from '@/components/home/Newsletter'

export function HomePage() {
  return (
    <main id="main" className="bg-bone">
      <Hero />
      <EditorialProductSection />
      <CraftsmanshipStory />
      <MaterialsSection />
      <FeaturedCollection />
      <BrandPhilosophy />
      <TestimonialSection />
      <JournalPreview />
      <Newsletter />
    </main>
  )
}

export default HomePage
