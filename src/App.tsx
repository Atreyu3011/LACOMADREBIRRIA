import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Favorites } from '@/sections/Favorites'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { History } from '@/sections/History'
import { Location } from '@/sections/Location'
import { Menu } from '@/sections/Menu'

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Header />

      <main
        id="contenido"
        className="pt-[calc(var(--header-h)+env(safe-area-inset-top))] lg:pt-(--header-h-lg)"
      >
        <Hero />
        <Favorites />
        <Menu />
        <History />
        <Gallery />
        <Location />
      </main>

      <Footer />
    </>
  )
}
