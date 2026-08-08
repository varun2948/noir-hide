import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { journalArticles } from '@/data/journal'
import { formatDate } from '@/lib/format'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function JournalPage() {
  const reduced = useReducedMotion()
  const articles = journalArticles

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-12">
          <SectionLabel>Field Notes</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Journal
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg italic text-espresso/55">
            Workshop lessons, construction anatomy, and care rituals. Three entries, no filler—written to be kept.
          </p>
          <StitchedDivider className="mt-10" label="Vol. workshop" />
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {articles.map((article, i) => (
              <li key={article.id}>
                <motion.article
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.65,
                    delay: reduced ? 0 : i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <Link
                    to={`/journal/${article.slug}`}
                    className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] border border-espresso/10 bg-parchment/50">
                      <img
                        src={article.cover_image}
                        alt={`${article.title} cover`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <p className="label-caps text-brass">{article.category_label}</p>
                        <h2 className="mt-2 font-display text-xl leading-snug text-bone sm:text-2xl">
                          {article.title}
                        </h2>
                      </div>

                      <span className="absolute right-4 top-4 rotate-2 rounded-[6px] border border-parchment/30 bg-espresso/55 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-parchment/95 backdrop-blur-sm">
                        Note {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-1 flex-col">
                      <p className="font-sans text-sm leading-relaxed text-espresso/60 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <time
                        dateTime={article.published_at}
                        className="mt-auto pt-4 font-display text-sm italic text-espresso/40"
                      >
                        {formatDate(article.published_at, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </Link>
                </motion.article>
              </li>
            ))}
          </ul>
        </section>
      </NoiseOverlay>
    </main>
  )
}
