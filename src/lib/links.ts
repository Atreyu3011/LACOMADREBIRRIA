import type { Site } from '@/data/schema'

const enc = encodeURIComponent

/** Enlace de WhatsApp con mensaje opcional (acentos, emojis y saltos de línea codificados). */
export function whatsappUrl(number: string, text?: string): string {
  return text ? `https://wa.me/${number}?text=${enc(text)}` : `https://wa.me/${number}`
}

export const telUrl = (e164: string) => `tel:${e164}`
export const mailUrl = (email: string) => `mailto:${email}`

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${enc(query)}`
export const mapsDirectionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${enc(query)}`
export const mapsEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${enc(query)}&output=embed`
export const wazeUrl = (query: string) => `https://waze.com/ul?q=${enc(query)}&navigate=yes`

/**
 * Dirección en tres líneas cortas que no se parten feo en móvil:
 * "Lic. Benito Juárez 213 Ote." / "esq. Niños Héroes, Centro" / "81200 Los Mochis, Sinaloa".
 */
export function addressLines(address: Site['address']): [string, string, string] {
  return [
    address.street,
    `${address.crossStreet}, ${address.neighborhood}`,
    `${address.postalCode} ${address.city}, ${address.state}`,
  ]
}

/** "07:30" → "7:30" */
export const formatHour = (hhmm: string) => hhmm.replace(/^0/, '')
