import type { Product, ProductCategory } from '@/types'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export interface ShopFilters {
  categories: ProductCategory[]
  sizes: string[]
  colors: string[]
  materials: string[]
  sort: SortOption
}

interface FilterPanelProps {
  filters: ShopFilters
  onChange: (next: ShopFilters) => void
  availableColors: { name: string; hex: string }[]
  availableMaterials: string[]
  availableSizes: string[]
  className?: string
}

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'boots', label: 'Boots' },
  { value: 'oxfords', label: 'Oxfords' },
  { value: 'loafers', label: 'Loafers' },
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'care', label: 'Leather Care' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price · Low to High' },
  { value: 'price-desc', label: 'Price · High to Low' },
  { value: 'name', label: 'Name' },
]

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function FilterPanel({
  filters,
  onChange,
  availableColors,
  availableMaterials,
  availableSizes,
  className = '',
}: FilterPanelProps) {
  const clearAll = () =>
    onChange({
      categories: [],
      sizes: [],
      colors: [],
      materials: [],
      sort: filters.sort,
    })

  const hasActive =
    filters.categories.length +
      filters.sizes.length +
      filters.colors.length +
      filters.materials.length >
    0

  return (
    <aside className={`space-y-8 ${className}`}>
      <div className="flex items-end justify-between gap-3 border-b border-espresso/15 pb-3">
        <div>
          <p className="label-caps text-brass">Archive</p>
          <h2 className="mt-1 font-display text-2xl text-espresso">Filters</h2>
        </div>
        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="label-caps text-[10px] text-leather underline-offset-4 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <fieldset>
        <legend className="label-caps mb-3 text-espresso/55">Sort</legend>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 border px-3 py-2 text-sm transition-colors ${
                filters.sort === opt.value
                  ? 'border-brass bg-parchment/60 text-espresso'
                  : 'border-transparent text-espresso/70 hover:border-espresso/20'
              }`}
            >
              <input
                type="radio"
                name="sort"
                className="sr-only"
                checked={filters.sort === opt.value}
                onChange={() => onChange({ ...filters, sort: opt.value })}
              />
              <span className="font-sans">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-caps mb-3 text-espresso/55">Category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat.value)
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    categories: toggleValue(filters.categories, cat.value),
                  })
                }
                className={`rounded-[4px] border px-3 py-1.5 text-xs tracking-[0.12em] uppercase transition-colors ${
                  active
                    ? 'border-espresso bg-espresso text-bone'
                    : 'border-espresso/25 text-espresso hover:border-brass'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-caps mb-3 text-espresso/55">Leather</legend>
        <ul className="space-y-2">
          {availableMaterials.map((mat) => {
            const active = filters.materials.includes(mat)
            return (
              <li key={mat}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      materials: toggleValue(filters.materials, mat),
                    })
                  }
                  className={`flex w-full items-center justify-between border-b py-2 text-left text-sm transition-colors ${
                    active
                      ? 'border-brass text-espresso'
                      : 'border-espresso/10 text-espresso/70 hover:text-espresso'
                  }`}
                >
                  <span>{mat}</span>
                  <span className="label-caps text-[9px] text-brass">
                    {active ? 'Selected' : 'Sample'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="label-caps mb-3 text-espresso/55">Size · US</legend>
        <div className="grid grid-cols-4 gap-1.5">
          {availableSizes.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    sizes: toggleValue(filters.sizes, size),
                  })
                }
                className={`rounded-[4px] border py-2 text-sm transition-colors ${
                  active
                    ? 'border-brass bg-parchment text-espresso'
                    : 'border-espresso/20 text-espresso/70 hover:border-brass/60'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-caps mb-3 text-espresso/55">Color</legend>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => {
            const active = filters.colors.includes(color.name)
            return (
              <button
                key={color.name}
                type="button"
                title={color.name}
                aria-pressed={active}
                onClick={() =>
                  onChange({
                    ...filters,
                    colors: toggleValue(filters.colors, color.name),
                  })
                }
                className={`group flex flex-col items-center gap-1.5`}
              >
                <span
                  className={`h-7 w-7 rounded-[3px] border-2 transition-colors ${
                    active ? 'border-brass' : 'border-espresso/20 group-hover:border-brass/50'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="label-caps max-w-[4.5rem] truncate text-[8px] text-espresso/55">
                  {color.name}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>
    </aside>
  )
}

export function filterProducts(
  list: Product[],
  filters: ShopFilters,
  collectionSlug?: string,
): Product[] {
  let result = [...list]

  if (collectionSlug) {
    const nameMap: Record<string, string> = {
      'essential-four': 'Essential Four',
      oxblood: 'Oxblood',
      workshop: 'Workshop',
      atelier: 'Atelier',
      care: 'Care',
    }
    const collectionName = nameMap[collectionSlug]
    if (collectionName) {
      result = result.filter(
        (p) =>
          p.collection.toLowerCase() === collectionName.toLowerCase() ||
          (collectionSlug === 'care' && p.category === 'care') ||
          (collectionSlug === 'oxblood' &&
            p.colors.some((c) => c.name.toLowerCase().includes('oxblood') || c.hex === '#651F24')),
      )
    }
  }

  if (filters.categories.length) {
    result = result.filter((p) => filters.categories.includes(p.category))
  }
  if (filters.materials.length) {
    result = result.filter((p) =>
      filters.materials.some(
        (m) => p.leather_type.toLowerCase() === m.toLowerCase(),
      ),
    )
  }
  if (filters.sizes.length) {
    result = result.filter((p) =>
      p.sizes.some((s) => filters.sizes.includes(s.size) && s.in_stock),
    )
  }
  if (filters.colors.length) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c.name)),
    )
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => Number(a.price) - Number(b.price))
      break
    case 'price-desc':
      result.sort((a, b) => Number(b.price) - Number(a.price))
      break
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      result.sort((a, b) => {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
        return a.featured_order - b.featured_order || a.name.localeCompare(b.name)
      })
  }

  return result
}
