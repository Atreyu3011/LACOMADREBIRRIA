import { cn } from '@/lib/utils'

const STAR =
  'M12 0C12.9 7.2 16.8 11.1 24 12C16.8 12.9 12.9 16.8 12 24C11.1 16.8 7.2 12.9 0 12C7.2 11.1 11.1 7.2 12 0Z'

interface SparkleProps {
  className?: string
  /** "banner": naranja con centro blanco (como en la portada). "solid": un solo color (currentColor). */
  variant?: 'banner' | 'solid'
}

/** Destello de 4 puntas de la marca. Decorativo: oculto para lectores de pantalla. */
export function Sparkle({ className, variant = 'banner' }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('size-6 shrink-0', variant === 'banner' ? 'text-orange-deep' : '', className)}
    >
      <path d={STAR} fill="currentColor" />
      {variant === 'banner' && (
        <path d={STAR} fill="#fff" transform="translate(12 12) scale(0.5) translate(-12 -12)" />
      )}
    </svg>
  )
}
