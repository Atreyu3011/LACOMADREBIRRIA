import { z } from 'zod'

/**
 * Esquema del contenido del sitio. site.ts se valida contra esto al arrancar `npm run dev`
 * y al compilar (desde vite.config.ts), y también en las pruebas. Si un precio, horario o
 * enlace está mal escrito, el build falla con un mensaje claro.
 *
 * La validación NO corre en el navegador: los componentes solo importan tipos de aquí,
 * así Zod no suma peso al JavaScript del sitio.
 *
 * Nota: este archivo y site.ts se importan desde vite.config.ts, así que solo usan
 * imports relativos (sin el alias "@/") y con extensión .ts.
 */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Usa minúsculas, números y guiones (ej. "taco-dorado")')
const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato de hora HH:MM, ej. "07:30"')
const price = z
  .number()
  .int('El precio va en pesos enteros, sin centavos')
  .positive('El precio debe ser mayor que 0')
  .max(5000, 'Precio sospechosamente alto')
const text = z.string().trim().min(1)
const url = z.url()

export const menuItemSchema = z.object({
  id: slug,
  name: text,
  description: text.optional(),
  price,
})

export const menuCategorySchema = z.object({
  id: slug,
  name: text,
  items: z.array(menuItemSchema).min(1),
})

export const favoriteSchema = z.object({
  itemId: slug,
  /** Frase script tipo póster: "¡Vente a los Madrazos!" */
  phrase: text,
  image: slug,
  imageAlt: text,
  /** "c/u" para los tacos que se venden por pieza. */
  priceSuffix: text.optional(),
  badge: text.optional(),
  featured: z.boolean().optional(),
})

export const timelineEntrySchema = z.object({
  id: slug,
  /** Año o etiqueta de la etapa: "1996", "Después", "Hoy". */
  period: text,
  title: text,
  body: text,
  image: slug.optional(),
  imageAlt: text.optional(),
  /** Foto histórica: tratamiento vintage suave (sepia y grano). */
  vintage: z.boolean().optional(),
  /** Fotos pequeñas adicionales de la misma etapa, como álbum. */
  extraImages: z.array(z.object({ image: slug, alt: text })).optional(),
  /** Etapa destacada (el 30 aniversario): se muestra con el sello y fondo de marca. */
  highlight: z.boolean().optional(),
})

export const galleryImageSchema = z.object({
  image: slug,
  alt: text,
})

export const attributeSchema = z.object({
  id: z.enum(['aire-acondicionado', 'accesible', 'estacionamiento', 'domicilio']),
  label: text,
})

export const navItemSchema = z.object({
  id: slug,
  label: text,
})

