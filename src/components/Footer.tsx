import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/data/site'
import { addressLines, formatHour, mailUrl, mapsSearchUrl, telUrl, whatsappUrl } from '@/lib/links'
import { Logo } from './Logo'
import { Sparkle } from './Sparkle'
import { TacoDoodle } from './TacoDoodle'
import { WhatsAppIcon } from './WhatsAppIcon'

const [line1, line2, line3] = addressLines(site.address)

const socials = [
  { label: 'Facebook', href: site.contact.social.facebook },
  { label: 'Instagram', href: site.contact.social.instagram },
  { label: 'TikTok', href: site.contact.social.tiktok },
].filter((s): s is { label: string; href: string } => Boolean(s.href))

/** Pie de página: franja naranja como en los pósters, bloque ladrillo con datos de contacto. */
export function Footer() {
  const { contact, hours, brand } = site

  return (
    <footer className="relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="h-3 bg-orange" />
      <div className="relative bg-brick">
        <TacoDoodle className="pointer-events-none absolute -right-10 -bottom-8 -z-10 w-72 text-white opacity-10 lg:w-96" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_0.6fr] lg:px-8 lg:py-16">
          <div>
            <Logo tone="light" size="lg" />
            <p className="mt-5 flex items-start gap-2 font-script text-[1.5rem] leading-tight">
              <Sparkle variant="solid" className="mt-1.5 size-5 text-orange" />
              {brand.slogan}
            </p>
            <p className="mt-1 pl-7 text-[0.9375rem] font-semibold tracking-[0.12em] uppercase">
              {brand.anniversaryYears} años · desde {brand.foundedYear}
            </p>
          </div>

          <div>
            <h2 className="font-display text-[1.75rem] tracking-wide">Visítanos</h2>
            <ul className="mt-3 space-y-3">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
                <a
                  href={mapsSearchUrl(site.address.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {line1}
                  <br />
                  {line2}
                  <br />
                  {line3}
                  <span className="sr-only"> (abre Google Maps)</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
                <span>
                  {hours.daysLabel}
                  <br />
                  {formatHour(hours.open)} a {formatHour(hours.close)} h
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[1.75rem] tracking-wide">Contacto</h2>
            <ul className="mt-3 space-y-3">
              <li>
                <a
                  href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.greeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 underline-offset-4 hover:underline"
                >
                  <WhatsAppIcon className="size-5" />
                  <span>
                    WhatsApp {contact.whatsapp.display}
                    <span className="sr-only"> (abre WhatsApp)</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={telUrl(contact.phone.e164)}
                  className="flex min-h-11 items-center gap-3 underline-offset-4 hover:underline"
                >
                  <Phone className="size-5 shrink-0" aria-hidden />
                  Llamar al {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={mailUrl(contact.email)}
                  className="flex min-h-11 items-center gap-3 wrap-anywhere underline-offset-4 hover:underline"
                >
                  <Mail className="size-5 shrink-0" aria-hidden />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[1.75rem] tracking-wide">Síguenos</h2>
            <ul className="mt-3 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="size-5 shrink-0" aria-hidden />
                    {s.label}
                    <span className="sr-only"> (abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/25">
          <p className="mx-auto max-w-7xl px-4 py-5 text-[0.9375rem] sm:px-6 lg:px-8">
            {site.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
