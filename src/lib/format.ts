import type { MenuItem, Site } from '@/data/schema'

/** 85 → "$85" (pesos mexicanos, sin centavos). */
export const formatPrice = (pesos: number) => `$${pesos.toLocaleString('es-MX')}`

/** Ancla de cada categoría del menú: "menu-especialidades". */
export const categoryAnchor = (id: string) => `menu-${id}`

/** Busca un producto del menú por su id. */
export function findMenuItem(site: Site, id: string): MenuItem | undefined {
  for (const category of site.menu.categories) {
    const item = category.items.find((i) => i.id === id)
    if (item) return item
  }
  return undefined
}
