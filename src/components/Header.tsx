import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { site } from '@/data/site'
import { whatsappUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'

const orderHref = whatsappUrl(site.contact.whatsapp.number, site.contact.whatsapp.greeting)

/**
 * Header fijo. En móvil: logo, botón de pedido siempre visible y menú hamburguesa
 * (patrón de "disclosure": sin JS pesado ni trampa de foco).
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-wood/15 bg-cream/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm supports-[backdrop-filter]:bg-cream/85">
      <div className="mx-auto flex h-(--header-h) max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-(--header-h-lg) lg:px-8">
        <a
          href="#inicio"
          className="shrink-0 rounded-sm"
          aria-label={`${site.brand.fullName}, ir al inicio`}
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="relative py-2 text-[1.0625rem] font-semibold tracking-wide text-ink uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-deep after:transition-transform hover:text-ember hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-4 text-[1.0625rem] font-semibold tracking-wide text-white uppercase shadow-[0_2px_0_0_var(--color-wood)] transition-[background-color,transform] hover:bg-brick active:translate-y-px sm:px-5"
          >
            <WhatsAppIcon className="size-5" />
            <span className="sm:hidden">{site.header.orderCtaShort}</span>
            <span className="hidden sm:inline">{site.header.orderCta}</span>
            <span className="sr-only"> (abre WhatsApp)</span>
          </a>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-deep lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </div>

      <nav
        id={panelId}
        aria-label="Menú móvil"
        hidden={!open}
        className={cn('border-t border-wood/15 bg-cream lg:hidden')}
      >
        <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {site.nav.map((item) => (
            <li key={item.id} className="border-b border-wood/10 last:border-b-0">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center font-display text-[1.75rem] tracking-wide text-ink uppercase hover:text-ember"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
