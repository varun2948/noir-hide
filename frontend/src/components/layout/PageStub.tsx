import { SectionLabel } from '@/components/ui/SectionLabel'

interface PageStubProps {
  title: string
  eyebrow?: string
  note?: string
}

/** Minimal page chrome — content filled by a later pass. */
export function PageStub({
  title,
  eyebrow = 'NOIR HIDE',
  note = 'Loading section…',
}: PageStubProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-espresso sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <div
        aria-hidden
        className="mt-6 h-px max-w-xs border-t border-dashed border-brass/50"
      />
      <p className="mt-6 max-w-md font-serif text-lg italic text-espresso/55">
        {note}
      </p>
    </section>
  )
}
