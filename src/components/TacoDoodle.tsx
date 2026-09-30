import { cn } from '@/lib/utils'

/** Taco dibujado en línea, estilo doodle. Decoración de fondo en baja opacidad. */
export function TacoDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 84"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-orange-deep', className)}
    >
      {/* Relleno: lechuga y carne asomando */}
      <path d="M9 34c4-9 10-4 15-10s11 1 16-6 11 2 16-4 11 3 16-2 10 4 15 0 9 6 14 10" />
      <path d="M18 36c3-5 7-3 10-6m10 1c3-4 7-3 10-5m12 1c3-4 7-3 10-4m12 2c3-3 6-2 9-3" />
      {/* Tortilla doblada */}
      <path d="M8 36c0 26 22 42 52 42s52-16 52-42" />
      <path d="M20 39c2 18 18 29 40 29s38-11 40-29" />
      {/* Textura de la tortilla dorada */}
      <path d="M34 60l2 1M50 66l2 0M68 66l2-1M84 58l2-1M42 52l1 1M78 52l1 1" />
    </svg>
  )
}
