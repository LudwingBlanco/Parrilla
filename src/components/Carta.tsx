import { useEffect, useRef, useState, useMemo } from 'react'
import Aparecer from './Aparecer'
import DialogoFoto from './DialogoFoto'
import {
  almuerzoEjemplo,
  categorias,
  cop,
  negocio,
  type Plato,
} from '../data/casa'
import { IconoWhatsApp } from './Iconos'

/**
 * Fotografías del material oficial. Solo se asocian a categorías donde la
 * foto representa de verdad lo que la persona está pidiendo: nada inventado.
 */
const FOTOS: Record<string, { src: string; alt: string; etiqueta?: { t: string; sub: string } }> = {
  hamburguesas: {
    src: '/img/hero-burger.jpg',
    alt: 'Hamburguesa XL al carbón de la casa con doble carne, pollo desmechado y tocineta',
    etiqueta: { t: 'La XL', sub: '$ 38.900 · con todo y papas' },
  },
  perros: {
    src: '/img/esp-perro.jpg',
    alt: 'Perro dog de la casa con queso fundido, carne desmechada y tocineta',
  },
  almuerzos: {
    src: '/img/esp-almuerzo.jpg',
    alt: 'Costillas de cerdo BBQ servidas en tabla de madera con papas y ensaladita',
  },
  parrilla: {
    src: '/img/esp-parrilla.jpg',
    alt: 'Cortes a la parrilla con marcado de brasa',
  },
  domingos: {
    src: '/img/casa-mesa.jpg',
    alt: 'Mesas largas de domingo en el salón con bandejas de la casa',
  },
}

