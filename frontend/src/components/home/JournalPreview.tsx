import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { journalArticles } from '@/data/journal'
import { formatDate } from '@/lib/format'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function JournalPreview() {
  const reduced = useReducedMotion()
  const articles = journalArticles.slice(0, 3)

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="relative bg-bone px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <div>
            <SectionLabel className="mb-4">Field Notes</SectionLabel>
            <h2
              id="journal-heading"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-espresso"
            >
              From the{' '}
              <span className="italic text-leather">Journal</span>
            </h2>
          </div>
          <Link
            to="/journal"
            className="group inline-flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-espresso/70 transition-colors hover:text-brass"
          >
            All dispatches
            <span
              aria-hidden
              className="h-px w-8 bg-brass/50 transition-all group-hover:w-12 group-hover:bg-brass"
            />
          </Link>
        </div>

        <StitchedDivider className="mb-12" label="Vol. workshop" />

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <li key={article.id}>
              <motion.article
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.65,
                  delay: reduced ? 0 : i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group h-full"
              >
                <Link
                  to={`/journal/${article.slug}`}
                  className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                >
                  {/* Magazine-cover frame */}
                  <div className="relative aspect-[3/4] overflow-hidden border border-espresso/10 bg-parchment/50 transition-colors duration-300 group-hover:border-brass/45">
                    <img
                      src={article.cover_image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="label-caps text-brass">
                        {article.category_label}
                      </p>
                      <h3 className="mt-2 font-display text-xl leading-snug text-bone sm:text-2xl">
                        {article.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden
                      className="absolute right-4 top-4 rotate-2 border border-parchment/30 bg-espresso/50 px-2 py-1 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-parchment/90 backdrop-blur-sm"
                    >
                      Note {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col px-0.5">
                    <p className="font-sans text-sm leading-relaxed text-espresso/60 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <time
                      dateTime={article.published_at}
                      className="mt-4 font-display text-sm italic text-espresso/40"
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
      </div>
    </section>
  )
}
