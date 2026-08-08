import type { HTMLAttributes } from 'react'

interface StitchedDividerProps extends HTMLAttributes<HTMLHRElement> {
  label?: string
}

/** Horizontal subtle divider, optionally with a centered label. */
export function StitchedDivider({
  label,
  className = '',
  ...rest
}: StitchedDividerProps) {
  if (label) {
    return (
      <div
        className={`flex items-center gap-4 text-brass ${className}`}
        role="separator"
        aria-label={label}
      >
        <span className="h-px flex-1 border-t border-espresso/15" />
        <span className="label-caps text-espresso/55">{label}</span>
        <span className="h-px flex-1 border-t border-espresso/15" />
      </div>
    )
  }

  return (
    <hr
      className={`m-0 border-0 border-t border-espresso/15 ${className}`}
      {...rest}
    />
  )
}
