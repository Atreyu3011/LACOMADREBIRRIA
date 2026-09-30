import { MenuItem } from '@/components/MenuItem'
import { MenuNav } from '@/components/MenuNav'
import { Picture } from '@/components/Picture'
import { SectionHeading } from '@/components/SectionHeading'
import { Sparkle } from '@/components/Sparkle'
import { site } from '@/data/site'
import { categoryAnchor } from '@/lib/format'

/**
 * Menú completo, como el menú impreso: foto de fondo en escala de grises multiplicada
 * sobre rojo ladrillo (el texto blanco siempre queda sobre un tono igual o más oscuro que
 * el ladrillo: contraste ≥ 5.3:1), títulos con trazo seco y platillos en Bebas.
 */
export function Menu() {
  const { menu } = site

  return (
    <section
      id="menu"
      aria-labelledby="menu-titulo"
      // overflow-x-clip (no hidden): recorta la barra de chips a sangre sin romper el sticky.
      className="relative isolate overflow-x-clip bg-brick text-white"
    >
      {/*
        La foto se queda fija en pantalla mientras se recorre el menú (sin escalar de más).
        El fondo ladrillo va en el mismo contenedor sticky: sticky crea su propio contexto de
        apilamiento y el modo multiply necesita mezclarse contra ese color.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="sticky top-0 h-svh overflow-hidden bg-brick">
          <Picture
            name={menu.backgroundImage}
            alt=""
            sizes="100vw"
            className="duotone-brick size-full object-cover opacity-80"
          />
        </div>
      </div>
      <div aria-hidden="true" className="h-3 bg-orange" />

      <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
        <SectionHeading id="menu-titulo" eyebrow={menu.eyebrow} title={menu.title} tone="light">
          <p className="mt-2 text-[1.25rem] font-medium">{menu.subtitle}</p>
        </SectionHeading>

        <MenuNav categories={menu.categories} />

        <div className="mt-10 lg:columns-2 lg:gap-20">
          {menu.categories.map((category) => (
            <section
              key={category.id}
              id={categoryAnchor(category.id)}
              aria-labelledby={`${categoryAnchor(category.id)}-titulo`}
              className="mb-12 scroll-mt-[calc(var(--header-h)+5rem)] break-inside-avoid lg:scroll-mt-[calc(var(--header-h-lg)+5rem)]"
            >
              <h3
                id={`${categoryAnchor(category.id)}-titulo`}
                className="flex items-center gap-3 font-brush text-[clamp(2.25rem,1.9rem+1.4vw,3.25rem)] leading-none"
              >
                {category.name}
                <Sparkle variant="solid" className="size-5 text-orange" />
              </h3>
              <ul className="mt-3 divide-y divide-white/20 border-t-2 border-white/40">
                {category.items.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="max-w-xl border-l-4 border-orange pl-4 text-[1.125rem] font-medium">
          {menu.note}
        </p>
      </div>
    </section>
  )
}
