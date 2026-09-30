/**
 * npm run images
 *
 * Lee las fotos originales de referencias/fotos/, recorta cuando hace falta, las renombra
 * y genera AVIF + WebP en 640, 1024 y 1600 px dentro de public/img/.
 * También escribe src/data/images.gen.json con medidas y color dominante de cada imagen,
 * que usa el componente <Picture>.
 *
 * Cuando lleguen fotos de mejor calidad, basta con reemplazar el archivo en
 * referencias/fotos/ con el MISMO nombre y volver a correr `npm run images`.
 * El recorte de capturas de pantalla solo se aplica si la foto sigue siendo una captura
 * de Windows (1600×900 con bandas negras); una foto nueva y limpia no se recorta.
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'referencias/fotos'
const OUT_DIR = 'public/img'
const MANIFEST = 'src/data/images.gen.json'
const WIDTHS = [640, 1024, 1600]

sharp.cache(false)

/**
 * Captura de pantalla de Windows a 1600×900: bandas negras de ~33 px a los lados,
 * barra de tareas de 38 px abajo y botones de la ventana arriba a la derecha.
 * Medido sobre los archivos actuales (contenido útil: x 33–1566, y 0–862).
 */
const SCREENSHOT = { left: 34, top: 22, width: 1531, height: 840 }

/** @typedef {{ src: string, name: string, crop?: 'screenshot', region?: {left:number,top:number,width:number,height:number}, og?: boolean }} Job */

/** @type {Job[]} */
const JOBS = [
  // Hero: versión limpia de la foto del banner (sin logo ni textos incrustados).
  { src: 'TACOSDEBIRRIACONQUESO.jpeg', name: 'hero-portada', og: true },

  // Favoritos
  { src: 'TACODEBIRRIACONACOMPAÑAMIENTO.jpeg', name: 'taco-madrazo' },
  { src: 'TACOSDEBIRRIATODOINCLUIDO.jpeg', name: 'taco-especial' },
  { src: 'TOSTADADEBIRRIACONSIDES.jpeg', name: 'tostada-cleopatra' },
  { src: 'TOSTADADEBIRRIA.jpeg', name: 'tostada-cleopatra-detalle' },
  // taco-dorado: no hay foto limpia todavía; el sitio muestra un placeholder de marca.

  // Orden de birria
  { src: 'ORDEN-DE-BIRRIA-CON-REFRESCO.jpeg', name: 'orden-birria-completa' },
  { src: 'ORDENDEBIRRIA.jpeg', name: 'orden-birria-1' },
  { src: 'ORDEN-DE-BIRRIA.jpeg', name: 'orden-birria-2' },
  { src: 'ORDENDEBIRRIACLOSE.jpeg', name: 'orden-birria-3' },
  { src: 'ORDENDEBIRRIAFRENTE.jpeg', name: 'orden-birria-chile-1' },
  { src: 'ORDENDEBIRRIALATERAL.jpeg', name: 'orden-birria-chile-2' },
  { src: 'ORDENDEBIRRIAVISTAEREA.jpeg', name: 'orden-birria-chile-3' },

  // Galería
  { src: 'TACOSDEBIRRIA.jpeg', name: 'tabla-de-birria' },
  { src: 'TACOS2.jpeg', name: 'tacos-especiales-2' },
  { src: 'TACOSDEBIRRIADECERCA.jpeg', name: 'tacos-especiales-3' },
  { src: 'TACOSDEBIRRIADELADO.jpeg', name: 'tacos-especiales-4' },

  // Historia (capturas de pantalla de video: se recortan barra de tareas, bandas y botones)
  { src: 'HISTORICO.INICIOSDELRESTA2.jpeg', name: 'historia-carrito', crop: 'screenshot' },
  { src: 'HISTORICO.INICIOSDELRESTA.jpeg', name: 'historia-parrilla', crop: 'screenshot' },
  { src: 'INICIOSDELRESTAU.jpeg', name: 'historia-toldo', crop: 'screenshot' },
  {
    // Collage de dos fotos (división en x=426): se usa la de la derecha, el puesto con
    // toldo rojo y el equipo de camisas blancas.
    src: 'INICIOSDELRESTAUR.jpeg',
    name: 'historia-puesto',
    crop: 'screenshot',
    region: { left: 430, top: 22, width: 1134, height: 840 },
  },
  {
    // Collage de dos fotos (división en x=718): se usa la de la derecha, el equipo en la plancha.
    src: 'INICIOSDELRESTAURANTE.jpeg',
    name: 'historia-equipo',
    crop: 'screenshot',
    region: { left: 722, top: 22, width: 842, height: 840 },
  },
  { src: 'FOTODELRESTACTUAL.jpeg', name: 'historia-hoy', crop: 'screenshot' },
]

