# Casa del Sabor Parrilla — Sitio web

Sitio informativo y comercial del restaurante **Casa del Sabor Parrilla** (a.k.a. *La Casa del Sabor al Carbón*), El Remanso, Floridablanca, Santander: hamburguesas al carbón, parrilla, comidas rápidas y almuerzos del día.

Aplicación estática de una página construida con **React 18 + TypeScript + Vite 8 + Tailwind CSS 3**. Sin backend, sin rastreadores, sin fuentes ni scripts de terceros en tiempo de ejecución.

## Estado de los datos

- Dirección, teléfono, WhatsApp, cartas digitales y redes sociales verificados desde los canales oficiales del negocio (Instagram `@casadelsaborparrilla`, hub `megalinkpro.com.co/lacasadelsaboralcarbon`, cartas de Queresto y Ola.Click) el **2026-10-29**.
- Precios tomados de la carta oficial de comidas rápidas (Queresto) en esa fecha. Pueden variar; el aviso aparece junto a la carta.
- Horario (7:30 – 23:45) según el perfil de Queresto del negocio. **Pendiente de confirmación por el propietario.**
- Las fotografías provienen del material oficial del propio restaurante (hub y video oficiales). Pendiente de confirmación de derechos por el propietario; sustituibles en `public/img/`.
- El sitemap no se genera todavía porque falta el dominio definitivo de publicación.

## Estructura

```
src/
  data/casa.ts          # Datos comerciales y carta completa (fuente única de verdad)
  components/           # Header, Hero, Historia, Especialidades, Carta, Salon,
                        # Adiciones, Pedido, Visitanos (footer), Aparecer, Iconos
  index.css             # Tokens de diseño, utilidades y capa de animación
scripts/images.mjs      # Genera public/img desde el material del negocio (requiere ffmpeg)
tests/e2e.py            # Pruebas E2E (Playwright en Python)
tests/diag_overflow.py  # Diagnóstico puntual de desbordamiento horizontal
public/_headers         # Cabeceras de seguridad (Netlify / Cloudflare Pages)
public/robots.txt
```

## Diseño

Réplica de la estructura visual de una plantilla de referencia pública (crema `#FAEBD7` + negros puros, display condensada **Six Caps** self-hosted vía fontsource, tarjetas inclinadas con tipografía fantasma, tabla filtrable de carta y cintas continuas), aplicada a los datos reales del negocio. Sin librerías de animación ni scripts de terceros.

## Ejecución

```sh
npm install
npm run dev        # desarrollo
npm run build      # producción en dist/
npm run preview    # servir dist/ (puerto 4173)
npm run typecheck  # TypeScript estricto
npm run images     # regenerar imágenes (requiere ffmpeg y variable ORIGEN_MATERIAL)
```

## Animación

Sistema propio, **cero librerías de animación** (la CSP solo permite scripts locales):

- `src/components/Aparecer.tsx` — reveal de scroll con `IntersectionObserver` (una sola vez por elemento, escalonable con `delay`).
- `index.css` — keyframes y utilidades: entradas del hero por líneas con máscara (`mascara`/`linea-entra`), cinta continua de especialidades (`desfile`, se pausa al hover), cambio de categoría de la carta (`panel-entra` con remontaje por `key` y filas escalonadas `fila-entra`), zoom de fotos (`zoom-capa`), entrada del header (`header-entra`) y latido del botón flotante (`fab-entrada`).
- Todo respeta `prefers-reduced-motion` (colapso global en `@layer base`): los elementos aparecen sin transición y la cinta queda estática.
- El eje X se recorta en `html` y `body` (`overflow-x: clip`) porque los reveals laterales asoman unos píxeles antes de entrar en pantalla.

## Pruebas E2E

Requiere Python con `pip install playwright` y `python -m playwright install chromium-headless-shell`.

```sh
python "C:\Users\Usuario\.config\opencode\skills\webapp-testing\scripts\with_server.py" \
  --server "npm run preview" --port 4173 -- python tests/e2e.py
```

Cubre: título, consola limpia, recursos rotos, desbordamiento horizontal, filtrado de la carta, enlaces externos verificados, menú móvil (incl. cierre con Escape), JSON-LD y capturas en `tests/capturas/`.

## Despliegue y seguridad

El sitio es estático. Publicar el contenido de `dist/` en cualquier alojamiento estático con HTTPS.

- **Netlify / Cloudflare Pages**: el archivo `public/_headers` (incluido en `dist/`) aplica CSP, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy` automáticamente.
- **nginx** (bloque `server`):

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" always;
add_header X-Content-Type-Options nosniff always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
```

- **Apache** (`.htaccess`): equivalentes con `Header set`.
- Nota sobre la CSP: `style-src 'unsafe-inline'` es necesario para los estilos en línea de React; los scripts se restringen a `'self'` (ningún script inline). `frame-ancestors` no funciona vía meta CSP, por eso se implementa en cabeceras HTTP.
- Se recomienda forzar HTTPS y activar HSTS en el dominio definitivo.

## Pendientes para la versión definitiva

1. Confirmar dominio de publicación y añadir `<link rel="canonical">` y `sitemap.xml`.
2. Confirmar horario completo por día (fuente actual: Queresto).
3. Confirmar con el propietario el uso de las fotografías oficiales y el logotipo.
4. Definir si se publica precio del almuerzo del día (hoy: carta dinámica en Ola.Click).
5. Sustituir el nombre de dominio provisional en las cabeceras si se define una política de CORS/HSTS concreta.
