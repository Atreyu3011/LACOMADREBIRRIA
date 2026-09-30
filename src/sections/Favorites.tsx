import { FavoriteCard } from '@/components/FavoriteCard'
import { FavoritesCarousel } from '@/components/FavoritesCarousel'
import { SectionHeading } from '@/components/SectionHeading'
import { site } from '@/data/site'
import { findMenuItem } from '@/lib/format'

const favorites = site.favorites.items.flatMap((favorite) => {
  const item = findMenuItem(site, favorite.itemId)
  return item ? [{ favorite, item }] : []
})
const featured = favorites.find((f) => f.favorite.featured)
const rest = favorites.filter((f) => !f.favorite.featured)

/** Favoritos de la casa. El Taco-Madrazo ocupa el doble de espacio que los demás. */
export function Favorites() {
  return (
    <section
      id="favoritos"
      aria-labelledby="favoritos-titulo"
      className="overflow-hidden py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="favoritos-titulo"
          eyebrow={site.favorites.eyebrow}
          title={site.favorites.title}
        />

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-6">
          {featured && <FavoriteCard {...featured} />}
          <FavoritesCarousel items={rest} />
        </div>
      </div>
    </section>
  )
}
