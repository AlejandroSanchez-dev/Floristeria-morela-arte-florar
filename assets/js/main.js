// Iconos SVG de las piezas del configurador
const BOTANICAL_SVGS = {
  bouquet: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.5 0 4.5 2 4.5 4.5 0 1.8-1 3.3-2.5 4l-2 9.5-2-9.5C8.5 10.8 7.5 9.3 7.5 7.5 7.5 5 9.5 3 12 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 14h8M9 17.5l6-1"/></svg>`,
  boutonniere: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21V9m0 0C12 5.5 15 3 18 3c0 3.5-2.5 6-6 6zm0 3c0-3.5-3-6-6-6 0 3.5 2.5 6 6 6z"/></svg>`,
  dome: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 19h14M6 19v-7a6 6 0 1112 0v7M12 9v10m0-7c1.8-1.5 3-1 3 0s-1.2 1.5-3 0z"/></svg>`,
  headpiece: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16c1.5-5 4.5-8 8-8s6.5 3 8 8M7 16v3m3.3-3.5v3.5m3.4-3.5v3.5M17 16v3"/><circle cx="12" cy="8" r="2"/></svg>`,
  bracelet: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3a2 2 0 100 4 2 2 0 000-4zM9 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM15 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>`,
  car: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14v-5l-2-5H7L5 12v5zm2 0a2 2 0 11-4 0m18 0a2 2 0 11-4 0M9 7c1.5-2 4.5-2 6 0"/></svg>`
};

// ---------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------
// Escapa texto que viene del CMS antes de meterlo en HTML
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const FALLBACK_IMG = '/img/uploads/pantone-ash-rose-17-1514-2_1_232554-172008942288661.webp';
const ORIENTATIVA_TXT = 'Imagen orientativa: la pieza final se elabora a mano y puede variar.';

// Una campaña se muestra si está activada y, en caso de tener fechas, si hoy está dentro del rango.
function isCampanaVisible(campana) {
  if (!campana || !campana.activa || campana.activa === 'false') return false;
  const today = new Date().toISOString().slice(0, 10);
  if (campana.fecha_inicio && today < String(campana.fecha_inicio).slice(0, 10)) return false;
  if (campana.fecha_fin && today > String(campana.fecha_fin).slice(0, 10)) return false;
  return true;
}

