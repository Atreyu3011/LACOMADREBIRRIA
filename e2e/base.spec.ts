import { expect, test } from '@playwright/test'

test.describe('Fase 1 · layout base', () => {
  test('el HTML prerenderizado trae contenido y meta tags', async ({ request }) => {
    const res = await request.get('/')
    const html = await res.text()
    expect(html).toContain('<title>La Comadre')
    expect(html).toContain('property="og:image"')
    expect(html).toContain('Birria que une generaciones')
    expect(html).not.toContain('<!--app-->')
  })

  test('header, navegación y footer', async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('link', { name: /ir al inicio/i })).toBeVisible()

    const order = page.getByRole('link', { name: /(pedir|pide por whatsapp)/i }).first()
    await expect(order).toBeVisible()
    await expect(order).toHaveAttribute('href', /^https:\/\/wa\.me\/526688151650\?text=/)

    if (testInfo.project.name === 'movil-360') {
      const toggle = page.getByRole('button', { name: 'Abrir menú' })
      await toggle.click()
      await expect(page.getByRole('navigation', { name: 'Menú móvil' })).toBeVisible()
      await page
        .getByRole('navigation', { name: 'Menú móvil' })
        .getByRole('link', { name: 'Historia' })
        .click()
      await expect(page.getByRole('navigation', { name: 'Menú móvil' })).toBeHidden()
    } else {
      await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible()
    }

    await expect(page.getByRole('contentinfo')).toContainText(
      '© La Comadre – Tacos de Birria. Desde 1996.',
    )

    // Sin scroll horizontal a 360 px.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)

    // La hidratación no debe dejar errores en consola.
    expect(errors).toEqual([])

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: `e2e/capturas/fase1-${testInfo.project.name}.png`,
      fullPage: true,
    })
  })
})
