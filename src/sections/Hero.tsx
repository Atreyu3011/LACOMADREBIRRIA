import { Bike } from 'lucide-react'
import { domAnimation, LazyMotion, m, MotionConfig, type Transition } from 'motion/react'
import { AnniversaryBand } from '@/components/AnniversaryBand'
import { AnniversarySeal } from '@/components/AnniversarySeal'
import { OpenStatus } from '@/components/OpenStatus'
import { Picture } from '@/components/Picture'
import { Sparkle } from '@/components/Sparkle'
import { TacoDoodle } from '@/components/TacoDoodle'
import { site } from '@/data/site'
import { buttonClass } from '@/lib/button'
import { whatsappUrl } from '@/lib/links'
import { cn } from '@/lib/utils'

const ease: Transition['ease'] = [0.22, 1, 0.36, 1]

/** Texto que sube y aparece, escalonado. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
})

/** El sello entra girando con rebote; los destellos "brotan" después. */
const sealIn = {
  initial: { opacity: 0, scale: 0.6, rotate: -24 },
  animate: { opacity: 1, scale: 1, rotate: -6 },
  transition: { type: 'spring', stiffness: 170, damping: 14, delay: 0.15 },
} as const

const pop = (delay: number) =>
  ({
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 320, damping: 12, delay },
  }) as const

/**
 * Hero: el ÚNICO momento de animación orquestada del sitio.
 * Respeta prefers-reduced-motion (MotionConfig reducedMotion="user" omite los movimientos)
 * y sin JavaScript se muestra estático (ver [data-anim] en index.css).
 */
export function Hero() {
  const { hero, contact } = site
  const orderHref = whatsappUrl(contact.whatsapp.number, contact.whatsapp.greeting)

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <section
          id="inicio"
          aria-labelledby="inicio-titulo"
          className="relative isolate overflow-hidden bg-cream"
        >
          <TacoDoodle className="pointer-events-none absolute bottom-6 -left-12 -z-10 hidden w-80 opacity-[0.09] lg:block" />

          <div className="lg:grid lg:min-h-[min(calc(100svh-var(--header-h-lg)-3.75rem),50rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            {/* Foto: arriba en móvil, a la derecha y a sangre en desktop */}
            <div className="relative lg:order-2">
              <div className="relative overflow-hidden lg:absolute lg:inset-0">
                <m.div
                  data-anim
                  className="h-full"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease }}
                >
                  <Picture
                    name={hero.image}
                    alt={hero.imageAlt}
                    priority
                    sizes="(min-width: 1024px) 57vw, 100vw"
                    className="aspect-square max-h-[58svh] w-full object-cover object-[62%_50%] sm:aspect-video lg:aspect-auto lg:h-full lg:max-h-none"
                  />
                </m.div>
                {/* Oscurece la esquina del manuscrito para que el blanco se lea */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_8%,rgb(28_26_24/0.55),transparent_55%)]"
                />
              </div>

              <m.p
                data-anim
                aria-hidden="true"
                className="absolute top-4 right-4 -rotate-12 text-center font-brush text-[2.1rem] leading-[0.85] text-white uppercase drop-shadow-[0_2px_6px_rgb(0_0_0/0.45)] sm:text-[2.6rem] lg:top-10 lg:right-12 lg:text-[3.4rem]"
                {...rise(0.8)}
              >
                {hero.handwritten.split(' ').slice(0, -1).join(' ')}
                <br />
                <span className="relative">
                  {hero.handwritten.split(' ').at(-1)}
                  <svg
                    viewBox="0 0 120 14"
                    className="absolute -bottom-2 left-0 w-full text-orange"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  >
                    <path d="M3 10C35 3 80 2 117 6" />
                  </svg>
                </span>
              </m.p>

              {/* Sello en móvil: montado sobre el borde inferior de la foto */}
              <m.div data-anim className="absolute -bottom-14 left-4 lg:hidden" {...sealIn}>
                <AnniversarySeal className="w-36 sm:w-44" withSlogan={false} />
                <m.span data-anim className="absolute -top-1 -right-3" {...pop(0.55)}>
                  <Sparkle className="size-7" />
                </m.span>
              </m.div>
            </div>

            {/* Texto */}
            <div className="@container relative px-4 pt-18 pb-12 sm:px-6 sm:pt-20 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:py-12 lg:pr-12 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
              <m.div data-anim className="relative mb-7 hidden w-fit lg:block" {...sealIn}>
                <AnniversarySeal className="w-52 xl:w-60" />
                <m.span data-anim className="absolute -top-2 -right-6" {...pop(0.55)}>
                  <Sparkle className="size-10" />
                </m.span>
                <m.span data-anim className="absolute bottom-6 -left-7" {...pop(0.68)}>
                  <Sparkle className="size-6" />
                </m.span>
              </m.div>

              <m.p
                data-anim
                className="flex items-center gap-2 text-eyebrow font-semibold text-ember uppercase"
                {...rise(0.25)}
              >
                <Sparkle className="size-4" />
                {hero.eyebrow}
              </m.p>

              <m.h1
                data-anim
                id="inicio-titulo"
                className="mt-2 font-impact text-[min(16.5cqi,6rem)] leading-[0.92] text-ink uppercase"
                {...rise(0.33)}
              >
                {hero.title}
              </m.h1>

              <m.p data-anim className="mt-4 text-[1.25rem] text-ink-soft" {...rise(0.45)}>
                {hero.subtitle}
              </m.p>

              <m.div
                data-anim
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                {...rise(0.55)}
              >
                <a
                  href={orderHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonClass({ size: 'lg' }))}
                >
                  <Bike className="size-5" aria-hidden />
                  {hero.ctaOrder}
                  <span className="sr-only"> (abre WhatsApp)</span>
                </a>
                <a href="#menu" className={buttonClass({ variant: 'outline', size: 'lg' })}>
                  {hero.ctaMenu}
                </a>
              </m.div>

              <m.div data-anim className="mt-5" {...rise(0.65)}>
                <OpenStatus />
              </m.div>
            </div>
          </div>
        </section>
        <AnniversaryBand />
      </MotionConfig>
    </LazyMotion>
  )
}
