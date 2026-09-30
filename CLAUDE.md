# La Comadre – Tacos de Birria · Sitio web

Sitio one-page para un restaurante de birria en Los Mochis, Sinaloa, fundado en 1996 (30 años en 2026).
El brief completo (menú, secciones, textos, mapeo de fotos) está en `referencias/brief.md`. Léelo antes de cualquier tarea de contenido o diseño.
Las imágenes de referencia de marca están en `referencias/fotos/`. Míralas antes de decidir cualquier cosa visual.

## Stack (usar las versiones estables más recientes)
- **React + TypeScript (strict) + Vite.** Sitio estático, sin backend ni base de datos, desplegado en Vercel.
- **Prerenderizado a HTML** del index (vite-react-ssg o equivalente), para que el contenido, los meta tags y el JSON-LD vayan en el HTML inicial. Esto importa para Google y para la vista previa al compartir por WhatsApp o Facebook.
- **Tailwind CSS** (v4, configuración con `@theme` en CSS) para estilos y tokens de marca.
- **shadcn/ui sobre Radix UI** solo para piezas interactivas que necesitan accesibilidad real: Sheet (carrito), Tabs (categorías del menú), Dialog y Toast. Personalízalas con la marca; no deben verse como shadcn por defecto.
- **Motion** (`motion/react`, antes Framer Motion) para la entrada del hero y las micro-interacciones del carrito. Respeta `useReducedMotion`.
- **Zustand** con middleware `persist` para el estado del carrito (localStorage, con manejo de errores).
- **React Hook Form + Zod** para el formulario del pedido. Zod también valida `src/data/site.ts` al compilar, para que un precio mal escrito rompa el build y no el sitio.
- **Embla Carousel** para carruseles táctiles en móvil (favoritos, galería) y **yet-another-react-lightbox** para la galería.
- **Lucide React** para íconos. El ícono de WhatsApp va como SVG propio.
- **Fontsource** para las tipografías, self-hosted (sin llamadas a Google Fonts).
- **sharp** en `scripts/prepare-images.mjs` para generar WebP/AVIF responsivos; un componente `<Picture>` sirve `srcset` y `sizes`.
- **Calidad:** ESLint + Prettier (con plugin de Tailwind), Vitest + Testing Library para la lógica del carrito y del mensaje de WhatsApp, y Playwright para pruebas E2E y capturas de pantalla en móvil y desktop.
- Si `npm create vite` se niega a usar esta carpeta porque no está vacía, crea el proyecto en una carpeta temporal y mueve los archivos aquí sin tocar `CLAUDE.md` ni `referencias/`.

## Comandos
- `npm run dev` · servidor local
- `npm run build` · typecheck + build + prerender; debe pasar sin errores antes de dar una fase por terminada
- `npm run preview` · revisar el build final
- `npm run lint` · ESLint + Prettier
- `npm run test` · Vitest
- `npm run test:e2e` · Playwright (flujo de pedido y capturas en 360 px y 1440 px)
- `npm run images` · regenera `/public/img/` desde `referencias/fotos/`

## Reglas del proyecto (siempre)
- Todo el contenido editable vive en `src/data/site.ts`: menú, precios, horarios, textos, teléfonos, redes. Nunca escribas precios ni datos de contacto dentro de componentes.
- Todo el texto visible va en español de México, con el tono de la marca: cercano, orgulloso, con humor local ("¡Vente a los Madrazos!", "Enchílate sabroso", "Limón y ya").
- Las fotos de `referencias/fotos/` son provisionales. Se reemplazarán por versiones de mejor calidad con el mismo nombre de archivo, así que el sitio solo debe consumir las imágenes generadas por `npm run images`.
- Los pósters de menú y la invitación del aniversario son solo referencia visual. Nunca los uses como imagen dentro del sitio.
- No uses logotipos de terceros (Coca-Cola, etc.) como elementos gráficos.
- Mobile-first real: revisa cada sección a 360 px de ancho antes de pasar a desktop.
- Accesibilidad: contraste AA, `alt` descriptivos, foco visible, respeta `prefers-reduced-motion`.
- Cualquier dato que falte se marca como `// PENDIENTE:` en `site.ts` con un placeholder razonable, y se lista al final de cada fase. No inventes direcciones, horarios, redes ni precios.

## Marca (resumen; detalle en el brief)
- Colores: naranja #E67A14 · naranja rojizo #D4531A · rojo ladrillo #C23B1A · crema #F0ECE5 · casi negro #1C1A18 · café madera #6B4226 · verde limón #9BC53D (acento mínimo).
- Tipografías provisionales (vía Fontsource): Kaushan Script (títulos script naranjas), Caveat Brush (títulos de sección blancos con trazo seco), Bebas Neue (nombres de platillos y precios), Anton (titulares de impacto), Barlow Condensed (texto corrido).
- Elementos: destellos de 4 puntas naranja/blanco, taco dibujado en línea como doodle de fondo, franjas sólidas naranja arriba y abajo de bloques destacados, fondos fotográficos con overlay rojo-naranja.

## Dirección de diseño
- Lo memorable del sitio es la comida: fotos grandes, apetitosas, con la tipografía script de la marca encima, como en los pósters. Todo lo demás se mantiene sobrio.
- Evita el kit genérico: nada de tarjetas idénticas con la misma sombra gris para todo, ni animación fade-in en cada sección. Un solo momento de movimiento orquestado (la entrada del hero) y micro-interacciones solo como respuesta a acciones (agregar al carrito, abrir menú).
- Usa números o marcadores secuenciales solo donde el contenido es secuencia real (la línea de tiempo de la historia).
- Después de construir cada sección, toma capturas con Playwright (360 px y 1440 px), míralas y critícalas contra los pósters de referencia antes de seguir.

## Convenciones de código
- Componentes funcionales en `src/components/`, uno por archivo, con nombre en PascalCase. Secciones de la página en `src/sections/`.
- Estado global solo para el carrito (`src/store/cart.ts`). Lo demás es estado local o props.
- La lógica pura (total del carrito, armado del mensaje de WhatsApp, cálculo de abierto/cerrado) vive en `src/lib/`, separada de los componentes y con pruebas en Vitest.
- No agregues dependencias fuera del stack sin proponerlo primero.

## Forma de trabajo
- Trabaja por las fases del brief. Al terminar cada fase: corre `npm run build`, `npm run lint` y `npm run test`, resume qué hiciste, lista los PENDIENTE y detente a esperar mi revisión.
- Antes de cambios grandes de estructura o diseño, propón el plan primero.
