import { Fragment } from 'react'
import { site } from '@/data/site'
import { Sparkle } from './Sparkle'

/**
 * Franja sólida bajo el hero, como las franjas de los pósters:
 * "30 AÑOS ✦ EL SABOR QUE UNE GENERACIONES ✦ DESDE 1996 ✦ …". Estática, decorativa.
 */
export function AnniversaryBand() {
  const phrases = [...site.hero.band, ...site.hero.band, ...site.hero.band]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y-4 border-orange bg-orange-deep">
      <p className="flex w-max items-center gap-5 py-2.5 font-display text-[1.75rem] leading-none tracking-wide whitespace-nowrap text-white uppercase lg:py-3 lg:text-[2rem]">
        {phrases.map((phrase, i) => (
          <Fragment key={i}>
            <span>{phrase}</span>
            <Sparkle variant="solid" className="size-4 text-orange" />
          </Fragment>
        ))}
      </p>
    </div>
  )
}
