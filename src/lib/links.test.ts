import { describe, expect, it } from 'vitest'
import { site } from '@/data/site'
import { renderHead } from './head'
import { addressLines, formatHour, whatsappUrl } from './links'

describe('whatsappUrl', () => {
  it('sin texto', () => {
    expect(whatsappUrl('526688151650')).toBe('https://wa.me/526688151650')
  })

  it('codifica acentos, emojis y saltos de línea', () => {
    const url = whatsappUrl('526688151650', '¡Hola La Comadre! 🌮\nNiño: sí')
    expect(url).toBe(
      'https://wa.me/526688151650?text=%C2%A1Hola%20La%20Comadre!%20%F0%9F%8C%AE%0ANi%C3%B1o%3A%20s%C3%AD',
    )
    expect(decodeURIComponent(new URL(url).searchParams.get('text') ?? '')).toBe(
      '¡Hola La Comadre! 🌮\nNiño: sí',
    )
  })
})

describe('formato', () => {
  it('formatHour quita el cero inicial', () => {
    expect(formatHour('07:30')).toBe('7:30')
    expect(formatHour('14:00')).toBe('14:00')
  })

  it('addressLines arma la dirección en tres líneas', () => {
    const [l1, l2, l3] = addressLines(site.address)
    expect(l1).toContain('Benito Juárez 213')
    expect(l2).toBe('esq. Niños Héroes, Centro')
    expect(l3).toBe('81200 Los Mochis, Sinaloa')
  })
})

describe('renderHead', () => {
  it('incluye título, descripción y Open Graph con URL absoluta', () => {
    const head = renderHead()
    expect(head).toContain(`<title>${site.seo.title}</title>`)
    expect(head).toContain('name="description"')
    expect(head).toContain(`property="og:image" content="${site.seo.url}/img/og-portada.jpg"`)
  })
})
