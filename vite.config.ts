/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { parseSite } from './src/data/schema.ts'
import { site } from './src/data/site.ts'
import { renderHead } from './src/lib/head.ts'

// Valida src/data/site.ts con Zod al arrancar `npm run dev` y al compilar:
// un precio o un horario mal escrito detiene el proceso con un mensaje claro.
parseSite(site)

/** Inserta los meta tags generados desde site.ts en index.html (dev y build). */
function siteHead(): Plugin {
  return {
    name: 'la-comadre:head',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const out = html.replace('<!--head-->', renderHead())
        // En dev no hay prerender: se quita el marcador para que React monte limpio.
        return ctx.server ? out.replace('<!--app-->', '') : out
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteHead()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
})