// Copia de seguridad de data.json (se usa solo si data.json no se puede cargar).
// Si cambias data.json desde el panel, no hace falta tocar esto.
let SITE_DATA = {
  "campana": {
    "activa": false,
    "tema": "san_valentin",
    "etiqueta": "Edición Limitada · Encargos Abiertos",
    "titulo": "Especial San Valentín: Flores que no se marchitan",
    "subtitulo": "Sorprende con rosas eternas y composiciones preservadas hechas a mano en nuestro taller de Albacete. Recogida en tienda o envío a domicilio.",
    "fecha_limite": "Encargos garantizados hasta el 12 de febrero o agotar existencias",
    "ofertas": [
      {
        "nombre": "Cúpula 'Amor Eterno' con Rosa Preservada",
        "descripcion": "Cúpula de cristal con base de madera natural, rosa eterna roja o rosa empolvado y cama de hortensias y paniculata.",
        "precio": "49 €",
        "precio_antes": "",
        "tag": "El más vendido",
        "imagen": "/img/uploads/cris_1_232554-172552754059480.webp",
        "imagen_orientativa": false
      },
      {
        "nombre": "Ramo 'Suspiro' de Rosas y Eucalipto",
        "descripcion": "Ramo artesanal de flores 100% preservadas envuelto en papel kraft de atelier y lazo de terciopelo.",
        "precio": "39 €",
        "precio_antes": "",
        "tag": "Unidades limitadas",
        "imagen": "/img/uploads/orientativa-ramo-rosas.webp",
        "imagen_orientativa": true
      },
      {
        "nombre": "Caja Sombrerera Mini Atelier",
        "descripcion": "Arreglo floral preservado en caja rígida decorativa lista para colocar en cualquier rincón especial.",
        "precio": "32 €",
        "precio_antes": "",
        "tag": "Detalle Ideal",
        "imagen": "/img/uploads/orientativa-arreglo-caja.webp",
        "imagen_orientativa": true
      }
    ],
    "fecha_inicio": "2027-01-15",
    "fecha_fin": "2027-02-14"
  },
  "aviso_precios": "Precios de ejemplo: se sustituirán por los precios reales del taller.",
  "pack_items": [
    {
      "id": "ramo",
      "nombre": "Ramo de Novia Preservado",
      "descripcion": "Diseño exclusivo a medida",
      "precio": 95,
      "svg": "bouquet",
      "cantidad_inicial": 1,
      "bg_active": "bg-atelier-blush border-atelier-berry",
      "icon_bg": "bg-atelier-berry text-white"
    },
    {
      "id": "prendido",
      "nombre": "Prendido de Solapa (Ud.)",
      "descripcion": "Para novio, padrino o testigos",
      "precio": 12,
      "svg": "boutonniere",
      "cantidad_inicial": 2,
      "bg_active": "bg-atelier-sage border-atelier-eucalyptus",
      "icon_bg": "bg-atelier-eucalyptus text-white"
    },
    {
      "id": "replica",
      "nombre": "Réplica o Cúpula Cristal",
      "descripcion": "Detalle eterno para madres/abuelas",
      "precio": 55,
      "svg": "dome",
      "cantidad_inicial": 0,
      "bg_active": "bg-atelier-amber border-atelier-gold",
      "icon_bg": "bg-atelier-gold text-white"
    },
    {
      "id": "tocado",
      "nombre": "Tocado / Peineta Floral",
      "descripcion": "Artesanal a juego con tu ramo",
      "precio": 38,
      "svg": "headpiece",
      "cantidad_inicial": 0,
      "bg_active": "bg-atelier-lavender border-atelier-plum",
      "icon_bg": "bg-atelier-plum text-white"
    },
    {
      "id": "pulsera",
      "nombre": "Pulsera Dama de Honor",
      "descripcion": "Corsage floral para amigas",
      "precio": 15,
      "svg": "bracelet",
      "cantidad_inicial": 0,
      "bg_active": "bg-atelier-blush border-atelier-rose",
      "icon_bg": "bg-atelier-rose text-white"
    },
    {
      "id": "coche",
      "nombre": "Decoración Coche Nupcial",
      "descripcion": "Guirnalda y prendidos para manetas",
      "precio": 65,
      "svg": "car",
      "cantidad_inicial": 0,
      "bg_active": "bg-atelier-sky border-atelier-skyDeep",
      "icon_bg": "bg-atelier-skyDeep text-white"
    }
  ],
  "galeria": [
    {
      "titulo": "Ramo Nupcial Silvestre & Rosa Empolvado",
      "categoria": "novias",
      "etiqueta": "Trabajo Real Morela",
      "badgeColor": "bg-atelier-berry text-white",
      "precio": "Desde 95 €",
      "descripcion": "Ramo de novia elaborado artesanalmente en nuestro taller de Albacete con flores preservadas y secas seleccionadas pétalo a pétalo.",
      "imagen": "/img/uploads/pantone-ash-rose-17-1514-2_1_232554-172008942288661.webp",
      "imagen_orientativa": false
    },
    {
      "titulo": "Ramo Nupcial en Tonos Crudos y Trigo",
      "categoria": "novias",
      "etiqueta": "Trabajo Real Morela",
      "badgeColor": "bg-atelier-eucalyptus text-white",
      "precio": "Desde 95 €",
      "descripcion": "Diseño nupcial real de Morela Arte Floral con hortensia preservada en blanco roto, espigas de trigo, lagurus y paniculata. Natural, luminoso y atemporal.",
      "imagen": "/img/uploads/aa4a0433_1_232554-170566166715693.webp",
      "imagen_orientativa": false
    },
    {
      "titulo": "Ramo con Carácter en Negro, Burdeos y Rosa",
      "categoria": "novias",
      "etiqueta": "Atelier Novias",
      "badgeColor": "bg-atelier-berry text-white",
      "precio": "Desde 105 €",
      "descripcion": "Ramo preservado con rosas negras y rosa empolvado, lunaria, helecho y lagurus en burdeos. Para novias que buscan algo diferente.",
      "imagen": "/img/uploads/images-2.webp",
      "imagen_orientativa": false
    },
    {
      "titulo": "Cúpula de Cristal 'La Bella y la Bestia'",
      "categoria": "cupulas",
      "etiqueta": "Cúpulas & Regalos",
      "badgeColor": "bg-atelier-gold text-white",
      "precio": "Desde 45 €",
      "descripcion": "Cúpula de cristal con base de madera natural, rosa eterna principal y composición botánica a los pies. El regalo estrella para madres y abuelas.",
      "imagen": "/img/uploads/cris_1_232554-172552754059480.webp",
      "imagen_orientativa": false
    },
    {
      "titulo": "Pareja de Réplicas en Miniatura para Madres",
      "categoria": "cupulas",
      "etiqueta": "Detalle Emotivo",
      "badgeColor": "bg-atelier-rose text-white",
      "precio": "Desde 55 € / ud.",
      "descripcion": "Reproducimos tu ramo de novia en tamaño compacto con las mismas flores y cinta para que sorprendas a las madres o a tu mejor amiga en el banquete.",
      "imagen": "/img/uploads/orientativa-arreglo-caja.webp",
      "imagen_orientativa": true
    },
    {
      "titulo": "Peineta y Horquillas Florales de Novia",
      "categoria": "tocados",
      "etiqueta": "Tocados a Medida",
      "badgeColor": "bg-atelier-plum text-white",
      "precio": "Desde 38 €",
      "descripcion": "Tocado alambrado a mano flor a flor en nuestro taller, diseñado exactamente con los mismos tonos de tu ramo y adaptado a tu recogido o trenza.",
      "imagen": "/img/uploads/orientativa-tocado.webp",
      "imagen_orientativa": true
    },
    {
      "titulo": "Corona y Diadema de Primera Comunión",
      "categoria": "tocados",
      "etiqueta": "Especial Comuniones",
      "badgeColor": "bg-atelier-plum text-white",
      "precio": "Desde 35 €",
      "descripcion": "Semicoronas, diademas y apliques para cinturón de Comunión o niñas de arras en tonos empolvados, beige, lavanda o blanco roto.",
      "imagen": "/img/uploads/orientativa-comunion.webp",
      "imagen_orientativa": true
    },
    {
      "titulo": "Prendidos de Solapa Coordinados",
      "categoria": "detalles",
      "etiqueta": "Novio & Padrino",
      "badgeColor": "bg-atelier-eucalyptus text-white",
      "precio": "12 € / ud.",
      "descripcion": "Boutonnieres artesanales para el novio, padrino y testigos elaborados con las mismas flores preservadas del ramo nupcial.",
      "imagen": "/img/uploads/orientativa-prendidos.webp",
      "imagen_orientativa": true
    },
    {
      "titulo": "Pulseras de Damas & Decoración de Coche",
      "categoria": "detalles",
      "etiqueta": "Complementos Boda",
      "badgeColor": "bg-atelier-skyDeep text-white",
      "precio": "Desde 15 €",
      "descripcion": "Corsages con lazo de seda para damas de honor y prendidos florales para las manetas y bandeja trasera del coche nupcial.",
      "imagen": "/img/uploads/orientativa-pulseras.webp",
      "imagen_orientativa": true
    }
  ],
  "contacto": {
    "telefono": "643 92 25 47",
    "whatsapp": "34643922547",
    "direccion": "Calle Blasco de Garay, 12",
    "horario_lv": "L–J: 10:00–13:30 y 17:30–19:30",
    "horario_sab": "Viernes: 10:00–14:00 · (Verano L–V: 9–14h)",
    "email": ""
  },
  "envio": {
    "coste": "3,99",
    "gratis_desde": 89,
    "zona": "España peninsular",
    "plazo": "Entre 24 y 72 horas laborables desde que el pedido está listo"
  },
  "sobre": {
    "activa": true,
    "texto": "Morela Arte Floral es un taller artesanal en el centro de Albacete dedicado a las flores preservadas y secas. Diseñamos ramos de novia, réplicas, cúpulas, tocados y detalles para bodas y comuniones, siempre a mano y pieza a pieza.\n\nNos gusta conocer a cada persona antes de empezar: ver su vestido, sus colores y su historia, para que el resultado sea único y dure muchos años.",
    "imagen": "/img/uploads/aa4a0433_1_232554-170566166715693.webp"
  },
  "legal": {
    "titular": "",
    "nif": "",
    "email": "",
    "registro": "",
    "actualizado": "2026-11-18"
  }
};

