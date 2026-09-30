import type { Site, SiteInput } from './schema.ts'

/**
 * TODO EL CONTENIDO EDITABLE DEL SITIO VIVE AQUÍ.
 *
 * - Precios en pesos enteros (MXN).
 * - Horas en formato 24 h "HH:MM".
 * - Las imágenes se nombran por su "slug" (ej. "taco-madrazo"); se generan con `npm run images`.
 * - Todo lo marcado con `PENDIENTE:` es un dato por confirmar con el negocio.
 *
 * Si algo está mal escrito, `npm run dev` y `npm run build` fallan y dicen exactamente
 * qué corregir (la validación con Zod vive en schema.ts y se ejecuta desde vite.config.ts).
 */

// PENDIENTE: confirmar horario.
const OPEN = '07:30'
const CLOSE = '14:00'

/** "07:30" → "7:30" para textos. */
const hour = (hhmm: string) => hhmm.replace(/^0/, '')

const raw = {
  brand: {
    name: 'La Comadre',
    tagline: 'Tacos de Birria',
    fullName: 'La Comadre – Tacos de Birria',
    foundedYear: 1996,
    anniversaryYears: 30,
    slogan: 'El sabor que une generaciones',
    slogans: ['Birria que une generaciones', 'Aquí sabe mejor', 'Puro sabor', 'Pide a domicilio'],
    // PENDIENTE: archivo oficial de la mascota (taco con megáfono). Activar cuando exista
    // public/img/brand/mascota.png.
    showMascot: false,
  },

  contact: {
    phone: { display: '668 815 1650', e164: '+526688151650' },
    whatsapp: {
      number: '526688151650',
      display: '668 815 1650',
      greeting: '¡Hola La Comadre! 🌮 Quiero hacer un pedido.',
    },
    email: 'tacosdebirrialacomadre@hotmail.com',
    social: {
      facebook: 'https://www.facebook.com/p/tacos-de-birria-La-Comadre-100063544209964/',
      instagram: null, // PENDIENTE: cuenta de Instagram
      tiktok: null, // PENDIENTE: cuenta de TikTok
    },
  },

  address: {
    street: 'Lic. Benito Juárez 213 Ote.', // PENDIENTE: confirmar Oriente vs. Poniente
    crossStreet: 'esq. Niños Héroes',
    neighborhood: 'Centro',
    postalCode: '81200',
    city: 'Los Mochis',
    state: 'Sinaloa',
    country: 'MX',
    mapsQuery: 'Tacos de Birria La Comadre, Benito Juárez 213, Los Mochis',
  },

  hours: {
    open: OPEN,
    close: CLOSE,
    days: [0, 1, 2, 3, 4, 5, 6],
    daysLabel: 'Todos los días',
    timeZone: 'America/Mazatlan',
  },

  attributes: [
    { id: 'aire-acondicionado', label: 'Área con aire acondicionado' },
    { id: 'accesible', label: 'Acceso para silla de ruedas' },
    { id: 'estacionamiento', label: 'Estacionamiento' },
    { id: 'domicilio', label: 'Servicio a domicilio' },
  ],

  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'menu', label: 'Menú' },
    { id: 'favoritos', label: 'Favoritos' },
    { id: 'historia', label: 'Historia' },
    { id: 'galeria', label: 'Galería' },
    { id: 'ubicacion', label: 'Ubicación' },
  ],

  header: {
    orderCta: 'Pide por WhatsApp',
    orderCtaShort: 'Pedir',
  },

  hero: {
    eyebrow: '30 años de birria en Los Mochis',
    title: 'Birria que une generaciones',
    subtitle: 'Desde 1996. Aquí sabe mejor.',
    handwritten: 'Aquí sabe mejor',
    image: 'hero-portada', // PENDIENTE: foto limpia del hero en alta calidad
    imageAlt:
      'Tacos de birria dorados con queso derretido sobre tabla de madera, con carne deshebrada y limones',
    ctaMenu: 'Ver menú',
    ctaOrder: 'Pedir a domicilio',
    band: ['30 años', 'El sabor que une generaciones', 'Desde 1996', 'Aquí sabe mejor'],
  },

  favorites: {
    eyebrow: 'Favoritos de la casa',
    title: 'Lo que más se pide',
    addLabel: 'Agregar al pedido',
    items: [
      {
        itemId: 'taco-madrazo',
        phrase: '¡Vente a los Madrazos!',
        image: 'taco-madrazo',
        imageAlt:
          'Taco-Madrazo: quesabirria en tortilla de harina con queso derretido, chiles toreados y verdura',
        badge: 'El favorito de Los Mochis',
        featured: true,
      },
      {
        itemId: 'taco-especial',
        phrase: 'Tacos Especiales',
        image: 'taco-especial',
        imageAlt:
          'Dos tacos especiales de birria con queso, limones, chiles toreados y verdura picada',
        priceSuffix: 'c/u',
      },
      {
        itemId: 'orden-de-birria',
        phrase: '¡Puro sabor!',
        image: 'orden-birria-1',
        imageAlt:
          'Orden de birria: plato de carne en su jugo con cilantro, salsas, crema y tacos de asiento',
      },
      {
        itemId: 'tostada-cleopatra',
        phrase: 'Limón y ya',
        image: 'tostada-cleopatra',
        imageAlt: 'Tostada Cleopatra de birria con queso, chiles toreados, salsas y verdura',
      },
      {
        itemId: 'taco-dorado',
        phrase: 'Enchílate sabroso',
        image: 'taco-dorado', // PENDIENTE: foto limpia del taco dorado (se muestra placeholder)
        imageAlt: 'Tacos dorados de birria sobre tabla de madera',
        priceSuffix: 'c/u',
      },
    ],
  },

  menu: {
    eyebrow: 'Precios en pesos',
    title: 'Menú',
    subtitle: `Menú de desayuno y comida, de ${hour(OPEN)} a ${hour(CLOSE)}`,
    note: 'Agrega lo que se te antoje y mándanos tu pedido completo por WhatsApp.',
    backgroundImage: 'tabla-de-birria',
    categories: [
      {
        id: 'tacos-de-maiz',
        name: 'Tacos de maíz',
        items: [
          { id: 'taco-dorado', name: 'Taco Dorado', price: 55 },
          { id: 'taco-especial', name: 'Taco Especial', description: 'Con queso', price: 60 },
          { id: 'taco-natural', name: 'Taco Natural', description: 'Sin grasa', price: 55 },
          { id: 'taco-de-nino', name: 'Taco de Niño', description: 'Sin grasa', price: 55 },
        ],
      },
      {
        id: 'especialidades',
        name: 'Especialidades',
        items: [
          { id: 'sopapo', name: 'Sopapo', description: 'Burro de harina', price: 75 },
          {
            id: 'taco-madrazo',
            name: 'Taco-Madrazo',
            description: 'Quesabirria de harina',
            price: 85,
          },
          {
            id: 'orden-de-birria',
            name: 'Orden de Birria',
            description: 'Carne en su jugo',
            price: 120,
          },
          {
            id: 'orden-de-birria-brava',
            name: 'Orden de Birria Brava',
            description: 'Orden picosa con carne dorada',
            price: 130,
          },
          {
            id: 'tostada-cleopatra',
            name: 'Tostada Cleopatra',
            description: 'Tostada de birria con queso',
            price: 90,
          },
          {
            id: 'planchada',
            name: 'Planchada',
            description: 'Mixta doble de maíz con queso',
            price: 90,
          },
          {
            id: 'tortirria',
            name: 'Tortirria',
            description: 'Torta de birria con queso',
            price: 95,
          },
        ],
      },
      {
        id: 'extras',
        name: 'Extras',
        items: [
          { id: 'tostada', name: 'Tostada', price: 3 },
          { id: 'tortilla-de-maiz', name: 'Tortilla de maíz', price: 2 },
          { id: 'tortilla-de-harina', name: 'Tortilla de harina', price: 4 },
          { id: 'taco-asiento', name: 'Taco asiento', price: 10 },
          { id: 'quesadilla-de-maiz', name: 'Quesadilla de maíz', price: 18 },
          { id: 'quesadilla-de-harina', name: 'Quesadilla de harina', price: 28 },
          { id: 'tostada-queso-asiento', name: 'Tostada con queso y asiento', price: 25 },
          { id: 'consome-especial', name: 'Consomé especial', price: 30 },
        ],
      },
      {
        id: 'bebidas',
        name: 'Bebidas',
        items: [
          { id: 'agua-natural', name: 'Agua natural 500 ml', price: 15 },
          { id: 'aguas-de-sabor', name: 'Aguas de sabor', price: 30 },
          { id: 'jaztea', name: 'Jaztea', price: 30 },
          { id: 'refresco-de-vidrio', name: 'Refresco de vidrio', price: 30 },
          { id: 'refresco-600', name: 'Refresco 600 ml', price: 35 },
        ],
      },
    ],
  },

  order: {
    title: 'Tu pedido',
    deliveryNote: 'El costo de envío se confirma por WhatsApp.', // PENDIENTE: zonas y costo de envío
    closedNote: `Ahorita estamos cerrados. Tu pedido llegará por WhatsApp y te respondemos al abrir a las ${hour(OPEN)}.`,
    paymentMethods: [], // PENDIENTE: formas de pago (el sitio no cobra en línea; solo se indica en el mensaje)
  },

  history: {
    eyebrow: '30 años · 1996 – 2026',
    title: 'Nuestra historia',
    intro:
      'Empezamos con un carrito en la calle y hoy somos parada obligatoria en Los Mochis. Treinta años sirviendo la misma birria a abuelos, hijos y nietos.',
    founder: null, // PENDIENTE: nombre de "La Comadre" (fundadora) y una anécdota breve
    timeline: [
      {
        id: 'carrito',
        period: '1996',
        title: 'Nace el carrito',
        body: 'Tacos de Birria La Comadre arranca como un carrito con toldo azul en plena calle. Mesas de plástico, la parrilla prendida desde temprano y la birria de siempre.',
        image: 'historia-carrito', // PENDIENTE: fotos históricas en mejor calidad
        imageAlt:
          'El carrito de Tacos de Birria La Comadre con toldo azul y clientes en la calle, en los años noventa',
        vintage: true,
        extraImages: [
          {
            image: 'historia-parrilla',
            alt: 'Un taquero con mandil blanco dorando tacos en la plancha bajo el toldo',
          },
          {
            image: 'historia-toldo',
            alt: 'El equipo con mandiles rojos atendiendo bajo el toldo azul',
          },
        ],
      },
      {
        id: 'puesto',
        period: 'Después',
        title: 'Crece el puesto',
        body: 'Llega más gente y crece la familia. El equipo se pone la camisa blanca y la gorra de La Comadre, y la fila ya es costumbre.',
        image: 'historia-puesto',
        imageAlt:
          'El puesto de La Comadre bajo un toldo rojo, con el equipo de camisas blancas atendiendo a los clientes',
        vintage: true,
        extraImages: [
          {
            image: 'historia-equipo',
            alt: 'El equipo de La Comadre con gorras y camisas blancas preparando tacos en la plancha',
          },
        ],
      },
      {
        id: 'hoy',
        period: 'Hoy', // PENDIENTE: año de apertura del local
        title: 'Restaurante remodelado',
        body: 'Un local renovado con área climatizada, para que la birria se disfrute con calma y en familia.',
        image: 'historia-hoy',
        imageAlt: 'El comedor de La Comadre lleno de familias',
      },
      {
        id: 'treinta-anos',
        period: '2026',
        highlight: true,
        title: '30 años',
        body: 'Cumplimos 30 años y lo celebramos el domingo 24 de mayo con mañanitas y pastel. Gracias por hacernos parte de su familia.',
      },
    ],
  },

  gallery: {
    eyebrow: 'Puro sabor',
    title: 'Galería',
    images: [
      {
        image: 'tabla-de-birria',
        alt: 'Tabla con tostada de birria, tacos con queso, salsas y verdura',
      },
      { image: 'orden-birria-3', alt: 'Orden de birria de cerca, con cilantro y rábano' },
      { image: 'tacos-especiales-3', alt: 'Tacos especiales con queso derretido y limones' },
      {
        image: 'tostada-cleopatra-detalle',
        alt: 'Tostada Cleopatra con birria deshebrada en plato negro',
      },
      { image: 'orden-birria-chile-2', alt: 'Orden de birria con chile toreado en el caldo' },
      {
        image: 'tacos-especiales-4',
        alt: 'Dos tacos especiales de birria con queso, vistos de lado',
      },
      { image: 'orden-birria-2', alt: 'Orden de birria con salsas, crema y tacos de asiento' },
      {
        image: 'tacos-especiales-2',
        alt: 'Tacos especiales con chiles toreados y limones sobre tabla',
      },
      {
        image: 'orden-birria-chile-3',
        alt: 'Orden de birria vista desde arriba junto a tacos de asiento',
      },
    ],
  },

  location: {
    eyebrow: 'Parada obligatoria en Los Mochis',
    title: 'Ubicación y horarios',
    addressTitle: 'Dirección',
    hoursTitle: 'Horario',
    attributesTitle: 'En el local',
    directionsLabel: 'Cómo llegar',
    wazeLabel: 'Waze',
    callLabel: 'Llamar',
    mapTitle: 'Mapa de Google con la ubicación de La Comadre en Los Mochis',
  },

  footer: {
    copyright: '© La Comadre – Tacos de Birria. Desde 1996.',
  },

  seo: {
    title: 'La Comadre · Tacos de Birria en Los Mochis desde 1996',
    description:
      '30 años de birria en Los Mochis. Taco-Madrazo, tacos dorados, orden de birria y más. Mira el menú con precios y pide a domicilio por WhatsApp.',
    url: 'https://lacomadre.vercel.app', // PENDIENTE: dominio definitivo
    locale: 'es_MX',
    ogImage: '/img/og-portada.jpg',
    ogImageAlt: 'Tacos de birria con queso de La Comadre, 30 años en Los Mochis',
    themeColor: '#D4531A',
  },
} satisfies SiteInput

export const site: Site = raw
