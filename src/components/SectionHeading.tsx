import { cn } from '@/lib/utils'
import { Sparkle } from './Sparkle'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  /** "brand": sobre crema. "light": sobre ladrillo o foto. */
  tone?: 'brand' | 'light'
  className?: string
  children?: React.ReactNode
}

/** Encabezado de sección: etiqueta pequeña + título con trazo seco (Caveat Brush). */
export function SectionHeading({
  id,
  eyebrow,
  title,
  tone = 'brand',
  className,
  children,
}: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className={cn('max-w-3xl', className)}>
      <p
        className={cn(
          'flex items-center gap-2 text-eyebrow font-semibold uppercase',
          light ? 'text-white' : 'text-ember',
        )}
      >
        <Sparkle
          variant={light ? 'solid' : 'banner'}
          className={cn('size-4', light && 'text-orange')}
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn('mt-1 font-brush text-section', light ? 'text-white' : 'text-orange-deep')}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
