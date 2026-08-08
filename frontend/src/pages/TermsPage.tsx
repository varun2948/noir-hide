import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

export default function TermsPage() {
  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:px-10">
          <SectionLabel>Terms</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Atelier Terms
          </h1>
          <p className="mt-6 font-serif text-lg italic text-espresso/55">
            A lightweight, demo-friendly set of terms for this prototype storefront.
          </p>
          <StitchedDivider className="mt-10" label="Use of site" />

          <div className="mt-8 space-y-6 rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              This website uses mock checkout behavior only. No payment provider is integrated.
              Any “orders” are for demonstration purposes to verify cart interactions.
            </p>
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              Product imagery and textures shown here are fetched from legal placeholder sources (e.g. Unsplash).
              Replace them with your licensed assets before publishing.
            </p>
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              Your cart and favorites are stored locally in your browser for a better UX during development.
            </p>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}

