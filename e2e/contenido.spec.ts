import { expect, test } from '@playwright/test'

test.describe('Fase 2 · contenido', () => {
  test('el HTML prerenderizado trae el menú completo y las secciones', async ({ request }) => {
    const html = await (await request.get('/')).text()
    for (const text of [
      'Taco-Madrazo',
      'Orden de Birria Brava',
      'Refresco 600 ml',
      '¡Vente a los Madrazos!',
      'Nuestra historia',
      'Ubicación y horarios',
    ]) {
      expect(html).toContain(text)
    }
    // Todas las categorías están en el HTML (no dependen de pestañas).
    for (const id of ['tacos-de-maiz', 'especialidades', 'extras', 'bebidas']) {
      expect(html).toContain(`id="menu-${id}"`)
    }
  })

  test('el Taco-Madrazo es el favorito destacado y ocupa más espacio', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('#favoritos article')
    await expect(cards).toHaveCount(5)
    const [first, second] = await Promise.all([
      cards.nth(0).boundingBox(),
      cards.nth(1).boundingBox(),
    ])
    expect(first!.width * first!.height).toBeGreaterThan(second!.width * second!.height * 1.5)
    await expect(cards.nth(0)).toContainText('El favorito de Los Mochis')
  })

  test('cada producto del menú tiene su botón "+"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#menu button[aria-label^="Agregar"]')).toHaveCount(24)
  })

  test('la galería abre y cierra el lightbox', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('button', { name: /^Ampliar foto/ })
      .first()
      .click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('el indicador de horario se calcula en el navegador', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#inicio').getByText(/^(Abierto ahora|Cerrado)$/)).toBeVisible()
  })
})

test.describe('Fase 2 · móvil', () => {
  test('el carrusel de favoritos cambia con los puntos', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'movil-360', 'solo móvil')
    await page.goto('/')
    const dot = page.getByRole('button', { name: 'Ver favorito 3 de 4' })
    await dot.click()
    await expect(dot).toHaveAttribute('aria-current', 'true')
  })
})

test.describe('Fase 2 · hero accesible', () => {
  test('con movimiento reducido el titular se ve de inmediato', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1', {
      timeout: 1500,
    })
  })
})

test.describe('Fase 2 · sin JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('el hero y el menú se ven sin JavaScript', async ({ page }) => {
    await page.goto('/')
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toHaveCSS('opacity', '1')
    await expect(page.getByRole('link', { name: /Pedir a domicilio/ })).toBeVisible()
    await expect(page.locator('#menu-especialidades')).toContainText('Tortirria')
  })
})
