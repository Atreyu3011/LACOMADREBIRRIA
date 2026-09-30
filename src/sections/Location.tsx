import {
  Accessibility,
  Bike,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Snowflake,
  SquareParking,
  type LucideIcon,
} from 'lucide-react'
import { OpenStatus } from '@/components/OpenStatus'
import { SectionHeading } from '@/components/SectionHeading'
import type { Site } from '@/data/schema'
import { site } from '@/data/site'
import { buttonClass } from '@/lib/button'
import {
  addressLines,
  formatHour,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  telUrl,
  wazeUrl,
} from '@/lib/links'
import { cn } from '@/lib/utils'

const ATTRIBUTE_ICONS: Record<Site['attributes'][number]['id'], LucideIcon> = {
  'aire-acondicionado': Snowflake,
  accesible: Accessibility,
  estacionamiento: SquareParking,
  domicilio: Bike,
}

/** Ubicación y horarios: dirección, estado abierto/cerrado, atributos, mapa y cómo llegar. */
export function Location() {
  const { location, address, hours, contact, attributes } = site
  const [line1, line2, line3] = addressLines(address)

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-titulo" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading id="ubicacion-titulo" eyebrow={location.eyebrow} title={location.title} />

          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-orange-deep" aria-hidden />
              <div>
                <dt className="text-eyebrow font-semibold text-ember uppercase">
                  {location.addressTitle}
                </dt>
                <dd className="mt-1 text-[1.25rem] leading-snug">
                  {line1}
                  <br />
                  {line2}
                  <br />
                  {line3}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 size-6 shrink-0 text-orange-deep" aria-hidden />
              <div>
                <dt className="text-eyebrow font-semibold text-ember uppercase">
                  {location.hoursTitle}
                </dt>
                <dd className="mt-1 text-[1.25rem] leading-snug">
                  {hours.daysLabel}, de {formatHour(hours.open)} a {formatHour(hours.close)} h
                </dd>
                <dd className="mt-3">
                  <OpenStatus />
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a
              href={mapsDirectionsUrl(address.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonClass(), 'col-span-2')}
            >
              <Navigation className="size-5" aria-hidden />
              {location.directionsLabel}
              <span className="sr-only"> con Google Maps (abre en otra pestaña)</span>
            </a>
            <a
              href={wazeUrl(address.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: 'outline' })}
            >
              {location.wazeLabel}
              <span className="sr-only"> (abre en otra pestaña)</span>
            </a>
            <a href={telUrl(contact.phone.e164)} className={buttonClass({ variant: 'outline' })}>
              <Phone className="size-5" aria-hidden />
              {location.callLabel}
              <span className="sr-only"> al {contact.phone.display}</span>
            </a>
          </div>

          <h3 className="mt-10 text-eyebrow font-semibold text-ember uppercase">
            {location.attributesTitle}
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {attributes.map((attr) => {
              const Icon = ATTRIBUTE_ICONS[attr.id]
              return (
                <li
                  key={attr.id}
                  className="flex items-center gap-3 border-l-4 border-orange bg-white/70 px-4 py-3 text-[1.0625rem]"
                >
                  <Icon className="size-6 shrink-0 text-wood" aria-hidden />
                  {attr.label}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex flex-col">
          <div aria-hidden="true" className="h-3 bg-orange" />
          <iframe
            title={location.mapTitle}
            src={mapsEmbedUrl(address.mapsQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-4/3 w-full grow border-0 bg-cream-deep lg:aspect-auto lg:min-h-112"
          />
          <div aria-hidden="true" className="h-3 bg-orange-deep" />
        </div>
      </div>
    </section>
  )
}