// Paletas visuales y temas dinámicos para Campañas Especiales
const THEMES_CONFIG = {
  san_valentin: {
    sectionBg: "bg-gradient-to-b from-atelier-blush/60 via-atelier-cream to-atelier-blush/30",
    glow1: "bg-atelier-rose/25",
    glow2: "bg-atelier-berry/20",
    badge: "bg-atelier-berry text-white shadow-sm",
    badgeIcon: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    noticeBg: "bg-atelier-blush text-atelier-berry border border-atelier-blushMid",
    cardBorder: "border-atelier-blushMid hover:border-atelier-rose",
    cardTag: "bg-atelier-berry text-white",
    cardBtn: "bg-atelier-berry hover:bg-atelier-rose text-white",
    footerBg: "bg-white/90 border-atelier-blushMid",
    footerIconBox: "bg-atelier-blush text-atelier-berry",
    footerCta: "bg-atelier-berry hover:bg-ink text-white"
  },
  dia_madre: {
    sectionBg: "bg-gradient-to-b from-atelier-lavender/60 via-atelier-cream to-atelier-blush/40",
    glow1: "bg-atelier-plum/20",
    glow2: "bg-atelier-rose/25",
    badge: "bg-atelier-plum text-white shadow-sm",
    badgeIcon: `<svg class="w-3.5 h-3.5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9a9 9 0 01-9 9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/></svg>`,
    noticeBg: "bg-atelier-lavender text-atelier-plum border border-atelier-lavenderMid",
    cardBorder: "border-atelier-lavenderMid hover:border-atelier-plum",
    cardTag: "bg-atelier-plum text-white",
    cardBtn: "bg-atelier-plum hover:bg-atelier-berry text-white",
    footerBg: "bg-white/90 border-atelier-lavenderMid",
    footerIconBox: "bg-atelier-lavender text-atelier-plum",
    footerCta: "bg-atelier-plum hover:bg-ink text-white"
  },
  comuniones: {
    sectionBg: "bg-gradient-to-b from-atelier-amber/50 via-atelier-cream to-atelier-sand",
    glow1: "bg-atelier-gold/20",
    glow2: "bg-atelier-sage/30",
    badge: "bg-atelier-gold text-white shadow-sm",
    badgeIcon: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    noticeBg: "bg-atelier-amber text-atelier-gold border border-atelier-amberMid",
    cardBorder: "border-atelier-amberMid hover:border-atelier-gold",
    cardTag: "bg-atelier-gold text-white",
    cardBtn: "bg-atelier-gold hover:bg-amber-600 text-white",
    footerBg: "bg-white/90 border-atelier-amberMid",
    footerIconBox: "bg-atelier-amber text-atelier-gold",
    footerCta: "bg-atelier-gold hover:bg-ink text-white"
  },
  navidad: {
    sectionBg: "bg-gradient-to-b from-atelier-forest/15 via-atelier-cream to-atelier-berry/15",
    glow1: "bg-atelier-forest/20",
    glow2: "bg-atelier-gold/25",
    badge: "bg-atelier-forest text-white shadow-sm",
    badgeIcon: `<svg class="w-3.5 h-3.5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2L9 7h6l-3-5zM7 7L4 13h16l-3-6H7zM5 13l-3 7h20l-3-7H5zM11 20v2h2v-2h-2z"/></svg>`,
    noticeBg: "bg-atelier-sage text-atelier-forest border border-atelier-sageMid",
    cardBorder: "border-atelier-sageMid hover:border-atelier-forest",
    cardTag: "bg-atelier-berry text-white",
    cardBtn: "bg-atelier-forest hover:bg-atelier-berry text-white",
    footerBg: "bg-white/90 border-atelier-sageMid",
    footerIconBox: "bg-atelier-sage text-atelier-forest",
    footerCta: "bg-atelier-forest hover:bg-ink text-white"
  }
};

