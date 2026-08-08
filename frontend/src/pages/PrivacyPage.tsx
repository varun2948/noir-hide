import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

export default function PrivacyPage() {
  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:px-10">
          <SectionLabel>Privacy</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Privacy at the bench
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg italic text-espresso/55">
            This prototype stores data locally and sends newsletter signups to the mock Django endpoint when available.
          </p>
          <StitchedDivider className="mt-10" label="What we store" />

          <div className="mt-8 space-y-5 rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              Cart items are persisted in <code>localStorage</code> under a dedicated key.
            </p>
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              Favorite products are persisted in <code>localStorage</code> under a dedicated key.
            </p>
            <p className="font-sans text-sm leading-relaxed text-espresso/70">
              Newsletter submissions are validated in the browser and then POSTed to the Django API.
              If the API is unavailable, the UI still shows a friendly confirmation for the demo experience.
            </p>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}

