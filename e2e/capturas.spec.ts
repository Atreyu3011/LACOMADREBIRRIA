import { expect, test } from '@playwright/test'

/**
 * Capturas por sección para revisar el diseño contra los pósters de referencia.
 * Se guardan en e2e/capturas/ (ignorado por git).
 */
const SECTIONS = ['inicio', 'favoritos', 'menu', 'historia', 'galeria', 'ubicacion']

test.use({ deviceScaleFactor: 1 })

test('capturas por sección', async ({ page }, testInfo) => {
  test.setTimeout(120_000)
  await page.goto('/')
  await page.waitForTimeout(1800) // entrada del hero

  const project = testInfo.project.name
  await page.screenshot({ path: `e2e/capturas/fase2-${project}-0-pantalla.png` })

  // Menú a media lectura: chips fijos bajo el header y fondo fijo, como lo ve el usuario.
  await page.locator('a[href="#menu-especialidades"]').click()
  await page.waitForTimeout(1500)
  await expect(page.locator('a[href="#menu-especialidades"]')).toHaveAttribute(
    'aria-current',
    'true',
  )
  await page.screenshot({ path: `e2e/capturas/fase2-${project}-3b-menu-scroll.png` })

  // En las capturas por sección el header fijo taparía el inicio de cada una.
  await page.addStyleTag({ content: 'header.fixed { position: absolute !important; }' })

  for (const [i, id] of SECTIONS.entries()) {
    const section = page.locator(`#${id}`)
    await expect(section).toBeVisible()
    await section.scrollIntoViewIfNeeded()
    // Fuerza la carga de imágenes diferidas y del mapa de la sección, y espera a que terminen.
    await section.evaluate(async (el) => {
      const imgs = [...el.querySelectorAll('img')]
      imgs.forEach((img) => (img.loading = 'eager'))
      el.querySelectorAll('iframe').forEach((f) => (f.loading = 'eager'))
      await Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalWidth > 0
            ? null
            : new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true })
                img.addEventListener('error', resolve, { once: true })
              }),
        ),
      )
    })
    if (id === 'ubicacion') await page.waitForTimeout(4000)
    await section.screenshot({ path: `e2e/capturas/fase2-${project}-${i + 1}-${id}.png` })
  }
  await page
    .getByRole('contentinfo')
    .screenshot({ path: `e2e/capturas/fase2-${project}-7-footer.png` })
})
