import { cva, type VariantProps } from 'class-variance-authority'

/** Estilos de botón y enlace-botón de la marca. */
export const buttonClass = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap uppercase transition-[background-color,color,border-color,transform] active:translate-y-px',
  {
    variants: {
      variant: {
        /** Acción principal: ember con texto blanco (5.4:1). */
        primary: 'bg-ember text-white shadow-[0_3px_0_0_var(--color-wood)] hover:bg-brick',
        /** Secundario sobre fondos claros. */
        outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-cream',
        /** Sobre fondos ladrillo o fotos oscuras. */
        light: 'bg-white text-ink hover:bg-cream',
        outlineLight: 'border-2 border-white text-white hover:bg-white hover:text-brick',
      },
      size: {
        md: 'h-11 px-5 text-[1.0625rem]',
        lg: 'h-13 px-6 text-[1.1875rem]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonVariants = VariantProps<typeof buttonClass>
