import type { Product } from '@/types'
import { images } from './images'

const FOOTWEAR_SIZES = ['7', '8', '9', '10', '11', '12', '13'] as const

function sizes(
  productId: number,
  outOfStock: string[] = [],
): Product['sizes'] {
  return FOOTWEAR_SIZES.map((size, i) => ({
    id: productId * 100 + i + 1,
    size,
    in_stock: !outOfStock.includes(size),
  }))
}

const careDefaults = {
  care_info:
    'Wipe with a soft cloth after wear. Condition every 6–8 weeks. Store with cedar trees away from direct heat.',
  shipping_info:
    'Ships within 3–5 business days from the atelier. Free domestic shipping over $250. Made-to-order pairs ship in 3–4 weeks.',
  construction: 'Goodyear welted',
  material_info:
    'Oil pull-up full-grain leather, hand-finished in small batches. Inspired by workshop traditions established 1987.',
}

/** Mock catalog matching Django seed_data — fallback when API is unavailable. */
export const products: Product[] = [
  {
    id: 1,
    slug: 'the-mercer-cap-toe-oxford',
    name: 'The Mercer Cap-Toe Oxford',
    category: 'oxfords',
    price: 325,
    description:
      'A closed-lacing oxford with a clean cap toe and balanced last. Full-grain leather that takes a deep polish and softens into a personal crease pattern over years of wear.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    stock_status: 'in_stock',
    is_featured: true,
    featured_order: 1,
    collection: 'Essential Four',
    images: [
      {
        id: 11,
        url: images.mercerOxford,
        alt: 'The Mercer Cap-Toe Oxford in espresso brown',
        is_primary: true,
        order: 0,
      },
      {
        id: 12,
        url: images.mercerOxfordAlt,
        alt: 'Mercer Oxford side profile on workshop bench',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 101, name: 'Espresso', hex: '#1B1512' },
      { id: 102, name: 'Cognac', hex: '#8B5A2B' },
    ],
    sizes: sizes(1, ['13']),
    primary_image: images.mercerOxford,
  },
  {
    id: 2,
    slug: 'the-foundry-service-boot',
    name: 'The Foundry Service Boot',
    category: 'boots',
    price: 410,
    description:
      'A tall service boot built for decades, not seasons. Vegetable-tanned uppers, stacked leather heel, and a Goodyear welt that can be resoled again and again. The leather darkens where your hand rests and lightens where the flex lines form — a map of use, not fashion.',
    leather_type: 'Vegetable-Tanned',
    construction: 'Goodyear welted, storm welt',
    material_info:
      'Vegetable-tanned cowhide with oil pull-up finish. Natural bark tannins leave a firm hand that softens into a lived-in boot.',
    care_info:
      'Brush after wear. Condition sparingly — vegetable-tanned leather prefers less product, more patience. Recraftable at any cobbler who knows a welt.',
    shipping_info: careDefaults.shipping_info,
    stock_status: 'in_stock',
    is_featured: true,
    featured_order: 2,
    collection: 'Essential Four',
    images: [
      {
        id: 21,
        url: images.foundryBoot,
        alt: 'The Foundry Service Boot in walnut brown',
        is_primary: true,
        order: 0,
      },
      {
        id: 22,
        url: images.foundryBootAlt,
        alt: 'Foundry Boot detail of stitching and welt',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 201, name: 'Walnut', hex: '#5A3828' },
      { id: 202, name: 'Black', hex: '#11100F' },
    ],
    sizes: sizes(2),
    primary_image: images.foundryBoot,
  },
  {
    id: 3,
    slug: 'the-vale-penny-loafer',
    name: 'The Vale Penny Loafer',
    category: 'loafers',
    price: 295,
    description:
      'A slip-on with a classic penny strap and a slightly rounded toe. Unlined for summer ease, with a flexible leather sole that molds quickly to the foot.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    construction: 'Blake stitched',
    stock_status: 'in_stock',
    is_featured: true,
    featured_order: 3,
    collection: 'Essential Four',
    images: [
      {
        id: 31,
        url: images.valeLoafer,
        alt: 'The Vale Penny Loafer in chestnut',
        is_primary: true,
        order: 0,
      },
      {
        id: 32,
        url: images.valeLoaferAlt,
        alt: 'Vale Loafer worn with tailored trousers',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 301, name: 'Chestnut', hex: '#6B3E26' },
      { id: 302, name: 'Oxblood', hex: '#651F24' },
    ],
    sizes: sizes(3, ['7']),
    primary_image: images.valeLoafer,
  },
  {
    id: 4,
    slug: 'the-ash-minimal-sneaker',
    name: 'The Ash Minimal Sneaker',
    category: 'sneakers',
    price: 260,
    description:
      'A low-profile leather sneaker without logos or excess. Cupsole construction, clean overlays, and a soft full-grain upper that ages into a muted patina.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    construction: 'Cupsole, vulcanized midsole',
    stock_status: 'in_stock',
    is_featured: true,
    featured_order: 4,
    collection: 'Essential Four',
    images: [
      {
        id: 41,
        url: images.ashSneaker,
        alt: 'The Ash Minimal Sneaker in bone white leather',
        is_primary: true,
        order: 0,
      },
      {
        id: 42,
        url: images.ashSneakerAlt,
        alt: 'Ash Sneaker sole and heel detail',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 401, name: 'Bone', hex: '#F5F0E8' },
      { id: 402, name: 'Espresso', hex: '#1B1512' },
    ],
    sizes: sizes(4),
    primary_image: images.ashSneaker,
  },
  {
    id: 5,
    slug: 'the-oxblood-field-boot',
    name: 'The Oxblood Field Boot',
    category: 'boots',
    price: 445,
    description:
      'A field boot dyed in deep oxblood that shifts toward burgundy in sunlight. Tall shaft, speed hooks, and a Vibram-ready Goodyear welt for hard miles.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    construction: 'Goodyear welted, speed-hook lace system',
    stock_status: 'low_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Oxblood',
    images: [
      {
        id: 51,
        url: images.oxbloodFieldBoot,
        alt: 'The Oxblood Field Boot',
        is_primary: true,
        order: 0,
      },
      {
        id: 52,
        url: images.oxbloodFieldBootAlt,
        alt: 'Oxblood Field Boot shaft and hardware',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [{ id: 501, name: 'Oxblood', hex: '#651F24' }],
    sizes: sizes(5, ['12', '13']),
    primary_image: images.oxbloodFieldBoot,
  },
  {
    id: 6,
    slug: 'the-hawthorne-derby',
    name: 'The Hawthorne Derby',
    category: 'oxfords',
    price: 310,
    description:
      'An open-lacing derby with a soft break and roomy toe box. The everyday dress shoe — less formal than the Mercer, equally lasting.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Workshop',
    images: [
      {
        id: 61,
        url: images.hawthorneDerby,
        alt: 'The Hawthorne Derby in dark brown',
        is_primary: true,
        order: 0,
      },
      {
        id: 62,
        url: images.hawthorneDerbyAlt,
        alt: 'Hawthorne Derby lace and tongue detail',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 601, name: 'Dark Brown', hex: '#3D2314' },
      { id: 602, name: 'Black', hex: '#11100F' },
    ],
    sizes: sizes(6),
    primary_image: images.hawthorneDerby,
  },
  {
    id: 7,
    slug: 'the-ledger-chelsea-boot',
    name: 'The Ledger Chelsea Boot',
    category: 'boots',
    price: 385,
    description:
      'Elastic-sided Chelsea with a low stacked heel and almond toe. Pull tabs front and back; a silhouette that moves from desk to dinner without ceremony.',
    leather_type: 'Full-Grain',
    ...careDefaults,
    construction: 'Goodyear welted, elastic gussets',
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Workshop',
    images: [
      {
        id: 71,
        url: images.ledgerChelsea,
        alt: 'The Ledger Chelsea Boot',
        is_primary: true,
        order: 0,
      },
      {
        id: 72,
        url: images.ledgerChelseaAlt,
        alt: 'Ledger Chelsea elastic gusset detail',
        is_primary: false,
        order: 1,
      },
    ],
    colors: [
      { id: 701, name: 'Black', hex: '#11100F' },
      { id: 702, name: 'Tobacco', hex: '#7A4A28' },
    ],
    sizes: sizes(7),
    primary_image: images.ledgerChelsea,
  },
  {
    id: 8,
    slug: 'leather-conditioning-balm',
    name: 'Leather Conditioning Balm',
    category: 'care',
    price: 38,
    description:
      'A beeswax and lanolin balm for full-grain and vegetable-tanned leather. Restores oils without leaving a greasy film.',
    leather_type: '',
    construction: '',
    material_info: 'Beeswax, lanolin, and plant oils in a 60g tin.',
    care_info: 'Apply a thin coat with a soft cloth. Buff after 20 minutes.',
    shipping_info: 'Ships with footwear orders at no extra handling charge.',
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Care',
    images: [
      {
        id: 81,
        url: images.conditioningBalm,
        alt: 'Leather Conditioning Balm tin',
        is_primary: true,
        order: 0,
      },
    ],
    colors: [],
    sizes: [{ id: 801, size: 'One Size', in_stock: true }],
    primary_image: images.conditioningBalm,
  },
  {
    id: 9,
    slug: 'edge-dressing',
    name: 'Edge Dressing',
    category: 'care',
    price: 28,
    description:
      'A pigmented edge paint for renewing sole and heel edges. Matte finish that matches atelier workbench standards.',
    leather_type: '',
    construction: '',
    material_info: 'Water-based edge dressing, 30ml bottle with applicator.',
    care_info: 'Mask the upper. Apply thin coats. Allow to dry between passes.',
    shipping_info: 'Ships with footwear orders at no extra handling charge.',
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Care',
    images: [
      {
        id: 91,
        url: images.edgeDressing,
        alt: 'Edge Dressing bottle',
        is_primary: true,
        order: 0,
      },
    ],
    colors: [
      { id: 901, name: 'Dark Brown', hex: '#3D2314' },
      { id: 902, name: 'Black', hex: '#11100F' },
    ],
    sizes: [{ id: 901, size: 'One Size', in_stock: true }],
    primary_image: images.edgeDressing,
  },
  {
    id: 10,
    slug: 'cedar-shoe-trees',
    name: 'Cedar Shoe Trees',
    category: 'care',
    price: 45,
    description:
      'Aromatic cedar shoe trees that absorb moisture and hold the last shape overnight. Split-toe design with a coiled spring.',
    leather_type: '',
    construction: '',
    material_info: 'North American cedar, unfinished for maximum absorption.',
    care_info: 'Insert while shoes are still warm from wear. Sand lightly yearly to refresh aroma.',
    shipping_info: 'Ships with footwear orders at no extra handling charge.',
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Care',
    images: [
      {
        id: 101,
        url: images.cedarTrees,
        alt: 'Cedar Shoe Trees pair',
        is_primary: true,
        order: 0,
      },
    ],
    colors: [],
    sizes: [
      { id: 1001, size: 'S', in_stock: true },
      { id: 1002, size: 'M', in_stock: true },
      { id: 1003, size: 'L', in_stock: true },
    ],
    primary_image: images.cedarTrees,
  },
  {
    id: 11,
    slug: 'the-atelier-monk-strap',
    name: 'The Atelier Monk Strap',
    category: 'oxfords',
    price: 355,
    description:
      'A single-buckle monk with a refined silhouette and hand-burnished toe. For those who prefer hardware to laces.',
    leather_type: 'Shell Cordovan',
    ...careDefaults,
    construction: 'Goodyear welted, solid brass buckle',
    material_info:
      'Shell cordovan from the horse’s hindquarters — dense, glossy, and famously long-wearing.',
    stock_status: 'made_to_order',
    is_featured: false,
    featured_order: 0,
    collection: 'Atelier',
    images: [
      {
        id: 111,
        url: images.mercerOxfordAlt,
        alt: 'The Atelier Monk Strap',
        is_primary: true,
        order: 0,
      },
    ],
    colors: [
      { id: 1101, name: 'Burgundy', hex: '#651F24' },
      { id: 1102, name: 'Black', hex: '#11100F' },
    ],
    sizes: sizes(11),
    primary_image: images.mercerOxfordAlt,
  },
  {
    id: 12,
    slug: 'the-ridge-chukka',
    name: 'The Ridge Chukka',
    category: 'boots',
    price: 340,
    description:
      'A two-eyelet chukka in soft suede with a crepe-ready sole seat. Light enough for travel, structured enough for the city.',
    leather_type: 'Suede',
    ...careDefaults,
    construction: 'Goodyear welted',
    material_info: 'Reverse-finished calf suede with a dense nap.',
    care_info:
      'Brush with a suede brush. Protect with a spray before first wear. Avoid heavy conditioning oils.',
    stock_status: 'in_stock',
    is_featured: false,
    featured_order: 0,
    collection: 'Workshop',
    images: [
      {
        id: 121,
        url: images.suede,
        alt: 'The Ridge Chukka in tobacco suede',
        is_primary: true,
        order: 0,
      },
    ],
    colors: [
      { id: 1201, name: 'Tobacco', hex: '#7A4A28' },
      { id: 1202, name: 'Sand', hex: '#C4A574' },
    ],
    sizes: sizes(12, ['13']),
    primary_image: images.suede,
  },
]

export const featuredProducts = products
  .filter((p) => p.is_featured)
  .sort((a, b) => a.featured_order - b.featured_order)

export const essentialFour = featuredProducts.filter(
  (p) => p.collection === 'Essential Four',
)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(
  category: Product['category'],
): Product[] {
  return products.filter((p) => p.category === category)
}