export const siteSchema = z
  .object({
    brand: z.object({
      name: text,
      tagline: text,
      fullName: text,
      foundedYear: z.number().int().min(1900).max(2100),
      anniversaryYears: z.number().int().positive(),
      slogan: text,
      slogans: z.array(text).min(1),
      /** Muestra la mascota en hero y pedido cuando exista el archivo oficial. */
      showMascot: z.boolean(),
    }),
    contact: z.object({
      phone: z.object({
        display: text,
        /** Formato internacional para tel: y JSON-LD. */
        e164: z.string().regex(/^\+52\d{10}$/, 'Teléfono en formato +52 seguido de 10 dígitos'),
      }),
      whatsapp: z.object({
        /** Solo dígitos, con lada de país, para wa.me. */
        number: z.string().regex(/^52\d{10}$/, 'WhatsApp: 52 seguido de 10 dígitos, sin espacios'),
        display: text,
        greeting: text,
      }),
      email: z.email(),
      social: z.object({
        facebook: url,
        instagram: url.nullable(),
        tiktok: url.nullable(),
      }),
    }),
    address: z.object({
      street: text,
      crossStreet: text,
      neighborhood: text,
      postalCode: z.string().regex(/^\d{5}$/),
      city: text,
      state: text,
      country: z.literal('MX'),
      mapsQuery: text,
    }),
    hours: z.object({
      open: hhmm,
      close: hhmm,
      /** Días en que abre; 0 = domingo … 6 = sábado. */
      days: z.array(z.number().int().min(0).max(6)).min(1),
      daysLabel: text,
      timeZone: text,
    }),
    attributes: z.array(attributeSchema),
    nav: z.array(navItemSchema).min(1),
    header: z.object({ orderCta: text, orderCtaShort: text }),
    hero: z.object({
      eyebrow: text,
      title: text,
      subtitle: text,
      handwritten: text,
      image: slug,
      imageAlt: text,
      ctaMenu: text,
      ctaOrder: text,
      /** Frases de la franja del aniversario debajo del hero. */
      band: z.array(text).min(1),
    }),
    favorites: z.object({
      eyebrow: text,
      title: text,
      addLabel: text,
      items: z.array(favoriteSchema).min(1),
    }),
    menu: z.object({
      eyebrow: text,
      title: text,
      subtitle: text,
      note: text,
      /** Foto de fondo con overlay rojo-naranja, como el menú impreso. */
      backgroundImage: slug,
      categories: z.array(menuCategorySchema).min(1),
    }),
    order: z.object({
      title: text,
      deliveryNote: text,
      closedNote: text,
      /** Vacío mientras se confirman las formas de pago. */
      paymentMethods: z.array(text),
    }),
    history: z.object({
      eyebrow: text,
      title: text,
      intro: text,
      founder: text.nullable(),
      timeline: z.array(timelineEntrySchema).min(1),
    }),
    gallery: z.object({
      eyebrow: text,
      title: text,
      images: z.array(galleryImageSchema).min(1),
    }),
    location: z.object({
      eyebrow: text,
      title: text,
      addressTitle: text,
      hoursTitle: text,
      attributesTitle: text,
      directionsLabel: text,
      wazeLabel: text,
      callLabel: text,
      mapTitle: text,
    }),
    footer: z.object({ copyright: text }),
    seo: z.object({
      title: text,
      description: text.max(170, 'La meta description debe tener 170 caracteres o menos'),
      url,
      locale: text,
      ogImage: z.string().startsWith('/'),
      ogImageAlt: text,
      themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    }),
  })
  .superRefine((site, ctx) => {
    const ids = new Set<string>()
    for (const category of site.menu.categories) {
      for (const item of category.items) {
        if (ids.has(item.id)) {
          ctx.addIssue({ code: 'custom', message: `Producto repetido: "${item.id}"` })
        }
        ids.add(item.id)
      }
    }

    for (const fav of site.favorites.items) {
      if (!ids.has(fav.itemId)) {
        ctx.addIssue({
          code: 'custom',
          message: `El favorito "${fav.itemId}" no existe en el menú`,
          path: ['favorites', 'items'],
        })
      }
    }

    const featured = site.favorites.items.filter((f) => f.featured).length
    if (featured !== 1) {
      ctx.addIssue({
        code: 'custom',
        message: `Debe haber exactamente un favorito destacado (hay ${featured})`,
        path: ['favorites', 'items'],
      })
    }

    if (site.hours.open >= site.hours.close) {
      ctx.addIssue({
        code: 'custom',
        message: 'La hora de apertura debe ser anterior a la de cierre',
        path: ['hours'],
      })
    }

    const navIds = new Set(site.nav.map((n) => n.id))
    if (navIds.size !== site.nav.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hay anclas repetidas en la navegación',
        path: ['nav'],
      })
    }
  })

export type SiteInput = z.input<typeof siteSchema>
export type Site = z.output<typeof siteSchema>
export type MenuItem = z.output<typeof menuItemSchema>
export type MenuCategory = z.output<typeof menuCategorySchema>
export type Favorite = z.output<typeof favoriteSchema>

/** Valida el contenido y lanza un error legible si algo está mal. */
export function parseSite(raw: unknown): Site {
  const result = siteSchema.safeParse(raw)
  if (!result.success) {
    throw new Error(`src/data/site.ts tiene errores:\n${z.prettifyError(result.error)}`)
  }
  return result.data
}