const toHex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')

/** ¿Sigue siendo una captura de Windows? (1600×900 con banda negra a la izquierda) */
async function isWindowsScreenshot(file, meta) {
  if (meta.width !== 1600 || meta.height !== 900) return false
  // stats() mide la imagen de entrada, así que primero se materializa el recorte.
  const strip = await sharp(file).extract({ left: 0, top: 100, width: 28, height: 700 }).toBuffer()
  const { channels } = await sharp(strip).stats()
  const mean = channels.slice(0, 3).reduce((sum, c) => sum + c.mean, 0) / 3
  return mean < 15
}

async function main() {
  // Mapa de nombres normalizados (la Ñ puede venir en NFC o NFD según el sistema).
  const available = new Map(
    (await readdir(SRC_DIR)).map((f) => [f.normalize('NFC').toUpperCase(), f]),
  )

  await mkdir(OUT_DIR, { recursive: true })
  // Borra solo lo generado en la raíz de public/img (no toca public/img/brand).
  for (const f of await readdir(OUT_DIR, { withFileTypes: true })) {
    if (f.isFile() && /\.(avif|webp|jpg)$/.test(f.name)) await rm(path.join(OUT_DIR, f.name))
  }

  /** @type {Record<string, {width:number,height:number,widths:number[],color:string}>} */
  const manifest = {}
  const missing = []

  for (const job of JOBS) {
    const real = available.get(job.src.normalize('NFC').toUpperCase())
    if (!real) {
      missing.push(job.src)
      continue
    }
    const file = path.join(SRC_DIR, real)
    const meta = await sharp(file).metadata()

    let pipeline = () => sharp(file).rotate()
    let cropNote = ''
    if (job.crop === 'screenshot') {
      if (await isWindowsScreenshot(file, meta)) {
        const region = job.region ?? SCREENSHOT
        pipeline = () => sharp(file).rotate().extract(region)
        cropNote = ` recorte ${region.width}×${region.height}`
      } else {
        cropNote = ' (ya no es captura: sin recorte)'
      }
    }

    const base = await pipeline().toBuffer({ resolveWithObject: true })
    const srcWidth = base.info.width
    const srcHeight = base.info.height
    const widths = [...new Set(WIDTHS.map((w) => Math.min(w, srcWidth)))]

    for (const w of widths) {
      const resized = () => sharp(base.data).resize({ width: w, withoutEnlargement: true })
      await resized()
        .avif({ quality: 52, effort: 4 })
        .toFile(path.join(OUT_DIR, `${job.name}-${w}.avif`))
      await resized()
        .webp({ quality: 78 })
        .toFile(path.join(OUT_DIR, `${job.name}-${w}.webp`))
    }

    const { dominant } = await sharp(base.data).stats()
    const largest = widths.at(-1)
    manifest[job.name] = {
      width: largest,
      height: Math.round((srcHeight * largest) / srcWidth),
      widths,
      color: toHex(dominant),
    }

    if (job.og) {
      await sharp(base.data)
        .resize({ width: 1200, height: 630, fit: 'cover', position: sharp.strategy.attention })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(OUT_DIR, 'og-portada.jpg'))
    }

    console.log(`✓ ${job.name.padEnd(28)} ← ${real}${cropNote}`)
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\n${Object.keys(manifest).length} imágenes → ${OUT_DIR}/, manifiesto en ${MANIFEST}`)

  if (missing.length) {
    console.warn(`\n⚠ No se encontraron en ${SRC_DIR}/:\n  - ${missing.join('\n  - ')}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
