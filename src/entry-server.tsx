import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App'

/** Renderiza la página completa a HTML para el prerender (ver scripts/prerender.mjs). */
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return new Response(prelude).text()
}
