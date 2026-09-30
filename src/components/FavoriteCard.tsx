import { Star } from 'lucide-react'
import type { Favorite, MenuItem } from '@/data/schema'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { AddToOrderButton } from './AddToOrderButton'
import { Picture } from './Picture'

interface FavoriteCardProps {
  favorite: Favorite
  item: MenuItem
  className?: string
}

/**
 * Favorito presentado como los pósters: franja naranja arriba, foto grande con la frase
 * script naranja encima, nombre y precio en Bebas, y franja naranja rojiza abajo.
 */
export function FavoriteCard({ favorite, item, className }: FavoriteCardProps) {
  const featured = Boolean(favorite.featured)

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden bg-ink shadow-[0_18px_36px_-22px_rgb(28_26_24/0.7)]',
        className,
      )}
    >
      <div aria-hidden="true" className={cn('shrink-0 bg-orange', featured ? 'h-4' : 'h-2.5')} />

      <div
        className={cn(
          'relative grow overflow-hidden',
          featured ? 'aspect-square sm:aspect-16/10 lg:aspect-auto' : 'aspect-4/3',
        )}
      >
        <Picture
          name={favorite.image}
          alt={favorite.imageAlt}
          sizes={
            featured
              ? '(min-width: 1024px) 50vw, 100vw'
              : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw'
          }
          className="absolute inset-0 size-full object-cover"
        />
        {/* Bruma clara arriba (como la cubierta de granito de los pósters) para la frase */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-cream/80 via-cream/35 to-transparent"
        />
        {/* Sombra abajo para el nombre y el precio en blanco */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/90 via-ink/50 to-transparent"
        />

        <p
          className={cn(
            'script-glow absolute -rotate-6 font-script leading-none text-orange-deep',
            featured
              ? 'top-5 left-4 text-script sm:top-7 sm:left-7'
              : 'top-3 left-3 text-[clamp(1.75rem,1.45rem+0.9vw,2.25rem)]',
          )}
        >
          {favorite.phrase}
        </p>

        <div className={cn('absolute inset-x-0 bottom-0', featured ? 'p-5 sm:p-7' : 'p-4')}>
          {favorite.badge && (
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[0.9375rem] font-semibold tracking-wide text-ink uppercase">
              <Star className="size-4 fill-current" aria-hidden />
              {favorite.badge}
            </p>
          )}
          <h3
            className={cn(
              'flex items-end justify-between gap-3 font-display leading-[0.95] text-white uppercase',
              // Como en los pósters: nombre y precio en una línea, sin tapar el platillo.
              featured
                ? 'text-[clamp(2.5rem,2rem+2vw,3.75rem)]'
                : 'text-[clamp(1.625rem,1.45rem+0.5vw,2rem)]',
            )}
          >
            <span>{item.name}</span>
            <span className="tabular shrink-0">
              {formatPrice(item.price)}
              {favorite.priceSuffix && (
                <span className="ml-1 align-top text-[0.45em]">{favorite.priceSuffix}</span>
              )}
            </span>
          </h3>
          {item.description && (
            <p
              className={cn(
                'mt-1 font-semibold tracking-[0.06em] text-white uppercase',
                featured ? 'text-[1.0625rem]' : 'text-[0.875rem]',
              )}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className={cn('shrink-0 bg-orange-deep', featured ? 'p-4 sm:px-7' : 'p-3')}>
        <AddToOrderButton itemId={item.id} itemName={item.name} />
      </div>
    </article>
  )
}
