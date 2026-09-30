import { describe, expect, it } from 'vitest'
import { site } from '@/data/site'
import { getOpenStatus, openStatusLabel } from './hours'

/**
 * America/Mazatlan es UTC-7 todo el año (sin horario de verano desde 2022).
 * 2026-10-01 es jueves.
 */
const at = (localHHMM: string, day = '2026-10-01') => new Date(`${day}T${localHHMM}:00-07:00`)

describe('getOpenStatus en horas límite (07:30–14:00)', () => {
  it.each([
    ['07:29', false],
    ['07:30', true],
    ['13:59', true],
    ['14:00', false],
  ])('a las %s → abierto: %s', (time, expected) => {
    expect(getOpenStatus(at(time), site.hours).isOpen).toBe(expected)
  })

  it('no depende de la zona horaria del visitante', () => {
    // 07:30 en Mazatlán = 14:30 UTC = 08:30 en Ciudad de México.
    expect(getOpenStatus(new Date('2026-10-01T14:30:00Z'), site.hours).isOpen).toBe(true)
  })
})

describe('openStatusLabel', () => {
  it('abierto', () => {
    expect(openStatusLabel(getOpenStatus(at('09:00'), site.hours))).toEqual({
      title: 'Abierto ahora',
      detail: 'cierra a las 14:00',
    })
  })

  it('antes de abrir: abre hoy', () => {
    expect(openStatusLabel(getOpenStatus(at('07:29'), site.hours)).detail).toBe(
      'abrimos a las 7:30',
    )
  })

  it('después de cerrar: abre mañana', () => {
    expect(openStatusLabel(getOpenStatus(at('14:00'), site.hours)).detail).toBe(
      'abrimos mañana a las 7:30',
    )
  })

  it('si un día cierra, salta al siguiente día hábil', () => {
    // Hipotético: cerrado lunes (1). Domingo 2026-10-04 a las 15:00 → abre el martes.
    const hours = { ...site.hours, days: [0, 2, 3, 4, 5, 6] }
    const status = getOpenStatus(at('15:00', '2026-10-04'), hours)
    expect(status.isOpen).toBe(false)
    expect(openStatusLabel(status).detail).toBe('abrimos el martes a las 7:30')
  })
})
