import { useEffect, useRef, useState } from 'react'
import type { MenuCategory } from '@/data/schema'
import { categoryAnchor } from '@/lib/format'
import { cn } from '@/lib/utils'

/**
 * Chips de categorías: anclas a cada categoría (todo el menú está siempre en el HTML,
 * bueno para Google), fijos bajo el header y con scroll horizontal en móvil.
 * Marcan la categoría visible mientras se recorre el menú.
 */
export function MenuNav({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(categoryAnchor(c.id)))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id.replace(/^menu-/, ''))
      },
      // Franja horizontal justo debajo del header y los chips.
      { rootMargin: '-140px 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [categories])

  // Mantiene visible el chip activo dentro de la barra con scroll horizontal.
  useEffect(() => {
    const list = listRef.current
    const chip = list?.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    if (!list || !chip) return
    const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2
    list.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  return (
    <nav
      aria-label="Categorías del menú"
      // A todo el ancho de la pantalla; los chips se alinean con el contenido de la sección.
      className="sticky top-[calc(var(--header-h)+env(safe-area-inset-top))] z-20 -mx-4 mt-6 border-y border-white/20 bg-brick/92 backdrop-blur-sm sm:-mx-6 lg:top-(--header-h-lg) lg:mx-[calc(50%-50vw)]"
    >
      <ul
        ref={listRef}
        className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-[max(2rem,calc(50vw-38rem))]"
      >
        {categories.map((c) => {
          const isActive = c.id === active
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${categoryAnchor(c.id)}`}
                data-chip={c.id}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'inline-flex h-11 items-center rounded-full border-2 px-4 text-[1.0625rem] font-semibold tracking-wide uppercase transition-colors',
                  isActive
                    ? 'border-white bg-white text-brick'
                    : 'border-white/70 text-white hover:border-white hover:bg-white/10',
                )}
              >
                {c.name}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
