import { useRef } from 'react'
import Aparecer from './Aparecer'
import DialogoFoto from './DialogoFoto'

// Fotografías del material oficial de la casa (hub y video). Todas reales.
const fotos = [
  { src: './img/hero-burger.jpg', alt: 'Hamburguesa XL al carbón con doble carne, pollo desmechado y tocineta', ancho: 'aspect-[3/4]' },
  { src: './img/esp-parrilla.jpg', alt: 'Cortes a la parrilla con marcado de brasa y salsas de la casa', ancho: 'aspect-[4/3]' },
  { src: './img/esp-perro.jpg', alt: 'Perro caliente de la casa con queso fundido y carne desmechada', ancho: 'aspect-[3/4]' },
  { src: './img/gal-libres.jpg', alt: 'Libres crocantes con pollo frito de la casa', ancho: 'aspect-square' },
  { src: './img/casa-servida.jpg', alt: 'Bandeja del carbón servida sobre papel cuadriculado con salsas de la casa', ancho: 'aspect-[3/4]' },
  { src: './img/esp-almuerzo.jpg', alt: 'Costillas de cerdo BBQ con papas y ensaladita servidas en tabla de madera', ancho: 'aspect-[4/3]' },
  { src: './img/casa-mesa.jpg', alt: 'Bandejas de la casa con hamburguesas, papas a la francesa y salsas en mesa', ancho: 'aspect-[3/2]' },
  { src: './img/gal-croquetas.jpg', alt: 'Croquetas de yuca con carne y camarones gratinadas', ancho: 'aspect-square' },
  { src: './img/dest-burger.jpg', alt: 'Hamburguesas al carbón con lechuga, tomate, aros de cebolla y capas de queso', ancho: 'aspect-[3/4]' },
  { src: './img/casa-grill.jpg', alt: 'Parrilla en mesa de celebración con papas y bebidas', ancho: 'aspect-[3/4]' },
]

// Palabras del propio negocio (artefacto "letras" de su material oficial)
const guion = [
  'Almuerzos típicos y gourmet',
  'Parrilla al carbón',
  'Hamburguesas artesanales',
  'Perros dog',
  'Gyros con queso chitagá',
  'Desgranados',
  'Costillas BBQ',
  'Menú infantil',
]

function TiraFotos({ oculta = false }: { oculta?: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-4" aria-hidden={oculta || undefined}>
      {fotos.map((f) => (
        <DialogoFoto key={f.src + f.ancho} src={f.src} alt={f.alt} silencioso={oculta}>
          <span className={`group relative block h-48 shrink-0 overflow-hidden rounded-xl border border-carbon-line/40 sm:h-60 md:h-68 ${f.ancho}`}>
            <img
              src={f.src}
              alt={f.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-carbon/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center"
            >
              <span className="rounded-full bg-carbon/80 px-3 py-1 font-cuerpo text-xs font-bold text-papel-ivory backdrop-blur-sm">
                Ampliar
              </span>
            </span>
          </span>
        </DialogoFoto>
      ))}
    </span>
  )
}

export default function Historia() {
  const carruselFotosRef = useRef<HTMLDivElement>(null)

  const moverFotos = (direccion: 'izq' | 'der') => {
    if (!carruselFotosRef.current) return
    const paso = 360
    carruselFotosRef.current.scrollBy({
      left: direccion === 'izq' ? -paso : paso,
      behavior: 'smooth',
    })
  }

  return (
    <section id="historia" aria-labelledby="titulo-historia" className="bg-papel-ivory text-tinta">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-28">
        <Aparecer className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tinta/20 bg-carbon/5 px-4 py-1">
            <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
            <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tinta/80">
              Fogón, carne y tradición
            </span>
          </div>
          <h2 id="titulo-historia" className="titulo-seccion mt-3 text-[clamp(2.8rem,7.5vw,6.5rem)]">
            Al carbón de verdad
          </h2>
        </Aparecer>
      </div>

      {/* Controles para desplazar fotos manualmente */}
      <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-4 pb-2 sm:px-6">
        <span className="font-cuerpo text-xs font-bold uppercase tracking-wider text-tinta/60">
          Galería oficial del restaurante
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => moverFotos('izq')}
            aria-label="Desplazar fotos a la izquierda"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-tinta/30 bg-papel-ivory text-base font-bold text-tinta shadow-sm transition-all hover:border-fuego hover:bg-fuego hover:text-papel-ivory active:scale-95"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => moverFotos('der')}
            aria-label="Desplazar fotos a la derecha"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-tinta/30 bg-papel-ivory text-base font-bold text-tinta shadow-sm transition-all hover:border-fuego hover:bg-fuego hover:text-papel-ivory active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {/* Carrusel de fotografías: cinta continua dinámica con scroll manual suave */}
      <div
        ref={carruselFotosRef}
        className="overflow-x-auto overflow-y-hidden py-2"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="desfile desfile-fotos">
          <TiraFotos />
          <TiraFotos oculta />
        </div>
      </div>

      <Aparecer className="mx-auto mt-14 max-w-3xl px-4 text-center sm:px-6">
        <p className="mx-auto max-w-[54ch] font-cuerpo text-[1.05rem] leading-relaxed text-tinta/80">
          Perros con queso chitagá, cortes a la parrilla, desayunos locales, gyros,
          desgranados, parrilladas de domingo y 22 hamburguesas preparadas al
          carbón. Sin atajos: el sabor proviene del fuego y de las salsas de la casa.
        </p>
        <a href="#carta" className="pildora-tinta mt-8">
          Explorar toda la carta
        </a>
      </Aparecer>

      {/* Cinta de guion sobre negro con tipografía contemporánea */}
      <div className="mt-16 bg-carbon py-4 md:mt-20 border-y border-carbon-line">
        <div className="overflow-hidden">
          <div className="desfile desfile-texto">
            {[0, 1].map((copia) => (
              <span key={copia} className="flex shrink-0 items-center" aria-hidden={copia === 1 || undefined}>
                {guion.map((p) => (
                  <span
                    key={p + copia}
                    className="flex items-center gap-3 px-4 font-cuerpo text-[0.8rem] font-bold uppercase tracking-[0.16em] text-papel-ivory/90"
                  >
                    <span aria-hidden="true" className="text-fuego">/</span>
                    {p}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
