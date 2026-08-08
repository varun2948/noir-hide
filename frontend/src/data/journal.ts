import type { JournalArticle } from '@/types'
import { images } from './images'

export const journalArticles: JournalArticle[] = [
  {
    id: 1,
    slug: 'how-full-grain-leather-ages',
    title: 'How Full-Grain Leather Ages',
    excerpt:
      'Patina is not wear-and-tear — it is a record of use. Here is what to expect in the first year, and why oil pull-up leather tells a truer story than corrected grain.',
    content: `Full-grain leather keeps the hide’s outer surface intact. That means pores, slight scars, and natural variation remain visible — and become more beautiful as oils from your hands and environment settle into the fiber.

In the first weeks, expect stiffness. The last is still teaching the leather where to flex. By month three, crease lines settle along the vamp. By year one, color deepens where the shoe flexes and where you grip the heel to pull it on.

Oil pull-up leather exaggerates this: press a finger and a temporary light mark appears, then fades as oils redistribute. That is not a defect. It is the hide breathing.

We do not sell “perfect” leather. We sell leather that will outlast the trend cycle — if you let it age on your feet.`,
    cover_image: images.journalAging,
    category_label: 'Materials',
    published_at: '2025-11-12T10:00:00Z',
  },
  {
    id: 2,
    slug: 'anatomy-of-a-goodyear-welted-shoe',
    title: 'The Anatomy of a Goodyear-Welted Shoe',
    excerpt:
      'A welt is a strip of leather that joins upper to sole — and the reason a NOIR HIDE boot can be resoled for decades.',
    content: `Goodyear welting stitches a leather strip to the upper and insole, then attaches the outsole to that strip. When the sole wears through, a cobbler can remove it without destroying the upper.

Compare that to cemented construction, where the sole is glued. Once the bond fails or the sole thins, the shoe is often finished.

Our service boots and most dress lasts use a Goodyear welt — sometimes with a storm welt for weather. Blake stitching appears on select loafers for a closer-to-ground flex.

Recraftability is not a marketing word. It is the difference between a pair you replace and a pair you renew.`,
    cover_image: images.journalWelt,
    category_label: 'Craft',
    published_at: '2025-09-03T10:00:00Z',
  },
  {
    id: 3,
    slug: 'five-steps-to-proper-leather-care',
    title: 'Five Steps to Proper Leather Care',
    excerpt:
      'Less product, more rhythm. A simple weekly and seasonal ritual keeps full-grain footwear honest.',
    content: `1. Brush after wear. Dust is abrasive. A horsehair brush takes thirty seconds.

2. Insert cedar trees while the leather is still warm. They pull moisture and hold the last shape.

3. Condition every 6–8 weeks — thinner coats beat heavy ones. Over-oiling softens structure.

4. Polish when the surface looks dull, not on a fixed calendar. Color should enhance, not mask.

5. Rotate pairs. Leather needs rest days to dry from the inside out.

Skip silicone sprays that seal the hide. Prefer breathable protectants on suede, and patience on vegetable-tanned boots.`,
    cover_image: images.journalCare,
    category_label: 'Care',
    published_at: '2026-01-20T10:00:00Z',
  },
]

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug)
}
