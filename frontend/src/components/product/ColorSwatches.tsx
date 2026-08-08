import type { ProductColor } from '@/types'

interface ColorSwatchesProps {
  colors: ProductColor[]
  value?: string
  onChange: (name: string) => void
}

export function ColorSwatches({ colors, value, onChange }: ColorSwatchesProps) {
  if (!colors.length) return null

  return (
    <div>
      <p className="label-caps mb-3 text-espresso/55">
        Color {value ? <span className="text-espresso">· {value}</span> : null}
      </p>
      <div className="flex flex-wrap gap-3" role="listbox" aria-label="Color">
        {colors.map((color) => {
          const selected = value === color.name
          return (
            <button
              key={color.id}
              type="button"
              role="option"
              aria-selected={selected}
              aria-label={color.name}
              title={color.name}
              onClick={() => onChange(color.name)}
              className={`flex items-center gap-2 rounded-[4px] border px-2.5 py-2 transition-colors ${
                selected
                  ? 'border-brass bg-parchment/70'
                  : 'border-espresso/20 hover:border-brass/50'
              }`}
            >
              <span
                className="h-5 w-5 rounded-[2px] border border-espresso/20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs tracking-wide text-espresso">{color.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
