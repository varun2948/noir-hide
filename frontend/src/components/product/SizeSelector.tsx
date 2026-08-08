import { useState } from 'react'
import { X } from 'lucide-react'
import type { ProductSize } from '@/types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  value?: string
  onChange: (size: string) => void
}

const SIZE_GUIDE = [
  { us: '7', eu: '40', last: '255mm' },
  { us: '8', eu: '41', last: '262mm' },
  { us: '9', eu: '42', last: '270mm' },
  { us: '10', eu: '43', last: '278mm' },
  { us: '11', eu: '44', last: '286mm' },
  { us: '12', eu: '45', last: '294mm' },
  { us: '13', eu: '46', last: '302mm' },
]

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="label-caps text-espresso/55">
          Size · US {value ? <span className="text-espresso">{value}</span> : null}
        </p>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="label-caps text-[10px] text-brass underline-offset-4 hover:underline"
        >
          Size guide
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {sizes.map((s) => {
          const selected = value === s.size
          return (
            <button
              key={s.id}
              type="button"
              disabled={!s.in_stock}
              onClick={() => onChange(s.size)}
              className={`rounded-[4px] border py-2.5 text-sm transition-colors ${
                !s.in_stock
                  ? 'cursor-not-allowed border-espresso/10 text-espresso/25 line-through'
                  : selected
                    ? 'border-brass bg-espresso text-bone'
                    : 'border-espresso/25 text-espresso hover:border-brass'
              }`}
            >
              {s.size}
            </button>
          )
        })}
      </div>

      {guideOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/55"
            aria-label="Close size guide"
            onClick={() => setGuideOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative z-10 m-4 w-full max-w-md rounded-[8px] border border-brass/30 bg-bone p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="label-caps text-brass">Workshop note</p>
                <h3 id="size-guide-title" className="font-display text-2xl text-espresso">
                  Size guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="rounded-[4px] border border-espresso/20 p-1.5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-espresso/70">
              Our lasts run true to size. If you are between sizes, size up for boots with thicker socks.
            </p>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="label-caps border-b border-espresso/15 text-[10px] text-espresso/50">
                  <th className="py-2 font-medium">US</th>
                  <th className="py-2 font-medium">EU</th>
                  <th className="py-2 font-medium">Last</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.us} className="border-b border-espresso/8 text-espresso">
                    <td className="py-2.5">{row.us}</td>
                    <td className="py-2.5">{row.eu}</td>
                    <td className="py-2.5 font-sans text-espresso/70">{row.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
