import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** "brand": naranja sobre crema. "light": blanco sobre fondos oscuros o naranjas. */
  tone?: 'brand' | 'light'
  size?: 'md' | 'lg'
}

/**
 * Logo base: "La Comadre" en script con "TACOS DE BIRRIA" debajo.
 * PENDIENTE: reemplazar por public/img/brand/logo-lacomadre.svg cuando llegue el archivo oficial.
 * Mientras tanto es un placeholder tipográfico con Kaushan Script.
 */
export function Logo({ className, tone = 'brand', size = 'md' }: LogoProps) {
  return (
    <span className={cn('inline-flex flex-col items-end leading-none', className)}>
      <span
        className={cn(
          'font-script tracking-tight',
          size === 'md' ? 'text-[1.7rem] lg:text-[2rem]' : 'text-[2.5rem]',
          tone === 'brand' ? 'text-orange-deep' : 'text-white',
        )}
      >
        {site.brand.name}
      </span>
      <span
        className={cn(
          '-mt-0.5 font-sans font-semibold tracking-[0.22em] uppercase italic',
          size === 'md' ? 'text-[0.625rem] lg:text-[0.6875rem]' : 'text-[0.8125rem]',
          tone === 'brand' ? 'text-ink' : 'text-white',
        )}
      >
        {site.brand.tagline}
      </span>
    </span>
  )
}
