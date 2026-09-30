import { Expand } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { getImage, Picture } from '@/components/Picture'
import { SectionHeading } from '@/components/SectionHeading'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const loadLightbox = () => import('@/components/GalleryLightbox')
const GalleryLightbox = lazy(loadLightbox)

/** Proporciones alternadas para el ritmo del masonry (las fotos originales son casi todas 16:9). */
const ASPECTS = [
  'aspect-4/5',
  'aspect-4/3',
  'aspect-square',
  'aspect-4/3',
  'aspect-3/4',
  'aspect-4/5',
]

const slides = site.gallery.images.flatMap(({ image, alt }) => {
  const entry = getImage(image)
  if (!entry) return []
  return [
    {
      src: `/img/${image}-${entry.width}.webp`,
      alt,
      width: entry.width,
      height: entry.height,
      srcSet: entry.widths.map((w) => ({
        src: `/img/${image}-${w}.webp`,
        width: w,
        height: Math.round((entry.height * w) / entry.width),
      })),
    },
  ]
})

/** Galería tipo masonry; al tocar una foto se abre el lightbox (cargado bajo demanda). */
export function Gallery() {
  const [index, setIndex] = useState(-1)

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="border-t border-wood/15 bg-cream-deep/60 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="galeria-titulo"
          eyebrow={site.gallery.eyebrow}
          title={site.gallery.title}
        />

        <ul className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:mt-10">
          {site.gallery.images.map(({ image, alt }, i) => (
            <li key={image} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setIndex(i)}
                onPointerEnter={loadLightbox}
                onFocus={loadLightbox}
                aria-label={`Ampliar foto: ${alt}`}
                className="group relative block w-full overflow-hidden bg-ink"
              >
                <Picture
                  name={image}
                  alt={alt}
                  sizes="(min-width: 768px) 32vw, 48vw"
                  className={cn(
                    'w-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.04] group-hover:opacity-90',
                    ASPECTS[i % ASPECTS.length],
                  )}
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {index >= 0 && (
        <Suspense fallback={null}>
          <GalleryLightbox slides={slides} index={index} onClose={() => setIndex(-1)} />
        </Suspense>
      )}
    </section>
  )
}
