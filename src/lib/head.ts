import type { Site } from '../data/schema.ts'
import { site as defaultSite } from '../data/site.ts'

// Se importa desde vite.config.ts: solo imports relativos con extensión, sin "@/".

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const absolute = (base: string, path: string) => new URL(path, base).href

/** Etiquetas del <head> generadas desde site.ts. El JSON-LD se agrega en la fase de calidad. */
export function renderHead(site: Site = defaultSite): string {
  const { seo } = site
  const e = escapeHtml
  const ogImage = absolute(seo.url, seo.ogImage)

  return [
    // Marca que hay JavaScript: sin él, la entrada animada del hero se muestra estática.
    `<script>document.documentElement.classList.add('js')</script>`,
    `<title>${e(seo.title)}</title>`,
    `<meta name="description" content="${e(seo.description)}" />`,
    `<link rel="canonical" href="${e(seo.url)}/" />`,
    `<meta name="theme-color" content="${e(seo.themeColor)}" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${e(seo.locale)}" />`,
    `<meta property="og:site_name" content="${e(site.brand.fullName)}" />`,
    `<meta property="og:title" content="${e(seo.title)}" />`,
    `<meta property="og:description" content="${e(seo.description)}" />`,
    `<meta property="og:url" content="${e(seo.url)}/" />`,
    `<meta property="og:image" content="${e(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${e(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ')
}
