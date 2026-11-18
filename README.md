# Morela Arte Floral — web

Web estática de una página para el taller Morela Arte Floral (Albacete), publicada en Netlify y editable con Sveltia CMS.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | Portada (catálogo, configurador de pack, opiniones, taller, FAQ, formulario) |
| `aviso-legal.html`, `privacidad.html`, `cookies.html`, `condiciones.html` | Textos legales. Los datos del titular se rellenan desde `data.json` |
| `data.json` | Contenido editable: campaña, precios, galería, contacto, envíos, «Sobre Morela» y datos legales |
| `admin/` | Panel Sveltia CMS (`/admin`) |
| `assets/js/main.js` | Lógica de la portada |
| `assets/js/legal.js` | Rellena los datos legales en las páginas legales |
| `src/input.css` + `tailwind.config.js` | Origen del CSS. Se compila a `assets/css/styles.css` |
| `assets/fonts/` | Fuentes autoalojadas (no se usa Google Fonts) |

## Desarrollo

```bash
npm install
npm run build   # genera assets/css/styles.css
```

Netlify ejecuta `npm run build` en cada despliegue (ver `netlify.toml`), así que los cambios hechos desde el panel también regeneran el CSS.

Si añades clases de Tailwind nuevas en HTML, JS o `data.json`, vuelve a ejecutar `npm run build`.

## Pendiente de completar por el negocio

- Panel → **Datos legales del titular**: nombre/razón social, NIF y email (obligatorio por la LSSI y el RGPD). Mientras estén vacíos, las páginas legales muestran «pendiente de completar».
- Panel → **Contacto**: email visible.
- Sustituir las fotos marcadas como «Imagen orientativa» por fotos propias.
- Cuando se compre el dominio, cambiar `https://floristeriaalex.netlify.app` en `index.html`, las páginas legales, `robots.txt` y `sitemap.xml`.
- Netlify → *Forms*: activar la detección de formularios y las notificaciones por email del formulario «contacto».
