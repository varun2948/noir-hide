import type { ElementType, HTMLAttributes, ReactNode } from 'react'

interface SectionLabelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: ElementType
}

/** Small uppercase brass-toned section eyebrow. */
export function SectionLabel({
  children,
  className = '',
  as: Tag = 'p',
  ...rest
}: SectionLabelProps) {
  return (
    <Tag
      className={`label-caps text-brass ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
