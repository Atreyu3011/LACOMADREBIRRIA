import { Plus } from 'lucide-react'
import { site } from '@/data/site'
import { buttonClass } from '@/lib/button'
import { cn } from '@/lib/utils'

interface AddToOrderButtonProps {
  itemId: string
  itemName: string
  /** "full": botón con texto. "icon": botón redondo "+" (menú completo). */
  variant?: 'full' | 'icon'
  className?: string
}

/**
 * Agrega un producto al pedido.
 * FASE 3: se conecta al store del carrito (src/store/cart.ts); por ahora solo es la UI.
 */
export function AddToOrderButton({
  itemId,
  itemName,
  variant = 'full',
  className,
}: AddToOrderButtonProps) {
  if (variant === 'icon') {
    return (
      <button
        type="button"
        data-item-id={itemId}
        aria-label={`Agregar ${itemName} al pedido`}
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-full border-2 border-white text-white transition-[background-color,color,transform] hover:bg-white hover:text-brick active:scale-95',
          className,
        )}
      >
        <Plus className="size-5" strokeWidth={2.75} aria-hidden />
      </button>
    )
  }

  return (
    <button
      type="button"
      data-item-id={itemId}
      className={cn(buttonClass({ variant: 'light' }), 'w-full', className)}
    >
      <Plus className="size-5" strokeWidth={2.75} aria-hidden />
      {site.favorites.addLabel}
      <span className="sr-only">: {itemName}</span>
    </button>
  )
}
