// Genera los recursos de imagen del sitio a partir del material oficial del
// negocio (fotografías y video publicadas en su hub y redes). Requiere ffmpeg
// en PATH. Ejecutar: npm run images
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const origen = process.env.ORIGEN_MATERIAL ?? `${process.env.TEMP ?? '/tmp'}/opencode/csbrand`
const destino = join(raiz, 'public', 'img')
mkdirSync(destino, { recursive: true })

const freet = (entrada, salida, filtro, extra = []) => {
  const args = [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', join(origen, entrada),
    '-frames:v', '1',
    '-vf', filtro,
    '-q:v', '4',
    join(destino, salida),
  ]
  execFileSync('ffmpeg', [...args, ...extra], { stdio: 'inherit' })
}

// Fotografías fijas del hub oficial (2560px de ancho)
const IMG = 'portada-La-Casa-del-Sabor-al-Carbon-scaled.webp'
const FOTO = 'foto-La-Casa-del-Sabor-al-Carbon-scaled.webp'
const FOTO1 = 'foto1-La-Casa-del-Sabor-al-Carbon-scaled.webp'
const FOTO2 = 'foto2-La-Casa-del-Sabor-al-Carbon-scaled.webp'

freet(IMG, 'og.jpg', 'scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630:200:80')
freet(IMG, 'dest-burger.jpg', 'crop=680:1171:660:0')
freet(IMG, 'gal-croquetas.jpg', 'crop=900:700:1660:60')

freet(FOTO, 'esp-burger.jpg', 'crop=900:1100:240:140')
freet(FOTO, 'gal-libres.jpg', 'crop=1000:1000:1400:200')

freet(FOTO1, 'hero-burger.jpg', 'crop=1000:1250:1500:190')
freet(FOTO1, 'esp-almuerzo.jpg', 'crop=1000:1050:140:300')
// Fondos panorámicos a pantalla completa (estilo collage del material oficial)
freet(FOTO1, 'hero-fondo.jpg', 'crop=1920:1080:640:250')     // hamburguesa XL centrada
freet(FOTO2, 'pedido-fondo.jpg', 'crop=1920:1080:500:250')   // corte a la parrilla, ambiente oscuro

freet(FOTO2, 'esp-perro.jpg', 'crop=880:1100:260:320')
freet(FOTO2, 'esp-parrilla.jpg', 'crop=1000:1200:1400:260')

// Fotogramas del video oficial (1080x1920), recortados para mostrar solo
// la mesa y la comida, sin rostros identificables.
const recortesVideo = [
  ['casa-servida.jpg', 8.75, 'crop=640:540:90:1100'],
  ['casa-mesa.jpg', 18.75, 'crop=735:560:195:900'],
  ['casa-grill.jpg', 23.75, 'crop=540:1040:540:860'],
]
for (const [salida, t, filtro] of recortesVideo) {
  const args = [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(t),
    '-i', join(origen, 'video.mp4'),
    '-frames:v', '1',
    '-vf', filtro,
    '-q:v', '4',
    join(destino, salida),
  ]
  execFileSync('ffmpeg', args, { stdio: 'inherit' })
}

// Fondo panorámico del salón: fotograma de la mesa servida sin rostros
const salonArgs = [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-ss', '18.75',
  '-i', join(origen, 'video.mp4'),
  '-frames:v', '1',
  '-vf', 'crop=920:520:230:1070',
  '-q:v', '3',
  join(destino, 'salon-fondo.jpg'),
]
execFileSync('ffmpeg', salonArgs, { stdio: 'inherit' })

// Logotipo circular con alfa: recorte del emblema de la portada oficial
const logoArgs = [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-i', join(origen, IMG),
  '-frames:v', '1',
  '-vf',
  "crop=340:340:725:920,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lte(hypot(X-170,Y-170),164),255,0)'",
  join(destino, 'logo.png'),
]
execFileSync('ffmpeg', logoArgs, { stdio: 'inherit' })

console.log('Recursos de imagen generados en public/img')
