import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn con los tokens de la marca', () => {
  it('no confunde tamaños propios con colores', () => {
    expect(cn('font-brush text-section', 'text-white')).toBe('font-brush text-section text-white')
    expect(cn('text-dish text-white')).toBe('text-dish text-white')
    expect(cn('text-orange-deep', 'text-script')).toBe('text-orange-deep text-script')
  })

  it('sigue resolviendo conflictos reales', () => {
    expect(cn('text-section', 'text-dish')).toBe('text-dish')
    expect(cn('text-white', 'text-ink')).toBe('text-ink')
    expect(cn('font-display font-semibold', 'font-brush')).toBe('font-semibold font-brush')
  })
})
