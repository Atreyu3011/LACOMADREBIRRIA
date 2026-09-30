import { AnniversarySeal } from '@/components/AnniversarySeal'
import { Picture } from '@/components/Picture'
import { SectionHeading } from '@/components/SectionHeading'
import { Sparkle } from '@/components/Sparkle'
import { TacoDoodle } from '@/components/TacoDoodle'
import type { Site } from '@/data/schema'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

type Entry = Site['history']['timeline'][number]

/** Nuestra historia: la única secuencia real del sitio, por eso lleva línea de tiempo. */
export function History() {
  const { history } = site
  const stages = history.timeline.filter((e) => !e.highlight)
  const finale = history.timeline.find((e) => e.highlight)

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="relative overflow-hidden bg-cream py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="historia-titulo" eyebrow={history.eyebrow} title={history.title}>
          <p className="mt-3 max-w-2xl text-[1.25rem] text-ink-soft">{history.intro}</p>
        </SectionHeading>

        <ol className="relative mt-12 lg:mt-16">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-8 left-[0.95rem] w-0.5 bg-wood/30 lg:left-1/2 lg:-translate-x-1/2"
          />
          {stages.map((entry, i) => (
            <TimelineStage key={entry.id} entry={entry} flip={i % 2 === 1} />
          ))}
          {finale && <AnniversaryFinale entry={finale} />}
        </ol>
      </div>
    </section>
  )
}

function TimelineStage({ entry, flip }: { entry: Entry; flip: boolean }) {
  return (
    <li className="relative pb-14 pl-12 lg:grid lg:grid-cols-2 lg:items-center lg:pb-24 lg:pl-0">
      <span
        aria-hidden="true"
        className="absolute top-1 left-0 grid size-8 place-items-center rounded-full border-2 border-orange-deep bg-cream lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <Sparkle className="size-4" />
      </span>

      <div className={cn(flip ? 'lg:order-2 lg:pl-16' : 'lg:pr-16 lg:text-right')}>
        <p className="font-display text-[clamp(3rem,2.4rem+2.6vw,5rem)] leading-none text-orange-deep">
          {entry.period}
        </p>
        <h3 className="mt-1 font-impact text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-tight text-ink uppercase">
          {entry.title}
        </h3>
        <p className={cn('mt-3 max-w-md text-body text-ink-soft', !flip && 'lg:ml-auto')}>
          {entry.body}
        </p>
      </div>

      {entry.image && (
        <div className={cn('mt-6 lg:mt-0', flip ? 'lg:order-1 lg:pr-16' : 'lg:pl-16')}>
          <Snapshot
            image={entry.image}
            alt={entry.imageAlt ?? entry.title}
            vintage={entry.vintage}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className={flip ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]'}
          />
          {entry.extraImages && (
            <ul
              className={cn(
                'mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:relative lg:-mt-10 lg:w-4/5',
                flip ? 'lg:mr-auto lg:-ml-4' : 'lg:-mr-4 lg:ml-auto',
              )}
            >
              {entry.extraImages.map((extra, i) => (
                <li key={extra.image}>
                  <Snapshot
                    image={extra.image}
                    alt={extra.alt}
                    vintage={entry.vintage}
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className={i % 2 === 0 ? 'rotate-2' : '-rotate-2'}
                    small
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

interface SnapshotProps {
  image: string
  alt: string
  vintage?: boolean
  sizes: string
  className?: string
  small?: boolean
}

/** Foto impresa con marco blanco; las históricas llevan sepia ligero y grano. */
function Snapshot({ image, alt, vintage, sizes, className, small }: SnapshotProps) {
  return (
    <figure
      className={cn(
        'bg-white shadow-[0_14px_30px_-16px_rgb(28_26_24/0.55)]',
        small ? 'p-1.5 sm:p-2' : 'p-2 sm:p-3',
        className,
      )}
    >
      <div className={cn('overflow-hidden', vintage && 'vintage')}>
        <Picture
          name={image}
          alt={alt}
          sizes={sizes}
          className={cn('w-full object-cover', small ? 'aspect-square' : 'aspect-4/3')}
        />
      </div>
    </figure>
  )
}

/** Cierre de la línea de tiempo: el 30 aniversario, el tema central del sitio. */
function AnniversaryFinale({ entry }: { entry: Entry }) {
  return (
    <li className="relative">
      <div className="relative isolate overflow-hidden bg-ember text-white shadow-[0_24px_50px_-28px_rgb(28_26_24/0.8)]">
        <div aria-hidden="true" className="h-3 bg-orange" />
        <TacoDoodle className="pointer-events-none absolute -right-10 -bottom-10 -z-10 w-72 text-white opacity-10 lg:w-md" />

        <div className="grid items-center gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:py-14">
          <div className="relative mx-auto w-fit">
            <AnniversarySeal className="w-56 sm:w-64 lg:w-72" />
            <Sparkle className="absolute -top-3 -right-4 size-10 text-orange" />
            <Sparkle className="absolute bottom-4 -left-5 size-7 text-orange" />
          </div>

          <div className="text-center lg:text-left">
            <p className="font-display text-[clamp(3rem,2.4rem+2.6vw,5rem)] leading-none">
              {entry.period}
            </p>
            <h3 className="font-script text-[clamp(2.75rem,2.2rem+2.4vw,4.5rem)] leading-none">
              ¡{entry.title}!
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-[1.25rem] lg:mx-0">{entry.body}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
