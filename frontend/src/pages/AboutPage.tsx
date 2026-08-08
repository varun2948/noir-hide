import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const MAKERS = [
  {
    name: 'Anaya · Cutter',
    note: 'Cuts by eye first; only then measures. She reads tension in the hide.',
  },
  {
    name: 'Ramesh · Laster',
    note: 'Shapes over lasts in slow passes. The shoe learns your stride.',
  },
  {
    name: 'Noor · Finisher',
    note: 'Burnishes edges until they catch light like old brass filings.',
  },
]

export default function AboutPage() {
  const reduced = useReducedMotion()

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionLabel>Inside the Workshop</SectionLabel>
              <motion.h1
                className="mt-3 font-display text-[clamp(2.45rem,5vw,3.85rem)] leading-[1.02] tracking-[-0.02em] text-espresso"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7 }}
              >
                Inside the
                <br />
                Workshop
              </motion.h1>
              <p className="mt-7 max-w-xl font-serif text-lg italic text-espresso/55">
                A fictional independent atelier established in 1987, reimagined for modern
                customers who still want handwork to show through.
              </p>

              {/* Overlapping “editorial” images */}
              <div className="relative mt-10 overflow-hidden rounded-[8px] border border-espresso/15 bg-parchment/20">
                <img
                  src={images.heroWorkshop}
                  alt="Workshop bench with leather tools"
                  className="h-[420px] w-full object-cover lg:h-[520px]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
                <div className="absolute left-5 top-5">
                  <p className="label-caps text-[0.65rem] tracking-[0.22em] text-parchment">
                    Chapter 01
                  </p>
                  <p className="mt-3 font-display text-4xl font-medium text-parchment/90">
                    1987
                  </p>
                </div>
                <div className="absolute bottom-5 right-5 hidden sm:block">
                  <div className="rounded-[8px] border border-brass/30 bg-espresso/30 px-4 py-3 backdrop-blur-sm">
                    <p className="label-caps text-[0.65rem] tracking-[0.22em] text-brass">
                      Workshop note
                    </p>
                    <p className="mt-1 font-sans text-sm text-parchment/75">
                      Cut slow. Stitch straight. Finish by hand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <StitchedDivider className="mb-10" label="Philosophy" />

              <div className="space-y-10">
                <section className="relative rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
                  <span className="absolute left-6 top-5 label-caps text-[10px] tracking-[0.22em] text-brass">
                    01
                  </span>
                  <h2 className="font-display text-3xl text-espresso">
                    Workshop philosophy
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/65">
                    We do not sell shoes to remain untouched. We build pieces that take
                    weather, creases, and miles—until the leather reads like a diary.
                    Every pair is designed for repair: the welt is an invitation, not an
                    expiration.
                  </p>
                </section>

                <section className="relative rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
                  <span className="absolute left-6 top-5 label-caps text-[10px] tracking-[0.22em] text-brass">
                    02
                  </span>
                  <h2 className="font-display text-3xl text-espresso">Materials</h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/65">
                    Full-grain hides, vegetable-tanned stock, suede with its quiet nap, and
                    small editions in shell cordovan. We choose grain for strength and
                    variation—then let time complete the finish.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { title: 'Full-Grain', body: 'Oil pull-up character that darkens with touch.' },
                      { title: 'Vegetable-Tanned', body: 'Slow-tanned for resoling and structural longevity.' },
                      { title: 'Suede', body: 'Reverse-finished for a matte, tonal aging.' },
                      { title: 'Shell Cordovan', body: 'Dense, glossy, scarce—reserved for small editions.' },
                    ].map((it) => (
                      <div key={it.title} className="rounded-[6px] border border-espresso/10 bg-bone/40 p-4">
                        <p className="font-display text-lg">{it.title}</p>
                        <p className="mt-2 font-sans text-sm text-espresso/65">{it.body}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="relative rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
                  <span className="absolute left-6 top-5 label-caps text-[10px] tracking-[0.22em] text-brass">
                    03
                  </span>
                  <h2 className="font-display text-3xl text-espresso">Makers</h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/65">
                    Each step has a named maker. We rotate duties slowly so a pair keeps the
                    same tone from cut to burnish.
                  </p>
                  <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    {MAKERS.map((m) => (
                      <div key={m.name} className="rounded-[6px] border border-espresso/10 bg-bone/40 p-4">
                        <p className="font-display text-lg">{m.name}</p>
                        <p className="mt-2 font-sans text-sm text-espresso/65">{m.note}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="relative rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
                  <span className="absolute left-6 top-5 label-caps text-[10px] tracking-[0.22em] text-brass">
                    04
                  </span>
                  <h2 className="font-display text-3xl text-espresso">Construction process</h2>
                  <ol className="mt-6 space-y-4 pl-0">
                    {[
                      'Hide selection for grain strength and natural marks.',
                      'Hand cutting to preserve expressive stretch lines.',
                      'Lasting over custom lasts in slow, corrective passes.',
                      'Welted assembly designed for future resoling.',
                      'Edges burnished and finished by hand — first oil, then rest.',
                    ].map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="label-caps mt-1 min-w-[44px] text-[10px] tracking-[0.22em] text-brass">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-sm leading-relaxed text-espresso/65">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="relative rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
                  <span className="absolute left-6 top-5 label-caps text-[10px] tracking-[0.22em] text-brass">
                    05
                  </span>
                  <h2 className="font-display text-3xl text-espresso">Sustainability & repair</h2>
                  <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-6">
                      <p className="font-sans text-sm leading-relaxed text-espresso/65">
                        We treat repair as part of the design. The welt, the materials, and the
                        edge finishing are made for rework—so the pair stays yours, not
                        replaced.
                      </p>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/65">
                        Our repair and resoling program includes assessment, sole rebuild
                        recommendations, and a bench review of stitching and welt integrity.
                        When possible, we keep the upper intact.
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <div className="relative overflow-hidden rounded-[8px] border border-espresso/10 bg-bone/40">
                        <img
                          src={images.cedarTrees}
                          alt="Cedar shoe trees in the workshop"
                          className="h-72 w-full object-cover"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 rounded-[8px] border border-brass/30 bg-espresso/25 p-4 backdrop-blur-sm">
                          <p className="label-caps text-[0.6rem] tracking-[0.22em] text-brass">
                            Repair promise
                          </p>
                          <p className="mt-2 font-serif text-sm italic text-parchment/75">
                            A pair should return for decades, not years.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}
