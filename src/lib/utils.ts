import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge debe conocer los tokens propios de @theme (index.css); si no, confunde
 * `text-section` (tamaño) con `text-white` (color) y elimina uno de los dos.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'script', 'section', 'dish', 'item', 'body', 'eyebrow'],
      font: ['sans', 'display', 'impact', 'script', 'brush'],
    },
  },
})

/** Une clases de Tailwind resolviendo conflictos (patrón de shadcn/ui). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
