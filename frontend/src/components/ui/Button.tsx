import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brass' | 'oxblood'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-espresso text-bone hover:bg-charcoal border border-espresso shadow-sm',
  secondary:
    'bg-white/75 text-espresso border border-espresso/20 hover:border-espresso/40 hover:bg-white',
  ghost:
    'bg-transparent text-espresso border border-transparent hover:border-espresso/20 hover:bg-espresso/[0.03]',
  brass:
    'bg-brass text-charcoal border border-brass hover:bg-[#966d39] hover:border-[#966d39] hover:text-bone',
  oxblood:
    'bg-oxblood text-parchment border border-oxblood hover:bg-[#552025] hover:border-[#552025]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs tracking-[0.1em]',
  md: 'px-5 py-3 text-xs tracking-[0.12em]',
  lg: 'px-7 py-3.5 text-sm tracking-[0.14em]',
}

/** Clean modern action button with subtle radius. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-[8px] font-sans font-medium uppercase transition-colors duration-200',
        'disabled:pointer-events-none disabled:opacity-45',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
