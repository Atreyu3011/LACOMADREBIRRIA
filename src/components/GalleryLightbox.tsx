import Lightbox, { type SlideImage } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface GalleryLightboxProps {
  slides: SlideImage[]
  index: number
  onClose: () => void
}

/** Lightbox de la galería. Se carga de forma diferida al abrir la primera foto. */
export default function GalleryLightbox({ slides, index, onClose }: GalleryLightboxProps) {
  return (
    <Lightbox
      open
      index={index}
      close={onClose}
      slides={slides}
      controller={{ closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: 'rgb(28 26 24 / 0.95)' } }}
      labels={{
        Previous: 'Foto anterior',
        Next: 'Foto siguiente',
        Close: 'Cerrar',
        Lightbox: 'Galería ampliada',
        Carousel: 'carrusel',
        Slide: 'foto',
        'Photo gallery': 'Fotos de La Comadre',
        '{index} of {total}': '{index} de {total}',
      }}
    />
  )
}
