import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

const SIZE_GUIDE = [
  { us: '7', eu: '40', last: '255mm' },
  { us: '8', eu: '41', last: '262mm' },
  { us: '9', eu: '42', last: '270mm' },
  { us: '10', eu: '43', last: '278mm' },
  { us: '11', eu: '44', last: '286mm' },
  { us: '12', eu: '45', last: '294mm' },
  { us: '13', eu: '46', last: '302mm' },
]

export default function SizeGuidePage() {
  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:px-10">
          <SectionLabel>Size guide</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.15rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Find your last
          </h1>
          <p className="mt-6 font-serif text-lg italic text-espresso/55">
            Conversion notes for US sizes. If you’re between sizes, size up for boots with thicker socks.
          </p>

          <StitchedDivider className="mt-10" label="US · EU · Last" />

          <div className="mt-8 overflow-hidden rounded-[8px] border border-espresso/15 bg-parchment/25">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-bone/40 text-left">
                  {['US', 'EU', 'Last'].map((h) => (
                    <th
                      key={h}
                      className="border-b border-espresso/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-espresso/55"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.us} className="border-b border-espresso/10 last:border-b-0">
                    <td className="px-6 py-4 font-sans text-sm text-espresso/80">{row.us}</td>
                    <td className="px-6 py-4 font-sans text-sm text-espresso/80">{row.eu}</td>
                    <td className="px-6 py-4 font-sans text-sm text-espresso/65">{row.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
            <p className="font-display text-xl text-espresso">Workshop note</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-espresso/70">
              The last teaches the leather. In the break-in period, expect gentle pressure at the vamp and heel.
              If your pair is made to last (it is), it will soften into your stride—slowly.
            </p>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}

