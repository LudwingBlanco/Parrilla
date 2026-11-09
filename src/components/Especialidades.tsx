import Aparecer from './Aparecer'
import { negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

interface Ficha {
  foto: string
  alt: string
  titulo: string
  detalle: string
  descripcion: string
  precio: string
  oscura: boolean
}

// Precios reales: rango inferior según la carta oficial (Queresto, octubre 2026)
const fichas: Ficha[] = [
  {
    foto: './img/esp-burger.jpg',
    alt: 'Hamburguesa al carbón con carne jugosa, queso cheddar y lechuga fresca',
    titulo: 'Hamburguesas al carbón',
    detalle: '22 formas de comer al carbón',
    descripcion:
      'De la Tradicional de 150 g a la XL con todo: carne de res al carbón, pollo desmechado, tocineta crocante, chorizo artesanal y la mezcla de quesos de la casa. Todas vienen con papas a la francesa.',
    precio: 'desde $ 21.900',
    oscura: true,
  },
  {
    foto: './img/esp-parrilla.jpg',
    alt: 'Cortes a la parrilla con marcado de brasa y salsas de la casa',
    titulo: 'La parrilla',
    detalle: 'Chatas, chuletón y costillas BBQ',
    descripcion:
      'Cortes a la brasa con el marcado del carbón y las salsas preparadas por la cocina de la casa.',
    precio: 'desde $ 23.900',
    oscura: false,
  },
  {
    foto: './img/esp-perro.jpg',
    alt: 'Perro caliente de la casa con queso fundido, carne desmechada y tocineta',
    titulo: 'Perros y gyros',
    detalle: 'Con queso chitagá en los gyros',
    descripcion:
      'Perros calientes cargados con queso fundido, carne desmechada y tocineta, y gyros calientitos con el auténtico queso chitagá de la casa.',
    precio: 'desde $ 20.000',
    oscura: true,
  },
  {
    foto: './img/esp-almuerzo.jpg',
    alt: 'Costillas de cerdo BBQ con papas y ensaladita servidas en tabla de madera',
    titulo: 'Platos y almuerzos',
    detalle: 'Costillas BBQ y el menú del día',
    descripcion:
      'El almuerzo del salón cambia todos los días: siempre sale con sopa, arroz, ensalada, bebida y la salsa del día; la proteína se escoge. El menú vigente se publica cada mañana en Ola.Click.',
    precio: 'carta del día',
    oscura: false,
  },
]

function Ficha(f: Ficha & { i: number }) {
  const i = f.i
  const chip = f.oscura ? 'bg-fuego text-papel-ivory' : 'bg-carbon text-papel-ivory'
  const fantasma = f.oscura ? 'text-papel-ivory/[0.06]' : 'text-carbon/[0.05]'
  const marco = f.oscura
    ? 'border border-carbon-line bg-carbon text-papel-ivory'
    : 'border border-tinta/20 bg-papel-ivory text-tinta shadow-md'
  const suave = f.oscura ? 'text-papel-ivory/80' : 'text-tinta/80'
  const giro = i % 2 === 0 ? 'md:rotate-[0.8deg]' : 'md:rotate-[-0.8deg]'

  return (
    <Aparecer delay={60} className={giro}>
      <article
        className={`group tarjeta-gastronomica relative overflow-hidden rounded-2xl p-7 sm:p-10 ${marco}`}
      >
        <span aria-hidden="true" className={`fantasma max-sm:hidden ${fantasma}`}>
          {f.titulo}
        </span>

        <div className="flex items-center justify-between">
          <span className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold shadow-sm ${chip}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-fuego">
            Especialidad de la casa
          </span>
        </div>

        <div className="relative mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-md">
            <h3 className="titulo-seccion text-[clamp(2.5rem,4.8vw,4rem)]">{f.titulo}</h3>
            <p className={`mt-1 font-cuerpo text-[0.82rem] font-bold uppercase tracking-[0.16em] ${f.oscura ? 'text-papel-ivory/60' : 'text-tinta/60'}`}>
              {f.detalle}
            </p>
            <p className={`mt-4 font-cuerpo text-[0.95rem] leading-relaxed max-w-[44ch] ${suave}`}>
              {f.descripcion}
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-[2.2rem] font-bold uppercase leading-none tracking-wide text-fuego">
                {f.precio}
              </span>
            </div>
            <a
              href={negocio.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${f.oscura ? 'pildora' : 'pildora-tinta'} mt-7`}
            >
              <IconoWhatsApp className="h-4 w-4" />
              Armar mi pedido
            </a>
          </div>

          <div className="zoom-capa overflow-hidden rounded-xl">
            <img
              src={f.foto}
              alt={f.alt}
              width="880"
              height="640"
              loading="lazy"
              className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-108 sm:h-72 md:h-80 md:w-80"
            />
          </div>
        </div>
      </article>
    </Aparecer>
  )
}

export default function Especialidades() {
  return (
    <section id="especialidades" aria-labelledby="titulo-especialidades" className="bg-papel-ivory py-20 text-tinta lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Aparecer className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tinta/20 bg-carbon/5 px-4 py-1">
            <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
            <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tinta/80">
              Cortes, hamburguesas y cocina santandereana
            </span>
          </div>
          <h2 id="titulo-especialidades" className="titulo-seccion mt-3 text-[clamp(2.8rem,7.5vw,6.5rem)]">
            Las cuatro voces de la casa
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] font-cuerpo text-[0.98rem] leading-relaxed text-tinta/75">
            Cada plato sale cocido al carbón con las salsas preparadas en la propia cocina. Los precios
            corresponden a la carta oficial; el pedido se arma fácilmente por WhatsApp o en el salón.
          </p>
        </Aparecer>

        <div className="mt-14 flex flex-col gap-12 md:gap-16">
          {fichas.map((f, i) => (
            <Ficha key={f.titulo} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
