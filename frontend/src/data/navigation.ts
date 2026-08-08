import type { Collection, NavLink } from '@/types'
import { images } from './images'
import { BRAND } from '@/types'

export { BRAND }

export const primaryNav: NavLink[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Footwear', href: '/shop' },
      { label: 'Boots', href: '/shop?category=boots' },
      { label: 'Oxfords', href: '/shop?category=oxfords' },
      { label: 'Loafers', href: '/shop?category=loafers' },
      { label: 'Sneakers', href: '/shop?category=sneakers' },
      { label: 'Care', href: '/shop?category=care' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Essential Four', href: '/collections/essential-four' },
      { label: 'Oxblood', href: '/collections/oxblood' },
      { label: 'Workshop', href: '/collections/workshop' },
      { label: 'Atelier', href: '/collections/atelier' },
    ],
  },
  { label: 'Materials', href: '/materials' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
]

export const footerNav: NavLink[] = [
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'Care Guide', href: '/journal/five-steps-to-proper-leather-care' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

export const collections: Collection[] = [
  {
    name: 'Essential Four',
    slug: 'essential-four',
    description:
      'The core rotation: oxford, service boot, loafer, and sneaker — each built to age with you.',
    image: images.collectionEssential,
  },
  {
    name: 'Oxblood',
    slug: 'oxblood',
    description:
      'Deep burgundy leather that shifts in the light — for boots that refuse to look new forever.',
    image: images.collectionOxblood,
  },
  {
    name: 'Workshop',
    slug: 'workshop',
    description: 'Everyday lasts from the bench: derbies, Chelseas, and chukkas.',
    image: images.atelierBench,
  },
  {
    name: 'Atelier',
    slug: 'atelier',
    description: 'Small-batch shell cordovan and made-to-order pairs.',
    image: images.heroWorkshop,
  },
  {
    name: 'Care',
    slug: 'care',
    description: 'Balms, edge dressing, and cedar trees for a lasting finish.',
    image: images.journalCare,
  },
]