function renderCampana() {
  const campana = SITE_DATA.campana;
  const section = document.getElementById('campana-especial');
  const navLink = document.getElementById('nav-campana-link');
  const mobileNavLink = document.getElementById('mobile-nav-campana-link');

  if (!section) return;

  if (!isCampanaVisible(campana)) {
    section.classList.add('hidden');
    if (navLink) navLink.classList.add('hidden');
    if (mobileNavLink) mobileNavLink.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  if (navLink) navLink.classList.remove('hidden');
  if (mobileNavLink) mobileNavLink.classList.remove('hidden');

  const themeKey = campana.tema || 'san_valentin';
  const theme = THEMES_CONFIG[themeKey] || THEMES_CONFIG.san_valentin;

  section.className = `relative py-16 sm:py-24 overflow-hidden scroll-mt-16 transition-colors duration-500 ${theme.sectionBg}`;

  const glow1 = document.getElementById('campana-bg-glow-1');
  const glow2 = document.getElementById('campana-bg-glow-2');
  if (glow1) glow1.className = `absolute top-12 left-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none opacity-60 ${theme.glow1}`;
  if (glow2) glow2.className = `absolute bottom-12 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none opacity-60 ${theme.glow2}`;

  const badge = document.getElementById('campana-badge');
  if (badge) badge.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm ${theme.badge}`;

  const badgeIcon = document.getElementById('campana-badge-icon');
  if (badgeIcon) badgeIcon.innerHTML = theme.badgeIcon;

  const etiqueta = document.getElementById('campana-etiqueta');
  if (etiqueta) etiqueta.textContent = campana.etiqueta || 'Campaña Especial';

  const titulo = document.getElementById('campana-titulo');
  if (titulo) titulo.textContent = campana.titulo || '';

  const subtitulo = document.getElementById('campana-subtitulo');
  if (subtitulo) subtitulo.textContent = campana.subtitulo || '';

  const fechaWrapper = document.getElementById('campana-fecha-wrapper');
  if (fechaWrapper) {
    if (campana.fecha_limite) {
      fechaWrapper.className = `mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm ${theme.noticeBg}`;
      const fechaText = document.getElementById('campana-fecha-limite');
      if (fechaText) fechaText.textContent = campana.fecha_limite;
      fechaWrapper.style.display = 'inline-flex';
    } else {
      fechaWrapper.style.display = 'none';
    }
  }

  const footerBanner = document.getElementById('campana-footer-banner');
  if (footerBanner) footerBanner.className = `mt-12 rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 reveal ${theme.footerBg}`;

  const footerIconBox = document.getElementById('campana-footer-icon-box');
  if (footerIconBox) footerIconBox.className = `w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${theme.footerIconBox}`;

  const footerCta = document.getElementById('campana-footer-cta');
  if (footerCta) {
    footerCta.className = `w-full md:w-auto text-center shrink-0 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md ${theme.footerCta}`;
    footerCta.href = `https://wa.me/${SITE_DATA.contacto.whatsapp}?text=` + encodeURIComponent(`Hola Morela Arte Floral, he visto la campaña "${campana.titulo}" y me gustaría consultar disponibilidad para un encargo personalizado.`);
  }

  const grid = document.getElementById('campana-ofertas-grid');
  if (grid && campana.ofertas) {
    grid.innerHTML = campana.ofertas.map(oferta => `
      <article class="bg-white rounded-3xl overflow-hidden border ${theme.cardBorder} shadow-sm hover:shadow-editorial transition-all duration-300 flex flex-col justify-between group w-[82vw] max-w-[320px] sm:w-auto shrink-0 snap-center sm:snap-align-none">
        <div class="relative h-56 sm:h-72 overflow-hidden bg-atelier-sand">
          <img 
            src="${esc(oferta.imagen)}" 
            alt="${esc(oferta.nombre)}" 
            loading="lazy"
            onerror="this.onerror=null;this.src=FALLBACK_IMG;"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          ${oferta.imagen_orientativa ? `<span class="absolute bottom-3 left-3 bg-ink/70 text-white text-[11px] px-2.5 py-1 rounded-full">Imagen orientativa</span>` : ''}
              ${oferta.tag ? `
            <span class="absolute top-3.5 left-3.5 ${theme.cardTag} text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              ${esc(oferta.tag)}
            </span>
          ` : ''}
          <div class="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            ${oferta.precio_antes ? `<span class="text-[11px] line-through text-ink-soft">${esc(oferta.precio_antes)}</span>` : ''}
            <span class="text-ink text-xs sm:text-sm font-bold">${esc(oferta.precio)}</span>
          </div>
        </div>

        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="font-serif text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-atelier-berry transition-colors">
              ${esc(oferta.nombre)}
            </h3>
            <p class="text-xs sm:text-sm text-ink-muted mt-2 line-clamp-3 leading-relaxed">
              ${esc(oferta.descripcion)}
            </p>
          </div>

          <div class="pt-3 border-t border-atelier-sand flex items-center justify-between gap-3">
            <div class="flex flex-col">
              <span class="text-[11px] uppercase tracking-wider text-ink-soft">Precio Taller</span>
              <div class="flex items-baseline gap-1.5">
                ${oferta.precio_antes ? `<span class="text-xs line-through text-ink-muted">${esc(oferta.precio_antes)}</span>` : ''}
                <span class="text-base sm:text-lg font-bold text-atelier-berry">${esc(oferta.precio)}</span>
              </div>
              <span class="text-[11px] text-ink-soft">IVA incl.${oferta.precio_antes ? ' · Tachado: precio más bajo de los 30 días previos' : ''}</span>
            </div>
            <a href="https://wa.me/${SITE_DATA.contacto.whatsapp}?text=${encodeURIComponent('Hola Morela Arte Floral, me interesa encargar la pieza de campaña "' + oferta.nombre + '" (' + oferta.precio + '). ¿Tenéis disponibilidad?')}"
               target="_blank" rel="noopener noreferrer"
               class="${theme.cardBtn} px-4 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm shrink-0">
              <span>Encargar</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // 0. Cargar datos dinámicos desde data.json si está disponible
  try {
    let response = null;
    try {
      response = await fetch('./data.json', { cache: 'no-store' });
    } catch (_) {
      response = await fetch('/data.json', { cache: 'no-store' });
    }
    if (response && response.ok) {
      const remoteData = await response.json();
      if (remoteData.contacto) SITE_DATA.contacto = { ...SITE_DATA.contacto, ...remoteData.contacto };
      if (remoteData.campana) SITE_DATA.campana = { ...SITE_DATA.campana, ...remoteData.campana };
      if (remoteData.pack_items && Array.isArray(remoteData.pack_items) && remoteData.pack_items.length) {
        SITE_DATA.pack_items = remoteData.pack_items;
      }
      if (remoteData.galeria && Array.isArray(remoteData.galeria) && remoteData.galeria.length) {
        SITE_DATA.galeria = remoteData.galeria;
      }
    }
  } catch (err) {
    console.info('Cargando con configuración estática base (data.json offline/local):', err);
  }

  // 1. Renderizar Campaña Especial Dinámica
  renderCampana();

  // Estado interactivo del configurador
  const quantities = {};
  SITE_DATA.pack_items.forEach(item => {
    quantities[item.id] = parseInt(item.cantidad_inicial, 10) || 0;
  });
  let selectedPalette = "Empolvados & Rosa Blush";

  // 2. Inicializar datos de contacto y enlaces dinámicos
  if (SITE_DATA.contacto) {
    const addrEl = document.getElementById('contact-address');
    if (addrEl && SITE_DATA.contacto.direccion) addrEl.textContent = SITE_DATA.contacto.direccion;
    const hlEl = document.getElementById('contact-hours-lv');
    if (hlEl && SITE_DATA.contacto.horario_lv) hlEl.textContent = SITE_DATA.contacto.horario_lv;
    const hsEl = document.getElementById('contact-hours-sab');
    if (hsEl && SITE_DATA.contacto.horario_sab) hsEl.textContent = SITE_DATA.contacto.horario_sab;
    const ptEl = document.getElementById('contact-phone-text');
    if (ptEl && SITE_DATA.contacto.telefono) ptEl.textContent = SITE_DATA.contacto.telefono;
    const plEl = document.getElementById('contact-phone-link');
    if (plEl && SITE_DATA.contacto.telefono) plEl.href = 'tel:+34' + SITE_DATA.contacto.telefono.replace(/\s+/g, '');
    const floatWa = document.querySelector('a[aria-label="Contactar por WhatsApp"]');
    if (floatWa && SITE_DATA.contacto.whatsapp) {
      floatWa.href = `https://wa.me/${SITE_DATA.contacto.whatsapp}?text=` + encodeURIComponent('Hola Morela Arte Floral, quería información sobre vuestras flores preservadas en Albacete');
    }
    const inspoWa = document.getElementById('custom-inspo-wa');
    if (inspoWa && SITE_DATA.contacto.whatsapp) {
      inspoWa.href = `https://wa.me/${SITE_DATA.contacto.whatsapp}?text=` + encodeURIComponent('Hola Morela Arte Floral, tengo una idea de ramo o arreglo y me gustaría enseñaros fotos de inspiración');
    }
    const fAddr = document.getElementById('footer-contact-address');
    if (fAddr && SITE_DATA.contacto.direccion) fAddr.textContent = SITE_DATA.contacto.direccion;
    const fPhone = document.getElementById('footer-contact-phone');
    if (fPhone && SITE_DATA.contacto.telefono) fPhone.textContent = SITE_DATA.contacto.telefono;

    const email = SITE_DATA.contacto.email || SITE_DATA.legal?.email;
    if (email) {
      [['contact-email-wrap', 'contact-email-link'], ['footer-email-wrap', 'footer-email-link']].forEach(([w, l]) => {
        const wrap = document.getElementById(w), link = document.getElementById(l);
        if (wrap && link) { link.href = 'mailto:' + email; link.textContent = email; wrap.classList.remove('hidden'); }
      });
    }
  }

  // Aviso de "precios de ejemplo" (se quita vaciando el campo en el panel)
  document.querySelectorAll('.aviso-precios').forEach(el => {
    el.textContent = SITE_DATA.aviso_precios || '';
    el.classList.toggle('hidden', !SITE_DATA.aviso_precios);
  });

  // Gastos de envío en los textos de la página
  if (SITE_DATA.envio) {
    document.querySelectorAll('[data-envio-coste]').forEach(el => { el.textContent = SITE_DATA.envio.coste; });
    document.querySelectorAll('[data-envio-gratis]').forEach(el => { el.textContent = SITE_DATA.envio.gratis_desde; });
  }

  // Identificación del titular en el pie (LSSI art. 10)
  const legal = SITE_DATA.legal || {};
  const legalLine = document.getElementById('footer-legal-line');
  if (legalLine) {
    const parts = [legal.titular ? `Titular: ${legal.titular}` : '', legal.nif ? `NIF: ${legal.nif}` : '', legal.email ? `Email: ${legal.email}` : ''].filter(Boolean);
    legalLine.textContent = parts.length ? parts.join(' · ') : '';
    legalLine.classList.toggle('hidden', !parts.length);
  }
  document.querySelectorAll('[data-legal-field="titular"]').forEach(el => {
    if (legal.titular) el.textContent = `${legal.titular}${legal.nif ? ' (NIF ' + legal.nif + ')' : ''}`;
  });

  // Sección "Sobre Morela"
  const sobre = SITE_DATA.sobre;
  const sobreSec = document.getElementById('sobre');
  if (sobreSec && sobre && sobre.activa && sobre.texto) {
    document.getElementById('sobre-texto').innerHTML = String(sobre.texto).split(/\n\s*\n/).map(p => `<p>${esc(p.trim())}</p>`).join('');
    if (sobre.imagen) document.getElementById('sobre-imagen').src = sobre.imagen;
    sobreSec.classList.remove('hidden');
  }

  // Actualizar contador del filtro "Todo el Catálogo"
  const allFilterBtn = document.querySelector('.gallery-filter-btn[data-filter="all"]');
  if (allFilterBtn && SITE_DATA.galeria) {
    allFilterBtn.textContent = `Todo el Catálogo (${SITE_DATA.galeria.length})`;
  }

  // 2. Renderizar Galería & Catálogo con Lightbox
  const lookbookGrid = document.getElementById('lookbook-grid');
  const lightboxModal = document.getElementById('lightbox-modal');
  let lastFocused = null;

  function renderGallery(filter = 'all') {
    const filtered = SITE_DATA.galeria.filter(item => filter === 'all' || item.categoria === filter);
    lookbookGrid.innerHTML = filtered.map((item, idx) => `
      <article data-idx="${idx}" data-category="${esc(item.categoria)}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Ver detalles: ${esc(item.titulo)}" class="gallery-card animate-fade-in group cursor-pointer bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-atelier-blushMid/80 shadow-sm hover:shadow-editorial transition-all duration-500 flex flex-col justify-between">
        <div class="relative h-40 sm:h-72 overflow-hidden bg-atelier-sand">
          <img 
            src="${esc(item.imagen)}" 
            alt="${esc(item.titulo)}${item.imagen_orientativa ? ' (imagen orientativa)' : ''}" 
            loading="lazy"
            onerror="this.onerror=null;this.src=FALLBACK_IMG;"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span class="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 max-w-[calc(100%-1.25rem)] sm:max-w-[60%] truncate ${esc(item.badgeColor)} text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
            ${esc(item.etiqueta)}
          </span>
          <span class="hidden sm:inline-block absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-ink text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            ${esc(item.precio)}
          </span>
          ${item.imagen_orientativa ? `<span class="absolute bottom-2 left-2 bg-ink/70 text-white text-[11px] px-2 py-0.5 rounded-full">Imagen orientativa</span>` : ''}
        </div>
        <div class="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
          <div>
            <h3 class="font-serif text-sm sm:text-2xl font-bold text-ink group-hover:text-atelier-berry transition-colors leading-snug line-clamp-2">
              ${esc(item.titulo)}
            </h3>
            <p class="hidden sm:block text-xs sm:text-sm text-ink-muted mt-1.5 line-clamp-2 leading-relaxed">
              ${esc(item.descripcion)}
            </p>
          </div>
          <div class="pt-2 border-t border-atelier-sand flex items-center justify-between text-[11px] sm:text-xs font-bold text-atelier-berry">
            <span class="truncate"><span class="sm:hidden text-ink">${esc(item.precio)}</span><span class="hidden sm:inline">Ver detalles</span></span>
            <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-atelier-blush group-hover:bg-atelier-berry group-hover:text-white flex items-center justify-center transition-colors shrink-0 text-xs">＋</span>
          </div>
        </div>
      </article>
    `).join('');

    // Eventos Lightbox
    document.querySelectorAll('.gallery-card').forEach((card, i) => {
      const open = () => {
        const item = filtered[i];
        lastFocused = card;
        const lbImg = document.getElementById('lightbox-img');
        lbImg.src = item.imagen;
        lbImg.alt = item.titulo + (item.imagen_orientativa ? ' (imagen orientativa)' : '');
        const note = document.getElementById('lightbox-note');
        note.textContent = item.imagen_orientativa ? ORIENTATIVA_TXT : '';
        note.classList.toggle('hidden', !item.imagen_orientativa);
        document.getElementById('lightbox-badge').textContent = item.etiqueta;
        document.getElementById('lightbox-title').textContent = item.titulo;
        document.getElementById('lightbox-price').textContent = item.precio;
        document.getElementById('lightbox-desc').textContent = item.descripcion;
        const waMsg = `Hola Morela Arte Floral, he visto en vuestro catálogo la pieza "${esc(item.titulo)}" (${esc(item.precio)}) y me gustaría consultaros detalles.`;
        document.getElementById('lightbox-wa-link').href = `https://wa.me/${SITE_DATA.contacto.whatsapp}?text=` + encodeURIComponent(waMsg);
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.getElementById('close-lightbox-btn').focus();
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  renderGallery('all');

  // Filtros de la galería
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => {
        b.className = 'gallery-filter-btn bg-white hover:bg-atelier-blush text-ink border border-atelier-blushMid text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shrink-0';
      });
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      btn.className = 'gallery-filter-btn bg-atelier-berry text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shrink-0 shadow-sm';
      renderGallery(filter);
    });
  });

  // Cerrar Lightbox
  const closeLightbox = () => {
    if (lightboxModal.classList.contains('hidden')) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
    if (lastFocused) lastFocused.focus();
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    // Mantener el foco dentro de la ventana mientras está abierta
    if (e.key === 'Tab' && !lightboxModal.classList.contains('hidden')) {
      const focusables = lightboxModal.querySelectorAll('a[href], button');
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.getElementById('close-lightbox-btn').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-to-pack').addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', e => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // 3. Configurador Interactivo de Pack con Cantidades (+/-)
  const packContainer = document.getElementById('pack-items-container');
  const selectedList = document.getElementById('selected-items-list');
  const estimatedTotalEl = document.getElementById('estimated-total');
  const shippingBadge = document.getElementById('shipping-badge');
  const shippingProgressText = document.getElementById('shipping-progress-text');
  const shippingProgressPct = document.getElementById('shipping-progress-pct');
  const shippingProgressBar = document.getElementById('shipping-progress-bar');

  function renderPackConfigurator() {
    packContainer.innerHTML = SITE_DATA.pack_items.map(item => {
      const qty = quantities[item.id] || 0;
      const isSelected = qty > 0;
      const cardClasses = isSelected
        ? `pack-card is-selected ${item.bg_active} shadow-sm`
        : `pack-card bg-atelier-cream/80 hover:bg-white border border-atelier-sand`;
      const iconClasses = isSelected
        ? item.icon_bg
        : `bg-white text-ink-muted border border-atelier-sand`;

      return `
        <div class="${cardClasses} rounded-2xl p-3 sm:p-4 transition-all duration-200 flex flex-col justify-between gap-2.5 sm:gap-3">
          <div class="flex items-center sm:items-start gap-2.5 sm:gap-3">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${iconClasses} flex items-center justify-center shrink-0 transition-colors">
              ${BOTANICAL_SVGS[item.svg] || BOTANICAL_SVGS.bouquet}
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-xs sm:text-sm text-ink truncate">${esc(item.nombre)}</h4>
              <p class="hidden sm:block text-[11px] text-ink-muted leading-snug mt-0.5">${esc(item.descripcion)}</p>
              <span class="inline-block mt-0.5 sm:mt-1.5 text-xs font-bold text-atelier-berry">${esc(item.precio)} € / ud.</span>
            </div>
            <!-- Contador +/- ergonómico en móvil en la misma fila -->
            <div class="flex sm:hidden items-center gap-1.5 bg-white rounded-full px-1.5 py-1 border border-atelier-sand shadow-sm shrink-0">
              <button type="button" data-action="dec" data-id="${item.id}" aria-label="Restar unidad" class="w-6 h-6 rounded-full hover:bg-atelier-blush text-ink font-bold text-sm flex items-center justify-center transition">−</button>
              <span class="w-4 text-center text-xs font-bold text-ink">${qty}</span>
              <button type="button" data-action="inc" data-id="${item.id}" aria-label="Sumar unidad" class="w-6 h-6 rounded-full bg-ink hover:bg-atelier-berry text-white font-bold text-sm flex items-center justify-center transition">+</button>
            </div>
          </div>

          <!-- En escritorio/tablet mostramos la barra inferior completa con subtotal -->
          <div class="hidden sm:flex items-center justify-between pt-2 border-t border-ink/5">
            <span class="text-[11px] font-semibold ${isSelected ? 'text-ink' : 'text-ink-soft'}">
              ${isSelected ? `Subtotal: ${qty * item.precio} €` : 'Sin añadir'}
            </span>
            <div class="flex items-center gap-2 bg-white rounded-full px-1.5 py-1 border border-atelier-sand shadow-sm">
              <button type="button" data-action="dec" data-id="${item.id}" aria-label="Restar unidad" class="w-6 h-6 rounded-full hover:bg-atelier-blush text-ink font-bold text-sm flex items-center justify-center transition">−</button>
              <span class="w-5 text-center text-xs font-bold text-ink">${qty}</span>
              <button type="button" data-action="inc" data-id="${item.id}" aria-label="Sumar unidad" class="w-6 h-6 rounded-full bg-ink hover:bg-atelier-berry text-white font-bold text-sm flex items-center justify-center transition">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Eventos botones +/-
    packContainer.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (action === 'inc') {
          quantities[id] = Math.min(20, (quantities[id] || 0) + 1);
        } else {
          quantities[id] = Math.max(0, (quantities[id] || 0) - 1);
        }
        renderPackConfigurator();
        updatePackSummary();
      });
    });
  }

  function updatePackSummary() {
    let total = 0;
    const rows = [];

    SITE_DATA.pack_items.forEach(item => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        const subtotal = qty * Number(item.precio);
        total += subtotal;
        rows.push(`
          <li class="flex items-center justify-between bg-white/90 px-3.5 py-2.5 rounded-xl border border-atelier-sand animate-fade-in">
            <div class="flex items-center gap-2 min-w-0 pr-2">
              <span class="w-5 h-5 rounded-full bg-atelier-blush text-atelier-berry font-bold text-[11px] flex items-center justify-center shrink-0">${qty}x</span>
              <span class="font-semibold text-xs text-ink truncate">${esc(item.nombre)}</span>
            </div>
            <span class="text-xs font-bold text-ink shrink-0">${subtotal} €</span>
          </li>
        `);
      }
    });

    selectedList.innerHTML = rows.length > 0
      ? rows.join('')
      : `<li class="text-xs text-ink-muted italic bg-white/60 p-4 rounded-xl text-center">Usa los botones (+) para añadir piezas a tu propuesta floral.</li>`;

    estimatedTotalEl.textContent = `${total} €`;

    // Barra de envío gratis (umbral 89 €)
    const freeShippingThreshold = Number(SITE_DATA.envio?.gratis_desde) || 89;
    const shippingCost = SITE_DATA.envio?.coste || '3,99';
    const pct = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
    shippingProgressBar.style.width = `${pct}%`;
    shippingProgressPct.textContent = `${pct}%`;

    if (total >= freeShippingThreshold) {
      shippingBadge.textContent = `Envío gratis (desde ${freeShippingThreshold} €)`;
      shippingBadge.className = 'text-[11px] font-bold px-3 py-1.5 rounded-full bg-atelier-sage text-atelier-forest border border-atelier-sageMid shadow-sm';
      shippingProgressText.textContent = '¡Envío gratis a la Península incluido!';
      shippingProgressText.className = 'text-atelier-forest';
    } else if (total === 0) {
      shippingBadge.textContent = `Envío Península ${shippingCost} €`;
      shippingBadge.className = 'text-[11px] font-bold px-3 py-1.5 rounded-full bg-white text-ink-muted border border-atelier-sand';
      shippingProgressText.textContent = `Envío gratis a la Península desde ${freeShippingThreshold} €`;
      shippingProgressText.className = 'text-ink-muted';
    } else {
      const remaining = freeShippingThreshold - total;
      shippingBadge.textContent = `Envío Península ${shippingCost} €`;
      shippingBadge.className = 'text-[11px] font-bold px-3 py-1.5 rounded-full bg-atelier-amber text-atelier-gold border border-atelier-amberMid';
      shippingProgressText.textContent = `Te faltan ${remaining} € para tener envío gratis`;
      shippingProgressText.className = 'text-atelier-gold';
    }
  }

  renderPackConfigurator();
  updatePackSummary();

  // En móvil el botón flotante de WhatsApp tapaba los botones (+) del configurador
  // y el formulario, que ya tienen su propio botón de contacto: lo ocultamos ahí.
  const waFloat = document.getElementById('wa-float');
  if (waFloat && 'IntersectionObserver' in window) {
    const visibles = new Set();
    const zonas = ['atelier-pack', 'contacto'].map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target));
      const ocultar = visibles.size > 0 && window.innerWidth < 1024;
      waFloat.classList.toggle('opacity-0', ocultar);
      waFloat.classList.toggle('pointer-events-none', ocultar);
    }, { threshold: 0.05 });
    zonas.forEach(z => obs.observe(z));
  }

  // Selección de paleta de colores
  const paletteBtns = document.querySelectorAll('.palette-btn');
  const summaryPaletteEl = document.getElementById('summary-palette');
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPalette = btn.getAttribute('data-palette');
      summaryPaletteEl.textContent = selectedPalette;
      paletteBtns.forEach(b => {
        b.classList.remove('border-atelier-berry', 'bg-white', 'shadow-sm');
        b.classList.add('border-transparent', 'bg-white/70');
      });
      btn.classList.add('border-atelier-berry', 'bg-white', 'shadow-sm');
      btn.classList.remove('border-transparent', 'bg-white/70');
    });
  });

  // Enviar Pack por WhatsApp
  document.getElementById('send-pack-btn').addEventListener('click', () => {
    const selectedLines = [];
    let total = 0;
    SITE_DATA.pack_items.forEach(item => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        const itemTotal = qty * Number(item.precio);
        selectedLines.push(`• ${qty}x ${esc(item.nombre)} (${itemTotal} €)`);
        total += itemTotal;
      }
    });

    const deliveryMode = document.querySelector('input[name="delivery-mode"]:checked')?.value || 'Taller en Albacete';
    const itemsText = selectedLines.length > 0 ? selectedLines.join('\n') : '• Quiero asesoría personalizada desde cero';

    const msg = `Hola Morela Arte Floral, he configurado esta propuesta en vuestra web:\n\n${itemsText}\n\nPaleta de color: ${selectedPalette}\nModalidad: ${deliveryMode}\nPresupuesto orientativo: desde ${total} € (IVA incluido, envío aparte)\n\n¿Podríamos ver disponibilidad para mi fecha?`;
    window.open(`https://wa.me/${SITE_DATA.contacto.whatsapp}?text=` + encodeURIComponent(msg), '_blank');
  });

  // 4. Menú Móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
      mobileMenuBtn.setAttribute('aria-label', isHidden ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
      document.getElementById('menu-icon-open').classList.toggle('hidden');
      document.getElementById('menu-icon-close').classList.toggle('hidden');
    });
  }
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.getElementById('menu-icon-open').classList.remove('hidden');
      document.getElementById('menu-icon-close').classList.add('hidden');
    });
  });

  // 5. Acordeón de Preguntas Frecuentes
  document.querySelectorAll('.faq-btn').forEach((btn, i) => {
    const panel = btn.nextElementSibling;
    panel.id = panel.id || `faq-panel-${i}`;
    btn.setAttribute('aria-controls', panel.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '＋');
      document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        content.classList.remove('hidden');
        icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 7. Animaciones Scroll Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  } else {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Año actual automático
  document.getElementById('current-year').textContent = new Date().getFullYear();
});
