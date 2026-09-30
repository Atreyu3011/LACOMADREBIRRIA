import type { MenuItem as MenuItemData } from '@/data/schema'
import { formatPrice } from '@/lib/format'
import { AddToOrderButton } from './AddToOrderButton'

/** Renglón del menú impreso: NOMBRE ········ $PRECIO (+) y descripción debajo. */
export function MenuItem({ item }: { item: MenuItemData }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2 font-display text-item tracking-wide uppercase">
          <span className="min-w-0">{item.name}</span>
          <span
            aria-hidden="true"
            className="mb-[0.28em] min-w-4 flex-1 border-b-2 border-dotted border-white/50"
          />
          <span className="tabular shrink-0">{formatPrice(item.price)}</span>
        </p>
        {item.description && (
          <p className="text-[0.9375rem] leading-snug font-semibold tracking-[0.05em] text-white uppercase">
            {item.description}
          </p>
        )}
      </div>
      <AddToOrderButton itemId={item.id} itemName={item.name} variant="icon" />
    </li>
  )
}
