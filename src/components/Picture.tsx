import type { ImgHTMLAttributes } from 'react'
import manifest from '@/data/images.gen.json'
import { cn } from '@/lib/utils'
import { Sparkle } from './Sparkle'
import { TacoDoodle } from './TacoDoodle'

interface ImageEntry {
  width: number
  height: number
  widths: number[]
  color: string
}

const images: Record<string, ImageEntry | undefined> = manifest

export const hasImage = (name: string) => Boolean(images[name])
export const getImage = (name: string) => images[name]

type PictureProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height' | 'alt'
> & {
  /** Nombre generado por `npm run images`, ej. "taco-madrazo". */
  name: string
  alt: string
  /** Atributo sizes del srcset. Por defecto la imagen ocupa todo el ancho. */
  sizes?: string
  /** Imagen principal de la vista (hero): carga inmediata y prioridad alta. */
  priority?: boolean
}

/**
 * Imagen responsiva con AVIF y WebP en 640/1024/1600 px.
 * Si la foto aún no existe, muestra un placeholder con los colores de la marca.
 */
export function Picture({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
  ...rest
}: PictureProps) {
  const entry = images[name]
  if (!entry) return <PicturePlaceholder alt={alt} className={className} />

  const srcSet = (format: 'avif' | 'webp') =>
    entry.widths.map((w) => `/img/${name}-${w}.${format} ${w}w`).join(', ')
  const fallbackWidth = entry.widths[Math.min(1, entry.widths.length - 1)] ?? entry.width

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${fallbackWidth}.webp`}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
        style={{ backgroundColor: entry.color, ...style }}
        {...rest}
      />
    </picture>
  )
}

/**
 * Placeholder de marca para platillos sin foto limpia (PENDIENTE: fotos).
 * Sin textos de "próximamente": el visitante ve un bloque de marca, no un hueco.
 */
function PicturePlaceholder({ alt, className }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      data-placeholder
      className={cn(
        'relative isolate overflow-hidden bg-linear-to-br from-orange-deep to-brick',
        className,
      )}
    >
      <TacoDoodle className="absolute top-1/2 left-1/2 w-3/4 max-w-80 -translate-x-1/2 -translate-y-1/2 -rotate-12 text-white opacity-25" />
      <Sparkle variant="solid" className="absolute top-[30%] right-[14%] size-8 text-orange" />
      <Sparkle variant="solid" className="absolute bottom-[34%] left-[12%] size-5 text-white/70" />
    </div>
  )
}
