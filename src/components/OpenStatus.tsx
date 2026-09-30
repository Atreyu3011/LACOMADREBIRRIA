import { site } from '@/data/site'
import { getOpenStatus, openStatusLabel } from '@/lib/hours'
import { formatHour } from '@/lib/links'
import { useMinute } from '@/lib/useMinute'
import { cn } from '@/lib/utils'

/**
 * "Abierto ahora · cierra a las 14:00" / "Cerrado · abrimos a las 7:30".
 * En el HTML prerenderizado muestra el horario general; al cargar, calcula el estado
 * con la hora de Los Mochis (America/Mazatlan).
 */
export function OpenStatus({ className }: { className?: string }) {
  const minute = useMinute()
  const { hours } = site

  const status = minute === null ? null : getOpenStatus(new Date(minute * 60_000), hours)
  const label = status ? openStatusLabel(status) : null

  return (
    <p
      className={cn(
        'inline-flex min-h-9 items-center gap-2 rounded-full border border-wood/20 bg-white/70 px-3.5 py-1 text-[1rem] text-ink',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2.5 shrink-0 rounded-full',
          status === null && 'bg-wood/40',
          status?.isOpen && 'bg-lime shadow-[0_0_0_3px_rgb(155_197_61/0.3)]',
          status && !status.isOpen && 'bg-brick',
        )}
      />
      {label ? (
        <span>
          <strong className="font-semibold">{label.title}</strong> · {label.detail}
        </span>
      ) : (
        <span>
          <strong className="font-semibold">{hours.daysLabel}</strong> · {formatHour(hours.open)} a{' '}
          {formatHour(hours.close)} h
        </span>
      )}
    </p>
  )
}
