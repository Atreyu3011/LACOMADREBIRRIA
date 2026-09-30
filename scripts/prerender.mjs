/**
 * Prerenderiza la página a HTML estático después de `vite build`.
 *
 * 1. `vite build` genera dist/index.html (con el <head> ya insertado desde site.ts).
 * 2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` genera el render de servidor.
 * 3. Este script renderiza <App /> y lo inserta en dist/index.html; el cliente lo hidrata.
 *
 * Así el menú, los textos y los meta tags viajan en el HTML inicial (Google, WhatsApp, Facebook).
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const SSR_DIR = 'dist-ssr'
const MARKER = '<!--app-->'

const entry = pathToFileURL(path.resolve(SSR_DIR, 'entry-server.js')).href
const { render } = await import(entry)

const templatePath = path.join(DIST, 'index.html')
const template = await readFile(templatePath, 'utf8')
if (!template.includes(MARKER)) {
  throw new Error(`No se encontró ${MARKER} en ${templatePath}`)
}

const appHtml = await render()
if (!appHtml || appHtml.length < 200) {
  throw new Error('El prerender devolvió un HTML vacío o demasiado corto')
}

await writeFile(templatePath, template.replace(MARKER, appHtml))
await rm(SSR_DIR, { recursive: true, force: true })

const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1)
console.log(`✓ Prerender: ${templatePath} (${kb} KB de HTML de la app)`)
