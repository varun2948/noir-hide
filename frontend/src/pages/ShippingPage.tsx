import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

export default function ShippingPage() {
  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:px-10">
          <SectionLabel>Shipping & Returns</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.15rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Delivery, care, and what happens next
          </h1>
          <p className="mt-6 font-serif text-lg italic text-espresso/55">
            Mock storefront details designed to match the atelier experience.
          </p>

          <StitchedDivider className="mt-10" label="Shipping" />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
              <p className="label-caps text-brass">Dispatch timeline</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70">
                Most orders ship within 3–5 business days from the atelier.
                Made-to-order pairs typically ship in 3–4 weeks.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70">
                Complimentary leather conditioning kit with orders over $250.
              </p>
            </div>
            <div className="rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
              <p className="label-caps text-brass">Returns</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70">
                Returns are accepted within 30 days for unworn pairs in original packaging.
                For welted items that show wear, we recommend repair consultation instead of return.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70">
                This is demo copy—replace with your real policies before launch.
              </p>
            </div>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}

