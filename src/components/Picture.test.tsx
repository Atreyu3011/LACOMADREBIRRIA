import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Picture } from './Picture'

describe('<Picture>', () => {
  it('sirve AVIF y WebP con srcset en los tres anchos', () => {
    const { container } = render(<Picture name="taco-madrazo" alt="Taco-Madrazo" sizes="50vw" />)
    const sources = container.querySelectorAll('source')
    expect(sources).toHaveLength(2)
    expect(sources[0]).toHaveAttribute('type', 'image/avif')
    expect(sources[0]?.getAttribute('srcset')).toBe(
      '/img/taco-madrazo-640.avif 640w, /img/taco-madrazo-1024.avif 1024w, /img/taco-madrazo-1600.avif 1600w',
    )
    const img = screen.getByRole('img', { name: 'Taco-Madrazo' })
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('width', '1600')
  })

  it('carga con prioridad cuando es la imagen principal', () => {
    render(<Picture name="hero-portada" alt="Portada" priority />)
    const img = screen.getByRole('img', { name: 'Portada' })
    expect(img).toHaveAttribute('loading', 'eager')
    expect(img).toHaveAttribute('fetchpriority', 'high')
  })

  it('muestra un placeholder accesible si la foto no existe', () => {
    render(<Picture name="taco-dorado" alt="Tacos dorados" />)
    const placeholder = screen.getByRole('img', { name: 'Tacos dorados' })
    expect(placeholder.tagName).toBe('DIV')
    expect(placeholder).toHaveAttribute('data-placeholder')
    // Sin textos de "próximamente" visibles para el cliente.
    expect(placeholder).toHaveTextContent('')
  })
})
