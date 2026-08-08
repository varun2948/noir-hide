import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { getArticleBySlug, journalArticles } from '@/data/journal'
import { formatDate } from '@/lib/format'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const reduced = useReducedMotion()

  const article = useMemo(() => {
    if (!slug) return undefined
    return getArticleBySlug(slug)
  }, [slug])

  const all = journalArticles
  const index = article ? all.findIndex((a) => a.slug === article.slug) : -1
  const next = index >= 0 ? all[(index + 1) % all.length] : undefined

  if (!article) {
    return (
      <main className="bg-bone">
        <NoiseOverlay className="relative !overflow-visible">
          <section className="mx-auto max-w-[720px] px-5 py-20 sm:px-8">
            <SectionLabel>Journal</SectionLabel>
            <h1 className="mt-3 font-display text-4xl text-espresso">Article not found</h1>
            <p className="mt-4 font-serif text-lg italic text-espresso/55">
              The bench notes for this entry are not in view.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/journal"
                className="inline-flex items-center justify-center rounded-[6px] border border-espresso bg-espresso px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:bg-charcoal"
              >
                Back to journal
              </Link>
            </div>
          </section>
        </NoiseOverlay>
      </main>
    )
  }

  const paragraphs = article.content
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-12">
          <SectionLabel>Journal</SectionLabel>
          <motion.h1
            className="mt-3 font-display text-[clamp(2.4rem,5vw,3.85rem)] leading-[1.02] tracking-[-0.02em] text-espresso"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
          >
            {article.title}
          </motion.h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="label-caps text-xs tracking-[0.22em] text-espresso/45">
              {article.category_label}
            </span>
            <span aria-hidden className="h-px w-10 bg-espresso/20" />
            <time
              dateTime={article.published_at}
              className="font-sans text-sm italic text-espresso/55"
            >
              {formatDate(article.published_at, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <StitchedDivider className="mt-10" label="Field notes" />
        </section>

        <section className="mx-auto max-w-[980px] px-5 pb-20 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[8px] border border-espresso/15 bg-parchment/20">
            <div className="relative aspect-[16/8] lg:aspect-[21/9]">
              <img
                src={article.cover_image}
                alt={`${article.title} cover`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg italic text-parchment/80">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 py-10 sm:px-10">
              <article className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={[
                      'font-sans text-sm leading-relaxed text-espresso/70',
                      i === 0 ? 'text-espresso/80' : '',
                    ].join(' ')}
                  >
                    {p}
                  </p>
                ))}
              </article>

              <div className="mt-10 flex flex-col gap-4 border-t border-dashed border-brass/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/journal"
                  className="label-caps text-[0.65rem] tracking-[0.22em] text-espresso/55 hover:text-brass"
                >
                  Back to journal
                </Link>
                {next ? (
                  <Link
                    to={`/journal/${next.slug}`}
                    className="label-caps text-[0.65rem] tracking-[0.22em] text-espresso/55 hover:text-brass"
                  >
                    Next entry · {next.title}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </NoiseOverlay>
    </main>
  )
}