function Fila({ p, idx }: { p: Plato; idx: number }) {
  const urlPedido = `${negocio.whatsapp}&text=${encodeURIComponent(
    `Hola! Quiero pedir de la carta: ${p.nombre}${p.detalle ? ` (${p.detalle})` : ''} - ${cop(p.precio)}`
  )}`

  return (
    <li
      className="fila-entra fila-carta group py-3"
      style={{ animationDelay: `${Math.min(idx * 35, 380)}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-cuerpo text-[0.96rem] font-extrabold uppercase tracking-[0.025em] text-tinta group-hover:text-fuego transition-colors">
          {p.nombre}
          {p.detalle && (
            <span className="ml-2 rounded-full bg-carbon/90 px-2.5 py-0.5 align-[1px] font-cuerpo text-[0.66rem] font-semibold normal-case tracking-normal text-papel-ivory/90 group-hover:bg-fuego transition-colors">
              {p.detalle}
            </span>
          )}
        </h4>
        <span
          aria-hidden="true"
          className="mx-1 hidden flex-1 border-b border-dotted border-tinta/25 transition-colors duration-200 group-hover:border-fuego/60 sm:block"
        />
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[1.65rem] sm:text-[1.85rem] font-bold uppercase tracking-wide tabular-nums text-tinta transition-colors duration-200 group-hover:text-fuego">
            {cop(p.precio)}
          </span>
          <a
            href={urlPedido}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pedir ${p.nombre} por WhatsApp`}
            className="inline-flex h-7 items-center gap-1 rounded-full bg-fuego/10 px-2.5 font-cuerpo text-[0.65rem] font-bold uppercase tracking-wider text-fuego transition-all duration-200 hover:bg-fuego hover:text-papel-ivory hover:scale-105 active:scale-95"
          >
            <IconoWhatsApp className="h-3 w-3" />
            <span className="hidden sm:inline">Pedir</span>
          </a>
        </div>
      </div>
      {p.descripcion && (
        <p className="mt-1 max-w-[54ch] font-cuerpo text-[0.85rem] leading-relaxed text-tinta/70">
          {p.descripcion}
        </p>
      )}
    </li>
  )
}

function ListaAlmuerzo() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="max-w-[60ch] font-cuerpo text-[0.95rem] leading-relaxed text-tinta/80">
          El almuerzo no es una carta fija: cambia todos los días. Siempre sale con
          sopa del día, arroz, ensalada, bebida y la salsa del día; la proteína se
          escoge. Este es el menú de un ejemplo publicado por el negocio (un día{' '}
          {almuerzoEjemplo.dia}):
        </p>
        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {almuerzoEjemplo.proteinas.map((proteina, i) => (
            <li
              key={proteina}
              className="fila-entra flex items-baseline gap-2 font-cuerpo text-[0.92rem] text-tinta/85"
              style={{ animationDelay: `${Math.min(i * 60, 380)}ms` }}
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-fuego" />
              <span>{proteina}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-cuerpo text-[0.84rem] text-tinta/60">
          Incluye siempre: {almuerzoEjemplo.siempreIncluye.join(', ')}.
        </p>
      </div>
      <a href={negocio.cartaAlmuerzos} target="_blank" rel="noopener noreferrer" className="pildora-tinta self-start whitespace-nowrap">
        Menú del día en Ola.Click
      </a>
    </div>
  )
}

export default function Carta() {
  const [activa, setActiva] = useState('hamburguesas')
  const [busqueda, setBusqueda] = useState('')
  const categoria = categorias.find((c) => c.id === activa)!
  const foto = FOTOS[activa]

  // Aviso de desbordamiento de los filtros: se calcula según el scroll real
  const cinta = useRef<HTMLDivElement>(null)
  const [bordes, setBordes] = useState({ izq: false, der: false })

  useEffect(() => {
    const el = cinta.current
    if (!el) return
    const medir = () =>
      setBordes({
        izq: el.scrollLeft > 8,
        der: el.scrollLeft + el.clientWidth < el.scrollWidth - 8,
      })
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      el.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [])

  // Búsqueda interactiva dinámica en toda la carta
  const platosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return null
    const q = busqueda.toLowerCase().trim()
    const resultados: Plato[] = []
    for (const cat of categorias) {
      for (const grp of cat.grupos) {
        for (const p of grp.platos) {
          if (
            p.nombre.toLowerCase().includes(q) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(q)) ||
            (p.detalle && p.detalle.toLowerCase().includes(q))
          ) {
            resultados.push(p)
          }
        }
      }
    }
    return resultados
  }, [busqueda])

  return (
    <section id="carta" aria-labelledby="titulo-carta" className="bg-papel-ivory pb-20 text-tinta lg:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Aparecer className="border-b border-carbon/20 pb-10 text-center lg:mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-tinta/20 bg-carbon/5 px-4 py-1">
            <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
            <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tinta/80">
              Sabor santandereano & al carbón
            </span>
          </div>
          <h2 id="titulo-carta" className="titulo-seccion mt-3 text-[clamp(2.8rem,7.5vw,6.5rem)]">
            La carta
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] font-cuerpo text-[0.95rem] leading-relaxed text-tinta/75">
            Precios oficiales tomados de la carta digital (
            <a href={negocio.cartaRapidas} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-2 hover:text-fuego">
              Queresto
            </a>
            , octubre de 2026). Puedes armar tu pedido conversando por WhatsApp o directamente en la mesa.
          </p>

          {/* Buscador interactivo dinámico en la carta */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="relative">
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar plato o ingrediente (ej. tocineta, chitagá, bbq)..."
                aria-label="Buscar plato en la carta"
                className="w-full rounded-full border border-tinta/25 bg-papel-ivory px-5 py-2.5 pr-10 font-cuerpo text-[0.86rem] text-tinta placeholder-tinta/45 transition-colors focus:border-fuego focus:outline-none"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda('')}
                  aria-label="Borrar búsqueda"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 font-cuerpo text-xs font-bold text-tinta/50 hover:text-tinta"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </Aparecer>

        {/* Si hay búsqueda activa, mostrar resultados inmediatos */}
        {platosFiltrados ? (
          <div className="panel-entra mt-8">
            <div className="flex items-baseline justify-between border-b border-tinta/15 pb-4">
              <h3 className="titulo-seccion text-2xl uppercase">
                Resultados para: "{busqueda}" ({platosFiltrados.length})
              </h3>
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="font-cuerpo text-xs font-bold uppercase tracking-wider text-fuego underline"
              >
                Volver a la carta por categorías
              </button>
            </div>
            {platosFiltrados.length === 0 ? (
              <p className="mt-8 text-center font-cuerpo text-sm text-tinta/60">
                No encontramos platos con ese ingrediente. Intenta con otra palabra o navega por las categorías.
              </p>
            ) : (
              <ul className="mt-6 columns-1 gap-x-12 sm:columns-2">
                {platosFiltrados.map((p, pi) => (
                  <Fila key={p.nombre + (p.detalle ?? '') + pi} p={p} idx={pi} />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <>
            {/* Filtros pegajosos con desfile horizontal; las perillas indican
                dónde queda contenido por recorrer (según scroll real) */}
            <div className="sticky top-20 z-30 -mx-4 mb-6 bg-papel-ivory/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-6">
              <div
                ref={cinta}
                role="group"
                aria-label="Filtrar por categoría de la carta"
                className="flex gap-2 overflow-x-auto py-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {categorias.map((c) => (
                  <button
                    key={c.id}
                    aria-pressed={activa === c.id}
                    onClick={(e) => {
                      setActiva(c.id)
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                    }}
                    className={`whitespace-nowrap rounded-full border px-5 py-2.5 font-cuerpo text-[0.78rem] font-bold uppercase tracking-[0.08em] transition-all duration-200 active:scale-95 ${
                      activa === c.id
                        ? 'border-carbon bg-carbon text-papel-ivory shadow-[0_4px_16px_rgba(0,0,0,0.18)]'
                        : 'border-tinta/25 bg-transparent text-tinta/75 hover:border-tinta hover:text-tinta hover:bg-carbon/5'
                    }`}
                  >
                    {c.titulo}
                  </button>
                ))}
              </div>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-papel-ivory to-transparent transition-opacity duration-200 sm:left-6 ${
                  bordes.izq ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-papel-ivory to-transparent transition-opacity duration-200 sm:right-6 ${
                  bordes.der ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* El panel se remonta al cambiar de categoría (key=activa): título,
                foto y filas entran animados con panel-entra / fila-entra */}
            <div key={activa} className="panel-entra">
              <h3 className="titulo-seccion uppercase text-[clamp(2.4rem,4.8vw,4rem)]">
                <span className="sr-only">Categoría:</span>
                {categoria.titulo}
              </h3>
              {categoria.pie && (
                <p className="mt-1 font-cuerpo text-[0.88rem] font-semibold text-fuego-deep">{categoria.pie}</p>
              )}

              {activa === 'almuerzos' ? (
                <div className="mt-8">
                  <ListaAlmuerzo />
                </div>
              ) : (
                <div
                  className={
                    foto
                      ? 'mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_350px]'
                      : 'mt-6'
                  }
                >
                  <div className="min-w-0">
                    {categoria.grupos.map((g, gi) => (
                      <div key={g.titulo || gi}>
                        {g.titulo && (
                          <p className="mt-8 border-b border-tinta/20 pb-2 font-cuerpo text-[0.76rem] font-bold uppercase tracking-[0.25em] text-tinta/60 first:mt-2">
                            {g.titulo}
                          </p>
                        )}
                        {g.pie && (
                          <p className="mt-2 max-w-[54ch] font-cuerpo text-[0.82rem] leading-snug text-tinta/60">{g.pie}</p>
                        )}
                        <ul className={foto ? 'columns-1' : 'columns-1 gap-x-12 sm:columns-2'}>
                          {g.platos.map((p, pi) => (
                            <Fila key={p.nombre + (p.detalle ?? '')} p={p} idx={pi} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* La foto comparte mesa con la lista cuando existe material real */}
                  {foto && (
                    <aside className="self-start lg:sticky lg:top-36">
                      <Aparecer delay={140} desde="derecha">
                        <DialogoFoto src={foto.src} alt={foto.alt}>
                          <span className="group relative block overflow-hidden rounded-xl">
                            <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border-2 border-fuego transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                            <img
                              src={foto.src}
                              alt={foto.alt}
                              loading="lazy"
                              className="relative aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {foto.etiqueta && (
                              <span className="absolute bottom-3 left-3 rounded-lg bg-carbon/90 px-3.5 py-2.5 text-papel-ivory backdrop-blur-sm">
                                <span className="block font-display text-2xl uppercase leading-none">{foto.etiqueta.t}</span>
                                <span className="mt-1 block font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.14em] text-papel-ivory/80">{foto.etiqueta.sub}</span>
                              </span>
                            )}
                            <span
                              aria-hidden="true"
                              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-carbon/75 text-papel-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            >
                              ⤢
                            </span>
                          </span>
                        </DialogoFoto>
                        <p className="mt-3 text-center font-cuerpo text-[0.68rem] font-bold uppercase tracking-[0.18em] text-tinta/45">
                          Fotografía oficial de la casa · toca para ampliar
                        </p>
                      </Aparecer>
                    </aside>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Aviso de vigencia + pedido por WhatsApp */}
        <Aparecer className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-carbon p-7 text-papel-ivory sm:px-10">
            <p className="max-w-[54ch] font-cuerpo text-[0.94rem] leading-relaxed text-papel-ivory/80">
              El pedido se arma conversando: cuéntanos qué se te antoja y lo preparamos al carbón con las salsas de la casa.
            </p>
            <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer" className="pildora-llena shrink-0">
              <IconoWhatsApp className="h-4 w-4" />
              Armar mi pedido por WhatsApp
            </a>
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
