import type { Site } from '@/data/schema'
import { formatHour } from './links'

type Hours = Site['hours']

export interface OpenStatus {
  isOpen: boolean
  /** Hora de cierre de hoy, "14:00". */
  closesAt: string
  /** Próxima apertura: hora y en cuántos días (0 = hoy, 1 = mañana…). */
  nextOpen: { time: string; inDays: number; weekday: number }
}

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Día de la semana y minuto del día en la zona horaria del negocio (America/Mazatlan). */
export function zonedTime(date: Date, timeZone: string): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value
  return {
    weekday: WEEKDAYS_EN.indexOf(get('weekday') ?? 'Sun'),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

/**
 * ¿Está abierto? Abre a la hora de apertura (inclusive) y cierra a la hora de cierre
 * (exclusive): con 07:30–14:00, a las 7:29 está cerrado, a las 7:30 abierto,
 * a las 13:59 abierto y a las 14:00 cerrado.
 */
export function getOpenStatus(date: Date, hours: Hours): OpenStatus {
  const { weekday, minutes } = zonedTime(date, hours.timeZone)
  const open = toMinutes(hours.open)
  const close = toMinutes(hours.close)
  const opensToday = hours.days.includes(weekday)
  const isOpen = opensToday && minutes >= open && minutes < close

  let inDays = opensToday && minutes < open ? 0 : 1
  while (inDays < 7 && !hours.days.includes((weekday + inDays) % 7)) inDays++

  return {
    isOpen,
    closesAt: hours.close,
    nextOpen: { time: hours.open, inDays, weekday: (weekday + inDays) % 7 },
  }
}

/** "Abierto ahora · cierra a las 14:00" o "Cerrado · abrimos mañana a las 7:30". */
export function openStatusLabel(status: OpenStatus): { title: string; detail: string } {
  if (status.isOpen) {
    return { title: 'Abierto ahora', detail: `cierra a las ${formatHour(status.closesAt)}` }
  }
  const { inDays, time, weekday } = status.nextOpen
  const when = inDays === 0 ? '' : inDays === 1 ? 'mañana ' : `el ${WEEKDAYS_ES[weekday]} `
  return { title: 'Cerrado', detail: `abrimos ${when}a las ${formatHour(time)}` }
}
