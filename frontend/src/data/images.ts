/** Centralized Unsplash URLs for product & editorial imagery. */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`

export const images = {
  // Footwear / leather product shots
  mercerOxford: u('photo-1614252369475-531eba835eb1'),
  mercerOxfordAlt: u('photo-1449505278894-297fdb3edbc1'),
  foundryBoot: u('photo-1608256246200-53e635b5b65f'),
  foundryBootAlt: u('photo-1533867617858-e7b97e060509'),
  valeLoafer: u('photo-1612902376491-7a80a99ceef8'),
  valeLoaferAlt: u('photo-1582897085656-c636d006a867'),
  ashSneaker: u('photo-1595950653106-6c9ebd614d3a'),
  ashSneakerAlt: u('photo-1525966222134-fcfa99b8ae77'),
  oxbloodFieldBoot: u('photo-1605812869424-90dde9e4c0e7'),
  oxbloodFieldBootAlt: u('photo-1549298916-b41d501d3772'),
  hawthorneDerby: u('photo-1533867617858-e7b97e060509'),
  hawthorneDerbyAlt: u('photo-1460353581641-37baddab0fa2'),
  ledgerChelsea: u('photo-1608256246200-53e635b5b65f'),
  ledgerChelseaAlt: u('photo-1614252235812-1d4d39a6f2e6'),
  conditioningBalm: u('photo-1620916562816-c0c6f8f3f2f0'),
  edgeDressing: u('photo-1585386959984-a4155224a1ad'),
  cedarTrees: u('photo-1519415943484-9fa1873496bc'),

  // Materials / texture
  fullGrain: u('photo-1553062407-98eeb64c6a62'),
  vegetableTanned: u('photo-1490367532201-b9bc1dc483f6'),
  suede: u('photo-1606107557195-0e29a4b5b4aa'),
  shellCordovan: u('photo-1523380744952-b8e00e6d2bbf'),

  // Editorial / journal / hero
  journalAging: u('photo-1441986300917-64674bd600d8'),
  journalWelt: u('photo-1516762689617-e1cffcef479d'),
  journalCare: u('photo-1582719471384-894fbb16e074'),
  heroWorkshop: u('photo-1553062407-98eeb64c6a62'),
  atelierBench: u('photo-1507679799987-c73779587ccf'),
  collectionOxblood: u('photo-1549298916-b41d501d3772'),
  collectionEssential: u('photo-1614252369475-531eba835eb1'),
} as const

export type ImageKey = keyof typeof images
