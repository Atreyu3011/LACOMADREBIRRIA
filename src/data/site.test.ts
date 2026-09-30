import { describe, expect, it } from 'vitest'
import manifest from './images.gen.json'
import { siteSchema } from './schema'
import { site } from './site'

/** Imágenes que todavía no tienen foto limpia y usan placeholder (PENDIENTE). */
const PLACEHOLDER_OK = new Set(['taco-dorado'])

describe('site.ts', () => {
  it('pasa la validación de Zod', () => {
    expect(siteSchema.safeParse(site).success).toBe(true)
  })

  it('tiene los 24 productos del menú con sus precios', () => {
    const items = site.menu.categories.flatMap((c) => c.items)
    expect(items).toHaveLength(24)
    const price = (id: string) => items.find((i) => i.id === id)?.price
    expect(price('taco-madrazo')).toBe(85)
    expect(price('orden-de-birria-brava')).toBe(130)
    expect(price('tortilla-de-maiz')).toBe(2)
    expect(price('refresco-600')).toBe(35)
  })

  it('el Taco-Madrazo es el único favorito destacado y va primero', () => {
    const [first] = site.favorites.items
    expect(first?.itemId).toBe('taco-madrazo')
    expect(site.favorites.items.filter((f) => f.featured)).toHaveLength(1)
  })

  it('todas las imágenes referenciadas existen o tienen placeholder previsto', () => {
    const referenced = [
      site.hero.image,
      site.menu.backgroundImage,
      ...site.favorites.items.map((f) => f.image),
      ...site.history.timeline.flatMap((t) => (t.image ? [t.image] : [])),
      ...site.history.timeline.flatMap((t) => t.extraImages?.map((e) => e.image) ?? []),
      ...site.gallery.images.map((g) => g.image),
    ]
    const missing = referenced.filter((name) => !(name in manifest) && !PLACEHOLDER_OK.has(name))
    expect(missing).toEqual([])
  })
})

describe('siteSchema rechaza datos mal escritos', () => {
  const clone = () => structuredClone(site)

  it('precio con centavos o negativo', () => {
    const bad = clone()
    bad.menu.categories[0]!.items[0]!.price = 55.5
    expect(siteSchema.safeParse(bad).success).toBe(false)
    bad.menu.categories[0]!.items[0]!.price = -1
    expect(siteSchema.safeParse(bad).success).toBe(false)
  })

  it('hora mal escrita o apertura después del cierre', () => {
    const bad = clone()
    bad.hours.open = '7:30'
    expect(siteSchema.safeParse(bad).success).toBe(false)
    bad.hours.open = '15:00'
    expect(siteSchema.safeParse(bad).success).toBe(false)
  })

  it('favorito que no existe en el menú', () => {
    const bad = clone()
    bad.favorites.items[0]!.itemId = 'taco-inventado'
    expect(siteSchema.safeParse(bad).success).toBe(false)
  })

  it('número de WhatsApp con espacios', () => {
    const bad = clone()
    bad.contact.whatsapp.number = '52 668 815 1650'
    expect(siteSchema.safeParse(bad).success).toBe(false)
  })
})
