import type { Material } from '@/types'
import { images } from './images'

export const materials: Material[] = [
  {
    id: 1,
    slug: 'full-grain',
    name: 'Full-Grain',
    sample_number: 'NH-FG-01',
    description:
      'The outermost layer of the hide, left intact. Full-grain leather shows natural marks and develops a deep, personal patina. Oil pull-up finishes darken where flexed and lighten where stretched — a living surface.',
    durability_rating: 5,
    aging_behavior:
      'Darkens and softens with wear. Creases become character rather than damage. Color deepens toward espresso over years.',
    care_recommendation:
      'Wipe after wear. Condition every 6–8 weeks with a light balm. Polish only when the surface looks thirsty.',
    typical_products: 'Oxfords, loafers, service boots, sneakers',
    texture_image_url: images.fullGrain,
  },
  {
    id: 2,
    slug: 'vegetable-tanned',
    name: 'Vegetable-Tanned',
    sample_number: 'NH-VT-02',
    description:
      'Tanned with bark and plant tannins rather than chromium. Firmer at first, then molded by the foot. Favored for boots meant to be resoled across decades.',
    durability_rating: 5,
    aging_behavior:
      'Takes on a warm honey-to-walnut shift. Stiff young leather becomes glove-like after months of honest use.',
    care_recommendation:
      'Use less product than chrome-tanned leather. Brush, then a thin coat of conditioner. Avoid soaking.',
    typical_products: 'Service boots, field boots, belts',
    texture_image_url: images.vegetableTanned,
  },
  {
    id: 3,
    slug: 'suede',
    name: 'Suede',
    sample_number: 'NH-SU-03',
    description:
      'Reverse-finished leather with a soft nap. Lighter in hand than grain leather, with a muted matte presence suited to chukkas and casual lasts.',
    durability_rating: 3,
    aging_behavior:
      'Nap flattens along flex lines into a subtle sheen. Color softens rather than darkens dramatically.',
    care_recommendation:
      'Protect before first wear. Brush regularly. Spot-clean with suede eraser; avoid heavy oils.',
    typical_products: 'Chukkas, casual loafers',
    texture_image_url: images.suede,
  },
  {
    id: 4,
    slug: 'shell-cordovan',
    name: 'Shell Cordovan',
    sample_number: 'NH-SC-04',
    description:
      'Dense leather from the horse’s hindquarters. Glossy, nearly grainless, and famously resistant to creasing. Reserved for atelier pairs made in small numbers.',
    durability_rating: 5,
    aging_behavior:
      'Holds a mirror shine while slowly deepening in color. Creases appear late and remain shallow.',
    care_recommendation:
      'Condition sparingly. High-shine polish for dress wear. Store with trees; avoid prolonged moisture.',
    typical_products: 'Monk straps, formal oxfords',
    texture_image_url: images.shellCordovan,
  },
]

export function getMaterialBySlug(slug: string): Material | undefined {
  return materials.find((m) => m.slug === slug)
}
