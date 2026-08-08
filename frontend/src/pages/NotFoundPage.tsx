import { Link } from 'react-router-dom'
import { SectionLabel } from '@/components/ui/SectionLabel'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
      <SectionLabel>404</SectionLabel>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-espresso sm:text-5xl">
        This last was never cut
      </h1>
      <p className="mt-4 max-w-md font-serif text-lg italic text-espresso/55">
        The page you asked for is not in the atelier. Return to the shop or the
        journal — both still open.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-[6px] border border-espresso bg-espresso px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:bg-charcoal"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-[6px] border border-espresso/40 px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-espresso transition-colors hover:border-brass hover:text-leather"
        >
          Shop
        </Link>
      </div>
    </section>
  )
}
