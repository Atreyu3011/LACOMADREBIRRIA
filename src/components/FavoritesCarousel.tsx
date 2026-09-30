import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import type { Favorite, MenuItem } from '@/data/schema'
import { cn } from '@/lib/utils'
import { FavoriteCard } from './FavoriteCard'

interface FavoritesCarouselProps {
  items: { favorite: Favorite; item: MenuItem }[]
  className?: string
}

/**
 * Favoritos secundarios. En móvil: carrusel táctil (Embla) con la siguiente tarjeta asomándose.
 * Desde 768 px el carrusel se desactiva y las tarjetas se acomodan en una cuadrícula de 2×2.
 */
export function FavoritesCarousel({ items, className }: FavoritesCarouselProps) {
  const [viewportRef, api] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps',
    breakpoints: { '(min-width: 768px)': { active: false } },
  })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    api.on('select', onSelect).on('reInit', onSelect)
    return () => {
      api.off('select', onSelect).off('reInit', onSelect)
    }
  }, [api])

  return (
    <div
      className={cn('min-w-0', className)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Más favoritos de la casa"
    >
      <div ref={viewportRef} className="-mr-4 overflow-hidden sm:-mr-6 md:mr-0 md:h-full">
        <ul className="-ml-4 flex touch-pan-y md:ml-0 md:grid md:h-full md:grid-cols-2 md:gap-5 lg:gap-6">
          {items.map(({ favorite, item }, i) => (
            <li
              key={favorite.itemId}
              className="min-w-0 shrink-0 grow-0 basis-[84%] pl-4 sm:basis-[60%] md:basis-auto md:pl-0"
              aria-roledescription="platillo"
              aria-label={`${i + 1} de ${items.length}`}
            >
              <FavoriteCard favorite={favorite} item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex justify-center gap-1 md:hidden">
        {items.map(({ favorite }, i) => (
          <button
            key={favorite.itemId}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Ver favorito ${i + 1} de ${items.length}`}
            aria-current={i === selected ? 'true' : undefined}
            className="grid size-8 place-items-center rounded-full"
          >
            <span
              className={cn(
                'block h-2.5 rounded-full transition-[width,background-color]',
                i === selected ? 'w-6 bg-orange-deep' : 'w-2.5 bg-wood/35',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
