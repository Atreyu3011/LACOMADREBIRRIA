import { useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000)
  return () => window.clearInterval(id)
}
const getSnapshot = () => Math.floor(Date.now() / 60_000)
const getServerSnapshot = () => null

/**
 * Minuto actual (timestamp / 60 000). En el prerender devuelve null: así lo que depende
 * de la hora (abierto/cerrado) solo se calcula en el navegador y no rompe la hidratación.
 */
export function useMinute(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
