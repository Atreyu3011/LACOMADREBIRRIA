import { site } from '@/data/site'
import { cn } from '@/lib/utils'
import { Sparkle } from './Sparkle'

interface AnniversarySealProps {
  /** Define el tamaño con un ancho (ej. "w-36 lg:w-56"); todo lo interno escala con él. */
  className?: string
  withSlogan?: boolean
}

/**
 * Sello circular "30 Años" con degradado naranja.
 * PENDIENTE: reemplazar por public/img/brand/logo-30-anos.svg cuando llegue el archivo oficial.
 * Mientras tanto es un placeholder tipográfico que imita la composición del logo:
 * un "3" grueso y un "0" macizo blanco con "Años" dentro.
 */
export function AnniversarySeal({ className, withSlogan = true }: AnniversarySealProps) {
  const { brand } = site
  const label = `${brand.anniversaryYears} años. ${brand.name}, ${brand.tagline}. ${brand.slogan}, desde ${brand.foundedYear}.`

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        '@container relative aspect-square shrink-0 rounded-full bg-linear-to-br from-flame to-flame-deep text-white shadow-[0_22px_40px_-18px_rgb(28_26_24/0.55)] ring-4 ring-white/90',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center',
          withSlogan ? 'pt-[2cqi]' : 'pt-[6cqi]',
        )}
      >
        <span className="flex gap-[1.2cqi]">
          <Sparkle variant="solid" className="size-[4cqi] text-white" />
          <Sparkle variant="solid" className="size-[5.5cqi] -translate-y-[1cqi] text-white" />
          <Sparkle variant="solid" className="size-[4cqi] text-white" />
        </span>

        <span className="mt-[1cqi] flex items-center">
          <span className="inline-block origin-right scale-x-[1.35] font-impact text-[37cqi] leading-[0.82]">
            {/* El "0" de "30" es el círculo blanco con "Años", como en el logo. */}3
          </span>
          <span className="ml-[1.5cqi] grid size-[30cqi] place-items-center rounded-full bg-white">
            <span className="-rotate-6 font-script text-[10cqi] leading-none text-orange-deep">
              Años
            </span>
          </span>
        </span>

        <span className="-mt-[1cqi] font-script text-[14cqi] leading-none tracking-tight">
          {brand.name}
        </span>
        <span className="mt-[0.5cqi] ml-[26cqi] text-[3.4cqi] font-semibold tracking-[0.2em] uppercase italic">
          {brand.tagline}
        </span>

        {withSlogan && (
          <span className="mt-[2.5cqi] text-center text-[4.1cqi] leading-tight font-medium">
            “{brand.slogan}”
            <br />
            desde {brand.foundedYear}
          </span>
        )}
      </div>
    </div>
  )
}
