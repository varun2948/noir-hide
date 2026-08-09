/** NOIR HIDE brand photography, served locally from `/public/mocchi`. */

const m = (file: string) => `/mocchi/${file}`

/** Neutral stock fallback for care accessories we have no brand photo of. */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`

export const images = {
  // Footwear — studio + lifestyle brand shots
  mercerOxford: m('img-8660.jpg'),
  mercerOxfordAlt: m('rs-02595.jpg'),
  foundryBoot: m('newr4.jpg'),
  foundryBootAlt: m('img-8663.jpg'),
  valeLoafer: m('rs-02617.jpg'),
  valeLoaferAlt: m('dsc02847.jpg'),
  ashSneaker: m('img-8661.jpg'),
  ashSneakerAlt: m('rs-02715.jpg'),
  oxbloodFieldBoot: m('dsc02869.jpg'),
  oxbloodFieldBootAlt: m('rs-00116.jpg'),
  hawthorneDerby: m('dsc02958.jpg'),
  hawthorneDerbyAlt: m('rs-02641.jpg'),
  ledgerChelsea: m('rs-00041.jpg'),
  ledgerChelseaAlt: m('still-2025-12-25-200412-2-2-1.jpg'),

  // Care accessories — no brand photo yet; neutral stock
  conditioningBalm: u('photo-1620916562816-c0c6f8f3f2f0'),
  edgeDressing: u('photo-1585386959984-a4155224a1ad'),
  cedarTrees: u('photo-1519415943484-9fa1873496bc'),

  // Materials / texture
  fullGrain: m('img-8660.jpg'),
  vegetableTanned: m('dsc02847.jpg'),
  suede: m('rs-02641.jpg'),
  shellCordovan: m('rs-00041.jpg'),

  // Editorial / journal / hero
  journalAging: m('newr2.jpg'),
  journalWelt: m('img-8663.jpg'),
  journalCare: m('rs-02617.jpg'),
  heroWorkshop: m('still-2025-12-25-200215-1-2-2.jpg'),
  atelierBench: m('still-2025-12-25-200412-2-2-1.jpg'),
  collectionOxblood: m('rs-00079.jpg'),
  collectionEssential: m('img-8664.jpg'),

  // Editorial portraits (lookbook / brand storytelling)
  lookbookRider: m('new7.jpg'),
  lookbookDrive: m('shoes.jpg'),
} as const

export type ImageKey = keyof typeof images
